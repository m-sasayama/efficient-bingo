import { Injectable } from "@angular/core";
import {
    Subject, Observable,
    // forkJoin, of
} from "rxjs";


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
        // this.onDrawn = forkJoin()

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
    constructor() {
        super(30);
    }
}
