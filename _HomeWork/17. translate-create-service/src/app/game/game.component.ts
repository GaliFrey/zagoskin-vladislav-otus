import {Component, OnInit} from '@angular/core';
import {TranslateService} from '../translate.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
  }


  checkTranslate(value: string) {
    if (!value) {
      return;
    }

    this.translate.getTranslate('ru-en', value)
      .subscribe(data => console.log(data));
  }
}
