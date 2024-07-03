import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from './label.helper';
import { id } from '../utils/id';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { BarOrientation } from './types/bar-orientation.enum';
import { ScaleType } from './types/scale-type.enum';
import { isPlatformServer } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./svg-linear-gradient.component";
import * as i2 from "./circle.component";
import * as i3 from "@angular/common";
import * as i4 from "./tooltip/tooltip.directive";
export var SeriesType;
(function (SeriesType) {
    SeriesType["Standard"] = "standard";
    SeriesType["Stacked"] = "stacked";
})(SeriesType || (SeriesType = {}));
export class CircleSeriesComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.type = SeriesType.Standard;
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
        this.barOrientation = BarOrientation;
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
        this.isSSR = false;
    }
    ngOnInit() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (isPlatformServer(this.platformId)) {
            this.isSSR = true;
        }
    }
    ngOnChanges() {
        this.update();
    }
    update() {
        this.circle = this.getActiveCircle();
    }
    getActiveCircle() {
        const indexActiveDataPoint = this.data.series.findIndex(d => {
            const label = d.name;
            return label && this.visibleValue && label.toString() === this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    }
    mapDataPointToCircle(d, i) {
        const seriesName = this.data.name;
        const value = d.value;
        const label = d.name;
        const tooltipLabel = formatLabel(label);
        let cx;
        if (this.scaleType === ScaleType.Time) {
            cx = this.xScale(label);
        }
        else if (this.scaleType === ScaleType.Linear) {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        const cy = this.yScale(this.type === SeriesType.Standard ? value : d.d1);
        const radius = 5;
        const height = this.yScale.range()[0] - cy;
        const opacity = 1;
        let color;
        if (this.colors.scaleType === ScaleType.Linear) {
            if (this.type === SeriesType.Standard) {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        const data = Object.assign({}, d, {
            series: seriesName,
            value,
            name: label
        });
        return {
            classNames: [`circle-data-${i}`],
            value,
            label,
            data,
            cx,
            cy,
            radius,
            height,
            tooltipLabel,
            color,
            opacity,
            seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    }
    getTooltipText({ tooltipLabel, value, seriesName, min, max }) {
        return `
      <span class="tooltip-label">${escapeLabel(seriesName)} • ${escapeLabel(tooltipLabel)}</span>
      <span class="tooltip-val">${value.toLocaleString()}${this.getTooltipMinMaxText(min, max)}</span>
    `;
    }
    getTooltipMinMaxText(min, max) {
        if (min !== undefined || max !== undefined) {
            let result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    }
    getGradientStops(color) {
        return [
            {
                offset: 0,
                color,
                opacity: 0.2
            },
            {
                offset: 100,
                color,
                opacity: 1
            }
        ];
    }
    onClick(data) {
        this.select.emit(data);
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    activateCircle() {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle() {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    }
}
CircleSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CircleSeriesComponent, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
CircleSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: CircleSeriesComponent, selector: "g[ngx-charts-circle-series]", inputs: { data: "data", type: "type", xScale: "xScale", yScale: "yScale", colors: "colors", scaleType: "scaleType", visibleValue: "visibleValue", activeEntries: "activeEntries", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="!isSSR && barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:rect
        *ngIf="isSSR && barVisible && type === 'standard'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g
        ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick(circle.data)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `, isInline: true, components: [{ type: i1.SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: ["orientation", "name", "stops"] }, { type: i2.CircleComponent, selector: "g[ngx-charts-circle]", inputs: ["cx", "cy", "r", "fill", "stroke", "data", "classNames", "circleOpacity", "pointerEvents"], outputs: ["select", "activate", "deactivate"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }], animations: [
        trigger('animationState', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                animate(250, style({ opacity: 1 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CircleSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-circle-series]',
                    template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="!isSSR && barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:rect
        *ngIf="isSSR && barVisible && type === 'standard'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g
        ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick(circle.data)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition(':enter', [
                                style({
                                    opacity: 0
                                }),
                                animate(250, style({ opacity: 1 }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { data: [{
                type: Input
            }], type: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], colors: [{
                type: Input
            }], scaleType: [{
                type: Input
            }], visibleValue: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL2NpcmNsZS1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osdUJBQXVCLEVBRXZCLFdBQVcsRUFDWCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdqQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUVuRCxNQUFNLENBQU4sSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLG1DQUFxQixDQUFBO0lBQ3JCLGlDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFIVyxVQUFVLEtBQVYsVUFBVSxRQUdyQjtBQXVGRCxNQUFNLE9BQU8scUJBQXFCO0lBNEJoQyxZQUF5QyxVQUFlO1FBQWYsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQTFCL0MsU0FBSSxHQUFlLFVBQVUsQ0FBQyxRQUFRLENBQUM7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LEVBQUUsQ0FBQztpQkFDWCxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDcEMsQ0FBQztTQUNILENBQUM7S0FDSDsyRkFFVSxxQkFBcUI7a0JBbkVqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9EVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTs0QkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDO29DQUNKLE9BQU8sRUFBRSxDQUFDO2lDQUNYLENBQUM7Z0NBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDcEMsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGOzswQkE2QmMsTUFBTTsyQkFBQyxXQUFXOzRDQTNCdEIsSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4vbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBEYXRhSXRlbSwgU2VyaWVzLCBTdHJpbmdPck51bWJlck9yRGF0ZSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi90b29sdGlwL3Bvc2l0aW9uJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuL3Rvb2x0aXAvc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBCYXJPcmllbnRhdGlvbiB9IGZyb20gJy4vdHlwZXMvYmFyLW9yaWVudGF0aW9uLmVudW0nO1xuaW1wb3J0IHsgR3JhZGllbnQgfSBmcm9tICcuL3R5cGVzL2dyYWRpZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTY2FsZVR5cGUgfSBmcm9tICcuL3R5cGVzL3NjYWxlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGVudW0gU2VyaWVzVHlwZSB7XG4gIFN0YW5kYXJkID0gJ3N0YW5kYXJkJyxcbiAgU3RhY2tlZCA9ICdzdGFja2VkJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENpcmNsZSB7XG4gIGNsYXNzTmFtZXM6IHN0cmluZ1tdO1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICBsYWJlbDogc3RyaW5nO1xuICBkYXRhOiBEYXRhSXRlbTtcbiAgY3g6IG51bWJlcjtcbiAgY3k6IG51bWJlcjtcbiAgcmFkaXVzOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICB0b29sdGlwTGFiZWw6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgb3BhY2l0eTogbnVtYmVyO1xuICBzZXJpZXNOYW1lOiBzdHJpbmc7XG4gIGdyYWRpZW50U3RvcHM6IEdyYWRpZW50W107XG4gIG1pbjogbnVtYmVyO1xuICBtYXg6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWNpcmNsZS1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgKm5nSWY9XCJjaXJjbGVcIj5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8c3ZnOmdcbiAgICAgICAgICBuZ3gtY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnRcbiAgICAgICAgICBbb3JpZW50YXRpb25dPVwiYmFyT3JpZW50YXRpb24uVmVydGljYWxcIlxuICAgICAgICAgIFtuYW1lXT1cImdyYWRpZW50SWRcIlxuICAgICAgICAgIFtzdG9wc109XCJjaXJjbGUuZ3JhZGllbnRTdG9wc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2RlZnM+XG4gICAgICA8c3ZnOnJlY3RcbiAgICAgICAgKm5nSWY9XCIhaXNTU1IgJiYgYmFyVmlzaWJsZSAmJiB0eXBlID09PSAnc3RhbmRhcmQnXCJcbiAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICAgIFthdHRyLnhdPVwiY2lyY2xlLmN4IC0gY2lyY2xlLnJhZGl1c1wiXG4gICAgICAgIFthdHRyLnldPVwiY2lyY2xlLmN5XCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwiY2lyY2xlLnJhZGl1cyAqIDJcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiY2lyY2xlLmhlaWdodFwiXG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ3JhZGllbnRGaWxsXCJcbiAgICAgICAgY2xhc3M9XCJ0b29sdGlwLWJhclwiXG4gICAgICAvPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgICpuZ0lmPVwiaXNTU1IgJiYgYmFyVmlzaWJsZSAmJiB0eXBlID09PSAnc3RhbmRhcmQnXCJcbiAgICAgICAgW2F0dHIueF09XCJjaXJjbGUuY3ggLSBjaXJjbGUucmFkaXVzXCJcbiAgICAgICAgW2F0dHIueV09XCJjaXJjbGUuY3lcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJjaXJjbGUucmFkaXVzICogMlwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJjaXJjbGUuaGVpZ2h0XCJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJncmFkaWVudEZpbGxcIlxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtYmFyXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1jaXJjbGVcbiAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxuICAgICAgICBbY3hdPVwiY2lyY2xlLmN4XCJcbiAgICAgICAgW2N5XT1cImNpcmNsZS5jeVwiXG4gICAgICAgIFtyXT1cImNpcmNsZS5yYWRpdXNcIlxuICAgICAgICBbZmlsbF09XCJjaXJjbGUuY29sb3JcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlKHsgbmFtZTogY2lyY2xlLnNlcmllc05hbWUgfSlcIlxuICAgICAgICBbcG9pbnRlckV2ZW50c109XCJjaXJjbGUudmFsdWUgPT09IDAgPyAnbm9uZScgOiAnYWxsJ1wiXG4gICAgICAgIFtkYXRhXT1cImNpcmNsZS52YWx1ZVwiXG4gICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGNpcmNsZS5kYXRhKVwiXG4gICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZUNpcmNsZSgpXCJcbiAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZSgpXCJcbiAgICAgICAgbmd4LXRvb2x0aXBcbiAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJwbGFjZW1lbnRUeXBlcy5Ub3BcIlxuICAgICAgICBbdG9vbHRpcFR5cGVdPVwic3R5bGVUeXBlcy50b29sdGlwXCJcbiAgICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBnZXRUb29sdGlwVGV4dChjaXJjbGUpXCJcbiAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaXJjbGVTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGE6IFNlcmllcztcbiAgQElucHV0KCkgdHlwZTogU2VyaWVzVHlwZSA9IFNlcmllc1R5cGUuU3RhbmRhcmQ7XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSBzY2FsZVR5cGU6IFNjYWxlVHlwZTtcbiAgQElucHV0KCkgdmlzaWJsZVZhbHVlOiBib29sZWFuO1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8RGF0YUl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjx7IG5hbWU6IFN0cmluZ09yTnVtYmVyT3JEYXRlIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPHsgbmFtZTogU3RyaW5nT3JOdW1iZXJPckRhdGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgYXJlYVBhdGg6IGFueTtcbiAgY2lyY2xlOiBDaXJjbGU7IC8vIGFjdGl2ZSBjaXJjbGVcbiAgYmFyVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBncmFkaWVudElkOiBzdHJpbmc7XG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xuXG4gIGJhck9yaWVudGF0aW9uID0gQmFyT3JpZW50YXRpb247XG4gIHBsYWNlbWVudFR5cGVzID0gUGxhY2VtZW50VHlwZXM7XG4gIHN0eWxlVHlwZXMgPSBTdHlsZVR5cGVzO1xuXG4gIGlzU1NSID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ncmFkaWVudElkID0gJ2dyYWQnICsgaWQoKS50b1N0cmluZygpO1xuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XG5cbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmlzU1NSID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2lyY2xlID0gdGhpcy5nZXRBY3RpdmVDaXJjbGUoKTtcbiAgfVxuXG4gIGdldEFjdGl2ZUNpcmNsZSgpOiBDaXJjbGUge1xuICAgIGNvbnN0IGluZGV4QWN0aXZlRGF0YVBvaW50ID0gdGhpcy5kYXRhLnNlcmllcy5maW5kSW5kZXgoZCA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcbiAgICAgIHJldHVybiBsYWJlbCAmJiB0aGlzLnZpc2libGVWYWx1ZSAmJiBsYWJlbC50b1N0cmluZygpID09PSB0aGlzLnZpc2libGVWYWx1ZS50b1N0cmluZygpICYmIGQudmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIGlmIChpbmRleEFjdGl2ZURhdGFQb2ludCA9PT0gLTEpIHtcbiAgICAgIC8vIE5vIHZhbGlkIHBvaW50IGlzICdhY3RpdmUvaG92ZXJlZCBvdmVyJyBhdCB0aGlzIG1vbWVudC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwRGF0YVBvaW50VG9DaXJjbGUodGhpcy5kYXRhLnNlcmllc1tpbmRleEFjdGl2ZURhdGFQb2ludF0sIGluZGV4QWN0aXZlRGF0YVBvaW50KTtcbiAgfVxuXG4gIG1hcERhdGFQb2ludFRvQ2lyY2xlKGQ6IGFueSwgaTogbnVtYmVyKTogQ2lyY2xlIHtcbiAgICBjb25zdCBzZXJpZXNOYW1lID0gdGhpcy5kYXRhLm5hbWUgYXMgc3RyaW5nO1xuXG4gICAgY29uc3QgdmFsdWUgPSBkLnZhbHVlO1xuICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xuICAgIGNvbnN0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcblxuICAgIGxldCBjeDtcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5UaW1lKSB7XG4gICAgICBjeCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgICBjeCA9IHRoaXMueFNjYWxlKE51bWJlcihsYWJlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjeCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcbiAgICB9XG5cbiAgICBjb25zdCBjeSA9IHRoaXMueVNjYWxlKHRoaXMudHlwZSA9PT0gU2VyaWVzVHlwZS5TdGFuZGFyZCA/IHZhbHVlIDogZC5kMSk7XG4gICAgY29uc3QgcmFkaXVzID0gNTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIC0gY3k7XG4gICAgY29uc3Qgb3BhY2l0eSA9IDE7XG5cbiAgICBsZXQgY29sb3I7XG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkxpbmVhcikge1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gU2VyaWVzVHlwZS5TdGFuZGFyZCkge1xuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoZC5kMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3Ioc2VyaWVzTmFtZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGQsIHtcbiAgICAgIHNlcmllczogc2VyaWVzTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgbmFtZTogbGFiZWxcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBjbGFzc05hbWVzOiBbYGNpcmNsZS1kYXRhLSR7aX1gXSxcbiAgICAgIHZhbHVlLFxuICAgICAgbGFiZWwsXG4gICAgICBkYXRhLFxuICAgICAgY3gsXG4gICAgICBjeSxcbiAgICAgIHJhZGl1cyxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRvb2x0aXBMYWJlbCxcbiAgICAgIGNvbG9yLFxuICAgICAgb3BhY2l0eSxcbiAgICAgIHNlcmllc05hbWUsXG4gICAgICBncmFkaWVudFN0b3BzOiB0aGlzLmdldEdyYWRpZW50U3RvcHMoY29sb3IpLFxuICAgICAgbWluOiBkLm1pbixcbiAgICAgIG1heDogZC5tYXhcbiAgICB9O1xuICB9XG5cbiAgZ2V0VG9vbHRpcFRleHQoe1xuICAgIHRvb2x0aXBMYWJlbCxcbiAgICB2YWx1ZSxcbiAgICBzZXJpZXNOYW1lLFxuICAgIG1pbixcbiAgICBtYXhcbiAgfToge1xuICAgIHRvb2x0aXBMYWJlbDogc3RyaW5nO1xuICAgIHZhbHVlOiBhbnk7XG4gICAgc2VyaWVzTmFtZTogc3RyaW5nO1xuICAgIG1pbjogbnVtYmVyO1xuICAgIG1heDogbnVtYmVyO1xuICB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbChzZXJpZXNOYW1lKX0g4oCiICR7ZXNjYXBlTGFiZWwodG9vbHRpcExhYmVsKX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfSR7dGhpcy5nZXRUb29sdGlwTWluTWF4VGV4dChtaW4sIG1heCl9PC9zcGFuPlxuICAgIGA7XG4gIH1cblxuICBnZXRUb29sdGlwTWluTWF4VGV4dChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCB8fCBtYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHJlc3VsdCA9ICcgKCc7XG4gICAgICBpZiAobWluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICfiiaUnO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSBtaW4udG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICcgLSAnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCArPSAn4omkJztcbiAgICAgIH1cbiAgICAgIGlmIChtYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgKz0gbWF4LnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyknO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIGdldEdyYWRpZW50U3RvcHMoY29sb3I6IHN0cmluZyk6IEdyYWRpZW50W10ge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIG9wYWNpdHk6IDAuMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YTogRGF0YUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFjdGl2YXRlQ2lyY2xlKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgbmFtZTogdGhpcy5kYXRhLm5hbWUgfSk7XG4gIH1cblxuICBkZWFjdGl2YXRlQ2lyY2xlKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuY2lyY2xlLm9wYWNpdHkgPSAwO1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgbmFtZTogdGhpcy5kYXRhLm5hbWUgfSk7XG4gIH1cbn1cbiJdfQ==