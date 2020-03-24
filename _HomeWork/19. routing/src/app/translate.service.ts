import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) {
  }

  getTranslate(type, text) {
    const params = new HttpParams()
      .set('key', 'dict.1.1.20200302T091107Z.e2af79c936815059.394f8e030920848e049fb80154c0073ff8b25f9e')
      .set('lang', type)
      .set('text', text);

    return this.http.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup', {params});
  }
}
