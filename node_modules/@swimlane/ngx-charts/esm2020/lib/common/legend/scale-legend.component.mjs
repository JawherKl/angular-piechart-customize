import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class ScaleLegendComponent {
    constructor() {
        this.horizontal = false;
    }
    ngOnChanges(changes) {
        const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        const direction = this.horizontal ? 'right' : 'bottom';
        this.gradient = `linear-gradient(to ${direction}, ${gradientValues})`;
    }
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param colors array of colors
     * @param splits array of splits on a scale of (0, 1)
     */
    gradientString(colors, splits) {
        // add the 100%
        splits.push(1);
        const pairs = [];
        colors.reverse().forEach((c, i) => {
            pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
        });
        return pairs.join(', ');
    }
}
ScaleLegendComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: ScaleLegendComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ScaleLegendComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: ScaleLegendComponent, selector: "ngx-charts-scale-legend", inputs: { valueRange: "valueRange", colors: "colors", height: "height", width: "width", horizontal: "horizontal" }, usesOnChanges: true, ngImport: i0, template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `, isInline: true, styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:flex;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: ScaleLegendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-charts-scale-legend', template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:flex;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}\n"] }]
        }], propDecorators: { valueRange: [{
                type: Input
            }], colors: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], horizontal: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vbGVnZW5kL3NjYWxlLWxlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdCdkgsTUFBTSxPQUFPLG9CQUFvQjtJQXRCakM7UUEyQlcsZUFBVSxHQUFZLEtBQUssQ0FBQztLQXlCdEM7SUFyQkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsU0FBUyxLQUFLLGNBQWMsR0FBRyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYyxDQUFDLE1BQWdCLEVBQUUsTUFBZ0I7UUFDL0MsZUFBZTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDOztpSEE3QlUsb0JBQW9CO3FHQUFwQixvQkFBb0Isd01BcEJyQjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7MkZBS1Usb0JBQW9CO2tCQXRCaEMsU0FBUzsrQkFDRSx5QkFBeUIsWUFDekI7Ozs7Ozs7Ozs7Ozs7OztHQWVULGlCQUVjLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1jaGFydHMtc2NhbGUtbGVnZW5kJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInNjYWxlLWxlZ2VuZFwiXG4gICAgICBbY2xhc3MuaG9yaXpvbnRhbC1sZWdlbmRdPVwiaG9yaXpvbnRhbFwiXG4gICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvcml6b250YWwgPyB1bmRlZmluZWQgOiBoZWlnaHRcIlxuICAgICAgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtbGVnZW5kLWxhYmVsXCI+XG4gICAgICAgIDxzcGFuPnt7IHZhbHVlUmFuZ2VbMV0udG9Mb2NhbGVTdHJpbmcoKSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLWxlZ2VuZC13cmFwXCIgW3N0eWxlLmJhY2tncm91bmRdPVwiZ3JhZGllbnRcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgPHNwYW4+e3sgdmFsdWVSYW5nZVswXS50b0xvY2FsZVN0cmluZygpIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL3NjYWxlLWxlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTY2FsZUxlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHZhbHVlUmFuZ2U6IG51bWJlcltdO1xuICBASW5wdXQoKSBjb2xvcnM6IGFueTtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhvcml6b250YWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBncmFkaWVudDogc3RyaW5nO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBncmFkaWVudFZhbHVlcyA9IHRoaXMuZ3JhZGllbnRTdHJpbmcodGhpcy5jb2xvcnMucmFuZ2UoKSwgdGhpcy5jb2xvcnMuZG9tYWluKCkpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuaG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgICB0aGlzLmdyYWRpZW50ID0gYGxpbmVhci1ncmFkaWVudCh0byAke2RpcmVjdGlvbn0sICR7Z3JhZGllbnRWYWx1ZXN9KWA7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSBzdHJpbmcgdXNlZCBpbiB0aGUgZ3JhZGllbnQgc3R5bGVzaGVldCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSBjb2xvcnMgYXJyYXkgb2YgY29sb3JzXG4gICAqIEBwYXJhbSBzcGxpdHMgYXJyYXkgb2Ygc3BsaXRzIG9uIGEgc2NhbGUgb2YgKDAsIDEpXG4gICAqL1xuICBncmFkaWVudFN0cmluZyhjb2xvcnM6IHN0cmluZ1tdLCBzcGxpdHM6IG51bWJlcltdKTogc3RyaW5nIHtcbiAgICAvLyBhZGQgdGhlIDEwMCVcbiAgICBzcGxpdHMucHVzaCgxKTtcbiAgICBjb25zdCBwYWlycyA9IFtdO1xuICAgIGNvbG9ycy5yZXZlcnNlKCkuZm9yRWFjaCgoYywgaSkgPT4ge1xuICAgICAgcGFpcnMucHVzaChgJHtjfSAke01hdGgucm91bmQoc3BsaXRzW2ldICogMTAwKX0lYCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGFpcnMuam9pbignLCAnKTtcbiAgfVxufVxuIl19