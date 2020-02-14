import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  languages: Array<string> = [
    'English'
  ];

  countWords: Array<number> = [
    10,
    15,
    20,
  ];

  constructor() { }

  ngOnInit() {
  }

}
