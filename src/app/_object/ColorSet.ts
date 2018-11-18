export interface ColorSet {
    fbColor: string, // fbColor = fontColor, borderColor
    bgColor: string // bgColor = background-color
}

export namespace BingoPanelColor {
    export const Default: ColorSet = { fbColor: '#00a497', bgColor: '#252526' };
    export const GroupB: ColorSet = { fbColor: '#bee0ce', bgColor: '#004d25' };
    export const GroupI: ColorSet = { fbColor: '#bbe2f1', bgColor: '#192f60' };
    export const GroupN: ColorSet = { fbColor: '#f3d5d5', bgColor: '#e73562' };
    export const GroupG: ColorSet = { fbColor: '#fff3b8', bgColor: '#ed6d35' };
    export const GroupO: ColorSet = { fbColor: '#ffd1ff', bgColor: '#56256e' };
    export const Remain: ColorSet = { fbColor: '#505050', bgColor: '#252526' };
}