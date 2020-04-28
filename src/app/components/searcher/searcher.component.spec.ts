import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearcherComponent } from './searcher.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcherComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changeInputValue to have been called', () => {
    component.collection.setValue('car');
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'changeInputValue').and.callThrough();
    component.getCollectionbyInput({target: { value: 'car'}});
    expect(authService.changeInputValue).toHaveBeenCalled();
  });

  it('should getListPhotos to have been called if collection is empty', () => {
    component.collection.setValue('');
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'getListPhotos').and.returnValue(of('listAllPhotos'));
    component.getCollectionbyInput({target: { value: ''}});
    expect(authService.changeString).toBeTruthy();
  });

  it('should getCollection to have been called if collection have value', () => {
    component.collection.setValue('car');
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'getCollection').and.returnValue(of('listAllPhotos'));
    component.getCollectionbyInput({target: { value: 'car'}});
    expect(authService.changeString).toBeTruthy();
  });

});
