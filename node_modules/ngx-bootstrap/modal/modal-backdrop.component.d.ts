import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
/** This component will be added as background layout for modals if enabled */
export declare class ModalBackdropComponent implements OnInit {
    get isAnimated(): boolean;
    set isAnimated(value: boolean);
    get isShown(): boolean;
    set isShown(value: boolean);
    element: ElementRef;
    renderer: Renderer2;
    protected _isAnimated: boolean;
    protected _isShown: boolean;
    constructor(element: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalBackdropComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalBackdropComponent, "bs-modal-backdrop", never, {}, {}, never, never, false, never>;
}
