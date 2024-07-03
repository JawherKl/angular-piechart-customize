import { StaticProvider, InjectionToken } from '@angular/core';
import { ClassName, CloseInterceptorFn, DismissReasons, Selector, TransitionDurations } from './models';
import * as i0 from "@angular/core";
export declare class ModalOptions<T = Record<string, unknown>> {
    /**
     *  Allow user to ID for the modal. Otherwise, a unique number will be given
     */
    id?: number | string;
    /**
     *  Includes a modal-backdrop element. Alternatively,
     *  specify static for a backdrop which doesn't close the modal on click.
     */
    backdrop?: boolean | 'static';
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard?: boolean;
    focus?: boolean;
    /**
     * Shows the modal when initialized.
     */
    show?: boolean;
    /**
     * Ignore the backdrop click
     */
    ignoreBackdropClick?: boolean;
    /**
     * Css class for opened modal
     */
    class?: string;
    /**
     * Toggle animation
     */
    animated?: boolean;
    /**
     * Modal data
     */
    initialState?: Partial<T>;
    /**
     * Function to intercept the closure
     */
    closeInterceptor?: CloseInterceptorFn;
    /**
     * Modal providers
     */
    providers?: StaticProvider[];
    /**
     * aria-labelledby attribute value to set on the modal window
     */
    ariaLabelledBy?: string;
    /**
     * aria-describedby attribute value to set on the modal window
     */
    ariaDescribedby?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalOptions<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalOptions<any>>;
}
export declare const modalConfigDefaults: ModalOptions;
export declare const MODAL_CONFIG_DEFAULT_OVERRIDE: InjectionToken<ModalOptions>;
export declare const CLASS_NAME: ClassName;
export declare const SELECTOR: Selector;
export declare const TRANSITION_DURATIONS: TransitionDurations;
export declare const DISMISS_REASONS: DismissReasons;
