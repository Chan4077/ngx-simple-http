# API for Simple HTTP

_Updated as of 1.0.0_

## `createHttpDelete`

Creates a HTTP DELETE request.

### Parameters

Name | Type | Description
---|---|---
`apiEndpoint` | `string` | The API's endpoint **(required)**
`apiParams` | `string` | Parameters to suffix the endpoint with
`apiHeaders` | `HttpHeaders` | HTTP headers to append to the request

### Union types

Name | Default value | Description
---|---|---
`P` | `any` | Interface to use for the parameters
`R` | `any` | Interface to use for the return value of the request

### Returns

Returns an `Observable` of type `R`, or an `Observable` of type `any` if the `R` union type is not specified.

## `createHttpGet`

Creates a HTTP GET request.

### Parameters

Name | Type | Description
---|---|---
`apiEndpoint` | `string` | The API's endpoint **(required)**
`apiParams` | `P` | Parameters to suffix the endpoint with
`apiHeaders` | `HttpHeaders` | HTTP headers to append to the request

### Union types

Name | Default value | Description
---|---|---
`P` | `any` | Interface to use for the parameters
`R` | `any` | Interface to use for the return value of the request

### Returns

Returns an `Observable` of type `R`, or an `Observable` of type `any` if the `R` union type is not specified.

## `createHttpPost`

Creates a HTTP POST request.

### Parameters

Name | Type | Description
---|---|---
`apiEndpoint` | `string` | The API's endpoint **(required)**
`apiParams` | `P` | Parameters to suffix the endpoint with
`apiHeaders` | `HttpHeaders` | HTTP headers to append to the request

### Union types

Name | Default value | Description

