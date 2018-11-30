import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ImageFileInfo, PresentInfo } from '../_object/PresentModel';
import { SettingService } from '../_service/setting.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export interface DialogData {
  data: PresentInfo[]
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  panelCount = new FormControl();
  presentTitle = new FormControl();
  presentDesc = new FormControl();
  isSecret = new FormControl();

  imageFiles: ImageFileInfo[];
  presentList: PresentInfo[];
  nonSettings: string[];

  currentImage: ImageFileInfo;
  anchorPrefix: string = 'image';
  currentAnchor: number;

  constructor(
    private settingService: SettingService,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.imageFiles = this.settingService.getImageInfo();
    this.presentList = this.settingService.getPresentInfo();
    this.nonSettings = new Array<string>();
    for (const present of this.presentList) {
      if (!present.title) {
        this.nonSettings.push(present.fileName);
      }
    }
  }

  ngOnInit() {
    this.panelCount.setValue(this.settingService.getPanelCount());
  }

  handleChangeSetting(event, target: string) {

    switch (target) {
      case 'panelCount':
        this.settingService.setPanelCount(this.panelCount.value);
        break;

      case 'presentTitle':
        for (const present of this.presentList) {
          if (this.currentImage.name === present.fileName) {
            const errFlag = (!this.presentTitle.value);
            this.currentImage.isError = errFlag;
            this.currentImage.isSuccess = !errFlag;

            if (errFlag) {
              this.nonSettings.push(this.currentImage.name);
            } else {
              const idx = this.nonSettings.indexOf(this.currentImage.name);
              if (idx !== -1) {
                this.nonSettings.splice(idx, 1);
              }
            }

            present.title = this.presentTitle.value;
            break;
          }
        }
        break;
      case 'presentDesc':
        for (const present of this.presentList) {
          if (this.currentImage.name === present.fileName) {
            present.description = this.presentDesc.value;
            break;
          }
        }
        break;
      case 'isSecret':
        for (const present of this.presentList) {
          if (this.currentImage.name === present.fileName) {
            present.isSecret = this.isSecret.value;
            break;
          }
        }
        break;
      default:
        break;
    }
  }

  handleRegistFile(event) {

    this.imageFiles.splice(0, this.imageFiles.length);
    this.presentList.splice(0, this.presentList.length);
    this.nonSettings.splice(0, this.nonSettings.length);
    const files = event.target.files;

    this.presentTitle.disable();
    this.presentDesc.disable();
    this.isSecret.disable();

    for (let i = 0, f; f = files[i]; i++) {

      // 選択されたファイルが画像ファイルのみ次の処理へ
      if (!f.type.match('image.*')) { continue; }

      // ファイル名と画像データをセットで保持するオブジェクトを生成
      let readFileInfo: ImageFileInfo = {
        name: f.name,
        src: '',
        isCurrent: false,
        isSuccess: false,
        isError: false
      };

      // FileAPIの生成
      let reader = new FileReader();

      // 画像データ（バイナリデータ）の読み込み完了時の処理を登録
      reader.onload = (e) => {
        let fr: FileReader = e.target as FileReader;

        readFileInfo.src = fr.result as string;
        readFileInfo.isError = true;

        this.imageFiles.push(readFileInfo);
        this.presentList.push({
          fileName: readFileInfo.name,
          title: '',
          description: '',
          isSecret: false,
        });
        this.nonSettings.push(readFileInfo.name);
      }

      // 画像データ（バイナリデータ）の読み込み開始
      reader.readAsDataURL(f);
    }
  }

  handleRemoveImage(imgName) {
    const imgNames = this.imageFiles.map((img) => {
      return img.name;
    });
    const findIdx = imgNames.indexOf(imgName);
    this.imageFiles.splice(findIdx, 1);
    if (this.nonSettings.indexOf(imgName) !== -1) {
      this.nonSettings.splice(this.nonSettings.indexOf(imgName), 1);
    }
  }

  handleChangeCurrent(order: number) {
    const tmpAnchor = this.currentAnchor + order;
    const isChange = (0 < tmpAnchor) && (tmpAnchor <= this.imageFiles.length);
    if (isChange) {
      this.currentAnchor = tmpAnchor;
      location.hash = [this.anchorPrefix, this.currentAnchor].join('');
      this.handleSelectImage(this.imageFiles[this.currentAnchor - 1].name);
    }
  }

  handleSelectImage(imgName) {

    for (let i = 0, max = this.imageFiles.length; i < max; i++) {
      let img = this.imageFiles[i];
      if (imgName === img.name) {
        img.isCurrent = !img.isCurrent;
      } else {
        img.isCurrent = false;
      }
      if (img.name === imgName) {
        this.currentImage = img;
        this.currentAnchor = i + 1;
      }
    }

    this.presentTitle.enable();
    this.presentDesc.enable();
    this.isSecret.enable();

    for (const present of this.presentList) {
      if (imgName === present.fileName) {
        this.presentTitle.setValue(present.title);
        this.presentDesc.setValue(present.description);
        this.isSecret.setValue(present.isSecret);
        break;
      }
    }

    location.hash = [this.anchorPrefix, this.currentAnchor].join('');
  }

  gotoBingo() {
    this.settingService.setPanelCount(this.panelCount.value);

    const isEmpty = (this.presentList.length === 0) && (this.imageFiles.length === 0);
    const existNonSetting = (this.nonSettings.length > 0);
    const messages: string[] = new Array<string>();

    if (isEmpty) {
      messages.push('プレセント情報が設定されていません。本当に移動してよろしいですか？');
    } else {
      if (existNonSetting) {
        messages.push('「景品の名前」が設定されていないプレゼント情報があります。');
        messages.push('移動するとそのプレゼント情報は消えてしまいます。本当に移動してよろしいですか？');
      }
    }
    if (messages.length === 0) {
      this.route.navigate(['efficientbingo/playroom/bingo']);
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40vw',
      data: messages
    });

    dialogRef.afterClosed().subscribe((isOK) => {
      if (isOK) {

        for (const targetName of this.nonSettings) {
          for (let i = this.presentList.length - 1, end = 0; i >= end; i--) {
            if (this.presentList[i].fileName === targetName) {
              this.presentList.splice(i, 1);
            }
          }
          for (let i = this.imageFiles.length - 1, end = 0; i >= end; i--) {
            if (this.imageFiles[i].name === targetName) {
              this.imageFiles.splice(i, 1);
            }
          }
        }

        this.route.navigate(['efficientbingo/playroom/bingo']);
      }
    })

  }

  openDialog() {

    this.imageFiles.forEach((imgFile: ImageFileInfo, baseIdx: number) => {
      const presentNames = this.presentList.map((value) => {
        return value.fileName;
      });

      if (presentNames.indexOf(imgFile.name) === -1) {
        this.presentList.splice(baseIdx, 0, {
          fileName: imgFile.name,
          title: '',
          description: '',
          isSecret: false
        })
      }
    });

    const dialogRef = this.dialog.open(PresentSettingDialog, {
      width: '30vw',
      data: { data: this.presentList }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == null) {
        return;
      }

      const tmpPresentList: PresentInfo[] = JSON.parse(result);

      for (const tmpPresent of tmpPresentList) {
        for (const present of this.presentList) {
          if (present.fileName === tmpPresent.fileName) {

            present.title = tmpPresent.title;
            present.description = tmpPresent.description;
            present.isSecret = tmpPresent.isSecret;

            const findIdx = this.nonSettings.indexOf(tmpPresent.fileName);
            if (findIdx !== -1 && tmpPresent.title) {
              this.nonSettings.splice(findIdx, 1);
            }

            for (const img of this.imageFiles) {
              if (img.name === tmpPresent.fileName && tmpPresent.title) {
                img.isSuccess = true;
                img.isError = false;
                break;
              }
            }
            break;
          }
        }
      }
    });
  }
}


@Component({
  selector: 'app-setting-present-dialog',
  templateUrl: './setting.present.dialog.html',
  styleUrls: ['./setting.present.dialog.scss']
})
export class PresentSettingDialog {

  json: string;

  constructor(
    public dialogRef: MatDialogRef<PresentSettingDialog>,
    @Inject(MAT_DIALOG_DATA) public arg: DialogData
  ) {
    this.json = JSON.stringify(this.arg.data, undefined, 4);
  }

  ngOnInit() {
  }
}