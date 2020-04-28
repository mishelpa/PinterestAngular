import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogInterceptorService } from './log-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

describe('LogInterceptorService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LogInterceptorService,
          multi: true
        },
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an clientId param', () => {
    service.getListPhotos(3).subscribe( response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock
    .expectOne('https://api.unsplash.com/photos?page=3&per_page=20&client_id=y9xkxSl71A-5hTo2N_Dn8gbNqCU-UjRY0Y_yNyq3QHQ');
    expect(httpRequest.request.params.has('client_id')).toEqual(true);
  });
});
