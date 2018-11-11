import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-menu',
  templateUrl: './landing-menu.component.html',
  styleUrls: ['./landing-menu.component.scss']
})
export class LandingMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  gotoBingo() {
    this.router.navigate(['bingo/playroom']);
  }

  gotoSetting() {
    this.router.navigate(['bingo/setting']);
  }

}
