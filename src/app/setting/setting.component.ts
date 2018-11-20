import { Component, OnInit } from '@angular/core';
import { ReadFileInfo } from '../_object/PresentModel';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingService } from '../_service/setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  imageFiles: ReadFileInfo[];

  private currentImage: string;
  panelCount = new FormControl(5);
  presentName = new FormControl('');
  presentDesc = new FormControl('');
  isSecret = new FormControl(false);

  constructor(
    private settingService: SettingService,
    private route: Router
  ) {
    this.imageFiles = new Array<ReadFileInfo>();
  }

  ngOnInit() {
    console.log('panelCount: %s', this.settingService.getPanelCount());
    this.panelCount.setValue(this.settingService.getPanelCount());
    this.presentName.disable();
    this.presentDesc.disable();
    this.isSecret.disable();
  }

  handleThumbSelect(event) {

    this.currentImage = event.target.title;

    for (const image of this.imageFiles) {
      if (image.name === this.currentImage) {
        image.isCurrent = true;
      } else {
        image.isCurrent = false;
      }
    }

    this.presentName.enable();
    this.presentDesc.enable();
    this.isSecret.enable();

    const presentInfo = this.settingService.getPresentInfo(this.currentImage);
    this.presentName.setValue(presentInfo.name);
    this.presentDesc.setValue(presentInfo.description);
    this.isSecret.setValue(presentInfo.isSecret);
  }

  handleChange(event, target: string) {

    let presentInfo = this.settingService.getPresentInfo(this.currentImage);

    switch (target) {
      case 'panelCount':
        this.settingService.setPanelCount(this.panelCount.value);
        break;

      case 'presentName':
        presentInfo.name = this.presentName.value;
        break;

      case 'presentDesc':
        presentInfo.description = this.presentDesc.value;
        break;

      case 'isSecret':
        presentInfo.isSecret = this.isSecret.value;
        break;

      default:
        break;
    }
  }

  handleFileSelect(event) {
    let files = event.target.files;

    for (let i = 0, f; f = files[i]; i++) {

      let readFileInfo: ReadFileInfo = {
        name: f.name,
        src: '',
        isCurrent: false
      };

      if (!f.type.match('image.*')) {
        continue;
      }
      let reader = new FileReader();
      reader.onload = (e) => {

        let fr: FileReader = e.target as FileReader;
        readFileInfo.src = fr.result as string;

        this.imageFiles.push(readFileInfo);

        this.settingService.setPresentInfo(readFileInfo.name, {
          thumbnail: readFileInfo.src,
          name: '',
          description: '',
          isSecret: false,
        });
      }
      reader.readAsDataURL(f);
    }
  }

  gotoBingo() {
    this.route.navigate(['efficientbingo/playroom/bingo']);
  }
}
