import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosListComponent } from './photos-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosListComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get next photos if input is empty', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'getListPhotos').and.returnValue(of('listPhotos'));
    component.post();
    expect(component.arrPhotos).toEqual('listPhotos');
  });

  it('should decrease length of array', () => {
    component.arrPhotos.length = 40;
    component.onScrollUp();
    expect(component.arrPhotos.length).toEqual(20);
  });

  it('should keep length of array', () => {
    component.arrPhotos.length = 20;
    component.onScrollUp();
    expect(component.arrPhotos.length).toEqual(20);
  });

  it('should increase length of array', () => {
    component.arrPhotos.length = 40;
    component.inputValue = '';
    component.postNext();
    expect(component.arrPhotos.length).toEqual(40);
  });

  it('should get next photos if input is empty', () => {
    const authService = TestBed.inject(AuthService);
    component.inputValue = '';
    component.arrPhotos.length = 40;
    spyOn(authService, 'getListPhotos').and.returnValue(of({id: '123'}));
    component.postNext();
    expect(component.arrPhotos.length).toEqual(41);
  });

  it('should get next photos if input have value', () => {
    const authService = TestBed.inject(AuthService);
    component.inputValue = 'car';
    component.arrPhotos.length = 40;
    spyOn(authService, 'getCollection').and.returnValue(of({id: '123'}));
    component.postNext();
    expect(component.arrPhotos.length).toEqual(41);
  });

  it('should increase length of array and input', () => {
    component.arrPhotos.length = 40;
    component.inputValue = 'car';
    component.postNext();
    expect(component.arrPhotos.length).toEqual(40);
  });

  it('should postNext to have been called', () => {
    spyOn(component, 'postNext').and.callThrough();
    component.onScrollDown();
    expect(component.postNext).toHaveBeenCalled();
  });

  it('should info of photo', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'getPhotoById').and.returnValue(of('info'));
    component.saveIdPhoto('123');
    expect(component.infoPhoto).toEqual('info');
  });
});
