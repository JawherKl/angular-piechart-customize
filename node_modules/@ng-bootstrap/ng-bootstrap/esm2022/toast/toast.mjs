import { Attribute, Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { take } from 'rxjs/operators';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbToastFadeInTransition, ngbToastFadeOutTransition } from './toast-transition';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./toast-config";
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
class NgbToastHeader {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbToastHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbToastHeader, isStandalone: true, selector: "[ngbToastHeader]", ngImport: i0 }); }
}
export { NgbToastHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbToastHeader, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbToastHeader]', standalone: true }]
        }] });
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
class NgbToast {
    constructor(ariaLive, config, _zone, _element) {
        this.ariaLive = ariaLive;
        this._zone = _zone;
        this._element = _element;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired after the animation triggered by calling `.show()` method has finished.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event fired after the animation triggered by calling `.hide()` method has finished.
         *
         * It can only occur in 2 different scenarios:
         * - `autohide` timeout fires
         * - user clicks on a closing cross
         *
         * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
         * to the user to take care of that.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        if (this.ariaLive == null) {
            this.ariaLive = config.ariaLive;
        }
        this.delay = config.delay;
        this.autohide = config.autohide;
        this.animation = config.animation;
    }
    ngAfterContentInit() {
        this._zone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this._init();
            this.show();
        });
    }
    ngOnChanges(changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    }
    /**
     * Triggers toast closing programmatically.
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(hidden)` output
     *
     * @since 8.0.0
     */
    hide() {
        this._clearTimeout();
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeOutTransition, {
            animation: this.animation,
            runningTransition: 'stop',
        });
        transition.subscribe(() => {
            this.hidden.emit();
        });
        return transition;
    }
    /**
     * Triggers toast opening programmatically.
     *
     * The returned observable will emit and be completed once the opening transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(shown)` output
     *
     * @since 8.0.0
     */
    show() {
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeInTransition, {
            animation: this.animation,
            runningTransition: 'continue',
        });
        transition.subscribe(() => {
            this.shown.emit();
        });
        return transition;
    }
    _init() {
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout(() => this.hide(), this.delay);
        }
    }
    _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbToast, deps: [{ token: 'aria-live', attribute: true }, { token: i1.NgbToastConfig }, { token: i0.NgZone }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbToast, isStandalone: true, selector: "ngb-toast", inputs: { animation: "animation", delay: "delay", autohide: "autohide", header: "header" }, outputs: { shown: "shown", hidden: "hidden" }, host: { attributes: { "role": "alert", "aria-atomic": "true" }, properties: { "attr.aria-live": "ariaLive", "class.fade": "animation" }, classAttribute: "toast" }, queries: [{ propertyName: "contentHeaderTpl", first: true, predicate: NgbToastHeader, descendants: true, read: TemplateRef, static: true }], exportAs: ["ngbToast"], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #headerTpl>
			<strong class="me-auto">{{ header }}</strong>
		</ng-template>
		<ng-template [ngIf]="contentHeaderTpl || header">
			<div class="toast-header">
				<ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					i18n-aria-label="@@ngb.toast.close-aria"
					(click)="hide()"
				>
				</button>
			</div>
		</ng-template>
		<div class="toast-body">
			<ng-content></ng-content>
		</div>
	`, isInline: true, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbToast };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbToast, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-toast', exportAs: 'ngbToast', standalone: true, imports: [NgIf, NgTemplateOutlet], encapsulation: ViewEncapsulation.None, host: {
                        role: 'alert',
                        '[attr.aria-live]': 'ariaLive',
                        'aria-atomic': 'true',
                        class: 'toast',
                        '[class.fade]': 'animation',
                    }, template: `
		<ng-template #headerTpl>
			<strong class="me-auto">{{ header }}</strong>
		</ng-template>
		<ng-template [ngIf]="contentHeaderTpl || header">
			<div class="toast-header">
				<ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					i18n-aria-label="@@ngb.toast.close-aria"
					(click)="hide()"
				>
				</button>
			</div>
		</ng-template>
		<div class="toast-body">
			<ng-content></ng-content>
		</div>
	`, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['aria-live']
                }] }, { type: i1.NgbToastConfig }, { type: i0.NgZone }, { type: i0.ElementRef }]; }, propDecorators: { animation: [{
                type: Input
            }], delay: [{
                type: Input
            }], autohide: [{
                type: Input
            }], header: [{
                type: Input
            }], contentHeaderTpl: [{
                type: ContentChild,
                args: [NgbToastHeader, { read: TemplateRef, static: true }]
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdG9hc3QvdG9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFTixXQUFXLEVBQ1gsaUJBQWlCLEdBR2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUV6RDs7Ozs7R0FLRztBQUNILE1BQ2EsY0FBYzs4R0FBZCxjQUFjO2tHQUFkLGNBQWM7O1NBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7O0FBRzdEOzs7OztHQUtHO0FBQ0gsTUFvQ2EsUUFBUTtJQXlEcEIsWUFDZ0MsUUFBZ0IsRUFDL0MsTUFBc0IsRUFDZCxLQUFhLEVBQ2IsUUFBb0I7UUFIRyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRXZDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBL0I3Qjs7O1dBR0c7UUFDZ0UscUJBQWdCLEdBQTRCLElBQUksQ0FBQztRQUVwSDs7OztXQUlHO1FBQ08sVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFM0M7Ozs7Ozs7Ozs7O1dBV0c7UUFDTyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQVEzQyxJQUFJLElB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QUMvQjt3QkFDTCxJQUFJLEVBQUUsT0FBTzt3QkFDYixrQkFBa0IsRUFBRSxVQUFVO3dCQUM5QixhQUFhLEVBQUUsTUFBTTt3QkFDckIsS0FBSyxFQUFFLE9BQU87d0JBQ2QsY0FBYyxFQUFFLFdBQVc7cUJBQzNCLFlBQ1M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBb0JUOzswQkE2REMsU0FBUzsyQkFBQyxXQUFXO3VIQWxEZCxTQUFTO3NCQUFqQixLQUFLO2dCQVFHLEtBQUs7c0JBQWIsS0FBSztnQkFNRyxRQUFRO3NCQUFoQixLQUFLO2dCQU1HLE1BQU07c0JBQWQsS0FBSztnQkFNNkQsZ0JBQWdCO3NCQUFsRixZQUFZO3VCQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFPdkQsS0FBSztzQkFBZCxNQUFNO2dCQWNHLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFmdGVyQ29udGVudEluaXQsXG5cdEF0dHJpYnV0ZSxcblx0Q29tcG9uZW50LFxuXHRDb250ZW50Q2hpbGQsXG5cdERpcmVjdGl2ZSxcblx0RXZlbnRFbWl0dGVyLFxuXHRJbnB1dCxcblx0T25DaGFuZ2VzLFxuXHRPdXRwdXQsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3RW5jYXBzdWxhdGlvbixcblx0RWxlbWVudFJlZixcblx0Tmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmdiVG9hc3RDb25maWcgfSBmcm9tICcuL3RvYXN0LWNvbmZpZyc7XG5pbXBvcnQgeyBuZ2JSdW5UcmFuc2l0aW9uIH0gZnJvbSAnLi4vdXRpbC90cmFuc2l0aW9uL25nYlRyYW5zaXRpb24nO1xuaW1wb3J0IHsgbmdiVG9hc3RGYWRlSW5UcmFuc2l0aW9uLCBuZ2JUb2FzdEZhZGVPdXRUcmFuc2l0aW9uIH0gZnJvbSAnLi90b2FzdC10cmFuc2l0aW9uJztcbmltcG9ydCB7IE5nSWYsIE5nVGVtcGxhdGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGFsbG93cyB0aGUgdXNhZ2Ugb2YgSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlc1xuICogaW5zaWRlIG9mIHRoZSB0b2FzdCdzIGhlYWRlci5cbiAqXG4gKiBAc2luY2UgNS4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nYlRvYXN0SGVhZGVyXScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JUb2FzdEhlYWRlciB7fVxuXG4vKipcbiAqIFRvYXN0cyBwcm92aWRlIGZlZWRiYWNrIG1lc3NhZ2VzIGFzIG5vdGlmaWNhdGlvbnMgdG8gdGhlIHVzZXIuXG4gKiBHb2FsIGlzIHRvIG1pbWljIHRoZSBwdXNoIG5vdGlmaWNhdGlvbnMgYXZhaWxhYmxlIGJvdGggb24gbW9iaWxlIGFuZCBkZXNrdG9wIG9wZXJhdGluZyBzeXN0ZW1zLlxuICpcbiAqIEBzaW5jZSA1LjAuMFxuICovXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2ItdG9hc3QnLFxuXHRleHBvcnRBczogJ25nYlRvYXN0Jyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aW1wb3J0czogW05nSWYsIE5nVGVtcGxhdGVPdXRsZXRdLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRob3N0OiB7XG5cdFx0cm9sZTogJ2FsZXJ0Jyxcblx0XHQnW2F0dHIuYXJpYS1saXZlXSc6ICdhcmlhTGl2ZScsXG5cdFx0J2FyaWEtYXRvbWljJzogJ3RydWUnLFxuXHRcdGNsYXNzOiAndG9hc3QnLFxuXHRcdCdbY2xhc3MuZmFkZV0nOiAnYW5pbWF0aW9uJyxcblx0fSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8bmctdGVtcGxhdGUgI2hlYWRlclRwbD5cblx0XHRcdDxzdHJvbmcgY2xhc3M9XCJtZS1hdXRvXCI+e3sgaGVhZGVyIH19PC9zdHJvbmc+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0XHQ8bmctdGVtcGxhdGUgW25nSWZdPVwiY29udGVudEhlYWRlclRwbCB8fCBoZWFkZXJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJ0b2FzdC1oZWFkZXJcIj5cblx0XHRcdFx0PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRIZWFkZXJUcGwgfHwgaGVhZGVyVHBsXCI+PC9uZy10ZW1wbGF0ZT5cblx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdGNsYXNzPVwiYnRuLWNsb3NlXCJcblx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuXHRcdFx0XHRcdGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRvYXN0LmNsb3NlLWFyaWFcIlxuXHRcdFx0XHRcdChjbGljayk9XCJoaWRlKClcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0XHQ8ZGl2IGNsYXNzPVwidG9hc3QtYm9keVwiPlxuXHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXHRcdDwvZGl2PlxuXHRgLFxuXHRzdHlsZVVybHM6IFsnLi90b2FzdC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRvYXN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzIHtcblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdG9hc3Qgb3BlbmluZyBhbmQgY2xvc2luZyB3aWxsIGJlIGFuaW1hdGVkLlxuXHQgKlxuXHQgKiBBbmltYXRpb24gaXMgdHJpZ2dlcmVkIG9ubHkgd2hlbiB0aGUgYC5oaWRlKClgIG9yIGAuc2hvdygpYCBmdW5jdGlvbnMgYXJlIGNhbGxlZFxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuXHRwcml2YXRlIF90aW1lb3V0SUQ7XG5cblx0LyoqXG5cdCAqIERlbGF5IGFmdGVyIHdoaWNoIHRoZSB0b2FzdCB3aWxsIGhpZGUgKG1zKS5cblx0ICogZGVmYXVsdDogYDUwMGAgKG1zKSAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG5cdCAqL1xuXHRASW5wdXQoKSBkZWxheTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBdXRvIGhpZGUgdGhlIHRvYXN0IGFmdGVyIGEgZGVsYXkgaW4gbXMuXG5cdCAqIGRlZmF1bHQ6IGB0cnVlYCAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG5cdCAqL1xuXHRASW5wdXQoKSBhdXRvaGlkZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGV4dCB0byBiZSB1c2VkIGFzIHRvYXN0J3MgaGVhZGVyLlxuXHQgKiBJZ25vcmVkIGlmIGEgQ29udGVudENoaWxkIHRlbXBsYXRlIGlzIHNwZWNpZmllZCBhdCB0aGUgc2FtZSB0aW1lLlxuXHQgKi9cblx0QElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEEgdGVtcGxhdGUgbGlrZSBgPG5nLXRlbXBsYXRlIG5nYlRvYXN0SGVhZGVyPjwvbmctdGVtcGxhdGU+YCBjYW4gYmVcblx0ICogdXNlZCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnQgdG8gYWxsb3cgbWFya3VwIHVzYWdlLlxuXHQgKi9cblx0QENvbnRlbnRDaGlsZChOZ2JUb2FzdEhlYWRlciwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnRIZWFkZXJUcGw6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsID0gbnVsbDtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZmlyZWQgYWZ0ZXIgdGhlIGFuaW1hdGlvbiB0cmlnZ2VyZWQgYnkgY2FsbGluZyBgLnNob3coKWAgbWV0aG9kIGhhcyBmaW5pc2hlZC5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGZpcmVkIGFmdGVyIHRoZSBhbmltYXRpb24gdHJpZ2dlcmVkIGJ5IGNhbGxpbmcgYC5oaWRlKClgIG1ldGhvZCBoYXMgZmluaXNoZWQuXG5cdCAqXG5cdCAqIEl0IGNhbiBvbmx5IG9jY3VyIGluIDIgZGlmZmVyZW50IHNjZW5hcmlvczpcblx0ICogLSBgYXV0b2hpZGVgIHRpbWVvdXQgZmlyZXNcblx0ICogLSB1c2VyIGNsaWNrcyBvbiBhIGNsb3NpbmcgY3Jvc3Ncblx0ICpcblx0ICogQWRkaXRpb25hbGx5IHRoaXMgb3V0cHV0IGlzIHB1cmVseSBpbmZvcm1hdGl2ZS4gVGhlIHRvYXN0IHdvbid0IGJlIHJlbW92ZWQgZnJvbSBET00gYXV0b21hdGljYWxseSwgaXQncyB1cFxuXHQgKiB0byB0aGUgdXNlciB0byB0YWtlIGNhcmUgb2YgdGhhdC5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpIHB1YmxpYyBhcmlhTGl2ZTogc3RyaW5nLFxuXHRcdGNvbmZpZzogTmdiVG9hc3RDb25maWcsXG5cdFx0cHJpdmF0ZSBfem9uZTogTmdab25lLFxuXHRcdHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG5cdCkge1xuXHRcdGlmICh0aGlzLmFyaWFMaXZlID09IG51bGwpIHtcblx0XHRcdHRoaXMuYXJpYUxpdmUgPSBjb25maWcuYXJpYUxpdmU7XG5cdFx0fVxuXHRcdHRoaXMuZGVsYXkgPSBjb25maWcuZGVsYXk7XG5cdFx0dGhpcy5hdXRvaGlkZSA9IGNvbmZpZy5hdXRvaGlkZTtcblx0XHR0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5fem9uZS5vblN0YWJsZVxuXHRcdFx0LmFzT2JzZXJ2YWJsZSgpXG5cdFx0XHQucGlwZSh0YWtlKDEpKVxuXHRcdFx0LnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX2luaXQoKTtcblx0XHRcdFx0dGhpcy5zaG93KCk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAoJ2F1dG9oaWRlJyBpbiBjaGFuZ2VzKSB7XG5cdFx0XHR0aGlzLl9jbGVhclRpbWVvdXQoKTtcblx0XHRcdHRoaXMuX2luaXQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlcnMgdG9hc3QgY2xvc2luZyBwcm9ncmFtbWF0aWNhbGx5LlxuXHQgKlxuXHQgKiBUaGUgcmV0dXJuZWQgb2JzZXJ2YWJsZSB3aWxsIGVtaXQgYW5kIGJlIGNvbXBsZXRlZCBvbmNlIHRoZSBjbG9zaW5nIHRyYW5zaXRpb24gaGFzIGZpbmlzaGVkLlxuXHQgKiBJZiB0aGUgYW5pbWF0aW9ucyBhcmUgdHVybmVkIG9mZiB0aGlzIGhhcHBlbnMgc3luY2hyb25vdXNseS5cblx0ICpcblx0ICogQWx0ZXJuYXRpdmVseSB5b3UgY291bGQgbGlzdGVuIG9yIHN1YnNjcmliZSB0byB0aGUgYChoaWRkZW4pYCBvdXRwdXRcblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRoaWRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuXHRcdHRoaXMuX2NsZWFyVGltZW91dCgpO1xuXHRcdGNvbnN0IHRyYW5zaXRpb24gPSBuZ2JSdW5UcmFuc2l0aW9uKHRoaXMuX3pvbmUsIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgbmdiVG9hc3RGYWRlT3V0VHJhbnNpdGlvbiwge1xuXHRcdFx0YW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbixcblx0XHRcdHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCcsXG5cdFx0fSk7XG5cdFx0dHJhbnNpdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5oaWRkZW4uZW1pdCgpO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0cmFuc2l0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXJzIHRvYXN0IG9wZW5pbmcgcHJvZ3JhbW1hdGljYWxseS5cblx0ICpcblx0ICogVGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBlbWl0IGFuZCBiZSBjb21wbGV0ZWQgb25jZSB0aGUgb3BlbmluZyB0cmFuc2l0aW9uIGhhcyBmaW5pc2hlZC5cblx0ICogSWYgdGhlIGFuaW1hdGlvbnMgYXJlIHR1cm5lZCBvZmYgdGhpcyBoYXBwZW5zIHN5bmNocm9ub3VzbHkuXG5cdCAqXG5cdCAqIEFsdGVybmF0aXZlbHkgeW91IGNvdWxkIGxpc3RlbiBvciBzdWJzY3JpYmUgdG8gdGhlIGAoc2hvd24pYCBvdXRwdXRcblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRzaG93KCk6IE9ic2VydmFibGU8dm9pZD4ge1xuXHRcdGNvbnN0IHRyYW5zaXRpb24gPSBuZ2JSdW5UcmFuc2l0aW9uKHRoaXMuX3pvbmUsIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgbmdiVG9hc3RGYWRlSW5UcmFuc2l0aW9uLCB7XG5cdFx0XHRhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLFxuXHRcdFx0cnVubmluZ1RyYW5zaXRpb246ICdjb250aW51ZScsXG5cdFx0fSk7XG5cdFx0dHJhbnNpdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5zaG93bi5lbWl0KCk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRyYW5zaXRpb247XG5cdH1cblxuXHRwcml2YXRlIF9pbml0KCkge1xuXHRcdGlmICh0aGlzLmF1dG9oaWRlICYmICF0aGlzLl90aW1lb3V0SUQpIHtcblx0XHRcdHRoaXMuX3RpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRoaXMuZGVsYXkpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2NsZWFyVGltZW91dCgpIHtcblx0XHRpZiAodGhpcy5fdGltZW91dElEKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dElEKTtcblx0XHRcdHRoaXMuX3RpbWVvdXRJRCA9IG51bGw7XG5cdFx0fVxuXHR9XG59XG4iXX0=