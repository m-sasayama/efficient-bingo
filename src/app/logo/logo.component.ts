import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
  <div class="caption {{ capSize }}">Efficient<br>BINGO</div>
  `
})
export class LogoComponent implements OnInit {

  @Input() capSize: string;

  constructor() { }

  ngOnInit() {
  }

}
