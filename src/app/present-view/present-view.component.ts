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

  presentList: PresentPanelInfo[];
  dummyList: PresentPanelInfo[];

  previewMode: boolean;

  presentCount: number;

  private subscriptions: Subscription[];
  private reelAnime: AnimationPlayer;

  constructor(
    private settingService: SettingService,
    private presentService: PresentService,
    private _builder: AnimationBuilder
  ) {

    this.presentList = this.settingService.getPresentPanelInfo();
    this.presentCount = this.presentList.length;
    this.dummyList = new Array<PresentPanelInfo>();
    this.subscriptions = new Array<Subscription>();
    this.previewMode = true;


    // アニメーション用のプレゼント情報をダミー配列に格納
    if (this.presentList.length > 0) {
      for (let i = 0, max = 7; i < max; i++) {
        this.dummyList.push(this.presentList[i]);
      }
    }

    this.subscriptions.push(
      this.presentService.onBeginDraw.subscribe((message) => {

        // プレビューモードを解除
        this.previewMode = false;

        if (this.reelAnime) {
          this.reelAnime.reset();
          this.reelAnime.destroy();
        }

        // 抽選結果を取得
        const result = this.presentService.drawNumber();
        console.log('present result: %s', result);
        let offset: number;

        // アニメーションの移動量を計算
        if (result >= 6) {
          offset = (result - 3) * 20.2;
        } else {
          offset = (this.presentCount + result - 3) * 20.2;
        }

        // アニメーションをつけるHTML要素を取得
        const reelDiv = document.getElementById('reelDiv');

        // アニメーションの定義を作成
        const reelAnimation = this._builder.build([
          style({ right: '0vw' }),
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
      })
    )
  }

  ngOnInit() {
    // // アニメーションをつけるHTML要素を取得
    // const reelDiv = document.getElementById('reelDiv');
    // console.log('is get? ->', reelDiv);
    // // アニメーションの定義を作成
    // const reelAnimation = this._builder.build([
    //   style({ right: '0vw' }),
    //   animate(
    //     3000,
    //     style({
    //       right: (this.presentCount * 20.2) + 'vw'
    //     }))
    // ]);
    // // 作成したアニメーションと取得した要素を紐づけ
    // this.reelAnime = reelAnimation.create(reelDiv);
    // const onDoneFunc = () => {
    //   this.reelAnime.reset();
    //   this.reelAnime.onDone(() => {
    //     onDoneFunc();
    //   })
    //   this.presentService.drawn();
    // }
    // this.reelAnime.onDone(onDoneFunc);
  }

  ngOnDestroy() {
    // onBeginDrawのsubscribeを解除
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
