import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

interface Options {
  languages: string[];
  numberOfWords: number[];
  lang: string;
  nof: number;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private options: Options = {
    languages: null,
    numberOfWords: null,
    lang: null,
    nof: null
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService) {
  }

  getSettings() {
    return forkJoin([
      this.http.get('../assets/settings.json'),
      of(this.storageService.getSettings()),
    ]).pipe(
      map(data => {
        this.options.languages = data[0]['languages'];
        this.options.numberOfWords = data[0]['numberOfWords'];
        this.options.lang = data[1]['lang'];
        this.options.nof = data[1]['nof'];

        if (!this.options.lang || this.options.languages.indexOf(this.options.lang) === -1) {
          this.options.lang = this.options.languages.slice(0, 1).toString();
        }

        if (!this.options.nof || this.options.numberOfWords.indexOf(this.options.nof) === -1) {
          this.options.nof = +this.options.numberOfWords.slice(0, 1);
        }

        this.setSettings({ lang: this.options.lang, nof: this.options.nof });
        return this.options;
      }),
    );

  }

  setSettings(settings) {
    return of(this.storageService.setSettings(settings));
  }
}
