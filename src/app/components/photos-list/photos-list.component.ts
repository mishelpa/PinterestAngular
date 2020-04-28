import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {

  arrPhotos: any[];
  infoPhoto: any;
  inputValue: string;
  constructor( private authService: AuthService) {
    this.authService.currentQueryString.subscribe( (response) => {
      this.arrPhotos = response;
    });
    this.authService.currentInputValue.subscribe( (response) => {
      this.inputValue = response;
    });
  }

  ngOnInit(): void {
    this.post();
  }

  post() {
    this.authService.getListPhotos(1)
    .subscribe(response => {
      this.arrPhotos = response;
    });
  }

  postNext() {
    const numPage = (this.arrPhotos.length / 20) + 1;
    if (this.inputValue === '') {
      this.authService.getListPhotos(numPage)
      .subscribe(response => {
        this.arrPhotos = this.arrPhotos.concat(response);
      });
    } else {
      this.authService.getCollection(numPage, this.inputValue).subscribe(response => {
        this.arrPhotos = this.arrPhotos.concat(response['results']);
      });
    }
  }

  onScrollDown() {
    this.postNext();
  }

  onScrollUp() {
    if (this.arrPhotos.length >= 40) {
      this.arrPhotos.length = this.arrPhotos.length - 20;
    }
  }

  saveIdPhoto(id) {
    this.authService.getPhotoById(id).subscribe(data => {
      this.infoPhoto = data;
    });
  }
}
