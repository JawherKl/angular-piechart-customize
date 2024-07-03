import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BsCustomDatesViewComponent {
    constructor() {
        this.onSelect = new EventEmitter();
    }
    selectFromRanges(range) {
        this.onSelect.emit(range);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsCustomDatesViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.4", type: BsCustomDatesViewComponent, selector: "bs-custom-date-view", inputs: { ranges: "ranges", selectedRange: "selectedRange", customRangeLabel: "customRangeLabel" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges"
        type="button"
        class="btn"
        (click)="selectFromRanges(range)"
        [class.selected]="range.value === selectedRange">
        {{ range.label }}
      </button>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsCustomDatesViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-custom-date-view',
                    template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges"
        type="button"
        class="btn"
        (click)="selectFromRanges(range)"
        [class.selected]="range.value === selectedRange">
        {{ range.label }}
      </button>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { ranges: [{
                type: Input
            }], selectedRange: [{
                type: Input
            }], customRangeLabel: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtY3VzdG9tLWRhdGVzLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdGhlbWVzL2JzL2JzLWN1c3RvbS1kYXRlcy12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFzQmhHLE1BQU0sT0FBTywwQkFBMEI7SUFmdkM7UUFtQlksYUFBUSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO0tBS3hEO0lBSEMsZ0JBQWdCLENBQUMsS0FBcUI7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs4R0FSVSwwQkFBMEI7a0dBQTFCLDBCQUEwQixrTUFiM0I7Ozs7Ozs7Ozs7R0FVVDs7MkZBR1UsMEJBQTBCO2tCQWZ0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJzQ3VzdG9tRGF0ZXMge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogRGF0ZSB8IERhdGVbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnMtY3VzdG9tLWRhdGUtdmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImJzLWRhdGVwaWNrZXItcHJlZGVmaW5lZC1idG5zXCI+XG4gICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCByYW5nZSBvZiByYW5nZXNcIlxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJidG5cIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0RnJvbVJhbmdlcyhyYW5nZSlcIlxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwicmFuZ2UudmFsdWUgPT09IHNlbGVjdGVkUmFuZ2VcIj5cbiAgICAgICAge3sgcmFuZ2UubGFiZWwgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCc0N1c3RvbURhdGVzVmlld0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHJhbmdlcz86IEJzQ3VzdG9tRGF0ZXNbXTtcbiAgQElucHV0KCkgc2VsZWN0ZWRSYW5nZT86IERhdGVbXTtcbiAgQElucHV0KCkgY3VzdG9tUmFuZ2VMYWJlbD86IHN0cmluZztcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxCc0N1c3RvbURhdGVzPigpO1xuXG4gIHNlbGVjdEZyb21SYW5nZXMocmFuZ2U/OiBCc0N1c3RvbURhdGVzKSB7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHJhbmdlKTtcbiAgfVxufVxuIl19