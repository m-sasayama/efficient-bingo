import { Injectable } from "@angular/core";
import { ImageFileInfo, PresentInfo, PresentPanelInfo } from '../_object/PresentModel';

@Injectable()
export class SettingService {
    private panelCount: number;
    private presents: PresentInfo[];
    private imageFiles: ImageFileInfo[];

    constructor() {
        this.panelCount = 3;
        this.presents = new Array<PresentInfo>();
        this.imageFiles = new Array<ImageFileInfo>();
        console.log('constructor SettingService');
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
    public getPresentPanelInfo(): PresentPanelInfo[] {
        const rtn = new Array<PresentPanelInfo>();
        for (const present of this.presents) {
            for (const file of this.imageFiles) {
                if (present.fileName === file.name) {
                    rtn.push({
                        fileName: present.fileName,
                        src: file.src,
                        title: present.title,
                        description: present.description,
                        isSecret: present.isSecret
                    });
                    break;
                }
            }
        }
        return rtn;
    }
}