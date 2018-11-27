import { Component, OnInit, Input } from '@angular/core';
import { PresentPanelInfo } from '../_object/PresentModel';
import { SettingService } from '../_service/setting.service';

@Component({
  selector: 'app-present-panel',
  templateUrl: './present-panel.component.html',
  styleUrls: ['./present-panel.component.scss']
})
export class PresentPanelComponent implements OnInit {

  @Input() index: string;
  indexNum: number;

  file: PresentPanelInfo

  constructor(
    private settingService: SettingService
  ) {
  }

  ngOnInit() {
    this.indexNum = parseInt(this.index);
    this.file = this.settingService.getPresentPanelInfo()[this.index];
  }
}
