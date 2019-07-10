import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

// tslint:disable-next-line: no-inferrable-types
  title: string = 'App Angular';

  constructor() { }

  ngOnInit() {
  }

}
