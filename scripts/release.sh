#!/bin/bash

export CLICOLOR=1

set -e

# Checks if a command exists
# @param $1 The command to check
# @param $2 Whether to show debug messages (default: `true`)
# @param $3 An optional parameter to state the reason for this dependency
function checkCommandExists {
  if [[ "$2" = true ]]; then
    echo -e "\x1b[34mDEBUG: Checking if the $1 command exists...\x1b[0m"
  fi
  if ! [[ -x "$(command -v $1)" ]]; then
    echo -e "\x1b[31m\x1b[1mERROR: The $1 command doesn't exist. Aborting...\x1b[0m"
    if [[ -n "$3" ]]; then
      echo -e "\x1b[31m\x1b[1mReason: $3\x1b[0m"
    fi
    return 1
  else
    if [[ "$2" = true ]]; then
      echo -e '\x1b[33mDEBUG: The '"$1"' command exists!\x1b[0m'
    fi
    return
  fi
}
SHOW_DEBUG=${SHOW_DEBUG:-true}

# Arguments
while [[ $# -gt 0 ]];
do
  opt="$1"
  shift # Expose the next argument
  case "$opt" in
  "--skipFirebase")
    SKIP_FIREBASE=true
    ;;
  # Publish to the `next` tag on NPM
  "--releaseType")
    RELEASE_TYPE="$1"
    shift
    ;;
  "--publishNext")
    PUBLISH_NEXT=true
    ;;
  # Prevent builds from being published to NPM
  "--dry-run" | "--dryRun")
    DRY_RUN=true
    if [[ "$SHOW_DEBUG" = true ]]; then
      echo -e "\x1b[34mDEBUG: Dry run is enabled. Builds will not be published to the NPM registry.\x1b[0m"
    fi
    ;;
  "--help" | "-h")
    echo -e "\x1b[33mSyntax: ./release.sh [--publishNext | --publish-next | --dry-run | --dryRun | --releaseType [semver] | --help | -h]\x1b[0m"
    exit 0
    ;;
  esac
done

echo -e "\x1b[34mChecking if the project is clean (aka no uncommitted changes)...\x1b[0m"
if [[ -n $(git status --porcelain) ]]; then
  echo -e "\x1b[31m\x1b[1mERROR: The current project is dirty (aka there are uncommitted changes).\x1b[0m"
  echo -e "\x1b[31m\x1b[1mA clean project is required to execute this script. Exiting...\x1b[0m"
  exit 1
fi

echo -e "\x1b[34mChecking if the required commands exist...\x1b[0m"

checkCommandExists "npm" "$SHOW_DEBUG" "The npm command is needed to update the package.json file."
checkCommandExists "jq" "$SHOW_DEBUG" "The jq command is needed to modify the firebase.json file to add routing.\nTIP: Go here for more information on how to download the jq command: https://stedolan.github.io/jq/download/"
checkCommandExists "gulp" "$SHOW_DEBUG" "The gulp command is needed to run the changelog script.\nTIP: Run npm i to install all dependencies."

cd projects/ngx-simple-http

PACKAGE_PREV_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

if [[ -n "$RELEASE_TYPE" ]]; then
  npm version "$RELEASE_TYPE"
else
  echo -e '\x1b[31m\x1b[1mERROR: Please specify a release type (via the --releaseType parameter) to bump the version!\x1b[0m'
  exit 1
fi

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo -e '\x1b[33mSuccessfully bumped from '"$PACKAGE_PREV_VERSION"' to '"$PACKAGE_VERSION"'!\x1b[0m'

# Go back to the project's root
cd ../../

echo -e "\x1b[34mModifying version placeholders...\x1b[0m"

# Replace placeholder versions ('0.0.0-PLACEHOLDER') with the current build version tag
# Code snippet adapted from https://stackoverflow.com/a/17072017
if [[ "$(uname)" == "Darwin" ]]; then
	sed -i "" "s/0.0.0-PLACEHOLDER/$PACKAGE_VERSION/g" $(find ./projects -type f)
else
	sed -i "s/0.0.0-PLACEHOLDER/$PACKAGE_VERSION/g" $(find ./projects -type f)
fi

echo -e "\x1b[34mBuilding library...\x1b[0m"
./scripts/build-lib.sh --version "$PACKAGE_VERSION"

echo -e "\x1b[34mGenerating changelog...\x1b[0m"
gulp changelog

echo -e "\x1b[34mCommitting changes...\x1b[0m"
git add CHANGELOG.md projects/ngx-simple-http/package.json
git commit -m "chore: bump version to $PACKAGE_VERSION w/ changelog"

echo -e "\x1b[34mCreating tag...\x1b[0m"
git tag "$PACKAGE_VERSION"

echo -e "\x1b[34mPushing changes...\x1b[0m"
git push -q origin master
git push -q origin "$PACKAGE_VERSION"

echo -e "\x1b[32mSuccessfully pushed the release to Chan4077/ngx-simple-http.\x1b[0m"

echo -e "\x1b[34mCleaning up...\x1b[0m"
rm -rf ngx-simple-http-builds
rm -rf dist

echo -e '\x1b[32mDone!\x1b[0m'
exit 0
