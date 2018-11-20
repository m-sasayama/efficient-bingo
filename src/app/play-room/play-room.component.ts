import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BingoService, PresentService } from '../_service/draw.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-room',
  providers: [BingoService, PresentService],
  animations: [
    trigger('drawing', [
      state('active', style({ transform: 'rotate(360deg)' })),
      state('inactive', style({ transform: 'rotate(0deg)' })),
      transition('active => inactive', [animate('0.1s')]),
      transition('inactive => active', [animate('3s')]),
    ])
  ],
  templateUrl: './play-room.component.html',
  styleUrls: ['./play-room.component.scss']
})
export class PlayRoomComponent implements OnInit {

  private subscriptions: Subscription[];

  isDrawing = false;
  toggleTheme = true;
  drawn = '';
  untilEnd = '';

  constructor(
    private bingoService: BingoService,
    private presentService: PresentService,
    private route: Router
  ) {
    this.subscriptions = new Array<Subscription>();

    this.drawn = ('  ' + this.bingoService.getDrawnList().length).slice(-2);
    this.untilEnd = ('  ' + this.bingoService.getUntilEnd()).slice(-2);

    this.subscriptions.push(
      this.bingoService.onDrawn.subscribe((message) => {
        this.isDrawing = false;
        this.drawn = ('  ' + this.bingoService.getDrawnList().length).slice(-2);
        this.untilEnd = ('  ' + this.bingoService.getUntilEnd()).slice(-2);
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  gotoLanding() {
    this.route.navigate(['efficientbingo']);
  }
  gotoBingo() {
    this.drawn = ('  ' + this.bingoService.getDrawnList().length).slice(-2);
    this.untilEnd = ('  ' + this.bingoService.getUntilEnd()).slice(-2);

    this.toggleTheme = true;
    this.route.navigate(['efficientbingo/playroom/bingo']);
  }
  gotoPresent() {
    this.drawn = ('  ' + this.presentService.getDrawnList().length).slice(-2);
    this.untilEnd = ('  ' + this.presentService.getUntilEnd()).slice(-2);

    this.toggleTheme = false;
    this.route.navigate(['efficientbingo/playroom/present']);
  }

  beginDraw() {
    if (!this.isDrawing) {
      this.isDrawing = true;
      this.bingoService.beginDraw();
    }
  }
}
