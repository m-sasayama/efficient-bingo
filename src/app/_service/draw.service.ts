import { Injectable } from "@angular/core";

class DrawNumberService {
    private drawSrc: number[];
    private max: number;
    private drawnList: number[];

    constructor(max: number) {
        this.max = max;
        this.drawSrc = new Array<number>();
        this.drawnList = new Array<number>();

        for (let i = 0; i < this.max; i++) {
            this.drawSrc.push(i + 1);
        }
    }

    public drawNumber(count: number): number[] {
        const rtn = new Array<number>();
        for (let i = 0; i < count; i++) {
            // 抽選
            let index: number = Math.floor(Math.random() * this.drawSrc.length);
            let drawn: number[] = this.drawSrc.splice(index, 1);
            // 抽選結果をリストに保存
            Array.prototype.push.apply(this.drawnList, drawn);
        }
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
