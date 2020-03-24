import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localNameWord = 'otusTranslateApp_word';
  private localNameSettings = 'otusTranslateApp_settings';

  constructor() {
  }

  getWords() {
    return localStorage.getItem(this.localNameWord) ? JSON.parse(localStorage.getItem(this.localNameWord)) : [];
  }

  setWords(list) {
    localStorage.setItem(this.localNameWord, JSON.stringify(list));
  }

  getSettings() {
    return localStorage.getItem(this.localNameSettings) ? JSON.parse(localStorage.getItem(this.localNameSettings)) : { };
  }

  setSettings(settings) {
    localStorage.setItem(this.localNameSettings, JSON.stringify(settings));
  }
}
