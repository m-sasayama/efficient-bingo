import { Injectable } from "@angular/core";
import { ImageFileInfo, PresentInfo, PresentPanelInfo } from '../_object/PresentModel';

@Injectable({
    providedIn: 'root'
})
export class SettingService {
    private panelCount: number;
    private presents: PresentInfo[];
    private imageFiles: ImageFileInfo[];

    constructor() {
        this.panelCount = 3;
        this.presents = new Array<PresentInfo>();
        this.imageFiles = new Array<ImageFileInfo>();
    }

    public setPanelCount(value: number) {
        this.panelCount = value;
    }
    public getPanelCount(): number {
        return this.panelCount;
    }


    public getImageInfo(): ImageFileInfo[] {
        return this.imageFiles;
    }
    public getPresentInfo(): PresentInfo[] {
        return this.presents;
    }
}