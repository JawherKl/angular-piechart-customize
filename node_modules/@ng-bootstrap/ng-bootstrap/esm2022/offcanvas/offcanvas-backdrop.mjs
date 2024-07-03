import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { reflow } from '../util/util';
import { OffcanvasDismissReasons } from './offcanvas-dismiss-reasons';
import * as i0 from "@angular/core";
class NgbOffcanvasBackdrop {
    constructor(_el, _zone) {
        this._el = _el;
        this._zone = _zone;
        this.dismissEvent = new EventEmitter();
    }
    ngOnInit() {
        this._zone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            ngbRunTransition(this._zone, this._el.nativeElement, (element, animation) => {
                if (animation) {
                    reflow(element);
                }
                element.classList.add('show');
            }, { animation: this.animation, runningTransition: 'continue' });
        });
    }
    hide() {
        return ngbRunTransition(this._zone, this._el.nativeElement, ({ classList }) => classList.remove('show'), {
            animation: this.animation,
            runningTransition: 'stop',
        });
    }
    dismiss() {
        if (!this.static) {
            this.dismissEvent.emit(OffcanvasDismissReasons.BACKDROP_CLICK);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvasBackdrop, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbOffcanvasBackdrop, isStandalone: true, selector: "ngb-offcanvas-backdrop", inputs: { animation: "animation", backdropClass: "backdropClass", static: "static" }, outputs: { dismissEvent: "dismiss" }, host: { listeners: { "mousedown": "dismiss()" }, properties: { "class": "\"offcanvas-backdrop\" + (backdropClass ? \" \" + backdropClass : \"\")", "class.show": "!animation", "class.fade": "animation" } }, ngImport: i0, template: '', isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbOffcanvasBackdrop };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvasBackdrop, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-offcanvas-backdrop',
                    standalone: true,
                    encapsulation: ViewEncapsulation.None,
                    template: '',
                    host: {
                        '[class]': '"offcanvas-backdrop" + (backdropClass ? " " + backdropClass : "")',
                        '[class.show]': '!animation',
                        '[class.fade]': 'animation',
                        '(mousedown)': 'dismiss()',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { animation: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], static: [{
                type: Input
            }], dismissEvent: [{
                type: Output,
                args: ['dismiss']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2FudmFzLWJhY2tkcm9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL29mZmNhbnZhcy9vZmZjYW52YXMtYmFja2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFrQixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdEgsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBRXRFLE1BWWEsb0JBQW9CO0lBT2hDLFlBQW9CLEdBQTRCLEVBQVUsS0FBYTtRQUFuRCxRQUFHLEdBQUgsR0FBRyxDQUF5QjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFGcEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRXFCLENBQUM7SUFFM0UsUUFBUTtRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTthQUNqQixZQUFZLEVBQUU7YUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2IsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNmLGdCQUFnQixDQUNmLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQ3RCLENBQUMsT0FBb0IsRUFBRSxTQUFrQixFQUFFLEVBQUU7Z0JBQzVDLElBQUksU0FBUyxFQUFFO29CQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxFQUNELEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLENBQzVELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0gsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4RyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsaUJBQWlCLEVBQUUsTUFBTTtTQUN6QixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0YsQ0FBQzs4R0F2Q1csb0JBQW9CO2tHQUFwQixvQkFBb0IsNFpBUnRCLEVBQUU7O1NBUUEsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBWmhDLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsRUFBRTtvQkFDWixJQUFJLEVBQUU7d0JBQ0wsU0FBUyxFQUFFLG1FQUFtRTt3QkFDOUUsY0FBYyxFQUFFLFlBQVk7d0JBQzVCLGNBQWMsRUFBRSxXQUFXO3dCQUMzQixhQUFhLEVBQUUsV0FBVztxQkFDMUI7aUJBQ0Q7c0hBRVMsU0FBUztzQkFBakIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFFYSxZQUFZO3NCQUE5QixNQUFNO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25Jbml0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG5nYlJ1blRyYW5zaXRpb24gfSBmcm9tICcuLi91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbic7XG5pbXBvcnQgeyByZWZsb3cgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgT2ZmY2FudmFzRGlzbWlzc1JlYXNvbnMgfSBmcm9tICcuL29mZmNhbnZhcy1kaXNtaXNzLXJlYXNvbnMnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2Itb2ZmY2FudmFzLWJhY2tkcm9wJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0dGVtcGxhdGU6ICcnLFxuXHRob3N0OiB7XG5cdFx0J1tjbGFzc10nOiAnXCJvZmZjYW52YXMtYmFja2Ryb3BcIiArIChiYWNrZHJvcENsYXNzID8gXCIgXCIgKyBiYWNrZHJvcENsYXNzIDogXCJcIiknLFxuXHRcdCdbY2xhc3Muc2hvd10nOiAnIWFuaW1hdGlvbicsXG5cdFx0J1tjbGFzcy5mYWRlXSc6ICdhbmltYXRpb24nLFxuXHRcdCcobW91c2Vkb3duKSc6ICdkaXNtaXNzKCknLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JPZmZjYW52YXNCYWNrZHJvcCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblx0QElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nO1xuXHRASW5wdXQoKSBzdGF0aWM6IGJvb2xlYW47XG5cblx0QE91dHB1dCgnZGlzbWlzcycpIGRpc21pc3NFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLl96b25lLm9uU3RhYmxlXG5cdFx0XHQuYXNPYnNlcnZhYmxlKClcblx0XHRcdC5waXBlKHRha2UoMSkpXG5cdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0bmdiUnVuVHJhbnNpdGlvbihcblx0XHRcdFx0XHR0aGlzLl96b25lLFxuXHRcdFx0XHRcdHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRcdFx0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbmltYXRpb246IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHRcdGlmIChhbmltYXRpb24pIHtcblx0XHRcdFx0XHRcdFx0cmVmbG93KGVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7IGFuaW1hdGlvbjogdGhpcy5hbmltYXRpb24sIHJ1bm5pbmdUcmFuc2l0aW9uOiAnY29udGludWUnIH0sXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGhpZGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG5cdFx0cmV0dXJuIG5nYlJ1blRyYW5zaXRpb24odGhpcy5fem9uZSwgdGhpcy5fZWwubmF0aXZlRWxlbWVudCwgKHsgY2xhc3NMaXN0IH0pID0+IGNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKSwge1xuXHRcdFx0YW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbixcblx0XHRcdHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCcsXG5cdFx0fSk7XG5cdH1cblxuXHRkaXNtaXNzKCkge1xuXHRcdGlmICghdGhpcy5zdGF0aWMpIHtcblx0XHRcdHRoaXMuZGlzbWlzc0V2ZW50LmVtaXQoT2ZmY2FudmFzRGlzbWlzc1JlYXNvbnMuQkFDS0RST1BfQ0xJQ0spO1xuXHRcdH1cblx0fVxufVxuIl19