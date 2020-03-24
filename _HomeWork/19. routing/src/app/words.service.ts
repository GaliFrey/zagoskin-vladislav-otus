import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { distinctUntilKeyChanged, filter, map, mergeMap, toArray } from 'rxjs/operators';
import { log } from 'util';
import { StorageService } from './storage.service';
import { TranslateService } from './translate.service';
import { Word } from './words/word';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  private result = {
    lang: '',
    nof: null,
    words: [],
  };

  constructor(
    private storageService: StorageService,
    private translateService: TranslateService) {
  }

  getWords(): Observable<Word[]> {
    return of(this.storageService.getWords());
  }

  deleteWords(word) {
    return of(this.storageService.getWords()).pipe(
      map(data => {
        return data.filter(item => item.word !== word);
      }),
      map(data => {
        this.storageService.setWords(data);
        return data;
      }),
    );
  }

  addWords(listWords) {
    const wordList = listWords.split('\n').filter(item => item.trim() !== '');
    const storageWords = this.storageService.getWords();

    return from(wordList).pipe(
      mergeMap(word => this.translateService.getTranslate('ru-en', word)),
      filter(data => data['def'].length !== 0),
      map(val => {
        const data = val['def'][0];
        const word: string = data.text;
        const translate: string[] = data.tr.map(item => item.text.toLowerCase()).slice(0, 3);
        return { word, translate };
      }),
      distinctUntilKeyChanged('word'),
      toArray(),
      map(data => {
        data.map(item => {
          const isMatch = storageWords.find(elem => elem.word === item.word);
          if (!isMatch) {
            storageWords.push({
              word: item.word,
              translate: item.translate.slice(0, 3).map(i => i.toLowerCase()),
            });
          }
        });
        return storageWords;
      }),
      map(data => {
        this.storageService.setWords(data);
      }),
    );
  }

  getWordsGame() {
    return forkJoin([
      of(this.storageService.getWords()),
      of(this.storageService.getSettings()),
    ]).pipe(
      map(data => {
        console.log(data);
        this.result.lang = data[1]['lang'];
        this.result.nof = data[1]['nof'];

        while (data[0].length < this.result.nof && data[0].length !== 0) {
          data[0] = [...data[0], ...data[0]];
        }

        this.result.words = this.shuffle(data[0])
          .slice(0, this.result.nof)
          .map(word => Object.assign({}, word, { result: false }));
        return this.result;
      }),
    );
  }

  shuffle(arr) {
    let j;
    let temp;

    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }

    return arr;
  }
}
