import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get photo by id', () => {
    const http = TestBed.inject(HttpTestingController);
    let photoResponse;
    service.getPhotoById('123').subscribe((response) => {
      photoResponse = response;
    });
    http.expectOne('https://api.unsplash.com/photos/123').flush('infoPhoto');
    expect(photoResponse).toEqual('infoPhoto');
  });

  it('should get collection of photos', () => {
    const http = TestBed.inject(HttpTestingController);
    let collectionResponse;
    service.getCollection(1, 'carro').subscribe((response) => {
      collectionResponse = response;
    });
    http.expectOne('https://api.unsplash.com/search/photos/?page=´1´&per_page=20&order_by=latest&query=carro').flush('infoCollection');
    expect(collectionResponse).toEqual('infoCollection');
  });
});
