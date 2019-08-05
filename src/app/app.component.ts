///<reference path="../../node_modules/@angular/platform-browser/src/security/dom_sanitization_service.d.ts"/>
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HomeRental.inc';
  desc = 'Holiday Home Rental';
  constructor() {}
}
