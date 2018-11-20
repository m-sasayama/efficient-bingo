import { Injectable } from "@angular/core";
import { PresentInfo } from '../_object/PresentModel';

@Injectable()
export class SettingService {
    private panelCount: number;
    private presentInfo: { [fileName: string]: PresentInfo };

    constructor() {
        this.panelCount = 3;
        this.presentInfo = {};
    }

    public setPanelCount(value: number) {
        this.panelCount = value;
    }
    public getPanelCount(): number {
        return this.panelCount;
    }

    public setPresentInfo(key: string, value: PresentInfo) {
        this.presentInfo[key] = value;
    }
    public getPresentInfo(key: string): PresentInfo {
        return this.presentInfo[key];
    }
}