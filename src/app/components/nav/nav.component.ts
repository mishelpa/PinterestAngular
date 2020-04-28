import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public title: string;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Pinterest <L>';
  }

}
