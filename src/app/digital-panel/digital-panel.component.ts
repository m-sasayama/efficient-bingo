import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-digital-panel',
  templateUrl: './digital-panel.component.html',
  styleUrls: ['./digital-panel.component.scss']
})
export class DigitalPanelComponent implements OnInit {

  @Input() size: string;
  @Input() color: string;

  private displayValue: string;

  constructor() { }

  ngOnInit() {
    this.displayValue = '00';
  }

}
