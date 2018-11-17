import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BingoService } from '../_service/draw.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-digital-panel',
  templateUrl: './digital-panel.component.html',
  styleUrls: ['./digital-panel.component.scss']
})
export class DigitalPanelComponent implements OnInit {

  @Input() size: string;
  @Input() color: string;

  private displayValue: string;
  private randomDisplay;
  private subscriptions: Subscription[];

  constructor(
    private bingoService: BingoService
  ) {
    this.subscriptions = new Array<Subscription>();
    this.subscriptions.push(
      this.bingoService.onBeginDraw.subscribe((message) => {

        const drawNumber = this.bingoService.drawNumber(1)[0];
        console.log('draw Number: %s', drawNumber);

        // ランダムに数字を表示する
        this.randomDisplay = setInterval(() => {
          const randomNumber = Math.floor(Math.random() * 100);
          this.displayValue = ('00' + randomNumber).slice(-2);
        }, 50);

        // 3秒後にランダム表示を終了させて、BingoServiceから番号を取得する
        setTimeout(() => {
          clearInterval(this.randomDisplay);
          this.displayValue = ('00' + drawNumber).slice(-2);
        }, 3000);

      })
    );
  }

  ngOnInit() {
    this.displayValue = '00';
  }

  ngOnDestroy() {
    console.log('digital-panel destoryed.');
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
