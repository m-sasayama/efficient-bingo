import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { PanelViewModel } from '../_object/PanelViewModel';
import { BingoPanelColor } from '../_object/Color';
import { BingoPanelSize } from '../_object/FontSize';

@Component({
  selector: 'app-bingo-view',
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
  templateUrl: './bingo-view.component.html',
  styleUrls: ['./bingo-view.component.scss']
})
export class BingoViewComponent implements OnInit {

  isLeftOpen = true;
  panelCount = 1;
  topViews: PanelViewModel[];
  bottomViews: PanelViewModel[];

  constructor() {
    this.topViews = new Array<PanelViewModel>();
    this.bottomViews = new Array<PanelViewModel>();

    this.topViews.push({
      fontSize: BingoPanelSize.XXLarge,
      color: BingoPanelColor.Default
    });
  }

  ngOnInit() {
  }

  switchView() {
    this.isLeftOpen = !this.isLeftOpen;
  }

  plusPanel() {
    if (this.panelCount < 6) {
      this.panelCount++;
    } else {
      return;
    }

    if (1 <= this.panelCount && this.panelCount <= 3) {
      this.topViews.push({
        fontSize: BingoPanelSize.Large,
        color: BingoPanelColor.Default
      });
    } else if (4 <= this.panelCount && this.panelCount <= 6) {
      this.bottomViews.push({
        fontSize: BingoPanelSize.Middle,
        color: BingoPanelColor.Default
      });
    }

    this.changeFontSize();
  }

  minusPanel() {
    if (1 < this.panelCount && this.panelCount <= 3) {
      this.topViews.pop();
    } else if (4 <= this.panelCount && this.panelCount <= 6) {
      this.bottomViews.pop();
    }

    if (this.panelCount > 1) {
      this.panelCount--;
    } else {
      return;
    }

    this.changeFontSize();
  }

  private changeFontSize() {
    let tmpFontSize = '';

    switch (this.panelCount) {
      case 1:
        tmpFontSize = BingoPanelSize.XXLarge;
        break;
      case 2:
        tmpFontSize = BingoPanelSize.XLarge;
        break;
      case 3:
        tmpFontSize = BingoPanelSize.Large;
        break;
      default:
        tmpFontSize = BingoPanelSize.Middle;
        break;
    }

    this.topViews.forEach(function (viewModel) {
      viewModel.fontSize = tmpFontSize;
    });
    this.bottomViews.forEach(function (viewModel) {
      viewModel.fontSize = tmpFontSize;
    });
  }

}
