import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BsModalRef<T = any> {
    /**
     * Event that is fired when the modal behind the ref starts hiding
     */
    onHide?: EventEmitter<unknown>;
    /**
     * Event that is fired when the modal behind the ref finishes hiding
     */
    onHidden?: EventEmitter<unknown>;
    /**
     *  Allow user to ID for the modal. Otherwise, a unique number will be given
     */
    id?: number | string;
    /**
     * Reference to a component inside the modal. Null if modal's been created with TemplateRef
     */
    content?: T;
    /**
     * Hides the modal
     */
    hide: () => void;
    /**
     * Sets new class to modal window
     */
    setClass: (newClass: string) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsModalRef<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsModalRef<any>>;
}
