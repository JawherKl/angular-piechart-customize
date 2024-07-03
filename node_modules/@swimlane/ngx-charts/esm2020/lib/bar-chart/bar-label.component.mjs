import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { formatLabel } from '../common/label.helper';
import * as i0 from "@angular/core";
export class BarLabelComponent {
    constructor(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getSize() {
        const h = this.element.getBoundingClientRect().height;
        const w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    }
    ngAfterViewInit() {
        this.dimensionsChanged.emit(this.getSize());
    }
    update() {
        if (this.valueFormatting) {
            this.formatedValue = this.valueFormatting(this.value);
        }
        else {
            this.formatedValue = formatLabel(this.value);
        }
        if (this.orientation === 'horizontal') {
            this.x = this.barX + this.barWidth;
            // if the value is negative then it's on the left of the x0.
            // we need to put the data label in front of the bar
            if (this.value < 0) {
                this.x = this.x - this.horizontalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.x = this.x + this.horizontalPadding;
                this.textAnchor = 'start';
            }
            this.y = this.barY + this.barHeight / 2;
        }
        else {
            // orientation must be "vertical"
            this.x = this.barX + this.barWidth / 2;
            this.y = this.barY + this.barHeight;
            if (this.value < 0) {
                this.y = this.y + this.verticalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.y = this.y - this.verticalPadding;
                this.textAnchor = 'start';
            }
            this.transform = `rotate(-45, ${this.x} , ${this.y})`;
        }
    }
}
BarLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BarLabelComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
BarLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: BarLabelComponent, selector: "g[ngx-charts-bar-label]", inputs: { value: "value", valueFormatting: "valueFormatting", barX: "barX", barY: "barY", barWidth: "barWidth", barHeight: "barHeight", orientation: "orientation" }, outputs: { dimensionsChanged: "dimensionsChanged" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y"
    >
      {{ formatedValue }}
    </svg:text>
  `, isInline: true, styles: [".textDataLabel{font-size:11px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BarLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'g[ngx-charts-bar-label]', template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y"
    >
      {{ formatedValue }}
    </svg:text>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".textDataLabel{font-size:11px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { value: [{
                type: Input
            }], valueFormatting: [{
                type: Input
            }], barX: [{
                type: Input
            }], barY: [{
                type: Input
            }], barWidth: [{
                type: Input
            }], barHeight: [{
                type: Input
            }], orientation: [{
                type: Input
            }], dimensionsChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9iYXItY2hhcnQvYmFyLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFFdkIsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBb0JyRCxNQUFNLE9BQU8saUJBQWlCO0lBb0I1QixZQUFZLE9BQW1CO1FBWHJCLHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3BFLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixvQkFBZSxHQUFXLENBQUMsQ0FBQztRQU0xQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNyQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNuQyw0REFBNEQ7WUFDNUQsb0RBQW9EO1lBQ3BELElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXBDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDdkQ7SUFDSCxDQUFDOzs4R0F2RVUsaUJBQWlCO2tHQUFqQixpQkFBaUIsK1NBZmxCOzs7Ozs7Ozs7OztHQVdUOzJGQUlVLGlCQUFpQjtrQkFqQjdCLFNBQVM7K0JBQ0UseUJBQXlCLFlBQ3pCOzs7Ozs7Ozs7OztHQVdULG1CQUVnQix1QkFBdUIsQ0FBQyxNQUFNO2lHQUd0QyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVJLGlCQUFpQjtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEVsZW1lbnRSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2Jhci1vcmllbnRhdGlvbi5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWJhci1sYWJlbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6dGV4dFxuICAgICAgY2xhc3M9XCJ0ZXh0RGF0YUxhYmVsXCJcbiAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cIm1pZGRsZVwiXG4gICAgICBbYXR0ci50ZXh0LWFuY2hvcl09XCJ0ZXh0QW5jaG9yXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxuICAgICAgW2F0dHIueF09XCJ4XCJcbiAgICAgIFthdHRyLnldPVwieVwiXG4gICAgPlxuICAgICAge3sgZm9ybWF0ZWRWYWx1ZSB9fVxuICAgIDwvc3ZnOnRleHQ+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL2Jhci1sYWJlbC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCYXJMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHZhbHVlO1xuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgYmFyWDtcbiAgQElucHV0KCkgYmFyWTtcbiAgQElucHV0KCkgYmFyV2lkdGg7XG4gIEBJbnB1dCgpIGJhckhlaWdodDtcbiAgQElucHV0KCkgb3JpZW50YXRpb246IEJhck9yaWVudGF0aW9uO1xuXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZWxlbWVudDogYW55O1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgaG9yaXpvbnRhbFBhZGRpbmc6IG51bWJlciA9IDI7XG4gIHZlcnRpY2FsUGFkZGluZzogbnVtYmVyID0gNTtcbiAgZm9ybWF0ZWRWYWx1ZTogc3RyaW5nO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgdGV4dEFuY2hvcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGdldFNpemUoKTogYW55IHtcbiAgICBjb25zdCBoID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICBjb25zdCB3ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIHJldHVybiB7IGhlaWdodDogaCwgd2lkdGg6IHcsIG5lZ2F0aXZlOiB0aGlzLnZhbHVlIDwgMCB9O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh0aGlzLmdldFNpemUoKSk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWVGb3JtYXR0aW5nKSB7XG4gICAgICB0aGlzLmZvcm1hdGVkVmFsdWUgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyh0aGlzLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtYXRlZFZhbHVlID0gZm9ybWF0TGFiZWwodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy54ID0gdGhpcy5iYXJYICsgdGhpcy5iYXJXaWR0aDtcbiAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBuZWdhdGl2ZSB0aGVuIGl0J3Mgb24gdGhlIGxlZnQgb2YgdGhlIHgwLlxuICAgICAgLy8gd2UgbmVlZCB0byBwdXQgdGhlIGRhdGEgbGFiZWwgaW4gZnJvbnQgb2YgdGhlIGJhclxuICAgICAgaWYgKHRoaXMudmFsdWUgPCAwKSB7XG4gICAgICAgIHRoaXMueCA9IHRoaXMueCAtIHRoaXMuaG9yaXpvbnRhbFBhZGRpbmc7XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdlbmQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy54ID0gdGhpcy54ICsgdGhpcy5ob3Jpem9udGFsUGFkZGluZztcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ3N0YXJ0JztcbiAgICAgIH1cbiAgICAgIHRoaXMueSA9IHRoaXMuYmFyWSArIHRoaXMuYmFySGVpZ2h0IC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb3JpZW50YXRpb24gbXVzdCBiZSBcInZlcnRpY2FsXCJcbiAgICAgIHRoaXMueCA9IHRoaXMuYmFyWCArIHRoaXMuYmFyV2lkdGggLyAyO1xuICAgICAgdGhpcy55ID0gdGhpcy5iYXJZICsgdGhpcy5iYXJIZWlnaHQ7XG5cbiAgICAgIGlmICh0aGlzLnZhbHVlIDwgMCkge1xuICAgICAgICB0aGlzLnkgPSB0aGlzLnkgKyB0aGlzLnZlcnRpY2FsUGFkZGluZztcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ2VuZCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnkgPSB0aGlzLnkgLSB0aGlzLnZlcnRpY2FsUGFkZGluZztcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ3N0YXJ0JztcbiAgICAgIH1cbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHJvdGF0ZSgtNDUsICR7dGhpcy54fSAsICR7dGhpcy55fSlgO1xuICAgIH1cbiAgfVxufVxuIl19