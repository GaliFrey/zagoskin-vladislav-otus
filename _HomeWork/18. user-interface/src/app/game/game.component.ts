import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words.service';
import { WordsGame } from '../words/word';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  lang: string;
  nof: number;
  words: WordsGame[];
  i = 0;
  translate = '';
  result = 0;
  endGame = false;
  isDone = false;
  hintStyle = 'alert none';
  hintText = '';

  constructor(private wordsService: WordsService) {
  }

  ngOnInit() {
    this.wordsService.getWordsGame().subscribe(data => {
      this.lang = data.lang;
      this.nof = data.nof;
      this.words = data.words;
    });
  }

  checkTranslate(value: string) {
    // TODO отставил 1 кнопку, нужно первое нажатие проверять, на 2 переходить к следующеу слову
    if (this.isDone) {
      this.isDone = false;
      this.hintStyle = 'alert none';
      this.hintText = '';
      if (!this.endGame) {
        this.i++;
      }
    } else {
      if (value !== '') {
        if (this.words[this.i].translate.indexOf(value) !== -1) {
          this.words[this.i].result = true;
          this.hintStyle = 'alert green';
          this.hintText = this.words[this.i].translate.join(', ');
        } else {
          this.hintStyle = 'alert red';
          this.hintText = this.words[this.i].translate.join(', ');
        }

        this.translate = '';
        this.isDone = true;
      } else {
        return;
      }

      this.getResult();
      this.checkEndGame();
    }
  }

  getResult() {
    this.result = this.words.filter(word => word.result).length;
  }

  checkEndGame() {
    if (this.i >= this.words.length - 1) {
      this.endGame = true;
    }
  }
}
