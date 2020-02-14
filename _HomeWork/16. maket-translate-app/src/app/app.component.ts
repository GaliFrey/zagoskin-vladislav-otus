import { Component } from '@angular/core';

interface Word {
  word: string;
  translate: string;
}

interface WordEntry extends Word{
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  words: WordEntry[] = [
    {id: 0, word: "to apply", translate: "добавлять"},
    {id: 1, word: "education", translate: "образование"},
    {id: 2, word: "to go", translate: "идти"},
    {id: 3, word: "car", translate: "автомобиль"}
  ];

  addWordParent($event: Word) {
    this.words.push({
      id: this.words.length,
      word: 'test',
      translate: 'test-translate'
    })
  }

  deleteWordParent(id: number) {
    this.words = this.words.filter(word => word.id !== id);
  }

}
