import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

interface Settings {
  languages: string[];
  numberOfWords: number[];
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  languages: string[];
  numberOfWords: number[];
  saveLanguage: string;
  saveNumberOfWords: number;

  constructor(
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    this.settingsService.getConfig()
      .subscribe((data: Settings) => {
        this.languages = data.languages;
        this.numberOfWords = data.numberOfWords;
        this.getSettings();
      });
  }

  getSettings() {
    this.settingsService.getSettings()
      .subscribe(data => {
        if (!data || this.languages.indexOf(data.lang) === -1) {
          this.saveLanguage = this.languages.slice(0, 1).toString();
        } else {
          this.saveLanguage = data.lang;
        }

        if (!data || this.numberOfWords.indexOf(data.nof) === -1) {
          this.saveNumberOfWords = +this.numberOfWords.slice(0, 1);
        } else {
          this.saveNumberOfWords = +data.nof;
        }
      });
  }

  setSettings() {
    const settings = { lang: this.saveLanguage, nof: this.saveNumberOfWords };
    this.settingsService.setSettings(settings)
      .subscribe(() => this.getSettings());
  }
}
