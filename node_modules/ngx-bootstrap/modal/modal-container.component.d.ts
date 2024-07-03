import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ModalOptions } from './modal-options.class';
import { BsModalService } from './bs-modal.service';
import * as i0 from "@angular/core";
export declare class ModalContainerComponent implements OnInit, OnDestroy {
    protected _element: ElementRef;
    private _renderer;
    config: ModalOptions;
    isShown: boolean;
    level?: number;
    isAnimated: boolean;
    bsModalService?: BsModalService;
    _focusEl: Element | null;
    private isModalHiding;
    private clickStartedInContent;
    constructor(options: ModalOptions, _element: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    onClickStarted(event: MouseEvent): void;
    onClickStop(event: MouseEvent): void;
    onPopState(): void;
    onEsc(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    hide(): void;
    private _hide;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalContainerComponent, "modal-container", never, {}, {}, never, ["*"], false, never>;
}
