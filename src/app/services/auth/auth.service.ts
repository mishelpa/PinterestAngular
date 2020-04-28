import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlAPI: string;
  constructor( private http: HttpClient) {
    this.urlAPI = environment.apiURL;
  }

  queryString = new BehaviorSubject([]);
  currentQueryString = this.queryString.asObservable();

  inputValue = new BehaviorSubject('');
  currentInputValue = this.inputValue.asObservable();

  changeString(query) {
    this.queryString.next(query);
  }

  changeInputValue(input) {
    this.inputValue.next(input);
  }

  getListPhotos(page): Observable<any> {
    return this.http.get(`${this.urlAPI}photos?page=${page}&per_page=20`);
  }

  getPhotoById(id) {
    return this.http.get(`${this.urlAPI}photos/${id}`);
  }

  getCollection(page, value) {
    return this.http.get(`${this.urlAPI}search/photos/?page=´${page}´&per_page=20&order_by=latest&query=${value}`);
  }
}
