import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
  <div class="caption"
    [ngStyle]="{
      'font-size': size,
      'padding': padding
    }"
  >Efficient<br>BINGO</div>
  `
})
export class LogoComponent implements OnInit {

  @Input() size: string;
  @Input() padding: string;

  constructor() { }

  ngOnInit() {
  }

}
