import { Component } from '@angular/core';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  constructor(private translate: TranslateService) {
  }

  checkTranslate(value: string) {
    if (!value) {
      return;
    }

    this.translate.getTranslate('ru-en', value)
      .subscribe(data => console.log(data));
  }
}
