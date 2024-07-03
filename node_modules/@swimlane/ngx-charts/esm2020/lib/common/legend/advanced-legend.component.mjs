import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';
import * as i0 from "@angular/core";
import * as i1 from "../count/count.directive";
import * as i2 from "@angular/common";
export class AdvancedLegendComponent {
    constructor() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = label => label;
        this.percentageFormatting = percentage => percentage;
        this.defaultValueFormatting = value => value.toLocaleString();
    }
    ngOnChanges(changes) {
        this.update();
    }
    getTotal() {
        return this.data.map(d => Number(d.value)).reduce((sum, d) => sum + d, 0);
    }
    update() {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    }
    getLegendItems() {
        return this.data.map(d => {
            const label = formatLabel(d.name);
            const value = d.value;
            const color = this.colors.getColor(label);
            const percentage = this.total > 0 ? (value / this.total) * 100 : 0;
            const formattedLabel = typeof this.labelFormatting === 'function' ? this.labelFormatting(label) : label;
            return {
                _value: value,
                data: d,
                value,
                color,
                label: formattedLabel,
                displayLabel: trimLabel(formattedLabel, 20),
                origialLabel: d.name,
                percentage: this.percentageFormatting ? this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    }
    trackBy(index, item) {
        return item.label;
    }
}
AdvancedLegendComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AdvancedLegendComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AdvancedLegendComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: AdvancedLegendComponent, selector: "ngx-charts-advanced-legend", inputs: { width: "width", data: "data", colors: "colors", label: "label", animations: "animations", valueFormatting: "valueFormatting", labelFormatting: "labelFormatting", percentageFormatting: "percentageFormatting" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="advanced-pie-legend" [style.width.px]="width">
      <div
        *ngIf="animations"
        class="total-value"
        ngx-charts-count-up
        [countTo]="roundedTotal"
        [valueFormatting]="valueFormatting"
      ></div>
      <div class="total-value" *ngIf="!animations">
        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}
      </div>
      <div class="total-label">
        {{ label }}
      </div>
      <div class="legend-items-container">
        <div class="legend-items">
          <div
            *ngFor="let legendItem of legendItems; trackBy: trackBy"
            tabindex="-1"
            class="legend-item"
            (mouseenter)="activate.emit(legendItem.data)"
            (mouseleave)="deactivate.emit(legendItem.data)"
            (click)="select.emit(legendItem.data)"
          >
            <div class="item-color" [style.border-left-color]="legendItem.color"></div>
            <div
              *ngIf="animations"
              class="item-value"
              ngx-charts-count-up
              [countTo]="legendItem._value"
              [valueFormatting]="valueFormatting"
            ></div>
            <div *ngIf="!animations" class="item-value">
              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}
            </div>
            <div class="item-label">{{ legendItem.displayLabel }}</div>
            <div
              *ngIf="animations"
              class="item-percent"
              ngx-charts-count-up
              [countTo]="legendItem.percentage"
              [countSuffix]="'%'"
            ></div>
            <div *ngIf="!animations" class="item-percent">{{ legendItem.percentage.toLocaleString() }}%</div>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [".advanced-pie-legend{float:left;position:relative;top:50%;transform:translateY(-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:none}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}\n"], components: [{ type: i1.CountUpDirective, selector: "[ngx-charts-count-up]", inputs: ["countDuration", "countPrefix", "countSuffix", "valueFormatting", "countDecimals", "countTo", "countFrom"], outputs: ["countChange", "countFinish"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AdvancedLegendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-charts-advanced-legend', template: `
    <div class="advanced-pie-legend" [style.width.px]="width">
      <div
        *ngIf="animations"
        class="total-value"
        ngx-charts-count-up
        [countTo]="roundedTotal"
        [valueFormatting]="valueFormatting"
      ></div>
      <div class="total-value" *ngIf="!animations">
        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}
      </div>
      <div class="total-label">
        {{ label }}
      </div>
      <div class="legend-items-container">
        <div class="legend-items">
          <div
            *ngFor="let legendItem of legendItems; trackBy: trackBy"
            tabindex="-1"
            class="legend-item"
            (mouseenter)="activate.emit(legendItem.data)"
            (mouseleave)="deactivate.emit(legendItem.data)"
            (click)="select.emit(legendItem.data)"
          >
            <div class="item-color" [style.border-left-color]="legendItem.color"></div>
            <div
              *ngIf="animations"
              class="item-value"
              ngx-charts-count-up
              [countTo]="legendItem._value"
              [valueFormatting]="valueFormatting"
            ></div>
            <div *ngIf="!animations" class="item-value">
              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}
            </div>
            <div class="item-label">{{ legendItem.displayLabel }}</div>
            <div
              *ngIf="animations"
              class="item-percent"
              ngx-charts-count-up
              [countTo]="legendItem.percentage"
              [countSuffix]="'%'"
            ></div>
            <div *ngIf="!animations" class="item-percent">{{ legendItem.percentage.toLocaleString() }}%</div>
          </div>
        </div>
      </div>
    </div>
  `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".advanced-pie-legend{float:left;position:relative;top:50%;transform:translateY(-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:none}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}\n"] }]
        }], propDecorators: { width: [{
                type: Input
            }], data: [{
                type: Input
            }], colors: [{
                type: Input
            }], label: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], valueFormatting: [{
                type: Input
            }], labelFormatting: [{
                type: Input
            }], percentageFormatting: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vbGVnZW5kL2FkdmFuY2VkLWxlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUF1RTlDLE1BQU0sT0FBTyx1QkFBdUI7SUF4RHBDO1FBNERXLFVBQUssR0FBVyxPQUFPLENBQUM7UUFDeEIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQTJCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsYUFBUSxHQUEyQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RELGVBQVUsR0FBMkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxnQkFBVyxHQUF5QixFQUFFLENBQUM7UUFLOUIsb0JBQWUsR0FBOEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDNUQseUJBQW9CLEdBQThCLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBRXBGLDJCQUFzQixHQUE0QyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQXlDbkc7SUF2Q0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQVEsSUFBSSxDQUFDLElBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDaEMsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsTUFBTSxjQUFjLEdBQUcsT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRXhHLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUssRUFBRSxjQUFjO2dCQUNyQixZQUFZLEVBQUUsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7Z0JBQzNDLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDcEIsVUFBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO2FBQzVHLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBYSxFQUFFLElBQXdCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOztvSEEzRFUsdUJBQXVCO3dHQUF2Qix1QkFBdUIsa1lBdER4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlEVDsyRkFLVSx1QkFBdUI7a0JBeERuQyxTQUFTOytCQUNFLDRCQUE0QixZQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlEVCxpQkFFYyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQU1FLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBEYXRhSXRlbSwgU3RyaW5nT3JOdW1iZXJPckRhdGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbG9yLmhlbHBlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWR2YW5jZWRMZWdlbmRJdGVtIHtcbiAgdmFsdWU6IFN0cmluZ09yTnVtYmVyT3JEYXRlO1xuICBfdmFsdWU6IFN0cmluZ09yTnVtYmVyT3JEYXRlO1xuICBjb2xvcjogc3RyaW5nO1xuICBkYXRhOiBEYXRhSXRlbTtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzcGxheUxhYmVsOiBzdHJpbmc7XG4gIG9yaWdpbmFsTGFiZWw6IHN0cmluZztcbiAgcGVyY2VudGFnZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWFkdmFuY2VkLWxlZ2VuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFkdmFuY2VkLXBpZS1sZWdlbmRcIiBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcbiAgICAgICAgY2xhc3M9XCJ0b3RhbC12YWx1ZVwiXG4gICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcbiAgICAgICAgW2NvdW50VG9dPVwicm91bmRlZFRvdGFsXCJcbiAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxuICAgICAgPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXZhbHVlXCIgKm5nSWY9XCIhYW5pbWF0aW9uc1wiPlxuICAgICAgICB7eyB2YWx1ZUZvcm1hdHRpbmcgPyB2YWx1ZUZvcm1hdHRpbmcocm91bmRlZFRvdGFsKSA6IGRlZmF1bHRWYWx1ZUZvcm1hdHRpbmcocm91bmRlZFRvdGFsKSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidG90YWwtbGFiZWxcIj5cbiAgICAgICAge3sgbGFiZWwgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtcy1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtc1wiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBsZWdlbmRJdGVtIG9mIGxlZ2VuZEl0ZW1zOyB0cmFja0J5OiB0cmFja0J5XCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgY2xhc3M9XCJsZWdlbmQtaXRlbVwiXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJhY3RpdmF0ZS5lbWl0KGxlZ2VuZEl0ZW0uZGF0YSlcIlxuICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwiZGVhY3RpdmF0ZS5lbWl0KGxlZ2VuZEl0ZW0uZGF0YSlcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdC5lbWl0KGxlZ2VuZEl0ZW0uZGF0YSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWNvbG9yXCIgW3N0eWxlLmJvcmRlci1sZWZ0LWNvbG9yXT1cImxlZ2VuZEl0ZW0uY29sb3JcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpdGVtLXZhbHVlXCJcbiAgICAgICAgICAgICAgbmd4LWNoYXJ0cy1jb3VudC11cFxuICAgICAgICAgICAgICBbY291bnRUb109XCJsZWdlbmRJdGVtLl92YWx1ZVwiXG4gICAgICAgICAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcbiAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwiaXRlbS12YWx1ZVwiPlxuICAgICAgICAgICAgICB7eyB2YWx1ZUZvcm1hdHRpbmcgPyB2YWx1ZUZvcm1hdHRpbmcobGVnZW5kSXRlbS52YWx1ZSkgOiBkZWZhdWx0VmFsdWVGb3JtYXR0aW5nKGxlZ2VuZEl0ZW0udmFsdWUpIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWxhYmVsXCI+e3sgbGVnZW5kSXRlbS5kaXNwbGF5TGFiZWwgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpdGVtLXBlcmNlbnRcIlxuICAgICAgICAgICAgICBuZ3gtY2hhcnRzLWNvdW50LXVwXG4gICAgICAgICAgICAgIFtjb3VudFRvXT1cImxlZ2VuZEl0ZW0ucGVyY2VudGFnZVwiXG4gICAgICAgICAgICAgIFtjb3VudFN1ZmZpeF09XCInJSdcIlxuICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFhbmltYXRpb25zXCIgY2xhc3M9XCJpdGVtLXBlcmNlbnRcIj57eyBsZWdlbmRJdGVtLnBlcmNlbnRhZ2UudG9Mb2NhbGVTdHJpbmcoKSB9fSU8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgZGF0YTogRGF0YUl0ZW1bXTtcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyA9ICdUb3RhbCc7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxEYXRhSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPERhdGFJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxEYXRhSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbGVnZW5kSXRlbXM6IEFkdmFuY2VkTGVnZW5kSXRlbVtdID0gW107XG4gIHRvdGFsOiBudW1iZXI7XG4gIHJvdW5kZWRUb3RhbDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogKHZhbHVlOiBTdHJpbmdPck51bWJlck9yRGF0ZSkgPT4gYW55O1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcgPSBsYWJlbCA9PiBsYWJlbDtcbiAgQElucHV0KCkgcGVyY2VudGFnZUZvcm1hdHRpbmc6ICh2YWx1ZTogbnVtYmVyKSA9PiBudW1iZXIgPSBwZXJjZW50YWdlID0+IHBlcmNlbnRhZ2U7XG5cbiAgZGVmYXVsdFZhbHVlRm9ybWF0dGluZzogKHZhbHVlOiBTdHJpbmdPck51bWJlck9yRGF0ZSkgPT4gc3RyaW5nID0gdmFsdWUgPT4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGdldFRvdGFsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoZCA9PiBOdW1iZXIoZC52YWx1ZSkpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvdGFsID0gdGhpcy5nZXRUb3RhbCgpO1xuICAgIHRoaXMucm91bmRlZFRvdGFsID0gdGhpcy50b3RhbDtcblxuICAgIHRoaXMubGVnZW5kSXRlbXMgPSB0aGlzLmdldExlZ2VuZEl0ZW1zKCk7XG4gIH1cblxuICBnZXRMZWdlbmRJdGVtcygpOiBBZHZhbmNlZExlZ2VuZEl0ZW1bXSB7XG4gICAgcmV0dXJuICh0aGlzLmRhdGEgYXMgYW55KS5tYXAoZCA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGZvcm1hdExhYmVsKGQubmFtZSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcbiAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSB0aGlzLnRvdGFsID4gMCA/ICh2YWx1ZSAvIHRoaXMudG90YWwpICogMTAwIDogMDtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gdHlwZW9mIHRoaXMubGFiZWxGb3JtYXR0aW5nID09PSAnZnVuY3Rpb24nID8gdGhpcy5sYWJlbEZvcm1hdHRpbmcobGFiZWwpIDogbGFiZWw7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIF92YWx1ZTogdmFsdWUsXG4gICAgICAgIGRhdGE6IGQsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2xvcixcbiAgICAgICAgbGFiZWw6IGZvcm1hdHRlZExhYmVsLFxuICAgICAgICBkaXNwbGF5TGFiZWw6IHRyaW1MYWJlbChmb3JtYXR0ZWRMYWJlbCwgMjApLFxuICAgICAgICBvcmlnaWFsTGFiZWw6IGQubmFtZSxcbiAgICAgICAgcGVyY2VudGFnZTogdGhpcy5wZXJjZW50YWdlRm9ybWF0dGluZyA/IHRoaXMucGVyY2VudGFnZUZvcm1hdHRpbmcocGVyY2VudGFnZSkgOiBwZXJjZW50YWdlLnRvTG9jYWxlU3RyaW5nKClcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IEFkdmFuY2VkTGVnZW5kSXRlbSkge1xuICAgIHJldHVybiBpdGVtLmxhYmVsO1xuICB9XG59XG4iXX0=