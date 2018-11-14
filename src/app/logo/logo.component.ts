import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
  <div class="caption" [ngStyle]="{ 'font-size': size }">Efficient<br>BINGO</div>
  `
})
export class LogoComponent implements OnInit {

  @Input() size: string;

  constructor() { }

  ngOnInit() {
  }

}
