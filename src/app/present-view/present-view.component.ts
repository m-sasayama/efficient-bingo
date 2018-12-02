import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationBuilder, style, animate, AnimationPlayer } from '@angular/animations';
import { SettingService } from '../_service/setting.service';
import { PresentPanelInfo } from '../_object/PresentModel';
import { PresentService } from '../_service/draw.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-present-view',
  templateUrl: './present-view.component.html',
  styleUrls: ['./present-view.component.scss']
})
export class PresentViewComponent implements OnInit, OnDestroy {

  previewMode: boolean;

  frontIndexs: string[];
  indexList: string[];
  backIndexs: string[];

  presentList: PresentPanelInfo[];
  presentCount: number;

  beforeResult: number;

  private subscriptions: Subscription[];
  private reelAnime: AnimationPlayer;
  private pointGroup1: {};
  private pointGroup2: {};

  constructor(
    private presentService: PresentService,
    private _builder: AnimationBuilder
  ) {

    this.presentList = this.presentService.getPresentPanelInfo();
    this.presentCount = this.presentService.getPresentCount();

    this.backIndexs = new Array<string>();
    this.frontIndexs = new Array<string>();
    this.indexList = new Array<string>();

    this.subscriptions = new Array<Subscription>();
    this.previewMode = true;

    this.pointGroup1 = {};
    this.pointGroup2 = {};
    this.beforeResult = 1;

    // アニメーション用のプレゼント情報をダミー配列に格納
    if (this.presentList.length > 0) {
      for (let i = 0, end = 2; i < end; i++) {
        this.frontIndexs.push(String(i));
      }
      for (let i = this.presentCount - 2, end = this.presentCount; i < end; i++) {
        this.backIndexs.push(String(i));
      }
      for (let i = 0, end = this.presentCount; i < end; i++) {
        this.indexList.push(String(i));
      }

      for (let i = 0, end = this.presentCount * 2; i < end; i++) {
        let caseNo = Math.floor(i / this.presentCount);
        let index = 0;
        switch (caseNo) {
          case 0:
            index = i + 1;
            this.pointGroup1[index] = (i * 20.2) + 'vw';
            break;
          case 1:
            index = i % this.presentCount + 1;
            this.pointGroup2[index] = (i * 20.2) + 'vw';
            break;
          default:
            break;
        }
      }
      debugger;
    }

    this.subscriptions.push(
      this.presentService.onBeginDraw.subscribe((message) => {

        // プレビューモードを解除
        this.previewMode = false;
        // アニメーションをつけるHTML要素を取得
        const reelDiv = document.getElementById('reelDiv');

        if (this.reelAnime) {
          this.reelAnime.destroy();
        }

        // 抽選結果を取得
        const result = this.presentService.drawNumber();
        console.log('draw result: %s', result);

        let offsetBgn: string;
        let offsetEnd: string;
        if (result > this.beforeResult) {
          offsetBgn = this.pointGroup1[this.beforeResult];
          offsetEnd = this.pointGroup2[result];
        } else {
          offsetBgn = this.pointGroup2[this.beforeResult];
          offsetEnd = this.pointGroup1[result];
        }

        // アニメーションの定義を作成
        const reelAnimation = this._builder.build([
          style({ right: offsetBgn }),
          animate(
            '3s ease-in-out',
            style({
              right: offsetEnd
            }))
        ]);

        // 作成したアニメーションと取得した要素を紐づけ
        this.reelAnime = reelAnimation.create(reelDiv);

        // アニメーションが終了した後の処理を設定
        this.reelAnime.onDone(() => {
          this.presentList[result - 1].isDrawn = true;
          if (this.presentList[result - 1].isSecret) {
            this.presentList[result - 1].isSecret = false;
          }
          this.presentService.drawn();
        });

        // アニメーションの開始
        this.reelAnime.play();
        this.beforeResult = result;
      })
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // onBeginDrawのsubscribeを解除
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
