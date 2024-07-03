import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, ViewEncapsulation, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { getFocusableBoundaryElements } from '../util/focus-trap';
import { Key } from '../util/key';
import { OffcanvasDismissReasons } from './offcanvas-dismiss-reasons';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { reflow } from '../util/util';
import * as i0 from "@angular/core";
class NgbOffcanvasPanel {
    constructor(_document, _elRef, _zone) {
        this._document = _document;
        this._elRef = _elRef;
        this._zone = _zone;
        this._closed$ = new Subject();
        this._elWithFocus = null; // element that is focused prior to offcanvas opening
        this.keyboard = true;
        this.position = 'start';
        this.dismissEvent = new EventEmitter();
        this.shown = new Subject();
        this.hidden = new Subject();
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
        const offcanvasTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, (element) => {
            nativeElement.classList.remove('showing');
            nativeElement.classList.add('hiding');
            return () => nativeElement.classList.remove('show', 'hiding');
        }, context);
        offcanvasTransition$.subscribe(() => {
            this.hidden.next();
            this.hidden.complete();
        });
        this._disableEventHandling();
        this._restoreFocus();
        return offcanvasTransition$;
    }
    _show() {
        const context = { animation: this.animation, runningTransition: 'continue' };
        const offcanvasTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, (element, animation) => {
            if (animation) {
                reflow(element);
            }
            element.classList.add('show', 'showing');
            return () => element.classList.remove('showing');
        }, context);
        offcanvasTransition$.subscribe(() => {
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
                            this._zone.run(() => this.dismiss(OffcanvasDismissReasons.ESC));
                        }
                    });
                }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvasPanel, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbOffcanvasPanel, isStandalone: true, selector: "ngb-offcanvas-panel", inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", keyboard: "keyboard", panelClass: "panelClass", position: "position" }, outputs: { dismissEvent: "dismiss" }, host: { attributes: { "role": "dialog", "tabindex": "-1" }, properties: { "class": "\"offcanvas offcanvas-\" + position  + (panelClass ? \" \" + panelClass : \"\")", "attr.aria-modal": "true", "attr.aria-labelledby": "ariaLabelledBy", "attr.aria-describedby": "ariaDescribedBy" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbOffcanvasPanel };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvasPanel, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-offcanvas-panel', standalone: true, template: '<ng-content></ng-content>', encapsulation: ViewEncapsulation.None, host: {
                        '[class]': '"offcanvas offcanvas-" + position  + (panelClass ? " " + panelClass : "")',
                        role: 'dialog',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-describedby]': 'ariaDescribedBy',
                    } }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { animation: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaDescribedBy: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], position: [{
                type: Input
            }], dismissEvent: [{
                type: Output,
                args: ['dismiss']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2FudmFzLXBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL29mZmNhbnZhcy9vZmZjYW52YXMtcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTixTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsTUFBTSxFQUNOLGlCQUFpQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBd0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUV0QyxNQWVhLGlCQUFpQjtJQWdCN0IsWUFDMkIsU0FBYyxFQUNoQyxNQUErQixFQUMvQixLQUFhO1FBRkssY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUMvQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBbEJkLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLGlCQUFZLEdBQW1CLElBQUksQ0FBQyxDQUFDLHFEQUFxRDtRQUt6RixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLGFBQVEsR0FBdUMsT0FBTyxDQUFDO1FBRTdDLGlCQUFZLEdBQUcsSUFBSSxZQUFZ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QyxNQUFNOzJCQUFDLFFBQVE7MEZBYlIsU0FBUztzQkFBakIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRWEsWUFBWTtzQkFBOUIsTUFBTTt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdEluamVjdCxcblx0SW5wdXQsXG5cdE5nWm9uZSxcblx0T25EZXN0cm95LFxuXHRPbkluaXQsXG5cdE91dHB1dCxcblx0Vmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzIH0gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7IE9mZmNhbnZhc0Rpc21pc3NSZWFzb25zIH0gZnJvbSAnLi9vZmZjYW52YXMtZGlzbWlzcy1yZWFzb25zJztcbmltcG9ydCB7IG5nYlJ1blRyYW5zaXRpb24sIE5nYlRyYW5zaXRpb25PcHRpb25zIH0gZnJvbSAnLi4vdXRpbC90cmFuc2l0aW9uL25nYlRyYW5zaXRpb24nO1xuaW1wb3J0IHsgcmVmbG93IH0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLW9mZmNhbnZhcy1wYW5lbCcsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdHN0eWxlVXJsczogW10sXG5cdGhvc3Q6IHtcblx0XHQnW2NsYXNzXSc6ICdcIm9mZmNhbnZhcyBvZmZjYW52YXMtXCIgKyBwb3NpdGlvbiAgKyAocGFuZWxDbGFzcyA/IFwiIFwiICsgcGFuZWxDbGFzcyA6IFwiXCIpJyxcblx0XHRyb2xlOiAnZGlhbG9nJyxcblx0XHR0YWJpbmRleDogJy0xJyxcblx0XHQnW2F0dHIuYXJpYS1tb2RhbF0nOiAndHJ1ZScsXG5cdFx0J1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkQnknLFxuXHRcdCdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdhcmlhRGVzY3JpYmVkQnknLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JPZmZjYW52YXNQYW5lbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblx0cHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cdHByaXZhdGUgX2VsV2l0aEZvY3VzOiBFbGVtZW50IHwgbnVsbCA9IG51bGw7IC8vIGVsZW1lbnQgdGhhdCBpcyBmb2N1c2VkIHByaW9yIHRvIG9mZmNhbnZhcyBvcGVuaW5nXG5cblx0QElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xuXHRASW5wdXQoKSBhcmlhTGFiZWxsZWRCeT86IHN0cmluZztcblx0QElucHV0KCkgYXJpYURlc2NyaWJlZEJ5Pzogc3RyaW5nO1xuXHRASW5wdXQoKSBrZXlib2FyZCA9IHRydWU7XG5cdEBJbnB1dCgpIHBhbmVsQ2xhc3M6IHN0cmluZztcblx0QElucHV0KCkgcG9zaXRpb246ICdzdGFydCcgfCAnZW5kJyB8ICd0b3AnIHwgJ2JvdHRvbScgPSAnc3RhcnQnO1xuXG5cdEBPdXRwdXQoJ2Rpc21pc3MnKSBkaXNtaXNzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0c2hvd24gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRoaWRkZW4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuXHRcdHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcblx0KSB7fVxuXG5cdGRpc21pc3MocmVhc29uKTogdm9pZCB7XG5cdFx0dGhpcy5kaXNtaXNzRXZlbnQuZW1pdChyZWFzb24pO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHRcdHRoaXMuX3pvbmUub25TdGFibGVcblx0XHRcdC5hc09ic2VydmFibGUoKVxuXHRcdFx0LnBpcGUodGFrZSgxKSlcblx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9zaG93KCk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMuX2Rpc2FibGVFdmVudEhhbmRsaW5nKCk7XG5cdH1cblxuXHRoaWRlKCk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0Y29uc3QgeyBuYXRpdmVFbGVtZW50IH0gPSB0aGlzLl9lbFJlZjtcblx0XHRjb25zdCBjb250ZXh0OiBOZ2JUcmFuc2l0aW9uT3B0aW9uczxhbnk+ID0geyBhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLCBydW5uaW5nVHJhbnNpdGlvbjogJ3N0b3AnIH07XG5cblx0XHRjb25zdCBvZmZjYW52YXNUcmFuc2l0aW9uJCA9IG5nYlJ1blRyYW5zaXRpb24oXG5cdFx0XHR0aGlzLl96b25lLFxuXHRcdFx0dGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCxcblx0XHRcdChlbGVtZW50KSA9PiB7XG5cdFx0XHRcdG5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd2luZycpO1xuXHRcdFx0XHRuYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGluZycpO1xuXHRcdFx0XHRyZXR1cm4gKCkgPT4gbmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JywgJ2hpZGluZycpO1xuXHRcdFx0fSxcblx0XHRcdGNvbnRleHQsXG5cdFx0KTtcblxuXHRcdG9mZmNhbnZhc1RyYW5zaXRpb24kLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLmhpZGRlbi5uZXh0KCk7XG5cdFx0XHR0aGlzLmhpZGRlbi5jb21wbGV0ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fZGlzYWJsZUV2ZW50SGFuZGxpbmcoKTtcblx0XHR0aGlzLl9yZXN0b3JlRm9jdXMoKTtcblxuXHRcdHJldHVybiBvZmZjYW52YXNUcmFuc2l0aW9uJDtcblx0fVxuXG5cdHByaXZhdGUgX3Nob3coKSB7XG5cdFx0Y29uc3QgY29udGV4dDogTmdiVHJhbnNpdGlvbk9wdGlvbnM8YW55PiA9IHsgYW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbiwgcnVubmluZ1RyYW5zaXRpb246ICdjb250aW51ZScgfTtcblxuXHRcdGNvbnN0IG9mZmNhbnZhc1RyYW5zaXRpb24kID0gbmdiUnVuVHJhbnNpdGlvbihcblx0XHRcdHRoaXMuX3pvbmUsXG5cdFx0XHR0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbmltYXRpb246IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0aWYgKGFuaW1hdGlvbikge1xuXHRcdFx0XHRcdHJlZmxvdyhlbGVtZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnLCAnc2hvd2luZycpO1xuXHRcdFx0XHRyZXR1cm4gKCkgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93aW5nJyk7XG5cdFx0XHR9LFxuXHRcdFx0Y29udGV4dCxcblx0XHQpO1xuXG5cdFx0b2ZmY2FudmFzVHJhbnNpdGlvbiQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMuc2hvd24ubmV4dCgpO1xuXHRcdFx0dGhpcy5zaG93bi5jb21wbGV0ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fZW5hYmxlRXZlbnRIYW5kbGluZygpO1xuXHRcdHRoaXMuX3NldEZvY3VzKCk7XG5cdH1cblxuXHRwcml2YXRlIF9lbmFibGVFdmVudEhhbmRsaW5nKCkge1xuXHRcdGNvbnN0IHsgbmF0aXZlRWxlbWVudCB9ID0gdGhpcy5fZWxSZWY7XG5cdFx0dGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4obmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKVxuXHRcdFx0XHQucGlwZShcblx0XHRcdFx0XHR0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXG5cdFx0XHRcdFx0ZmlsdGVyKChlKSA9PiBlLndoaWNoID09PSBLZXkuRXNjYXBlKSxcblx0XHRcdFx0KVxuXHRcdFx0XHQuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLmtleWJvYXJkKSB7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmRpc21pc3MoT2ZmY2FudmFzRGlzbWlzc1JlYXNvbnMuRVNDKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF9kaXNhYmxlRXZlbnRIYW5kbGluZygpIHtcblx0XHR0aGlzLl9jbG9zZWQkLm5leHQoKTtcblx0fVxuXG5cdHByaXZhdGUgX3NldEZvY3VzKCkge1xuXHRcdGNvbnN0IHsgbmF0aXZlRWxlbWVudCB9ID0gdGhpcy5fZWxSZWY7XG5cdFx0aWYgKCFuYXRpdmVFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG5cdFx0XHRjb25zdCBhdXRvRm9jdXNhYmxlID0gbmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbbmdiQXV0b2ZvY3VzXWApIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0Y29uc3QgZmlyc3RGb2N1c2FibGUgPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKG5hdGl2ZUVsZW1lbnQpWzBdO1xuXG5cdFx0XHRjb25zdCBlbGVtZW50VG9Gb2N1cyA9IGF1dG9Gb2N1c2FibGUgfHwgZmlyc3RGb2N1c2FibGUgfHwgbmF0aXZlRWxlbWVudDtcblx0XHRcdGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfcmVzdG9yZUZvY3VzKCkge1xuXHRcdGNvbnN0IGJvZHkgPSB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXHRcdGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5fZWxXaXRoRm9jdXM7XG5cblx0XHRsZXQgZWxlbWVudFRvRm9jdXM7XG5cdFx0aWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzWydmb2N1cyddICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XG5cdFx0XHRlbGVtZW50VG9Gb2N1cyA9IGVsV2l0aEZvY3VzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XG5cdFx0fVxuXHRcdHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBlbGVtZW50VG9Gb2N1cy5mb2N1cygpKTtcblx0XHRcdHRoaXMuX2VsV2l0aEZvY3VzID0gbnVsbDtcblx0XHR9KTtcblx0fVxufVxuIl19