import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
import { BsDropdownDirective } from './bs-dropdown.directive';
import * as i0 from "@angular/core";
export declare class BsDropdownToggleDirective implements OnDestroy {
    private _changeDetectorRef;
    private _dropdown;
    private _element;
    private _renderer;
    private _state;
    isDisabled: undefined | true;
    isOpen: boolean;
    private _subscriptions;
    private _documentClickListener?;
    private _escKeyUpListener?;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dropdown: BsDropdownDirective, _element: ElementRef, _renderer: Renderer2, _state: BsDropdownState);
    onClick(event: MouseEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDropdownToggleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDropdownToggleDirective, "[bsDropdownToggle],[dropdownToggle]", ["bs-dropdown-toggle"], {}, {}, never, never, false, never>;
}
