import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words.service';
import { Word } from './word';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
})
export class WordsComponent implements OnInit {
  showFormAdd = false;
  loader = false;
  listWords = '';
  words: Word[];

  constructor(
    private wordService: WordsService,
  ) {
  }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords()
      .subscribe(words => this.words = words);
  }

  deleteWord(word: string) {
    this.wordService.deleteWords(word)
      .subscribe(() => this.getWords());
  }

  addWords() {
    this.loader = true;
    this.wordService.addWords(this.listWords)
      .subscribe(() => {
        this.getWords();
        this.loader = false;
        this.listWords = '';
      });
  }
}
