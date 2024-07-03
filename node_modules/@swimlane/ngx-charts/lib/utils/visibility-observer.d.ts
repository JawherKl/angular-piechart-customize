import { EventEmitter, NgZone, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Visibility Observer
 */
export declare class VisibilityObserver {
    private element;
    private zone;
    visible: EventEmitter<any>;
    timeout: any;
    isVisible: boolean;
    constructor(element: ElementRef, zone: NgZone);
    destroy(): void;
    onVisibilityChange(): void;
    runCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisibilityObserver, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<VisibilityObserver, "visibility-observer", never, {}, { "visible": "visible"; }, never>;
}
