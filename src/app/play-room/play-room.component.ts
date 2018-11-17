import { Component, OnInit } from '@angular/core';
import { BingoService, PresentService } from '../_service/draw.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-room',
  providers: [BingoService, PresentService],
  templateUrl: './play-room.component.html',
  styleUrls: ['./play-room.component.scss']
})
export class PlayRoomComponent implements OnInit {

  constructor(
    private bingoService: BingoService,
    private presentService: PresentService,
    private route: Router
  ) {
  }

  ngOnInit() {
  }

  gotoLanding() {
    this.route.navigate(['efficientbingo']);
  }

  beginDraw() {
    this.bingoService.beginDraw();
  }
}
