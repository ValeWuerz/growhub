import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
icons: Array<string>=["testen","nochmal","f","de","sd"]
  constructor() { }

  ngOnInit() {
  }

}
