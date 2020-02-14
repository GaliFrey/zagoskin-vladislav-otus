import {Component, OnInit} from '@angular/core';

interface Word {
  id: number;
  word: string;
  translate: string;
}

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit{
  words: Word[] = [
    {id: 0, word: "to apply", translate: "добавлять"},
    {id: 1, word: "education", translate: "образование"},
    {id: 2, word: "to go", translate: "идти"},
    {id: 3, word: "car", translate: "автомобиль"}
  ];

  constructor() { }
  ngOnInit() { }
}


