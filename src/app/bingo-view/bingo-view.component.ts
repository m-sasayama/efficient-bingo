import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BingoService } from '../_service/draw.service';
import { PanelViewModel } from '../_object/PanelViewModel';
import { BingoPanelColor } from '../_object/ColorSet';
import { BingoPanelSize } from '../_object/FontSize';
import { Subscription } from 'rxjs';

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
  panelCount = 3;
  topViews: PanelViewModel[];
  bottomViews: PanelViewModel[];

  groupBViews: PanelViewModel[];
  groupIViews: PanelViewModel[];
  groupNViews: PanelViewModel[];
  groupGViews: PanelViewModel[];
  groupOViews: PanelViewModel[];

  private subscriptions: Subscription[];

  constructor(
    private bingoService: BingoService
  ) {
    this.subscriptions = new Array<Subscription>();
    this.subscriptions.push(
      this.bingoService.onBeginDraw.subscribe((message) => {
        this.isLeftOpen = true;
      })
    );

    this.topViews = [{
      fontSize: BingoPanelSize.Large,
      colorSet: BingoPanelColor.Default
    }, {
      fontSize: BingoPanelSize.Large,
      colorSet: BingoPanelColor.Default
    }, {
      fontSize: BingoPanelSize.Large,
      colorSet: BingoPanelColor.Default
    }];

    this.bottomViews = new Array<PanelViewModel>();

    this.groupBViews = new Array<PanelViewModel>();
    this.groupIViews = new Array<PanelViewModel>();
    this.groupNViews = new Array<PanelViewModel>();
    this.groupGViews = new Array<PanelViewModel>();
    this.groupOViews = new Array<PanelViewModel>();

    for (let i = 1, max = 75; i <= max; i++) {
      switch (Math.floor((i - 1) / 15)) {
        case 0:
          this.groupBViews.push({
            drawnNum: String(i),
            fontSize: BingoPanelSize.Small,
            colorSet: BingoPanelColor.Remain
          });
          break;
        case 1:
          this.groupIViews.push({
            drawnNum: String(i),
            fontSize: BingoPanelSize.Small,
            colorSet: BingoPanelColor.Remain
          });
          break;
        case 2:
          this.groupNViews.push({
            drawnNum: String(i),
            fontSize: BingoPanelSize.Small,
            colorSet: BingoPanelColor.Remain
          });
          break;
        case 3:
          this.groupGViews.push({
            drawnNum: String(i),
            fontSize: BingoPanelSize.Small,
            colorSet: BingoPanelColor.Remain
          });
          break;
        case 4:
          this.groupOViews.push({
            drawnNum: String(i),
            fontSize: BingoPanelSize.Small,
            colorSet: BingoPanelColor.Remain
          });
          break;
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  switchView() {
    this.isLeftOpen = !this.isLeftOpen;

    if (!this.isLeftOpen) {
      this.bingoService.getDrawnList().forEach((drawnNum) => {
        const viewCase = Math.floor((drawnNum - 1) / 15);
        const viewIdx = (drawnNum - 1) % 15;
        switch (viewCase) {
          case 0:
            this.groupBViews[viewIdx].colorSet = BingoPanelColor.GroupB;
            break;
          case 1:
            this.groupIViews[viewIdx].colorSet = BingoPanelColor.GroupI;
            break;
          case 2:
            this.groupNViews[viewIdx].colorSet = BingoPanelColor.GroupN;
            break;
          case 3:
            this.groupGViews[viewIdx].colorSet = BingoPanelColor.GroupG;
            break;
          case 4:
            this.groupOViews[viewIdx].colorSet = BingoPanelColor.GroupO;
            break;
        }
      });
    }
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
        colorSet: BingoPanelColor.Default
      });
    } else if (4 <= this.panelCount && this.panelCount <= 6) {
      this.bottomViews.push({
        fontSize: BingoPanelSize.Middle,
        colorSet: BingoPanelColor.Default
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
