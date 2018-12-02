import { Injectable } from "@angular/core";
import { Subject, Observable, } from "rxjs";
import { SettingService } from '../_service/setting.service';
import { PresentInfo, PresentPanelInfo, ImageFileInfo } from '../_object/PresentModel';

class DrawNumberService {

    public onBeginDraw: Observable<string>;
    private _onBeginDraw: Subject<string>;
    public onDrawn: Observable<string>;
    private _onDrawn: Subject<string>;

    private drawSrc: number[];
    private max: number;
    private drawnList: number[];

    constructor(max: number) {

        this._onBeginDraw = new Subject<string>();
        this.onBeginDraw = this._onBeginDraw.asObservable();
        this._onDrawn = new Subject<string>();
        this.onDrawn = this._onDrawn.asObservable();

        this.reset(max);
    }

    public reset(max: number) {
        this.max = max;
        this.drawSrc = new Array<number>();
        this.drawnList = new Array<number>();
        for (let i = 0; i < this.max; i++) {
            this.drawSrc.push(i + 1);
        }
    }

    public beginDraw() {
        this._onBeginDraw.next('begin draw.');
    }

    public drawn() {
        this._onDrawn.next('drawn.');
    }

    public drawNumber(): number {
        let rtn = 0;
        // 抽選
        let index: number = Math.floor(Math.random() * this.drawSrc.length);
        let drawn: number[] = this.drawSrc.splice(index, 1);
        // 抽選結果をリストに保存
        Array.prototype.push.apply(this.drawnList, drawn);
        rtn = drawn[0];
        return rtn;
    }

    public getDrawnList(): number[] {
        return this.drawnList;
    }

    public getUntilEnd(): number {
        return this.max - this.drawnList.length;
    }
}

@Injectable()
export class BingoService extends DrawNumberService {
    constructor() {
        super(75);
    }
}

@Injectable()
export class PresentService extends DrawNumberService {

    private presentPanels: PresentPanelInfo[];
    private presents: PresentInfo[];
    private imageFiles: ImageFileInfo[];

    constructor(
        private settingService: SettingService
    ) {
        super(0);

        this.presentPanels = new Array<PresentPanelInfo>();
        this.presents = this.settingService.getPresentInfo();
        this.imageFiles = this.settingService.getImageInfo();
        this.reset(this.presents.length);

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

    public getPresentPanelInfo(): PresentPanelInfo[] {
        return this.presentPanels;
    }
    public getPresentCount(): number {
        return this.presentPanels.length;
    }

}
