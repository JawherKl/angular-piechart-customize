import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { line } from 'd3-shape';
import { TextAnchor } from '../common/types/text-anchor.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class GaugeAxisComponent {
    constructor() {
        this.rotate = '';
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = `rotate(${this.rotationAngle})`;
        this.ticks = this.getTicks();
    }
    getTicks() {
        const bigTickSegment = this.angleSpan / this.bigSegments;
        const smallTickSegment = bigTickSegment / this.smallSegments;
        const tickLength = 20;
        const ticks = {
            big: [],
            small: []
        };
        const startDistance = this.radius + 10;
        const textDist = startDistance + tickLength + 10;
        for (let i = 0; i <= this.bigSegments; i++) {
            const angleDeg = i * bigTickSegment;
            const angle = (angleDeg * Math.PI) / 180;
            const textAnchor = this.getTextAnchor(angleDeg);
            let skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                let text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor,
                    text,
                    textTransform: `
            translate(${textDist * Math.cos(angle)}, ${textDist * Math.sin(angle)}) rotate(${-this.rotationAngle})
          `
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (let j = 1; j <= this.smallSegments; j++) {
                const smallAngleDeg = angleDeg + j * smallTickSegment;
                const smallAngle = (smallAngleDeg * Math.PI) / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    }
    getTextAnchor(angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        let textAnchor = TextAnchor.Middle;
        if (angle > 45 && angle <= 135) {
            textAnchor = TextAnchor.Start;
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = TextAnchor.End;
        }
        return textAnchor;
    }
    getTickPath(startDistance, tickLength, angle) {
        const y1 = startDistance * Math.sin(angle);
        const y2 = (startDistance + tickLength) * Math.sin(angle);
        const x1 = startDistance * Math.cos(angle);
        const x2 = (startDistance + tickLength) * Math.cos(angle);
        const points = [
            { x: x1, y: y1 },
            { x: x2, y: y2 }
        ];
        const lineGenerator = line()
            .x(d => d.x)
            .y(d => d.y);
        return lineGenerator(points);
    }
}
GaugeAxisComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GaugeAxisComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GaugeAxisComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: GaugeAxisComponent, selector: "g[ngx-charts-gauge-axis]", inputs: { bigSegments: "bigSegments", smallSegments: "smallSegments", min: "min", max: "max", angleSpan: "angleSpan", startAngle: "startAngle", radius: "radius", valueScale: "valueScale", tickFormatting: "tickFormatting" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g [attr.transform]="rotate">
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:text
          [style.textAnchor]="tick.textAnchor"
          [attr.transform]="tick.textTransform"
          alignment-baseline="central"
        >
          {{ tick.text }}
        </svg:text>
      </svg:g>
      <svg:g *ngFor="let tick of ticks.small" class="gauge-tick gauge-tick-small">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
    </svg:g>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GaugeAxisComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-gauge-axis]',
                    template: `
    <svg:g [attr.transform]="rotate">
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:text
          [style.textAnchor]="tick.textAnchor"
          [attr.transform]="tick.textTransform"
          alignment-baseline="central"
        >
          {{ tick.text }}
        </svg:text>
      </svg:g>
      <svg:g *ngFor="let tick of ticks.small" class="gauge-tick gauge-tick-small">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { bigSegments: [{
                type: Input
            }], smallSegments: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], angleSpan: [{
                type: Input
            }], startAngle: [{
                type: Input
            }], radius: [{
                type: Input
            }], valueScale: [{
                type: Input
            }], tickFormatting: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXhpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvZ2F1Z2UvZ2F1Z2UtYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7QUFxQzlELE1BQU0sT0FBTyxrQkFBa0I7SUF2Qi9CO1FBb0NFLFdBQU0sR0FBVyxFQUFFLENBQUM7S0FrR3JCO0lBaEdDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6RCxNQUFNLGdCQUFnQixHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzdELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixNQUFNLEtBQUssR0FBRztZQUNaLEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDdkMsTUFBTSxRQUFRLEdBQUcsYUFBYSxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQztZQUNwQyxNQUFNLEtBQUssR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRXpDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEdBQUcsRUFBRTtnQkFDckMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNGLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO2dCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNiLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDO29CQUN4RCxVQUFVO29CQUNWLElBQUk7b0JBQ0osYUFBYSxFQUFFO3dCQUNELFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWE7V0FDckc7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMxQixTQUFTO2FBQ1Y7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDdEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFbkQsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDO2lCQUNsRSxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQWE7UUFDekIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxHQUFHLEVBQUU7WUFDOUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDL0I7YUFBTSxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtZQUN0QyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztTQUM3QjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXLENBQUMsYUFBcUIsRUFBRSxVQUFrQixFQUFFLEtBQWE7UUFDbEUsTUFBTSxFQUFFLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsTUFBTSxFQUFFLEdBQUcsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxNQUFNLEVBQUUsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxNQUFNLEVBQUUsR0FBRyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFELE1BQU0sTUFBTSxHQUFHO1lBQ2IsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDaEIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7U0FDakIsQ0FBQztRQUNGLE1BQU0sYUFBYSxHQUFHLElBQUksRUFBTzthQUM5QixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7K0dBOUdVLGtCQUFrQjttR0FBbEIsa0JBQWtCLHFUQXJCbkI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCVDsyRkFHVSxrQkFBa0I7a0JBdkI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGxpbmUgfSBmcm9tICdkMy1zaGFwZSc7XG5pbXBvcnQgeyBUZXh0QW5jaG9yIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3RleHQtYW5jaG9yLmVudW0nO1xuXG5pbnRlcmZhY2UgQmlnIHtcbiAgbGluZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHRleHRBbmNob3I6IHN0cmluZztcbiAgdGV4dFRyYW5zZm9ybTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgVGlja3Mge1xuICBiaWc6IEJpZ1tdO1xuICBzbWFsbDogQXJyYXk8eyBsaW5lOiBzdHJpbmcgfT47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1nYXVnZS1heGlzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJyb3RhdGVcIj5cbiAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrcy5iaWdcIiBjbGFzcz1cImdhdWdlLXRpY2sgZ2F1Z2UtdGljay1sYXJnZVwiPlxuICAgICAgICA8c3ZnOnBhdGggW2F0dHIuZF09XCJ0aWNrLmxpbmVcIiAvPlxuICAgICAgPC9zdmc6Zz5cbiAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrcy5iaWdcIiBjbGFzcz1cImdhdWdlLXRpY2sgZ2F1Z2UtdGljay1sYXJnZVwiPlxuICAgICAgICA8c3ZnOnRleHRcbiAgICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCJ0aWNrLnRleHRBbmNob3JcIlxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0aWNrLnRleHRUcmFuc2Zvcm1cIlxuICAgICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImNlbnRyYWxcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgdGljay50ZXh0IH19XG4gICAgICAgIDwvc3ZnOnRleHQ+XG4gICAgICA8L3N2ZzpnPlxuICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzLnNtYWxsXCIgY2xhc3M9XCJnYXVnZS10aWNrIGdhdWdlLXRpY2stc21hbGxcIj5cbiAgICAgICAgPHN2ZzpwYXRoIFthdHRyLmRdPVwidGljay5saW5lXCIgLz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2F1Z2VBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgYmlnU2VnbWVudHM6IG51bWJlcjtcbiAgQElucHV0KCkgc21hbGxTZWdtZW50czogbnVtYmVyO1xuICBASW5wdXQoKSBtaW46IG51bWJlcjtcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gIEBJbnB1dCgpIGFuZ2xlU3BhbjogbnVtYmVyO1xuICBASW5wdXQoKSBzdGFydEFuZ2xlOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJhZGl1czogbnVtYmVyO1xuICBASW5wdXQoKSB2YWx1ZVNjYWxlOiBhbnk7XG4gIEBJbnB1dCgpIHRpY2tGb3JtYXR0aW5nOiBhbnk7XG5cbiAgdGlja3M6IFRpY2tzO1xuICByb3RhdGlvbkFuZ2xlOiBudW1iZXI7XG4gIHJvdGF0ZTogc3RyaW5nID0gJyc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5yb3RhdGlvbkFuZ2xlID0gLTkwICsgdGhpcy5zdGFydEFuZ2xlO1xuICAgIHRoaXMucm90YXRlID0gYHJvdGF0ZSgke3RoaXMucm90YXRpb25BbmdsZX0pYDtcbiAgICB0aGlzLnRpY2tzID0gdGhpcy5nZXRUaWNrcygpO1xuICB9XG5cbiAgZ2V0VGlja3MoKTogVGlja3Mge1xuICAgIGNvbnN0IGJpZ1RpY2tTZWdtZW50ID0gdGhpcy5hbmdsZVNwYW4gLyB0aGlzLmJpZ1NlZ21lbnRzO1xuICAgIGNvbnN0IHNtYWxsVGlja1NlZ21lbnQgPSBiaWdUaWNrU2VnbWVudCAvIHRoaXMuc21hbGxTZWdtZW50cztcbiAgICBjb25zdCB0aWNrTGVuZ3RoID0gMjA7XG4gICAgY29uc3QgdGlja3MgPSB7XG4gICAgICBiaWc6IFtdLFxuICAgICAgc21hbGw6IFtdXG4gICAgfTtcblxuICAgIGNvbnN0IHN0YXJ0RGlzdGFuY2UgPSB0aGlzLnJhZGl1cyArIDEwO1xuICAgIGNvbnN0IHRleHREaXN0ID0gc3RhcnREaXN0YW5jZSArIHRpY2tMZW5ndGggKyAxMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuYmlnU2VnbWVudHM7IGkrKykge1xuICAgICAgY29uc3QgYW5nbGVEZWcgPSBpICogYmlnVGlja1NlZ21lbnQ7XG4gICAgICBjb25zdCBhbmdsZSA9IChhbmdsZURlZyAqIE1hdGguUEkpIC8gMTgwO1xuXG4gICAgICBjb25zdCB0ZXh0QW5jaG9yID0gdGhpcy5nZXRUZXh0QW5jaG9yKGFuZ2xlRGVnKTtcblxuICAgICAgbGV0IHNraXAgPSBmYWxzZTtcbiAgICAgIGlmIChpID09PSAwICYmIHRoaXMuYW5nbGVTcGFuID09PSAzNjApIHtcbiAgICAgICAgc2tpcCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2tpcCkge1xuICAgICAgICBsZXQgdGV4dCA9IE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWVTY2FsZS5pbnZlcnQoYW5nbGVEZWcpLnRvU3RyaW5nKCkpLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLnRpY2tGb3JtYXR0aW5nKSB7XG4gICAgICAgICAgdGV4dCA9IHRoaXMudGlja0Zvcm1hdHRpbmcodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGlja3MuYmlnLnB1c2goe1xuICAgICAgICAgIGxpbmU6IHRoaXMuZ2V0VGlja1BhdGgoc3RhcnREaXN0YW5jZSwgdGlja0xlbmd0aCwgYW5nbGUpLFxuICAgICAgICAgIHRleHRBbmNob3IsXG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiBgXG4gICAgICAgICAgICB0cmFuc2xhdGUoJHt0ZXh0RGlzdCAqIE1hdGguY29zKGFuZ2xlKX0sICR7dGV4dERpc3QgKiBNYXRoLnNpbihhbmdsZSl9KSByb3RhdGUoJHstdGhpcy5yb3RhdGlvbkFuZ2xlfSlcbiAgICAgICAgICBgXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSA9PT0gdGhpcy5iaWdTZWdtZW50cykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gdGhpcy5zbWFsbFNlZ21lbnRzOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc21hbGxBbmdsZURlZyA9IGFuZ2xlRGVnICsgaiAqIHNtYWxsVGlja1NlZ21lbnQ7XG4gICAgICAgIGNvbnN0IHNtYWxsQW5nbGUgPSAoc21hbGxBbmdsZURlZyAqIE1hdGguUEkpIC8gMTgwO1xuXG4gICAgICAgIHRpY2tzLnNtYWxsLnB1c2goe1xuICAgICAgICAgIGxpbmU6IHRoaXMuZ2V0VGlja1BhdGgoc3RhcnREaXN0YW5jZSwgdGlja0xlbmd0aCAvIDIsIHNtYWxsQW5nbGUpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aWNrcztcbiAgfVxuXG4gIGdldFRleHRBbmNob3IoYW5nbGU6IG51bWJlcik6IFRleHRBbmNob3Ige1xuICAgIC8vIFswLCA0NV0gPSAnbWlkZGxlJztcbiAgICAvLyBbNDYsIDEzNV0gPSAnc3RhcnQnO1xuICAgIC8vIFsxMzYsIDIyNV0gPSAnbWlkZGxlJztcbiAgICAvLyBbMjI2LCAzMTVdID0gJ2VuZCc7XG5cbiAgICBhbmdsZSA9ICh0aGlzLnN0YXJ0QW5nbGUgKyBhbmdsZSkgJSAzNjA7XG4gICAgbGV0IHRleHRBbmNob3IgPSBUZXh0QW5jaG9yLk1pZGRsZTtcbiAgICBpZiAoYW5nbGUgPiA0NSAmJiBhbmdsZSA8PSAxMzUpIHtcbiAgICAgIHRleHRBbmNob3IgPSBUZXh0QW5jaG9yLlN0YXJ0O1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPiAyMjUgJiYgYW5nbGUgPD0gMzE1KSB7XG4gICAgICB0ZXh0QW5jaG9yID0gVGV4dEFuY2hvci5FbmQ7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0QW5jaG9yO1xuICB9XG5cbiAgZ2V0VGlja1BhdGgoc3RhcnREaXN0YW5jZTogbnVtYmVyLCB0aWNrTGVuZ3RoOiBudW1iZXIsIGFuZ2xlOiBudW1iZXIpOiBhbnkge1xuICAgIGNvbnN0IHkxID0gc3RhcnREaXN0YW5jZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICBjb25zdCB5MiA9IChzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCkgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgY29uc3QgeDEgPSBzdGFydERpc3RhbmNlICogTWF0aC5jb3MoYW5nbGUpO1xuICAgIGNvbnN0IHgyID0gKHN0YXJ0RGlzdGFuY2UgKyB0aWNrTGVuZ3RoKSAqIE1hdGguY29zKGFuZ2xlKTtcblxuICAgIGNvbnN0IHBvaW50cyA9IFtcbiAgICAgIHsgeDogeDEsIHk6IHkxIH0sXG4gICAgICB7IHg6IHgyLCB5OiB5MiB9XG4gICAgXTtcbiAgICBjb25zdCBsaW5lR2VuZXJhdG9yID0gbGluZTxhbnk+KClcbiAgICAgIC54KGQgPT4gZC54KVxuICAgICAgLnkoZCA9PiBkLnkpO1xuICAgIHJldHVybiBsaW5lR2VuZXJhdG9yKHBvaW50cyk7XG4gIH1cbn1cbiJdfQ==