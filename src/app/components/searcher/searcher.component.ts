import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  collection = new FormControl('');
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getCollectionbyInput(event) {
    this.authService.changeInputValue(this.collection.value);
    if (this.collection.value === '') {
      this.authService.getListPhotos(1)
      .subscribe(response => {
        this.authService.changeString(response);
      });
    } else {
    this.authService.getCollection(1, event.target.value).subscribe(response => {
      this.authService.changeString(response['results']);
    });
    }
  }
}
