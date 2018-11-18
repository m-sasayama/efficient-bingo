import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BingoService } from '../_service/draw.service'
import { Subscription } from 'rxjs';
import { ColorSet } from '../_object/ColorSet';

@Component({
  selector: 'app-digital-panel',
  templateUrl: './digital-panel.component.html',
  styleUrls: ['./digital-panel.component.scss']
})
export class DigitalPanelComponent implements OnInit {

  @Input() size: string;
  @Input() fbColor: string;
  @Input() bgColor: string;
  @Input() drawnNum: string;

  private displayValue: string;
  private randomDisplay;
  private subscriptions: Subscription[];

  constructor(
    private bingoService: BingoService
  ) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit() {

    this.displayValue = '--';

    if (!this.drawnNum) {
      this.subscriptions.push(
        this.bingoService.onBeginDraw.subscribe((message) => {
          // ランダムに数字を表示する
          this.randomDisplay = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            this.displayValue = ('00' + randomNumber).slice(-2);
          }, 50);
          // BingoServiceから番号を取得する
          const drawNumber = this.bingoService.drawNumber();
          console.log('draw Number: %s', drawNumber);
          // 数秒後にランダム表示を終了させて、BingoServiceから取得した番号を表示する
          setTimeout(() => {
            clearInterval(this.randomDisplay);
            if (drawNumber > 0) {
              this.displayValue = ('00' + drawNumber).slice(-2);
            } else {
              this.displayValue = '--';
            }
          }, 2000);
        })
      );
    } else {
      this.displayValue = ('00' + this.drawnNum).slice(-2);
    }
  }

  ngOnDestroy() {
    console.log('digital-panel destoryed.');
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
