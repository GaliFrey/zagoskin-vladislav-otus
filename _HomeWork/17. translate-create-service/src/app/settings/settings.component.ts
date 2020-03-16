import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  languages: string[];
  numberOfWords: number[];
  lang: string;
  nof: number;

  constructor(
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getSettings()
      .subscribe(data => {
        this.languages = data.languages;
        this.numberOfWords = data.numberOfWords;
        this.lang = data.lang;
        this.nof = data.nof;
      });
  }

  setSettings() {
    const settings = { lang: this.lang, nof: this.nof };
    this.settingsService.setSettings(settings)
      .subscribe(() => this.getSettings());
  }
}
