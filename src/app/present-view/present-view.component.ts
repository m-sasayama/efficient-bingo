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
  backIndexs: string[];

  presentList: PresentPanelInfo[];
  presentCount: number;

  beforePresent: number;
  beforeRight: string;

  private subscriptions: Subscription[];
  private reelAnime: AnimationPlayer;

  constructor(
    private settingService: SettingService,
    private presentService: PresentService,
    private _builder: AnimationBuilder
  ) {

    this.presentList = this.settingService.getPresentPanelInfo();
    this.presentCount = this.presentList.length;

    this.backIndexs = new Array<string>();
    this.frontIndexs = new Array<string>();
    this.subscriptions = new Array<Subscription>();
    this.previewMode = true;
    this.beforePresent = 0;
    this.beforeRight = '0vw';

    // アニメーション用のプレゼント情報をダミー配列に格納
    if (this.presentList.length > 0) {
      for (let i = 0, end = 2; i < end; i++) {
        this.frontIndexs.push(String(i));
      }
      for (let i = this.presentCount - 2, end = this.presentCount; i < end; i++) {
        this.backIndexs.push(String(i));
      }
    }

    this.subscriptions.push(
      this.presentService.onBeginDraw.subscribe((message) => {

        // プレビューモードを解除
        this.previewMode = false;

        if (this.reelAnime) {
          // this.reelAnime.reset();
          this.reelAnime.destroy();
        }

        // 抽選結果を取得
        const result = this.presentService.drawNumber();
        console.log('present result: %s', result);
        let offset: number;

        // アニメーションの移動量を計算
        offset = (result - 1 - this.beforePresent) * 20.2;

        // アニメーションをつけるHTML要素を取得
        const reelDiv = document.getElementById('reelDiv');

        // アニメーションの定義を作成
        const reelAnimation = this._builder.build([
          style({ right: this.beforeRight }),
          animate(
            '3s ease-in-out',
            style({
              right: offset + 'vw'
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
        this.beforeRight = offset + 'vw';
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
