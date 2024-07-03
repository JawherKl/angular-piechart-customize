import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BarOrientation } from './types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SvgLinearGradientComponent {
    constructor() {
        this.orientation = BarOrientation.Vertical;
    }
    ngOnChanges(changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === BarOrientation.Horizontal) {
            this.x2 = '100%';
        }
        else if (this.orientation === BarOrientation.Vertical) {
            this.y1 = '100%';
        }
    }
}
SvgLinearGradientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: SvgLinearGradientComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SvgLinearGradientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: { orientation: "orientation", name: "name", stops: "stops" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:linearGradient [id]="name" [attr.x1]="x1" [attr.y1]="y1" [attr.x2]="x2" [attr.y2]="y2">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:linearGradient>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: SvgLinearGradientComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-svg-linear-gradient]',
                    template: `
    <svg:linearGradient [id]="name" [attr.x1]="x1" [attr.y1]="y1" [attr.x2]="x2" [attr.y2]="y2">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:linearGradient>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { orientation: [{
                type: Input
            }], name: [{
                type: Input
            }], stops: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWxpbmVhci1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3N2Zy1saW5lYXItZ3JhZGllbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0Qix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7OztBQWlCOUQsTUFBTSxPQUFPLDBCQUEwQjtJQWR2QztRQWVXLGdCQUFXLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQztLQXFCaEQ7SUFaQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFZixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUNsRCxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztTQUNsQjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxjQUFjLENBQUMsUUFBUSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQzs7dUhBckJVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLG9LQVozQjs7Ozs7Ozs7O0dBU1Q7MkZBR1UsMEJBQTBCO2tCQWR0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUVVLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi90eXBlcy9iYXItb3JpZW50YXRpb24uZW51bSc7XG5pbXBvcnQgeyBHcmFkaWVudCB9IGZyb20gJy4vdHlwZXMvZ3JhZGllbnQuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmxpbmVhckdyYWRpZW50IFtpZF09XCJuYW1lXCIgW2F0dHIueDFdPVwieDFcIiBbYXR0ci55MV09XCJ5MVwiIFthdHRyLngyXT1cIngyXCIgW2F0dHIueTJdPVwieTJcIj5cbiAgICAgIDxzdmc6c3RvcFxuICAgICAgICAqbmdGb3I9XCJsZXQgc3RvcCBvZiBzdG9wc1wiXG4gICAgICAgIFthdHRyLm9mZnNldF09XCJzdG9wLm9mZnNldCArICclJ1wiXG4gICAgICAgIFtzdHlsZS5zdG9wLWNvbG9yXT1cInN0b3AuY29sb3JcIlxuICAgICAgICBbc3R5bGUuc3RvcC1vcGFjaXR5XT1cInN0b3Aub3BhY2l0eVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmxpbmVhckdyYWRpZW50PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTdmdMaW5lYXJHcmFkaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uID0gQmFyT3JpZW50YXRpb24uVmVydGljYWw7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgc3RvcHM6IEdyYWRpZW50W107XG5cbiAgeDE6IHN0cmluZztcbiAgeDI6IHN0cmluZztcbiAgeTE6IHN0cmluZztcbiAgeTI6IHN0cmluZztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy54MSA9ICcwJSc7XG4gICAgdGhpcy54MiA9ICcwJSc7XG4gICAgdGhpcy55MSA9ICcwJSc7XG4gICAgdGhpcy55MiA9ICcwJSc7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gQmFyT3JpZW50YXRpb24uSG9yaXpvbnRhbCkge1xuICAgICAgdGhpcy54MiA9ICcxMDAlJztcbiAgICB9IGVsc2UgaWYgKHRoaXMub3JpZW50YXRpb24gPT09IEJhck9yaWVudGF0aW9uLlZlcnRpY2FsKSB7XG4gICAgICB0aGlzLnkxID0gJzEwMCUnO1xuICAgIH1cbiAgfVxufVxuIl19