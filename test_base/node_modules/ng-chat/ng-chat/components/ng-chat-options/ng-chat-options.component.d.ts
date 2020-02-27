import { OnInit, EventEmitter } from '@angular/core';
import { Window } from '../../core/window';
import { IChatOption } from '../../core/chat-option';
export declare class NgChatOptionsComponent implements OnInit {
    constructor();
    options: IChatOption[];
    activeOptionTracker: IChatOption;
    activeOptionTrackerChange: EventEmitter<IChatOption>;
    chattingTo: Window;
    ngOnInit(): void;
    onOptionClicked(option: IChatOption): void;
}
