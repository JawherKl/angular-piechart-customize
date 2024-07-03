import { isPlatformServer } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
import { TextAnchor } from '../common/types/text-anchor.enum';
import * as i0 from "@angular/core";
export class PieLabelComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.trimLabel = trimLabel;
    }
    ngOnChanges(changes) {
        this.setTransforms();
        this.update();
    }
    setTransforms() {
        if (isPlatformServer(this.platformId)) {
            this.styleTransform = `translate3d(${this.textX}px,${this.textY}px, 0)`;
            this.attrTransform = `translate(${this.textX},${this.textY})`;
            this.textTransition = !this.animations ? null : 'transform 0.75s';
        }
        else {
            const isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
            this.styleTransform = isIE ? null : `translate3d(${this.textX}px,${this.textY}px, 0)`;
            this.attrTransform = !isIE ? null : `translate(${this.textX},${this.textY})`;
            this.textTransition = isIE || !this.animations ? null : 'transform 0.75s';
        }
    }
    update() {
        let startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = (this.radius * this.value) / this.max;
        }
        const innerArc = arc().innerRadius(startRadius).outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        const innerPos = innerArc.centroid(this.data);
        let scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        const outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = `M${innerPos}L${outerPos}L${this.data.pos}`;
    }
    get textX() {
        return this.data.pos[0];
    }
    get textY() {
        return this.data.pos[1];
    }
    textAnchor() {
        return this.midAngle(this.data) < Math.PI ? TextAnchor.Start : TextAnchor.End;
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
}
PieLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PieLabelComponent, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
PieLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: PieLabelComponent, selector: "g[ngx-charts-pie-label]", inputs: { data: "data", radius: "radius", label: "label", color: "color", max: "max", value: "value", explodeSlices: "explodeSlices", animations: "animations", labelTrim: "labelTrim", labelTrimSize: "labelTrimSize" }, usesOnChanges: true, ngImport: i0, template: `
    <title>{{ label }}</title>
    <svg:g [attr.transform]="attrTransform" [style.transform]="styleTransform" [style.transition]="textTransition">
      <svg:text
        class="pie-label"
        [class.animation]="animations"
        dy=".35em"
        [style.textAnchor]="textAnchor()"
        [style.shapeRendering]="'crispEdges'"
      >
        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}
      </svg:text>
    </svg:g>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="pie-label-line line"
      [class.animation]="animations"
    ></svg:path>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PieLabelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-pie-label]',
                    template: `
    <title>{{ label }}</title>
    <svg:g [attr.transform]="attrTransform" [style.transform]="styleTransform" [style.transition]="textTransition">
      <svg:text
        class="pie-label"
        [class.animation]="animations"
        dy=".35em"
        [style.textAnchor]="textAnchor()"
        [style.shapeRendering]="'crispEdges'"
      >
        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}
      </svg:text>
    </svg:g>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="pie-label-line line"
      [class.animation]="animations"
    ></svg:path>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { data: [{
                type: Input
            }], radius: [{
                type: Input
            }], label: [{
                type: Input
            }], color: [{
                type: Input
            }], max: [{
                type: Input
            }], value: [{
                type: Input
            }], explodeSlices: [{
                type: Input
            }], animations: [{
                type: Input
            }], labelTrim: [{
                type: Input
            }], labelTrimSize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFDdkIsV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFvQixNQUFNLFVBQVUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQW1DOUQsTUFBTSxPQUFPLGlCQUFpQjtJQWtCNUIsWUFBd0MsVUFBZTtRQUFmLGVBQVUsR0FBVixVQUFVLENBQUs7UUFWOUMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBU2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxJQUFJLENBQUMsS0FBSyxNQUFNLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQztZQUN4RSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsSUFBSSxD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QWlCLDhTQXZCbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzJGQUdVLGlCQUFpQjtrQkF6QjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQW1CYyxNQUFNOzJCQUFDLFdBQVc7NENBakJ0QixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYXJjLCBEZWZhdWx0QXJjT2JqZWN0IH0gZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi9jb21tb24vdHJpbS1sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgVGV4dEFuY2hvciB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy90ZXh0LWFuY2hvci5lbnVtJztcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpZURhdGEgZXh0ZW5kcyBEZWZhdWx0QXJjT2JqZWN0IHtcbiAgZGF0YTogRGF0YUl0ZW07XG4gIGluZGV4OiBudW1iZXI7XG4gIHBvczogW251bWJlciwgbnVtYmVyXTtcbiAgdmFsdWU6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXBpZS1sYWJlbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aXRsZT57eyBsYWJlbCB9fTwvdGl0bGU+XG4gICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJhdHRyVHJhbnNmb3JtXCIgW3N0eWxlLnRyYW5zZm9ybV09XCJzdHlsZVRyYW5zZm9ybVwiIFtzdHlsZS50cmFuc2l0aW9uXT1cInRleHRUcmFuc2l0aW9uXCI+XG4gICAgICA8c3ZnOnRleHRcbiAgICAgICAgY2xhc3M9XCJwaWUtbGFiZWxcIlxuICAgICAgICBbY2xhc3MuYW5pbWF0aW9uXT1cImFuaW1hdGlvbnNcIlxuICAgICAgICBkeT1cIi4zNWVtXCJcbiAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwidGV4dEFuY2hvcigpXCJcbiAgICAgICAgW3N0eWxlLnNoYXBlUmVuZGVyaW5nXT1cIidjcmlzcEVkZ2VzJ1wiXG4gICAgICA+XG4gICAgICAgIHt7IGxhYmVsVHJpbSA/IHRyaW1MYWJlbChsYWJlbCwgbGFiZWxUcmltU2l6ZSkgOiBsYWJlbCB9fVxuICAgICAgPC9zdmc6dGV4dD5cbiAgICA8L3N2ZzpnPlxuICAgIDxzdmc6cGF0aFxuICAgICAgW2F0dHIuZF09XCJsaW5lXCJcbiAgICAgIFthdHRyLnN0cm9rZV09XCJjb2xvclwiXG4gICAgICBmaWxsPVwibm9uZVwiXG4gICAgICBjbGFzcz1cInBpZS1sYWJlbC1saW5lIGxpbmVcIlxuICAgICAgW2NsYXNzLmFuaW1hdGlvbl09XCJhbmltYXRpb25zXCJcbiAgICA+PC9zdmc6cGF0aD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGllTGFiZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhOiBQaWVEYXRhO1xuICBASW5wdXQoKSByYWRpdXM6IG51bWJlcjtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHZhbHVlOiBudW1iZXI7XG4gIEBJbnB1dCgpIGV4cGxvZGVTbGljZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBsYWJlbFRyaW06IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBsYWJlbFRyaW1TaXplOiBudW1iZXIgPSAxMDtcblxuICB0cmltTGFiZWw6IChsYWJlbDogc3RyaW5nLCBtYXg/OiBudW1iZXIpID0+IHN0cmluZztcbiAgbGluZTogc3RyaW5nO1xuICBzdHlsZVRyYW5zZm9ybTogc3RyaW5nO1xuICBhdHRyVHJhbnNmb3JtOiBzdHJpbmc7XG4gIHRleHRUcmFuc2l0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IGFueSkge1xuICAgIHRoaXMudHJpbUxhYmVsID0gdHJpbUxhYmVsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuc2V0VHJhbnNmb3JtcygpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBzZXRUcmFuc2Zvcm1zKCkge1xuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuc3R5bGVUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnRleHRYfXB4LCR7dGhpcy50ZXh0WX1weCwgMClgO1xuICAgICAgdGhpcy5hdHRyVHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMudGV4dFh9LCR7dGhpcy50ZXh0WX0pYDtcbiAgICAgIHRoaXMudGV4dFRyYW5zaXRpb24gPSAhdGhpcy5hbmltYXRpb25zID8gbnVsbCA6ICd0cmFuc2Zvcm0gMC43NXMnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpc0lFID0gLyhlZGdlfG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdGhpcy5zdHlsZVRyYW5zZm9ybSA9IGlzSUUgPyBudWxsIDogYHRyYW5zbGF0ZTNkKCR7dGhpcy50ZXh0WH1weCwke3RoaXMudGV4dFl9cHgsIDApYDtcbiAgICAgIHRoaXMuYXR0clRyYW5zZm9ybSA9ICFpc0lFID8gbnVsbCA6IGB0cmFuc2xhdGUoJHt0aGlzLnRleHRYfSwke3RoaXMudGV4dFl9KWA7XG4gICAgICB0aGlzLnRleHRUcmFuc2l0aW9uID0gaXNJRSB8fCAhdGhpcy5hbmltYXRpb25zID8gbnVsbCA6ICd0cmFuc2Zvcm0gMC43NXMnO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc3RhcnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICBpZiAodGhpcy5leHBsb2RlU2xpY2VzKSB7XG4gICAgICBzdGFydFJhZGl1cyA9ICh0aGlzLnJhZGl1cyAqIHRoaXMudmFsdWUpIC8gdGhpcy5tYXg7XG4gICAgfVxuXG4gICAgY29uc3QgaW5uZXJBcmMgPSBhcmMoKS5pbm5lclJhZGl1cyhzdGFydFJhZGl1cykub3V0ZXJSYWRpdXMoc3RhcnRSYWRpdXMpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGlubmVyUG9zIHRoZW4gc2NhbGUgb3V0ZXIgcG9zaXRpb24gdG8gbWF0Y2ggbGFiZWwgcG9zaXRpb25cbiAgICBjb25zdCBpbm5lclBvcyA9IGlubmVyQXJjLmNlbnRyb2lkKHRoaXMuZGF0YSk7XG5cbiAgICBsZXQgc2NhbGUgPSB0aGlzLmRhdGEucG9zWzFdIC8gaW5uZXJQb3NbMV07XG4gICAgaWYgKHRoaXMuZGF0YS5wb3NbMV0gPT09IDAgfHwgaW5uZXJQb3NbMV0gPT09IDApIHtcbiAgICAgIHNjYWxlID0gMTtcbiAgICB9XG4gICAgY29uc3Qgb3V0ZXJQb3MgPSBbc2NhbGUgKiBpbm5lclBvc1swXSwgc2NhbGUgKiBpbm5lclBvc1sxXV07XG5cbiAgICB0aGlzLmxpbmUgPSBgTSR7aW5uZXJQb3N9TCR7b3V0ZXJQb3N9TCR7dGhpcy5kYXRhLnBvc31gO1xuICB9XG5cbiAgZ2V0IHRleHRYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5wb3NbMF07XG4gIH1cblxuICBnZXQgdGV4dFkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnBvc1sxXTtcbiAgfVxuXG4gIHRleHRBbmNob3IoKTogVGV4dEFuY2hvciB7XG4gICAgcmV0dXJuIHRoaXMubWlkQW5nbGUodGhpcy5kYXRhKSA8IE1hdGguUEkgPyBUZXh0QW5jaG9yLlN0YXJ0IDogVGV4dEFuY2hvci5FbmQ7XG4gIH1cblxuICBtaWRBbmdsZShkKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZC5zdGFydEFuZ2xlICsgKGQuZW5kQW5nbGUgLSBkLnN0YXJ0QW5nbGUpIC8gMjtcbiAgfVxufVxuIl19