import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent {
  @Input() words;

  @Output() addWordParent = new EventEmitter();
  @Output() deleteWordParent = new EventEmitter();

  deleteWord(id) {
    this.deleteWordParent.emit(id);
  }

  addWord() {
    this.addWordParent.emit();
  }
}


