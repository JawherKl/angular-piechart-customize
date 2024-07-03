import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
export class CircleComponent {
    constructor() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    onClick() {
        this.select.emit(this.data);
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
    ngOnChanges(changes) {
        this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
        this.classNames += 'circle';
    }
}
CircleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CircleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CircleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: CircleComponent, selector: "g[ngx-charts-circle]", inputs: { cx: "cx", cy: "cy", r: "r", fill: "fill", stroke: "stroke", data: "data", classNames: "classNames", circleOpacity: "circleOpacity", pointerEvents: "pointerEvents" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, host: { listeners: { "click": "onClick()", "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, usesOnChanges: true, ngImport: i0, template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CircleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-circle]',
                    template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { cx: [{
                type: Input
            }], cy: [{
                type: Input
            }], r: [{
                type: Input
            }], fill: [{
                type: Input
            }], stroke: [{
                type: Input
            }], data: [{
                type: Input
            }], classNames: [{
                type: Input
            }], circleOpacity: [{
                type: Input
            }], pointerEvents: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vY2lyY2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUVaLHVCQUF1QixFQUN2QixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7O0FBa0J2QixNQUFNLE9BQU8sZUFBZTtJQWhCNUI7UUEyQlksV0FBTSxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELGFBQVEsR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3RCxlQUFVLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7S0FxQjFFO0lBbEJDLE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDO0lBQzlCLENBQUM7OzRHQWpDVSxlQUFlO2dHQUFmLGVBQWUsK2JBZGhCOzs7Ozs7Ozs7OztHQVdUOzJGQUdVLGVBQWU7a0JBaEIzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7R0FXVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBRVUsRUFBRTtzQkFBVixLQUFLO2dCQUNHLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxDQUFDO3NCQUFULEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFHUCxPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTztnQkFNckIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7Z0JBTTFCLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEhvc3RMaXN0ZW5lclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWNpcmNsZV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6Y2lyY2xlXG4gICAgICBbYXR0ci5jeF09XCJjeFwiXG4gICAgICBbYXR0ci5jeV09XCJjeVwiXG4gICAgICBbYXR0ci5yXT1cInJcIlxuICAgICAgW2F0dHIuZmlsbF09XCJmaWxsXCJcbiAgICAgIFthdHRyLnN0cm9rZV09XCJzdHJva2VcIlxuICAgICAgW2F0dHIub3BhY2l0eV09XCJjaXJjbGVPcGFjaXR5XCJcbiAgICAgIFthdHRyLmNsYXNzXT1cImNsYXNzTmFtZXNcIlxuICAgICAgW2F0dHIucG9pbnRlci1ldmVudHNdPVwicG9pbnRlckV2ZW50c1wiXG4gICAgLz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2lyY2xlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY3g6IG51bWJlcjtcbiAgQElucHV0KCkgY3k6IG51bWJlcjtcbiAgQElucHV0KCkgcjogbnVtYmVyO1xuICBASW5wdXQoKSBmaWxsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0cm9rZTogc3RyaW5nO1xuICBASW5wdXQoKSBkYXRhOiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsYXNzTmFtZXM6IHN0cmluZ1tdIHwgc3RyaW5nO1xuICBASW5wdXQoKSBjaXJjbGVPcGFjaXR5OiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvaW50ZXJFdmVudHM6IHN0cmluZztcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8bnVtYmVyIHwgc3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8bnVtYmVyIHwgc3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxudW1iZXIgfCBzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuY2xhc3NOYW1lcyA9IEFycmF5LmlzQXJyYXkodGhpcy5jbGFzc05hbWVzKSA/IHRoaXMuY2xhc3NOYW1lcy5qb2luKCcgJykgOiAnJztcbiAgICB0aGlzLmNsYXNzTmFtZXMgKz0gJ2NpcmNsZSc7XG4gIH1cbn1cbiJdfQ==