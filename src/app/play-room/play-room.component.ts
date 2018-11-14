import { Component, OnInit } from '@angular/core';
import { BingoService, PresentService } from '../_service/draw.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-play-room',
  providers: [BingoService, PresentService],
  animations: [
    trigger('panelSwitch', [
      state('open', style({
        width: '100vw',
        marginRight: '50px'
      })),
      state('close', style({
        width: '0px',
        marginRight: '0px'
      })),
      transition('open => close', [
        animate('0.5s')
      ]),
      transition('close => open', [
        animate('0.5s')
      ]),
      state('direction-left', style({
        transform: 'rotate(0deg)'
      })),
      state('direction-right', style({
        transform: 'rotate(180deg)'
      })),
      transition('direction-left => direction-right', [
        animate('0.2s')
      ]),
      transition('direction-right => direction-left', [
        animate('0.2s')
      ]),
    ])
  ],
  templateUrl: './play-room.component.html',
  styleUrls: ['./play-room.component.scss']
})
export class PlayRoomComponent implements OnInit {

  isLeftOpen = true;

  slotNum: number;
  private panelValues: number[];

  constructor(
    private bingoService: BingoService,
    private presentService: PresentService,
    private route: Router
  ) {
    this.panelValues = new Array<number>();
    for (let i = 0, max = 3; i < max; i++) {
      this.panelValues.push(1);
    }
  }

  ngOnInit() {
  }

  toggleView() {
    this.isLeftOpen = !this.isLeftOpen;
  }

  gotoLanding() {
    this.route.navigate(['bingo']);
  }
}
