import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { fromEvent, Subject, zip } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { getFocusableBoundaryElements } from '../util/focus-trap';
import { Key } from '../util/key';
import { ModalDismissReasons } from './modal-dismiss-reasons';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { isString, reflow } from '../util/util';
import * as i0 from "@angular/core";
class NgbModalWindow {
    constructor(_document, _elRef, _zone) {
        this._document = _document;
        this._elRef = _elRef;
        this._zone = _zone;
        this._closed$ = new Subject();
        this._elWithFocus = null; // element that is focused prior to modal opening
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
        this.shown = new Subject();
        this.hidden = new Subject();
    }
    get fullscreenClass() {
        return this.fullscreen === true
            ? ' modal-fullscreen'
            : isString(this.fullscreen)
                ? ` modal-fullscreen-${this.fullscreen}-down`
                : '';
    }
    dismiss(reason) {
        this.dismissEvent.emit(reason);
    }
    ngOnInit() {
        this._elWithFocus = this._document.activeElement;
        this._zone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this._show();
        });
    }
    ngOnDestroy() {
        this._disableEventHandling();
    }
    hide() {
        const { nativeElement } = this._elRef;
        const context = { animation: this.animation, runningTransition: 'stop' };
        const windowTransition$ = ngbRunTransition(this._zone, nativeElement, () => nativeElement.classList.remove('show'), context);
        const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => { }, context);
        const transitions$ = zip(windowTransition$, dialogTransition$);
        transitions$.subscribe(() => {
            this.hidden.next();
            this.hidden.complete();
        });
        this._disableEventHandling();
        this._restoreFocus();
        return transitions$;
    }
    _show() {
        const context = { animation: this.animation, runningTransition: 'continue' };
        const windowTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, (element, animation) => {
            if (animation) {
                reflow(element);
            }
            element.classList.add('show');
        }, context);
        const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => { }, context);
        zip(windowTransition$, dialogTransition$).subscribe(() => {
            this.shown.next();
            this.shown.complete();
        });
        this._enableEventHandling();
        this._setFocus();
    }
    _enableEventHandling() {
        const { nativeElement } = this._elRef;
        this._zone.runOutsideAngular(() => {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(this._closed$), 
            /* eslint-disable-next-line deprecation/deprecation */
            filter((e) => e.which === Key.Escape))
                .subscribe((event) => {
                if (this.keyboard) {
                    requestAnimationFrame(() => {
                        if (!event.defaultPrevented) {
                            this._zone.run(() => this.dismiss(ModalDismissReasons.ESC));
                        }
                    });
                }
                else if (this.backdrop === 'static') {
                    this._bumpBackdrop();
                }
            });
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            let preventClose = false;
            fromEvent(this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(this._closed$), tap(() => (preventClose = false)), switchMap(() => fromEvent(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1))), filter(({ target }) => nativeElement === target))
                .subscribe(() => {
                preventClose = true;
            });
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click')
                .pipe(takeUntil(this._closed$))
                .subscribe(({ target }) => {
                if (nativeElement === target) {
                    if (this.backdrop === 'static') {
                        this._bumpBackdrop();
                    }
                    else if (this.backdrop === true && !preventClose) {
                        this._zone.run(() => this.dismiss(ModalDismissReasons.BACKDROP_CLICK));
                    }
                }
                preventClose = false;
            });
        });
    }
    _disableEventHandling() {
        this._closed$.next();
    }
    _setFocus() {
        const { nativeElement } = this._elRef;
        if (!nativeElement.contains(document.activeElement)) {
            const autoFocusable = nativeElement.querySelector(`[ngbAutofocus]`);
            const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            const elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    }
    _restoreFocus() {
        const body = this._document.body;
        const elWithFocus = this._elWithFocus;
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular(() => {
            setTimeout(() => elementToFocus.focus());
            this._elWithFocus = null;
        });
    }
    _bumpBackdrop() {
        if (this.backdrop === 'static') {
            ngbRunTransition(this._zone, this._elRef.nativeElement, ({ classList }) => {
                classList.add('modal-static');
                return () => classList.remove('modal-static');
            }, { animation: this.animation, runningTransition: 'continue' });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModalWindow, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbModalWindow, isStandalone: true, selector: "ngb-modal-window", inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", backdrop: "backdrop", centered: "centered", fullscreen: "fullscreen", keyboard: "keyboard", scrollable: "scrollable", size: "size", windowClass: "windowClass", modalDialogClass: "modalDialogClass" }, outputs: { dismissEvent: "dismiss" }, host: { attributes: { "role": "dialog", "tabindex": "-1" }, properties: { "class": "\"modal d-block\" + (windowClass ? \" \" + windowClass : \"\")", "class.fade": "animation", "attr.aria-modal": "true", "attr.aria-labelledby": "ariaLabelledBy", "attr.aria-describedby": "ariaDescribedBy" } }, viewQueries: [{ propertyName: "_dialogEl", first: true, predicate: ["dialog"], descendants: true, static: true }], ngImport: i0, template: `
		<div
			#dialog
			[class]="
				'modal-dialog' +
				(size ? ' modal-' + size : '') +
				(centered ? ' modal-dialog-centered' : '') +
				fullscreenClass +
				(scrollable ? ' modal-dialog-scrollable' : '') +
				(modalDialogClass ? ' ' + modalDialogClass : '')
			"
			role="document"
		>
			<div class="modal-content"><ng-content></ng-content></div>
		</div>
	`, isInline: true, styles: ["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbModalWindow };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModalWindow, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-modal-window', standalone: true, host: {
                        '[class]': '"modal d-block" + (windowClass ? " " + windowClass : "")',
                        '[class.fade]': 'animation',
                        role: 'dialog',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-describedby]': 'ariaDescribedBy',
                    }, template: `
		<div
			#dialog
			[class]="
				'modal-dialog' +
				(size ? ' modal-' + size : '') +
				(centered ? ' modal-dialog-centered' : '') +
				fullscreenClass +
				(scrollable ? ' modal-dialog-scrollable' : '') +
				(modalDialogClass ? ' ' + modalDialogClass : '')
			"
			role="document"
		>
			<div class="modal-content"><ng-content></ng-content></div>
		</div>
	`, encapsulation: ViewEncapsulation.None, styles: ["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { _dialogEl: [{
                type: ViewChild,
                args: ['dialog', { static: true }]
            }], animation: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaDescribedBy: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], centered: [{
                type: Input
            }], fullscreen: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], size: [{
                type: Input
            }], windowClass: [{
                type: Input
            }], modalDialogClass: [{
                type: Input
            }], dismissEvent: [{
                type: Output,
                args: ['dismiss']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNOLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBd0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFFaEQsTUErQmEsY0FBYztJQXVCMUIsWUFDMkIsU0FBYyxFQUNoQyxNQUErQixFQUMvQixLQUFhO1FBRkssY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUMvQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBekJkLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLGlCQUFZLEdBQW1CLElBQUksQ0FBQyxDQUFDLGlEQUFpRDtRQU9yRixhQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxhQUFRLEdB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LElBQUk7OzBCQTJCbkMsTUFBTTsyQkFBQyxRQUFROzBGQXBCOEIsU0FBUztzQkFBdkQsU0FBUzt1QkFBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUU1QixTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUVhLFlBQVk7c0JBQTlCLE1BQU07dUJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0RWxlbWVudFJlZixcblx0RXZlbnRFbWl0dGVyLFxuXHRJbmplY3QsXG5cdElucHV0LFxuXHROZ1pvbmUsXG5cdE9uRGVzdHJveSxcblx0T25Jbml0LFxuXHRPdXRwdXQsXG5cdFZpZXdDaGlsZCxcblx0Vmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YmplY3QsIHppcCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzIH0gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7IE1vZGFsRGlzbWlzc1JlYXNvbnMgfSBmcm9tICcuL21vZGFsLWRpc21pc3MtcmVhc29ucyc7XG5pbXBvcnQgeyBuZ2JSdW5UcmFuc2l0aW9uLCBOZ2JUcmFuc2l0aW9uT3B0aW9ucyB9IGZyb20gJy4uL3V0aWwvdHJhbnNpdGlvbi9uZ2JUcmFuc2l0aW9uJztcbmltcG9ydCB7IGlzU3RyaW5nLCByZWZsb3cgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2ItbW9kYWwtd2luZG93Jyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbY2xhc3NdJzogJ1wibW9kYWwgZC1ibG9ja1wiICsgKHdpbmRvd0NsYXNzID8gXCIgXCIgKyB3aW5kb3dDbGFzcyA6IFwiXCIpJyxcblx0XHQnW2NsYXNzLmZhZGVdJzogJ2FuaW1hdGlvbicsXG5cdFx0cm9sZTogJ2RpYWxvZycsXG5cdFx0dGFiaW5kZXg6ICctMScsXG5cdFx0J1thdHRyLmFyaWEtbW9kYWxdJzogJ3RydWUnLFxuXHRcdCdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbGxlZEJ5Jyxcblx0XHQnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnYXJpYURlc2NyaWJlZEJ5Jyxcblx0fSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2XG5cdFx0XHQjZGlhbG9nXG5cdFx0XHRbY2xhc3NdPVwiXG5cdFx0XHRcdCdtb2RhbC1kaWFsb2cnICtcblx0XHRcdFx0KHNpemUgPyAnIG1vZGFsLScgKyBzaXplIDogJycpICtcblx0XHRcdFx0KGNlbnRlcmVkID8gJyBtb2RhbC1kaWFsb2ctY2VudGVyZWQnIDogJycpICtcblx0XHRcdFx0ZnVsbHNjcmVlbkNsYXNzICtcblx0XHRcdFx0KHNjcm9sbGFibGUgPyAnIG1vZGFsLWRpYWxvZy1zY3JvbGxhYmxlJyA6ICcnKSArXG5cdFx0XHRcdChtb2RhbERpYWxvZ0NsYXNzID8gJyAnICsgbW9kYWxEaWFsb2dDbGFzcyA6ICcnKVxuXHRcdFx0XCJcblx0XHRcdHJvbGU9XCJkb2N1bWVudFwiXG5cdFx0PlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdGAsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdHN0eWxlVXJsczogWycuL21vZGFsLnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxXaW5kb3cgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cdHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRwcml2YXRlIF9lbFdpdGhGb2N1czogRWxlbWVudCB8IG51bGwgPSBudWxsOyAvLyBlbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXG5cblx0QFZpZXdDaGlsZCgnZGlhbG9nJywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBfZGlhbG9nRWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblx0QElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblx0QElucHV0KCkgYXJpYURlc2NyaWJlZEJ5OiBzdHJpbmc7XG5cdEBJbnB1dCgpIGJhY2tkcm9wOiBib29sZWFuIHwgc3RyaW5nID0gdHJ1ZTtcblx0QElucHV0KCkgY2VudGVyZWQ6IHN0cmluZztcblx0QElucHV0KCkgZnVsbHNjcmVlbjogc3RyaW5nIHwgYm9vbGVhbjtcblx0QElucHV0KCkga2V5Ym9hcmQgPSB0cnVlO1xuXHRASW5wdXQoKSBzY3JvbGxhYmxlOiBzdHJpbmc7XG5cdEBJbnB1dCgpIHNpemU6IHN0cmluZztcblx0QElucHV0KCkgd2luZG93Q2xhc3M6IHN0cmluZztcblx0QElucHV0KCkgbW9kYWxEaWFsb2dDbGFzczogc3RyaW5nO1xuXG5cdEBPdXRwdXQoJ2Rpc21pc3MnKSBkaXNtaXNzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0c2hvd24gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRoaWRkZW4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuXHRcdHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcblx0KSB7fVxuXG5cdGdldCBmdWxsc2NyZWVuQ2xhc3MoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5mdWxsc2NyZWVuID09PSB0cnVlXG5cdFx0XHQ/ICcgbW9kYWwtZnVsbHNjcmVlbidcblx0XHRcdDogaXNTdHJpbmcodGhpcy5mdWxsc2NyZWVuKVxuXHRcdFx0PyBgIG1vZGFsLWZ1bGxzY3JlZW4tJHt0aGlzLmZ1bGxzY3JlZW59LWRvd25gXG5cdFx0XHQ6ICcnO1xuXHR9XG5cblx0ZGlzbWlzcyhyZWFzb24pOiB2b2lkIHtcblx0XHR0aGlzLmRpc21pc3NFdmVudC5lbWl0KHJlYXNvbik7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0dGhpcy5fem9uZS5vblN0YWJsZVxuXHRcdFx0LmFzT2JzZXJ2YWJsZSgpXG5cdFx0XHQucGlwZSh0YWtlKDEpKVxuXHRcdFx0LnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX3Nob3coKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5fZGlzYWJsZUV2ZW50SGFuZGxpbmcoKTtcblx0fVxuXG5cdGhpZGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHRjb25zdCB7IG5hdGl2ZUVsZW1lbnQgfSA9IHRoaXMuX2VsUmVmO1xuXHRcdGNvbnN0IGNvbnRleHQ6IE5nYlRyYW5zaXRpb25PcHRpb25zPGFueT4gPSB7IGFuaW1hdGlvbjogdGhpcy5hbmltYXRpb24sIHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCcgfTtcblxuXHRcdGNvbnN0IHdpbmRvd1RyYW5zaXRpb24kID0gbmdiUnVuVHJhbnNpdGlvbihcblx0XHRcdHRoaXMuX3pvbmUsXG5cdFx0XHRuYXRpdmVFbGVtZW50LFxuXHRcdFx0KCkgPT4gbmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JyksXG5cdFx0XHRjb250ZXh0LFxuXHRcdCk7XG5cdFx0Y29uc3QgZGlhbG9nVHJhbnNpdGlvbiQgPSBuZ2JSdW5UcmFuc2l0aW9uKHRoaXMuX3pvbmUsIHRoaXMuX2RpYWxvZ0VsLm5hdGl2ZUVsZW1lbnQsICgpID0+IHt9LCBjb250ZXh0KTtcblxuXHRcdGNvbnN0IHRyYW5zaXRpb25zJCA9IHppcCh3aW5kb3dUcmFuc2l0aW9uJCwgZGlhbG9nVHJhbnNpdGlvbiQpO1xuXHRcdHRyYW5zaXRpb25zJC5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5oaWRkZW4ubmV4dCgpO1xuXHRcdFx0dGhpcy5oaWRkZW4uY29tcGxldGUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2Rpc2FibGVFdmVudEhhbmRsaW5nKCk7XG5cdFx0dGhpcy5fcmVzdG9yZUZvY3VzKCk7XG5cblx0XHRyZXR1cm4gdHJhbnNpdGlvbnMkO1xuXHR9XG5cblx0cHJpdmF0ZSBfc2hvdygpIHtcblx0XHRjb25zdCBjb250ZXh0OiBOZ2JUcmFuc2l0aW9uT3B0aW9uczxhbnk+ID0geyBhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLCBydW5uaW5nVHJhbnNpdGlvbjogJ2NvbnRpbnVlJyB9O1xuXG5cdFx0Y29uc3Qgd2luZG93VHJhbnNpdGlvbiQgPSBuZ2JSdW5UcmFuc2l0aW9uKFxuXHRcdFx0dGhpcy5fem9uZSxcblx0XHRcdHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGFuaW1hdGlvbjogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHRpZiAoYW5pbWF0aW9uKSB7XG5cdFx0XHRcdFx0cmVmbG93KGVsZW1lbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdFx0fSxcblx0XHRcdGNvbnRleHQsXG5cdFx0KTtcblx0XHRjb25zdCBkaWFsb2dUcmFuc2l0aW9uJCA9IG5nYlJ1blRyYW5zaXRpb24odGhpcy5fem9uZSwgdGhpcy5fZGlhbG9nRWwubmF0aXZlRWxlbWVudCwgKCkgPT4ge30sIGNvbnRleHQpO1xuXG5cdFx0emlwKHdpbmRvd1RyYW5zaXRpb24kLCBkaWFsb2dUcmFuc2l0aW9uJCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMuc2hvd24ubmV4dCgpO1xuXHRcdFx0dGhpcy5zaG93bi5jb21wbGV0ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fZW5hYmxlRXZlbnRIYW5kbGluZygpO1xuXHRcdHRoaXMuX3NldEZvY3VzKCk7XG5cdH1cblxuXHRwcml2YXRlIF9lbmFibGVFdmVudEhhbmRsaW5nKCkge1xuXHRcdGNvbnN0IHsgbmF0aXZlRWxlbWVudCB9ID0gdGhpcy5fZWxSZWY7XG5cdFx0dGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4obmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKVxuXHRcdFx0XHQucGlwZShcblx0XHRcdFx0XHR0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXG5cdFx0XHRcdFx0ZmlsdGVyKChlKSA9PiBlLndoaWNoID09PSBLZXkuRXNjYXBlKSxcblx0XHRcdFx0KVxuXHRcdFx0XHQuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLmtleWJvYXJkKSB7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmRpc21pc3MoTW9kYWxEaXNtaXNzUmVhc29ucy5FU0MpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmJhY2tkcm9wID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRcdFx0dGhpcy5fYnVtcEJhY2tkcm9wKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0Ly8gV2UncmUgbGlzdGVuaW5nIHRvICdtb3VzZWRvd24nIGFuZCAnbW91c2V1cCcgdG8gcHJldmVudCBtb2RhbCBmcm9tIGNsb3Npbmcgd2hlbiBwcmVzc2luZyB0aGUgbW91c2Vcblx0XHRcdC8vIGluc2lkZSB0aGUgbW9kYWwgZGlhbG9nIGFuZCByZWxlYXNpbmcgaXQgb3V0c2lkZVxuXHRcdFx0bGV0IHByZXZlbnRDbG9zZSA9IGZhbHNlO1xuXHRcdFx0ZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2RpYWxvZ0VsLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nKVxuXHRcdFx0XHQucGlwZShcblx0XHRcdFx0XHR0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksXG5cdFx0XHRcdFx0dGFwKCgpID0+IChwcmV2ZW50Q2xvc2UgPSBmYWxzZSkpLFxuXHRcdFx0XHRcdHN3aXRjaE1hcCgoKSA9PiBmcm9tRXZlbnQ8TW91c2VFdmVudD4obmF0aXZlRWxlbWVudCwgJ21vdXNldXAnKS5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSwgdGFrZSgxKSkpLFxuXHRcdFx0XHRcdGZpbHRlcigoeyB0YXJnZXQgfSkgPT4gbmF0aXZlRWxlbWVudCA9PT0gdGFyZ2V0KSxcblx0XHRcdFx0KVxuXHRcdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHRwcmV2ZW50Q2xvc2UgPSB0cnVlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0Ly8gV2UncmUgbGlzdGVuaW5nIHRvICdjbGljaycgdG8gZGlzbWlzcyBtb2RhbCBvbiBtb2RhbCB3aW5kb3cgY2xpY2ssIGV4Y2VwdCB3aGVuOlxuXHRcdFx0Ly8gMS4gY2xpY2tpbmcgb24gbW9kYWwgZGlhbG9nIGl0c2VsZlxuXHRcdFx0Ly8gMi4gY2xvc2luZyB3YXMgcHJldmVudGVkIGJ5IG1vdXNlZG93bi91cCBoYW5kbGVyc1xuXHRcdFx0Ly8gMy4gY2xpY2tpbmcgb24gc2Nyb2xsYmFyIHdoZW4gdGhlIHZpZXdwb3J0IGlzIHRvbyBzbWFsbCBhbmQgbW9kYWwgZG9lc24ndCBmaXQgKGNsaWNrIGlzIG5vdCB0cmlnZ2VyZWQgYXQgYWxsKVxuXHRcdFx0ZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdjbGljaycpXG5cdFx0XHRcdC5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSlcblx0XHRcdFx0LnN1YnNjcmliZSgoeyB0YXJnZXQgfSkgPT4ge1xuXHRcdFx0XHRcdGlmIChuYXRpdmVFbGVtZW50ID09PSB0YXJnZXQpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmJhY2tkcm9wID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9idW1wQmFja2Ryb3AoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5iYWNrZHJvcCA9PT0gdHJ1ZSAmJiAhcHJldmVudENsb3NlKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkJBQ0tEUk9QX0NMSUNLKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cHJldmVudENsb3NlID0gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfZGlzYWJsZUV2ZW50SGFuZGxpbmcoKSB7XG5cdFx0dGhpcy5fY2xvc2VkJC5uZXh0KCk7XG5cdH1cblxuXHRwcml2YXRlIF9zZXRGb2N1cygpIHtcblx0XHRjb25zdCB7IG5hdGl2ZUVsZW1lbnQgfSA9IHRoaXMuX2VsUmVmO1xuXHRcdGlmICghbmF0aXZlRWxlbWVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuXHRcdFx0Y29uc3QgYXV0b0ZvY3VzYWJsZSA9IG5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgW25nYkF1dG9mb2N1c11gKSBhcyBIVE1MRWxlbWVudDtcblx0XHRcdGNvbnN0IGZpcnN0Rm9jdXNhYmxlID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhuYXRpdmVFbGVtZW50KVswXTtcblxuXHRcdFx0Y29uc3QgZWxlbWVudFRvRm9jdXMgPSBhdXRvRm9jdXNhYmxlIHx8IGZpcnN0Rm9jdXNhYmxlIHx8IG5hdGl2ZUVsZW1lbnQ7XG5cdFx0XHRlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX3Jlc3RvcmVGb2N1cygpIHtcblx0XHRjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcblx0XHRjb25zdCBlbFdpdGhGb2N1cyA9IHRoaXMuX2VsV2l0aEZvY3VzO1xuXG5cdFx0bGV0IGVsZW1lbnRUb0ZvY3VzO1xuXHRcdGlmIChlbFdpdGhGb2N1cyAmJiBlbFdpdGhGb2N1c1snZm9jdXMnXSAmJiBib2R5LmNvbnRhaW5zKGVsV2l0aEZvY3VzKSkge1xuXHRcdFx0ZWxlbWVudFRvRm9jdXMgPSBlbFdpdGhGb2N1cztcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbWVudFRvRm9jdXMgPSBib2R5O1xuXHRcdH1cblx0XHR0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZWxlbWVudFRvRm9jdXMuZm9jdXMoKSk7XG5cdFx0XHR0aGlzLl9lbFdpdGhGb2N1cyA9IG51bGw7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF9idW1wQmFja2Ryb3AoKSB7XG5cdFx0aWYgKHRoaXMuYmFja2Ryb3AgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRuZ2JSdW5UcmFuc2l0aW9uKFxuXHRcdFx0XHR0aGlzLl96b25lLFxuXHRcdFx0XHR0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHQoeyBjbGFzc0xpc3QgfSkgPT4ge1xuXHRcdFx0XHRcdGNsYXNzTGlzdC5hZGQoJ21vZGFsLXN0YXRpYycpO1xuXHRcdFx0XHRcdHJldHVybiAoKSA9PiBjbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1zdGF0aWMnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0eyBhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLCBydW5uaW5nVHJhbnNpdGlvbjogJ2NvbnRpbnVlJyB9LFxuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==