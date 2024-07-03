import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import { NgIf } from '@angular/common';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbAlertFadingTransition } from './alert-transition';
import * as i0 from "@angular/core";
import * as i1 from "./alert-config";
/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
class NgbAlert {
    constructor(config, _element, _zone) {
        this._element = _element;
        this._zone = _zone;
        /**
         * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
         *
         * @since 8.0.0
         */
        this.closed = new EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
        this.animation = config.animation;
    }
    /**
     * Triggers alert closing programmatically (same as clicking on the close button (×)).
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(closed)` output
     *
     * @since 8.0.0
     */
    close() {
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbAlertFadingTransition, {
            animation: this.animation,
            runningTransition: 'continue',
        });
        transition.subscribe(() => this.closed.emit());
        return transition;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAlert, deps: [{ token: i1.NgbAlertConfig }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbAlert, isStandalone: true, selector: "ngb-alert", inputs: { animation: "animation", dismissible: "dismissible", type: "type" }, outputs: { closed: "closed" }, host: { attributes: { "role": "alert" }, properties: { "class": "\"alert show\" + (type ? \" alert-\" + type : \"\")", "class.fade": "animation", "class.alert-dismissible": "dismissible" } }, exportAs: ["ngbAlert"], ngImport: i0, template: `
		<ng-content></ng-content>
		<button
			*ngIf="dismissible"
			type="button"
			class="btn-close"
			aria-label="Close"
			i18n-aria-label="@@ngb.alert.close"
			(click)="close()"
		>
		</button>
	`, isInline: true, styles: ["ngb-alert{display:block}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbAlert };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAlert, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-alert', exportAs: 'ngbAlert', standalone: true, imports: [NgIf], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        role: 'alert',
                        '[class]': '"alert show" + (type ? " alert-" + type : "")',
                        '[class.fade]': 'animation',
                        '[class.alert-dismissible]': 'dismissible',
                    }, template: `
		<ng-content></ng-content>
		<button
			*ngIf="dismissible"
			type="button"
			class="btn-close"
			aria-label="Close"
			i18n-aria-label="@@ngb.alert.close"
			(click)="close()"
		>
		</button>
	`, styles: ["ngb-alert{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbAlertConfig }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { animation: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], type: [{
                type: Input
            }], closed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYWxlcnQvYWxlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNOLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04saUJBQWlCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUt2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBRTlEOzs7O0dBSUc7QUFDSCxNQTJCYSxRQUFRO0lBa0NwQixZQUFZLE1BQXNCLEVBQVUsUUFBaUMsRUFBVSxLQUFhO1FBQXhELGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQVBwRzs7OztXQUlHO1FBQ08sV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFHM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUs7UUFDSixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLHdCQUF3QixFQUFFO1lBQ3RHLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixpQkFBaUIsRUFBRSxVQUFVO1NBQzdCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sVUFBVSxDQUFDO0lBQ25CLENBQUM7OEdBekRXLFFBQVE7a0dBQVIsUUFBUSwwWUFkVjs7Ozs7Ozs7Ozs7RUFXVCxvR0FwQlMsSUFBSTs7U0F1QkYsUUFBUTsyRkFBUixRQUFRO2tCQTNCcEIsU0FBUzsrQkFDQyxXQUFXLFlBQ1gsVUFBVSxjQUNSLElBQUksV0FDUCxDQUFDLElBQUksQ0FBQyxtQkFDRSx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBQy9CO3dCQUNMLElBQUksRUFBRSxPQUFPO3dCQUNiLFNBQVMsRUFBRSwrQ0FBK0M7d0JBQzFELGNBQWMsRUFBRSxXQUFXO3dCQUMzQiwyQkFBMkIsRUFBRSxhQUFhO3FCQUMxQyxZQUNTOzs7Ozs7Ozs7OztFQVdUO21KQVlRLFNBQVM7c0JBQWpCLEtBQUs7Z0JBUUcsV0FBVztzQkFBbkIsS0FBSztnQkFRRyxJQUFJO3NCQUFaLEtBQUs7Z0JBT0ksTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG5cdENvbXBvbmVudCxcblx0RWxlbWVudFJlZixcblx0RXZlbnRFbWl0dGVyLFxuXHRJbnB1dCxcblx0Tmdab25lLFxuXHRPdXRwdXQsXG5cdFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nSWYgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5nYkFsZXJ0Q29uZmlnIH0gZnJvbSAnLi9hbGVydC1jb25maWcnO1xuaW1wb3J0IHsgbmdiUnVuVHJhbnNpdGlvbiB9IGZyb20gJy4uL3V0aWwvdHJhbnNpdGlvbi9uZ2JUcmFuc2l0aW9uJztcbmltcG9ydCB7IG5nYkFsZXJ0RmFkaW5nVHJhbnNpdGlvbiB9IGZyb20gJy4vYWxlcnQtdHJhbnNpdGlvbic7XG5cbi8qKlxuICogQWxlcnQgaXMgYSBjb21wb25lbnQgdG8gcHJvdmlkZSBjb250ZXh0dWFsIGZlZWRiYWNrIG1lc3NhZ2VzIGZvciB1c2VyLlxuICpcbiAqIEl0IHN1cHBvcnRzIHNldmVyYWwgYWxlcnQgdHlwZXMgYW5kIGNhbiBiZSBkaXNtaXNzZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nYi1hbGVydCcsXG5cdGV4cG9ydEFzOiAnbmdiQWxlcnQnLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRpbXBvcnRzOiBbTmdJZl0sXG5cdGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRob3N0OiB7XG5cdFx0cm9sZTogJ2FsZXJ0Jyxcblx0XHQnW2NsYXNzXSc6ICdcImFsZXJ0IHNob3dcIiArICh0eXBlID8gXCIgYWxlcnQtXCIgKyB0eXBlIDogXCJcIiknLFxuXHRcdCdbY2xhc3MuZmFkZV0nOiAnYW5pbWF0aW9uJyxcblx0XHQnW2NsYXNzLmFsZXJ0LWRpc21pc3NpYmxlXSc6ICdkaXNtaXNzaWJsZScsXG5cdH0sXG5cdHRlbXBsYXRlOiBgXG5cdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXHRcdDxidXR0b25cblx0XHRcdCpuZ0lmPVwiZGlzbWlzc2libGVcIlxuXHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRjbGFzcz1cImJ0bi1jbG9zZVwiXG5cdFx0XHRhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuXHRcdFx0aTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuYWxlcnQuY2xvc2VcIlxuXHRcdFx0KGNsaWNrKT1cImNsb3NlKClcIlxuXHRcdD5cblx0XHQ8L2J1dHRvbj5cblx0YCxcblx0c3R5bGVVcmxzOiBbJy4vYWxlcnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydCB7XG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIGFsZXJ0IGNsb3Npbmcgd2lsbCBiZSBhbmltYXRlZC5cblx0ICpcblx0ICogQW5pbWF0aW9uIGlzIHRyaWdnZXJlZCBvbmx5IHdoZW4gY2xpY2tlZCBvbiB0aGUgY2xvc2UgYnV0dG9uICjDlylcblx0ICogb3IgdmlhIHRoZSBgLmNsb3NlKClgIGZ1bmN0aW9uXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0QElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIGFsZXJ0IGNhbiBiZSBkaXNtaXNzZWQgYnkgdGhlIHVzZXIuXG5cdCAqXG5cdCAqIFRoZSBjbG9zZSBidXR0b24gKMOXKSB3aWxsIGJlIGRpc3BsYXllZCBhbmQgeW91IGNhbiBiZSBub3RpZmllZFxuXHQgKiBvZiB0aGUgZXZlbnQgd2l0aCB0aGUgYChjbG9zZWQpYCBvdXRwdXQuXG5cdCAqL1xuXHRASW5wdXQoKSBkaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVHlwZSBvZiB0aGUgYWxlcnQuXG5cdCAqXG5cdCAqIEJvb3RzdHJhcCBwcm92aWRlcyBzdHlsZXMgZm9yIHRoZSBmb2xsb3dpbmcgdHlwZXM6IGAnc3VjY2VzcydgLCBgJ2luZm8nYCwgYCd3YXJuaW5nJ2AsIGAnZGFuZ2VyJ2AsIGAncHJpbWFyeSdgLFxuXHQgKiBgJ3NlY29uZGFyeSdgLCBgJ2xpZ2h0J2AgYW5kIGAnZGFyaydgLlxuXHQgKi9cblx0QElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkLiBJdCBoYXMgbm8gcGF5bG9hZCBhbmQgb25seSByZWxldmFudCBmb3IgZGlzbWlzc2libGUgYWxlcnRzLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBOZ2JBbGVydENvbmZpZywgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuXHRcdHRoaXMuZGlzbWlzc2libGUgPSBjb25maWcuZGlzbWlzc2libGU7XG5cdFx0dGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG5cdFx0dGhpcy5hbmltYXRpb24gPSBjb25maWcuYW5pbWF0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXJzIGFsZXJ0IGNsb3NpbmcgcHJvZ3JhbW1hdGljYWxseSAoc2FtZSBhcyBjbGlja2luZyBvbiB0aGUgY2xvc2UgYnV0dG9uICjDlykpLlxuXHQgKlxuXHQgKiBUaGUgcmV0dXJuZWQgb2JzZXJ2YWJsZSB3aWxsIGVtaXQgYW5kIGJlIGNvbXBsZXRlZCBvbmNlIHRoZSBjbG9zaW5nIHRyYW5zaXRpb24gaGFzIGZpbmlzaGVkLlxuXHQgKiBJZiB0aGUgYW5pbWF0aW9ucyBhcmUgdHVybmVkIG9mZiB0aGlzIGhhcHBlbnMgc3luY2hyb25vdXNseS5cblx0ICpcblx0ICogQWx0ZXJuYXRpdmVseSB5b3UgY291bGQgbGlzdGVuIG9yIHN1YnNjcmliZSB0byB0aGUgYChjbG9zZWQpYCBvdXRwdXRcblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRjbG9zZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcblx0XHRjb25zdCB0cmFuc2l0aW9uID0gbmdiUnVuVHJhbnNpdGlvbih0aGlzLl96b25lLCB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIG5nYkFsZXJ0RmFkaW5nVHJhbnNpdGlvbiwge1xuXHRcdFx0YW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbixcblx0XHRcdHJ1bm5pbmdUcmFuc2l0aW9uOiAnY29udGludWUnLFxuXHRcdH0pO1xuXHRcdHRyYW5zaXRpb24uc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VkLmVtaXQoKSk7XG5cdFx0cmV0dXJuIHRyYW5zaXRpb247XG5cdH1cbn1cbiJdfQ==