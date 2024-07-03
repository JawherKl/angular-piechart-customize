import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { ScaleType } from '../common/types/scale-type.enum';
import { isPlatformServer } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "../common/circle.component";
import * as i2 from "@angular/common";
import * as i3 from "../common/tooltip/tooltip.directive";
export class BubbleSeriesComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
        this.isSSR = false;
    }
    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.isSSR = true;
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circles = this.getCircles();
    }
    getCircles() {
        const seriesName = this.data.name;
        return this.data.series
            .map((d, i) => {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                const y = d.y;
                const x = d.x;
                const r = d.r;
                const radius = this.rScale(r || 1);
                const tooltipLabel = formatLabel(d.name);
                const cx = this.xScaleType === ScaleType.Linear ? this.xScale(Number(x)) : this.xScale(x);
                const cy = this.yScaleType === ScaleType.Linear ? this.yScale(Number(y)) : this.yScale(y);
                const color = this.colors.scaleType === ScaleType.Linear ? this.colors.getColor(r) : this.colors.getColor(seriesName);
                const isActive = !this.activeEntries.length ? true : this.isActive({ name: seriesName });
                const opacity = isActive ? 1 : 0.3;
                const data = Object.assign({}, d, {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                });
                return {
                    data,
                    x,
                    y,
                    r,
                    classNames: [`circle-data-${i}`],
                    value: y,
                    label: x,
                    cx,
                    cy,
                    radius,
                    tooltipLabel,
                    color,
                    opacity,
                    seriesName,
                    isActive,
                    transform: `translate(${cx},${cy})`
                };
            }
        })
            .filter(circle => circle !== undefined);
    }
    getTooltipText(circle) {
        const hasRadius = typeof circle.r !== 'undefined';
        const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        const hasSeriesName = circle.seriesName && circle.seriesName.length;
        const radiusValue = hasRadius ? formatLabel(circle.r) : '';
        const xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? `${this.xAxisLabel}:` : '';
        const yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? `${this.yAxisLabel}:` : '';
        const x = formatLabel(circle.x);
        const y = formatLabel(circle.y);
        const name = hasSeriesName && hasTooltipLabel
            ? `${circle.seriesName} • ${circle.tooltipLabel}`
            : circle.seriesName + circle.tooltipLabel;
        const tooltipTitle = hasSeriesName || hasTooltipLabel ? `<span class="tooltip-label">${escapeLabel(name)}</span>` : '';
        return `
      ${tooltipTitle}
      <span class="tooltip-label">
        <label>${escapeLabel(xAxisLabel)}</label> ${escapeLabel(x)}<br />
        <label>${escapeLabel(yAxisLabel)}</label> ${escapeLabel(y)}
      </span>
      <span class="tooltip-val">
        ${escapeLabel(radiusValue)}
      </span>
    `;
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
    isVisible(circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    }
    activateCircle(circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle(circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    }
    trackBy(index, circle) {
        return `${circle.data.series} ${circle.data.name}`;
    }
}
BubbleSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BubbleSeriesComponent, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
BubbleSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: BubbleSeriesComponent, selector: "g[ngx-charts-bubble-series]", inputs: { data: "data", xScale: "xScale", yScale: "yScale", rScale: "rScale", xScaleType: "xScaleType", yScaleType: "yScaleType", colors: "colors", visibleValue: "visibleValue", activeEntries: "activeEntries", xAxisLabel: "xAxisLabel", yAxisLabel: "yAxisLabel", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g
          *ngIf="!isSSR"
          ngx-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
        <svg:g
          *ngIf="isSSR"
          ngx-charts-circle
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `, isInline: true, components: [{ type: i1.CircleComponent, selector: "g[ngx-charts-circle]", inputs: ["cx", "cy", "r", "fill", "stroke", "data", "classNames", "circleOpacity", "pointerEvents"], outputs: ["select", "activate", "deactivate"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }], animations: [
        trigger('animationState', [
            transition(':enter', [
                style({
                    opacity: 0,
                    transform: 'scale(0)'
                }),
                animate(250, style({ opacity: 1, transform: 'scale(1)' }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BubbleSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-bubble-series]',
                    template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g
          *ngIf="!isSSR"
          ngx-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
        <svg:g
          *ngIf="isSSR"
          ngx-charts-circle
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition(':enter', [
                                style({
                                    opacity: 0,
                                    transform: 'scale(0)'
                                }),
                                animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { data: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], rScale: [{
                type: Input
            }], xScaleType: [{
                type: Input
            }], yScaleType: [{
                type: Input
            }], colors: [{
                type: Input
            }], visibleValue: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], xAxisLabel: [{
                type: Input
            }], yAxisLabel: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvYnViYmxlLWNoYXJ0L2J1YmJsZS1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosdUJBQXVCLEVBRXZCLFdBQVcsRUFDWCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBd0VuRCxNQUFNLE9BQU8scUJBQXFCO0lBMkJoQyxZQUF5QyxVQUFlO1FBQWYsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQWYvQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUdoQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUsxQyxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBRXhCLFVBQUssR0FBRyxLQUFLLENBQUM7SUFFNkMsQ0FBQztJQUU1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cUI7a0JBdEVqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0RUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFOzRCQUN4QixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUM7b0NBQ0osT0FBTyxFQUFFLENBQUM7b0NBQ1YsU0FBUyxFQUFFLFVBQVU7aUNBQ3RCLENBQUM7Z0NBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDOzZCQUMzRCxDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7OzBCQTRCYyxNQUFNOzJCQUFDLFdBQVc7NENBMUJ0QixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0LFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgQnViYmxlQ2hhcnRTZXJpZXMgfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4uL2NvbW1vbi90b29sdGlwL3Bvc2l0aW9uJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuLi9jb21tb24vdG9vbHRpcC9zdHlsZS50eXBlJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zY2FsZS10eXBlLmVudW0nO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1idWJibGUtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBjaXJjbGUgb2YgY2lyY2xlczsgdHJhY2tCeTogdHJhY2tCeVwiPlxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJjaXJjbGUudHJhbnNmb3JtXCI+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgICpuZ0lmPVwiIWlzU1NSXCJcbiAgICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZVxuICAgICAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxuICAgICAgICAgIGNsYXNzPVwiY2lyY2xlXCJcbiAgICAgICAgICBbY3hdPVwiMFwiXG4gICAgICAgICAgW2N5XT1cIjBcIlxuICAgICAgICAgIFtyXT1cImNpcmNsZS5yYWRpdXNcIlxuICAgICAgICAgIFtmaWxsXT1cImNpcmNsZS5jb2xvclwiXG4gICAgICAgICAgW3N0eWxlLm9wYWNpdHldPVwiY2lyY2xlLm9wYWNpdHlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiY2lyY2xlLmlzQWN0aXZlXCJcbiAgICAgICAgICBbcG9pbnRlckV2ZW50c109XCInYWxsJ1wiXG4gICAgICAgICAgW2RhdGFdPVwiY2lyY2xlLnZhbHVlXCJcbiAgICAgICAgICBbY2xhc3NOYW1lc109XCJjaXJjbGUuY2xhc3NOYW1lc1wiXG4gICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGNpcmNsZS5kYXRhKVwiXG4gICAgICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlQ2lyY2xlKGNpcmNsZSlcIlxuICAgICAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGVDaXJjbGUoY2lyY2xlKVwiXG4gICAgICAgICAgbmd4LXRvb2x0aXBcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwicGxhY2VtZW50VHlwZXMuVG9wXCJcbiAgICAgICAgICBbdG9vbHRpcFR5cGVdPVwic3R5bGVUeXBlcy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGNpcmNsZSlcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxuICAgICAgICAvPlxuICAgICAgICA8c3ZnOmdcbiAgICAgICAgICAqbmdJZj1cImlzU1NSXCJcbiAgICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZVxuICAgICAgICAgIGNsYXNzPVwiY2lyY2xlXCJcbiAgICAgICAgICBbY3hdPVwiMFwiXG4gICAgICAgICAgW2N5XT1cIjBcIlxuICAgICAgICAgIFtyXT1cImNpcmNsZS5yYWRpdXNcIlxuICAgICAgICAgIFtmaWxsXT1cImNpcmNsZS5jb2xvclwiXG4gICAgICAgICAgW3N0eWxlLm9wYWNpdHldPVwiY2lyY2xlLm9wYWNpdHlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiY2lyY2xlLmlzQWN0aXZlXCJcbiAgICAgICAgICBbcG9pbnRlckV2ZW50c109XCInYWxsJ1wiXG4gICAgICAgICAgW2RhdGFdPVwiY2lyY2xlLnZhbHVlXCJcbiAgICAgICAgICBbY2xhc3NOYW1lc109XCJjaXJjbGUuY2xhc3NOYW1lc1wiXG4gICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGNpcmNsZS5kYXRhKVwiXG4gICAgICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlQ2lyY2xlKGNpcmNsZSlcIlxuICAgICAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGVDaXJjbGUoY2lyY2xlKVwiXG4gICAgICAgICAgbmd4LXRvb2x0aXBcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwicGxhY2VtZW50VHlwZXMuVG9wXCJcbiAgICAgICAgICBbdG9vbHRpcFR5cGVdPVwic3R5bGVUeXBlcy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGNpcmNsZSlcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxuICAgICAgICAvPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwKSdcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3NjYWxlKDEpJyB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCdWJibGVTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGE6IEJ1YmJsZUNoYXJ0U2VyaWVzO1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgclNjYWxlO1xuICBASW5wdXQoKSB4U2NhbGVUeXBlOiBTY2FsZVR5cGU7XG4gIEBJbnB1dCgpIHlTY2FsZVR5cGU6IFNjYWxlVHlwZTtcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgQElucHV0KCkgdmlzaWJsZVZhbHVlO1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcbiAgQElucHV0KCkgeEF4aXNMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSB5QXhpc0xhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBhcmVhUGF0aDogYW55O1xuICBjaXJjbGVzOiBhbnlbXTsgLy8gVE9ETyB0eXBlIHRoaXNcblxuICBwbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzO1xuICBzdHlsZVR5cGVzID0gU3R5bGVUeXBlcztcblxuICBpc1NTUiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuaXNTU1IgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2lyY2xlcyA9IHRoaXMuZ2V0Q2lyY2xlcygpO1xuICB9XG5cbiAgZ2V0Q2lyY2xlcygpOiBhbnlbXSB7XG4gICAgY29uc3Qgc2VyaWVzTmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5zZXJpZXNcbiAgICAgIC5tYXAoKGQsIGkpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBkLnkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkLnggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3QgeSA9IGQueTtcbiAgICAgICAgICBjb25zdCB4ID0gZC54O1xuICAgICAgICAgIGNvbnN0IHIgPSBkLnI7XG5cbiAgICAgICAgICBjb25zdCByYWRpdXMgPSB0aGlzLnJTY2FsZShyIHx8IDEpO1xuICAgICAgICAgIGNvbnN0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdExhYmVsKGQubmFtZSk7XG5cbiAgICAgICAgICBjb25zdCBjeCA9IHRoaXMueFNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkxpbmVhciA/IHRoaXMueFNjYWxlKE51bWJlcih4KSkgOiB0aGlzLnhTY2FsZSh4KTtcbiAgICAgICAgICBjb25zdCBjeSA9IHRoaXMueVNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkxpbmVhciA/IHRoaXMueVNjYWxlKE51bWJlcih5KSkgOiB0aGlzLnlTY2FsZSh5KTtcblxuICAgICAgICAgIGNvbnN0IGNvbG9yID1cbiAgICAgICAgICAgIHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkxpbmVhciA/IHRoaXMuY29sb3JzLmdldENvbG9yKHIpIDogdGhpcy5jb2xvcnMuZ2V0Q29sb3Ioc2VyaWVzTmFtZSk7XG5cbiAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9ICF0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID8gdHJ1ZSA6IHRoaXMuaXNBY3RpdmUoeyBuYW1lOiBzZXJpZXNOYW1lIH0pO1xuICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSBpc0FjdGl2ZSA/IDEgOiAwLjM7XG5cbiAgICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZCwge1xuICAgICAgICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lLFxuICAgICAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IGQueSxcbiAgICAgICAgICAgIHg6IGQueCxcbiAgICAgICAgICAgIHJhZGl1czogZC5yXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgcixcbiAgICAgICAgICAgIGNsYXNzTmFtZXM6IFtgY2lyY2xlLWRhdGEtJHtpfWBdLFxuICAgICAgICAgICAgdmFsdWU6IHksXG4gICAgICAgICAgICBsYWJlbDogeCxcbiAgICAgICAgICAgIGN4LFxuICAgICAgICAgICAgY3ksXG4gICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICB0b29sdGlwTGFiZWwsXG4gICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgIG9wYWNpdHksXG4gICAgICAgICAgICBzZXJpZXNOYW1lLFxuICAgICAgICAgICAgaXNBY3RpdmUsXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtjeH0sJHtjeX0pYFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKGNpcmNsZSA9PiBjaXJjbGUgIT09IHVuZGVmaW5lZCk7XG4gIH1cblxuICBnZXRUb29sdGlwVGV4dChjaXJjbGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IGhhc1JhZGl1cyA9IHR5cGVvZiBjaXJjbGUuciAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgY29uc3QgaGFzVG9vbHRpcExhYmVsID0gY2lyY2xlLnRvb2x0aXBMYWJlbCAmJiBjaXJjbGUudG9vbHRpcExhYmVsLmxlbmd0aDtcbiAgICBjb25zdCBoYXNTZXJpZXNOYW1lID0gY2lyY2xlLnNlcmllc05hbWUgJiYgY2lyY2xlLnNlcmllc05hbWUubGVuZ3RoO1xuXG4gICAgY29uc3QgcmFkaXVzVmFsdWUgPSBoYXNSYWRpdXMgPyBmb3JtYXRMYWJlbChjaXJjbGUucikgOiAnJztcbiAgICBjb25zdCB4QXhpc0xhYmVsID0gdGhpcy54QXhpc0xhYmVsICYmIHRoaXMueEF4aXNMYWJlbCAhPT0gJycgPyBgJHt0aGlzLnhBeGlzTGFiZWx9OmAgOiAnJztcbiAgICBjb25zdCB5QXhpc0xhYmVsID0gdGhpcy55QXhpc0xhYmVsICYmIHRoaXMueUF4aXNMYWJlbCAhPT0gJycgPyBgJHt0aGlzLnlBeGlzTGFiZWx9OmAgOiAnJztcbiAgICBjb25zdCB4ID0gZm9ybWF0TGFiZWwoY2lyY2xlLngpO1xuICAgIGNvbnN0IHkgPSBmb3JtYXRMYWJlbChjaXJjbGUueSk7XG4gICAgY29uc3QgbmFtZSA9XG4gICAgICBoYXNTZXJpZXNOYW1lICYmIGhhc1Rvb2x0aXBMYWJlbFxuICAgICAgICA/IGAke2NpcmNsZS5zZXJpZXNOYW1lfSDigKIgJHtjaXJjbGUudG9vbHRpcExhYmVsfWBcbiAgICAgICAgOiBjaXJjbGUuc2VyaWVzTmFtZSArIGNpcmNsZS50b29sdGlwTGFiZWw7XG4gICAgY29uc3QgdG9vbHRpcFRpdGxlID1cbiAgICAgIGhhc1Nlcmllc05hbWUgfHwgaGFzVG9vbHRpcExhYmVsID8gYDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwobmFtZSl9PC9zcGFuPmAgOiAnJztcblxuICAgIHJldHVybiBgXG4gICAgICAke3Rvb2x0aXBUaXRsZX1cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPlxuICAgICAgICA8bGFiZWw+JHtlc2NhcGVMYWJlbCh4QXhpc0xhYmVsKX08L2xhYmVsPiAke2VzY2FwZUxhYmVsKHgpfTxiciAvPlxuICAgICAgICA8bGFiZWw+JHtlc2NhcGVMYWJlbCh5QXhpc0xhYmVsKX08L2xhYmVsPiAke2VzY2FwZUxhYmVsKHkpfVxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPlxuICAgICAgICAke2VzY2FwZUxhYmVsKHJhZGl1c1ZhbHVlKX1cbiAgICAgIDwvc3Bhbj5cbiAgICBgO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBpc1Zpc2libGUoY2lyY2xlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuYWN0aXZlRW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZSh7IG5hbWU6IGNpcmNsZS5zZXJpZXNOYW1lIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjaXJjbGUub3BhY2l0eSAhPT0gMDtcbiAgfVxuXG4gIGFjdGl2YXRlQ2lyY2xlKGNpcmNsZSk6IHZvaWQge1xuICAgIGNpcmNsZS5iYXJWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVDaXJjbGUoY2lyY2xlKTogdm9pZCB7XG4gICAgY2lyY2xlLmJhclZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IG5hbWU6IHRoaXMuZGF0YS5uYW1lIH0pO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgY2lyY2xlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7Y2lyY2xlLmRhdGEuc2VyaWVzfSAke2NpcmNsZS5kYXRhLm5hbWV9YDtcbiAgfVxufVxuIl19