import { Message } from './message';
export declare class FileMessage extends Message {
    constructor();
    downloadUrl: string;
    mimeType: string;
    fileSizeInBytes: number;
}
