import { TestBed, async } from '@angular/core/testing';
import { SimpleHttpModule } from './simple-http.module';
import { SimpleHttpService } from './simple-http.service';
import { HttpClientModule } from '@angular/common/http';

interface StudioGhilbliFilm {
  id?: string;
  title?: string;
  description?: string;
  director?: string;
  producer?: string;
  release_date?: number;
  rt_score?: number;
}
interface LetsValidateThumbsJson {
  mime_type?: string;
  base64?: string;
  width?: number;
  height?: number;
  page_rect?: {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
  };
}
interface LetsValidateThumbsParams {
  url?: string;
  output?: 'raw' | 'json';
  prettify?: boolean;
  format?: 'jpg' | 'jpeg' | 'png';
  quality?: number;
  full?: boolean;
  size?: 't' | 's' | 'm' | 'l' | 'x' | 'og' | 'o';
  width?: number;
  height?: number;
  mobile?: boolean;
  device?: 'galaxys5' | 'nexus5x' | 'nexus6p' | 'iphone5' | 'iphone6' | 'iphone6plus' |
  'ipad' | 'ipadpro' | 'iphone4' | 'ipadmini' | 'nokian9' | 'nokialumia520' | 'nexus7' |
  'nexus6' | 'nexus5' | 'nexus4' | 'nexus10' | 'microsoftlumia950' | 'microsoftlumia550' |
  'blackberryz30' | 'blackberryplaybook' | 'galaxynote3' | 'galaxynoteii' | 'galaxysiii' |
  'kindlefirehdx' | 'lgoptimusl70' | 'laptopwithtouch' | 'laptopwithmdpiscreen' | 'laptopwithhidpiscreen';
  viewportWidth?: number;
  viewportHeight?: number;
  viewport?: any;
  selector?: string;
}
describe('SimpleHttpService', () => {
  let service: SimpleHttpService;
  beforeEach(() => {
    // Configure the module for testing
    TestBed.configureTestingModule({
      imports: [SimpleHttpModule]
    });
    // Retrieve the service created from the module
    service = TestBed.get(SimpleHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('SimpleHttpService#createHttpGet', () => {
    it('should return a Studio Ghilbli film using the unofficial Ghibli API', async(() => {
      const request = service.createHttpGet<null, StudioGhilbliFilm>(
        'https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe',
        null
      );
      request.subscribe(result => {
        expect(result).not.toBeNull();
        expect(result.id).toEqual('2baf70d1-42bb-4437-b551-e5fed5a87abe');
        expect(result.title).toEqual('Castle in the Sky');
        expect(result.description).toEqual(`The orphan Sheeta inherited a mysterious crystal ` +
          `that links her to the mythical sky-kingdom of Laputa. With the help of resourceful ` +
          `Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the ` +
          `once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to ` +
          `use Laputa's science to make himself ruler of the world.`);
        expect(result.director).toEqual('Hayao Miyazaki');
        expect(result.producer).toEqual('Isao Takahata');
        expect(result.release_date).toEqual(1986);
        expect(result.rt_score).toEqual(95);
      });
    }));
    it('should return a generated thumbnail in JSON using the Let\'s Validate API', () => {
      const request = service.createHttpGet<LetsValidateThumbsParams, LetsValidateThumbsJson>(
        'https://api.letsvalidate.com/v1/thumbs',
        {
          output: 'json',
          url: 'chan4077.github.io'
        }
      );
      request.subscribe(result => {
        expect(result).not.toBeNull();
        expect(result.mime_type).toEqual('image/jpeg');
        // Note that the base64 data may change, so we'll not check if the base64 data
        // is equal to the expected value
      });
    });
  });
  // TODO: Add more tests
});
