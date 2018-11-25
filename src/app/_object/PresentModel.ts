export interface ImageFileInfo {
    name: string;
    src: string;
    isCurrent: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export interface PresentPanelInfo {
    fileName: string,
    src: string,
    title: string,
    description: string,
    isSecret: boolean
}

export interface PresentInfo {
    fileName: string,
    title: string,
    description: string,
    isSecret: boolean
}