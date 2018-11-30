import { Injectable } from "@angular/core";
import { ImageFileInfo, PresentInfo, PresentPanelInfo } from '../_object/PresentModel';

@Injectable()
export class SettingService {
    private panelCount: number;
    private presents: PresentInfo[];
    private imageFiles: ImageFileInfo[];
    private presentPanels: PresentPanelInfo[];

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
    public getPresentPanelInfo(): PresentPanelInfo[] {

        if (!(this.presentPanels && this.presentPanels.length > 0)) {

            this.presentPanels = new Array<PresentPanelInfo>();

            for (const present of this.presents) {
                for (const file of this.imageFiles) {
                    if (present.fileName === file.name) {
                        this.presentPanels.push({
                            fileName: present.fileName,
                            src: file.src,
                            title: present.title,
                            description: present.description,
                            isSecret: present.isSecret,
                            isDrawn: false
                        });
                        break;
                    }
                }
            }
        }

        return this.presentPanels;
    }
}