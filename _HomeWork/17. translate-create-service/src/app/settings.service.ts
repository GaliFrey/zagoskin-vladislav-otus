import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService) {
  }

  getConfig() {
    return this.http.get('../assets/settings.json');
  }

  getSettings() {
    return of(this.storageService.getSettings());
  }

  setSettings(settings) {
    return of(this.storageService.setSettings(settings));
  }
}
