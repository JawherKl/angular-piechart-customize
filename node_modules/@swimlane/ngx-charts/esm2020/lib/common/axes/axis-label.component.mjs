import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Orientation } from '../types/orientation.enum';
import * as i0 from "@angular/core";
export class AxisLabelComponent {
    constructor(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case Orientation.Top:
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case Orientation.Bottom:
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case Orientation.Left:
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case Orientation.Right:
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    }
}
AxisLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AxisLabelComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AxisLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: AxisLabelComponent, selector: "g[ngx-charts-axis-label]", inputs: { orient: "orient", label: "label", offset: "offset", width: "width", height: "height" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
    >
      {{ label }}
    </svg:text>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AxisLabelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-axis-label]',
                    template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
    >
      {{ label }}
    </svg:text>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { orient: [{
                type: Input
            }], label: [{
                type: Input
            }], offset: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL2F4ZXMvYXhpcy1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXdDLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFpQnhELE1BQU0sT0FBTyxrQkFBa0I7SUFnQjdCLFlBQVksT0FBbUI7UUFIL0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBR1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEIsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLEtBQUssV0FBVyxDQUFDLEdBQUc7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLE1BQU07Z0JBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUk7Z0JBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxLQUFLO2dCQUNwQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztnQkFDL0IsTUFBTTtZQUNSLFFBQVE7U0FDVDtJQUNILENBQUM7OytHQWxEVSxrQkFBa0I7bUdBQWxCLGtCQUFrQix1TEFibkI7Ozs7Ozs7Ozs7R0FVVDsyRkFHVSxrQkFBa0I7a0JBZjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2lHQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmllbnRhdGlvbiB9IGZyb20gJy4uL3R5cGVzL29yaWVudGF0aW9uLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYXhpcy1sYWJlbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6dGV4dFxuICAgICAgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cInN0cm9rZVdpZHRoXCJcbiAgICAgIFthdHRyLnhdPVwieFwiXG4gICAgICBbYXR0ci55XT1cInlcIlxuICAgICAgW2F0dHIudGV4dC1hbmNob3JdPVwidGV4dEFuY2hvclwiXG4gICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCJcbiAgICA+XG4gICAgICB7eyBsYWJlbCB9fVxuICAgIDwvc3ZnOnRleHQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEF4aXNMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG9yaWVudDogT3JpZW50YXRpb247XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9mZnNldDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcblxuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG4gIHN0cm9rZVdpZHRoOiBzdHJpbmc7XG4gIHRleHRBbmNob3I6IHN0cmluZztcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgdGV4dEhlaWdodCA9IDI1O1xuICBtYXJnaW4gPSA1O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0cm9rZVdpZHRoID0gJzAuMDEnO1xuICAgIHRoaXMudGV4dEFuY2hvciA9ICdtaWRkbGUnO1xuICAgIHRoaXMudHJhbnNmb3JtID0gJyc7XG5cbiAgICBzd2l0Y2ggKHRoaXMub3JpZW50KSB7XG4gICAgICBjYXNlIE9yaWVudGF0aW9uLlRvcDpcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIHRoaXMueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgT3JpZW50YXRpb24uQm90dG9tOlxuICAgICAgICB0aGlzLnkgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgdGhpcy54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBPcmllbnRhdGlvbi5MZWZ0OlxuICAgICAgICB0aGlzLnkgPSAtKHRoaXMub2Zmc2V0ICsgdGhpcy50ZXh0SGVpZ2h0ICsgdGhpcy5tYXJnaW4pO1xuICAgICAgICB0aGlzLnggPSAtdGhpcy5oZWlnaHQgLyAyO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9ICdyb3RhdGUoMjcwKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBPcmllbnRhdGlvbi5SaWdodDpcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQgKyB0aGlzLm1hcmdpbjtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSAncm90YXRlKDI3MCknO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG59XG4iXX0=