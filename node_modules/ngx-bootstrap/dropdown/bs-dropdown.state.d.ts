import { EventEmitter } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { BsDropdownMenuDirective } from './bs-dropdown-menu.directive';
import * as i0 from "@angular/core";
export declare class BsDropdownState {
    direction: 'down' | 'up';
    autoClose: boolean;
    insideClick: boolean;
    isAnimated: boolean;
    stopOnClickPropagation: boolean;
    isOpenChange: EventEmitter<boolean>;
    isDisabledChange: EventEmitter<boolean>;
    toggleClick: EventEmitter<boolean>;
    counts: number;
    /**
     * Content to be displayed as popover.
     */
    dropdownMenu: Promise<BsComponentRef<BsDropdownMenuDirective>>;
    resolveDropdownMenu: (componentRef: BsComponentRef<BsDropdownMenuDirective>) => void;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDropdownState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDropdownState>;
}
