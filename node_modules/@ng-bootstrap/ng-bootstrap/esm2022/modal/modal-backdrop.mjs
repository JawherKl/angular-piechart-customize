import { Component, Input, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { reflow } from '../util/util';
import * as i0 from "@angular/core";
class NgbModalBackdrop {
    constructor(_el, _zone) {
        this._el = _el;
        this._zone = _zone;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModalBackdrop, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbModalBackdrop, isStandalone: true, selector: "ngb-modal-backdrop", inputs: { animation: "animation", backdropClass: "backdropClass" }, host: { properties: { "class": "\"modal-backdrop\" + (backdropClass ? \" \" + backdropClass : \"\")", "class.show": "!animation", "class.fade": "animation" }, styleAttribute: "z-index: 1055" }, ngImport: i0, template: '', isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbModalBackdrop };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModalBackdrop, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-modal-backdrop',
                    standalone: true,
                    encapsulation: ViewEncapsulation.None,
                    template: '',
                    host: {
                        '[class]': '"modal-backdrop" + (backdropClass ? " " + backdropClass : "")',
                        '[class.show]': '!animation',
                        '[class.fade]': 'animation',
                        style: 'z-index: 1055',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { animation: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYmFja2Ryb3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kYWwvbW9kYWwtYmFja2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQWtCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2hHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUV0QyxNQVlhLGdCQUFnQjtJQUk1QixZQUFvQixHQUE0QixFQUFVLEtBQWE7UUFBbkQsUUFBRyxHQUFILEdBQUcsQ0FBeUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUUzRSxRQUFRO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2FBQ2pCLFlBQVksRUFBRTthQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2YsZ0JBQWdCLENBQ2YsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFDdEIsQ0FBQyxPQUFvQixFQUFFLFNBQWtCLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxTQUFTLEVBQUU7b0JBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixDQUFDLEVBQ0QsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsQ0FDNUQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDSCxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hHLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixpQkFBaUIsRUFBRSxNQUFNO1NBQ3pCLENBQUMsQ0FBQztJQUNKLENBQUM7OEdBOUJXLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLG9WQVJsQixFQUFFOztTQVFBLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQVo1QixTQUFTO21CQUFDO29CQUNWLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLEVBQUU7b0JBQ1osSUFBSSxFQUFFO3dCQUNMLFNBQVMsRUFBRSwrREFBK0Q7d0JBQzFFLGNBQWMsRUFBRSxZQUFZO3dCQUM1QixjQUFjLEVBQUUsV0FBVzt3QkFDM0IsS0FBSyxFQUFFLGVBQWU7cUJBQ3RCO2lCQUNEO3NIQUVTLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE5nWm9uZSwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBuZ2JSdW5UcmFuc2l0aW9uIH0gZnJvbSAnLi4vdXRpbC90cmFuc2l0aW9uL25nYlRyYW5zaXRpb24nO1xuaW1wb3J0IHsgcmVmbG93IH0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLW1vZGFsLWJhY2tkcm9wJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0dGVtcGxhdGU6ICcnLFxuXHRob3N0OiB7XG5cdFx0J1tjbGFzc10nOiAnXCJtb2RhbC1iYWNrZHJvcFwiICsgKGJhY2tkcm9wQ2xhc3MgPyBcIiBcIiArIGJhY2tkcm9wQ2xhc3MgOiBcIlwiKScsXG5cdFx0J1tjbGFzcy5zaG93XSc6ICchYW5pbWF0aW9uJyxcblx0XHQnW2NsYXNzLmZhZGVdJzogJ2FuaW1hdGlvbicsXG5cdFx0c3R5bGU6ICd6LWluZGV4OiAxMDU1Jyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxCYWNrZHJvcCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblx0QElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuX3pvbmUub25TdGFibGVcblx0XHRcdC5hc09ic2VydmFibGUoKVxuXHRcdFx0LnBpcGUodGFrZSgxKSlcblx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRuZ2JSdW5UcmFuc2l0aW9uKFxuXHRcdFx0XHRcdHRoaXMuX3pvbmUsXG5cdFx0XHRcdFx0dGhpcy5fZWwubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0XHQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGFuaW1hdGlvbjogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGFuaW1hdGlvbikge1xuXHRcdFx0XHRcdFx0XHRyZWZsb3coZWxlbWVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgYW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbiwgcnVubmluZ1RyYW5zaXRpb246ICdjb250aW51ZScgfSxcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHR9XG5cblx0aGlkZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcblx0XHRyZXR1cm4gbmdiUnVuVHJhbnNpdGlvbih0aGlzLl96b25lLCB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAoeyBjbGFzc0xpc3QgfSkgPT4gY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpLCB7XG5cdFx0XHRhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLFxuXHRcdFx0cnVubmluZ1RyYW5zaXRpb246ICdzdG9wJyxcblx0XHR9KTtcblx0fVxufVxuIl19