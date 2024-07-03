import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createMouseEvent } from '../events';
import { isPlatformBrowser } from '@angular/common';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { ScaleType } from './types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./tooltip/tooltip.directive";
export class TooltipArea {
    constructor(platformId) {
        this.platformId = platformId;
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    getValues(xVal) {
        const results = [];
        for (const group of this.results) {
            const item = group.series.find(d => d.name.toString() === xVal.toString());
            let groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                const label = item.name;
                let val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                let color;
                if (this.colors.scaleType === ScaleType.Linear) {
                    let v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                const data = Object.assign({}, item, {
                    value: val,
                    name: label,
                    series: groupName,
                    min: item.min,
                    max: item.max,
                    color
                });
                results.push(data);
            }
        }
        return results;
    }
    mouseMove(event) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const xPos = event.pageX - event.target.getBoundingClientRect().left;
        const closestIndex = this.findClosestPointIndex(xPos);
        const closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            const ev = createMouseEvent('mouseleave');
            this.tooltipAnchor.nativeElement.dispatchEvent(ev);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    }
    findClosestPointIndex(xPos) {
        let minIndex = 0;
        let maxIndex = this.xSet.length - 1;
        let minDiff = Number.MAX_VALUE;
        let closestIndex = 0;
        while (minIndex <= maxIndex) {
            const currentIndex = ((minIndex + maxIndex) / 2) | 0;
            const currentElement = this.xScale(this.xSet[currentIndex]);
            const curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    }
    showTooltip() {
        const event = createMouseEvent('mouseenter');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
    }
    hideTooltip() {
        const event = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    }
    getToolTipText(tooltipItem) {
        let result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    }
}
TooltipArea.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipArea, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
TooltipArea.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: TooltipArea, selector: "g[ngx-charts-tooltip-area]", inputs: { dims: "dims", xSet: "xSet", xScale: "xScale", yScale: "yScale", results: "results", colors: "colors", showPercentage: "showPercentage", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate" }, outputs: { hover: "hover" }, viewQueries: [{ propertyName: "tooltipAnchor", first: true, predicate: ["tooltipAnchor"], descendants: true }], ngImport: i0, template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }], animations: [
        trigger('animationState', [
            transition('inactive => active', [
                style({
                    opacity: 0
                }),
                animate(250, style({ opacity: 0.7 }))
            ]),
            transition('active => inactive', [
                style({
                    opacity: 0.7
                }),
                animate(250, style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-tooltip-area]',
                    template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition('inactive => active', [
                                style({
                                    opacity: 0
                                }),
                                animate(250, style({ opacity: 0.7 }))
                            ]),
                            transition('active => inactive', [
                                style({
                                    opacity: 0.7
                                }),
                                animate(250, style({ opacity: 0 }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { dims: [{
                type: Input
            }], xSet: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], results: [{
                type: Input
            }], colors: [{
                type: Input
            }], showPercentage: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], hover: [{
                type: Output
            }], tooltipAnchor: [{
                type: ViewChild,
                args: ['tooltipAnchor', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vdG9vbHRpcC1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCx1QkFBdUIsRUFFdkIsV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBMEVwRCxNQUFNLE9BQU8sV0FBVztJQXVCdEIsWUFBeUMsVUFBZTtRQUFmLGVBQVUsR0FBVixVQUFVLENBQUs7UUF0QnhELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2QixpQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUc3QixtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBUWYsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHaEMsVUFBSyxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBSVIsQ0FBQztJ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S0FBSztnQkFFSSxLQUFLO3NCQUFkLE1BQU07Z0JBRXdDLGFBQWE7c0JBQTNELFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZixcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBjcmVhdGVNb3VzZUV2ZW50IH0gZnJvbSAnLi4vZXZlbnRzJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vdG9vbHRpcC9wb3NpdGlvbic7XG5pbXBvcnQgeyBTdHlsZVR5cGVzIH0gZnJvbSAnLi90b29sdGlwL3N0eWxlLnR5cGUnO1xuaW1wb3J0IHsgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuL3R5cGVzL3ZpZXctZGltZW5zaW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTY2FsZVR5cGUgfSBmcm9tICcuL3R5cGVzL3NjYWxlLXR5cGUuZW51bSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbHRpcCB7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIGQwOiBudW1iZXI7XG4gIGQxOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBtaW46IG51bWJlcjtcbiAgbmFtZTogYW55O1xuICBzZXJpZXM6IGFueTtcbiAgdmFsdWU6IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXRvb2x0aXAtYXJlYV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6Zz5cbiAgICAgIDxzdmc6cmVjdFxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtYXJlYVwiXG4gICAgICAgIFthdHRyLnhdPVwiMFwiXG4gICAgICAgIHk9XCIwXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwiZGltcy53aWR0aFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJkaW1zLmhlaWdodFwiXG4gICAgICAgIHN0eWxlPVwib3BhY2l0eTogMDsgY3Vyc29yOiAnYXV0byc7XCJcbiAgICAgICAgKG1vdXNlbW92ZSk9XCJtb3VzZU1vdmUoJGV2ZW50KVwiXG4gICAgICAgIChtb3VzZWxlYXZlKT1cImhpZGVUb29sdGlwKClcIlxuICAgICAgLz5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRvb2x0aXBUZW1wbGF0ZSBsZXQtbW9kZWw9XCJtb2RlbFwiPlxuICAgICAgICA8eGh0bWw6ZGl2IGNsYXNzPVwiYXJlYS10b29sdGlwLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDx4aHRtbDpkaXYgKm5nRm9yPVwibGV0IHRvb2x0aXBJdGVtIG9mIG1vZGVsXCIgY2xhc3M9XCJ0b29sdGlwLWl0ZW1cIj5cbiAgICAgICAgICAgIDx4aHRtbDpzcGFuIGNsYXNzPVwidG9vbHRpcC1pdGVtLWNvbG9yXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwidG9vbHRpcEl0ZW0uY29sb3JcIj48L3hodG1sOnNwYW4+XG4gICAgICAgICAgICB7eyBnZXRUb29sVGlwVGV4dCh0b29sdGlwSXRlbSkgfX1cbiAgICAgICAgICA8L3hodG1sOmRpdj5cbiAgICAgICAgPC94aHRtbDpkaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgICN0b29sdGlwQW5jaG9yXG4gICAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiYW5jaG9yT3BhY2l0eSAhPT0gMCA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJ1wiXG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1hbmNob3JcIlxuICAgICAgICBbYXR0ci54XT1cImFuY2hvclBvc1wiXG4gICAgICAgIHk9XCIwXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwiMVwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJkaW1zLmhlaWdodFwiXG4gICAgICAgIFtzdHlsZS5vcGFjaXR5XT1cImFuY2hvck9wYWNpdHlcIlxuICAgICAgICBbc3R5bGUucG9pbnRlci1ldmVudHNdPVwiJ25vbmUnXCJcbiAgICAgICAgbmd4LXRvb2x0aXBcbiAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJwbGFjZW1lbnRUeXBlcy5SaWdodFwiXG4gICAgICAgIFt0b29sdGlwVHlwZV09XCJzdHlsZVR5cGVzLnRvb2x0aXBcIlxuICAgICAgICBbdG9vbHRpcFNwYWNpbmddPVwiMTVcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHRvb2x0aXBUZW1wbGF0ZSA6IGRlZmF1bHRUb29sdGlwVGVtcGxhdGVcIlxuICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiYW5jaG9yVmFsdWVzXCJcbiAgICAgICAgW3Rvb2x0aXBJbW1lZGlhdGVFeGl0XT1cInRydWVcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gYWN0aXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMC43IH0pKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gaW5hY3RpdmUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLjdcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcEFyZWEge1xuICBhbmNob3JPcGFjaXR5OiBudW1iZXIgPSAwO1xuICBhbmNob3JQb3M6IG51bWJlciA9IC0xO1xuICBhbmNob3JWYWx1ZXM6IFRvb2x0aXBbXSA9IFtdO1xuICBsYXN0QW5jaG9yUG9zOiBudW1iZXI7XG5cbiAgcGxhY2VtZW50VHlwZXMgPSBQbGFjZW1lbnRUeXBlcztcbiAgc3R5bGVUeXBlcyA9IFN0eWxlVHlwZXM7XG5cbiAgQElucHV0KCkgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIEBJbnB1dCgpIHhTZXQ6IGFueVtdO1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgcmVzdWx0czogYW55W107XG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIEBJbnB1dCgpIHNob3dQZXJjZW50YWdlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIGhvdmVyOiBFdmVudEVtaXR0ZXI8eyB2YWx1ZTogYW55IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3Rvb2x0aXBBbmNob3InLCB7IHN0YXRpYzogZmFsc2UgfSkgdG9vbHRpcEFuY2hvcjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge31cblxuICBnZXRWYWx1ZXMoeFZhbCk6IFRvb2x0aXBbXSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBncm91cC5zZXJpZXMuZmluZChkID0+IGQubmFtZS50b1N0cmluZygpID09PSB4VmFsLnRvU3RyaW5nKCkpO1xuICAgICAgbGV0IGdyb3VwTmFtZSA9IGdyb3VwLm5hbWU7XG4gICAgICBpZiAoZ3JvdXBOYW1lIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBncm91cE5hbWUgPSBncm91cE5hbWUudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gaXRlbS5uYW1lO1xuICAgICAgICBsZXQgdmFsID0gaXRlbS52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1BlcmNlbnRhZ2UpIHtcbiAgICAgICAgICB2YWwgPSAoaXRlbS5kMSAtIGl0ZW0uZDApLnRvRml4ZWQoMikgKyAnJSc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbG9yO1xuICAgICAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgICAgICAgbGV0IHYgPSB2YWw7XG4gICAgICAgICAgaWYgKGl0ZW0uZDEpIHtcbiAgICAgICAgICAgIHYgPSBpdGVtLmQxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoZ3JvdXAubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSwge1xuICAgICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgICAgbmFtZTogbGFiZWwsXG4gICAgICAgICAgc2VyaWVzOiBncm91cE5hbWUsXG4gICAgICAgICAgbWluOiBpdGVtLm1pbixcbiAgICAgICAgICBtYXg6IGl0ZW0ubWF4LFxuICAgICAgICAgIGNvbG9yXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3VsdHMucHVzaChkYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIG1vdXNlTW92ZShldmVudCkge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHhQb3MgPSBldmVudC5wYWdlWCAtIGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXG4gICAgY29uc3QgY2xvc2VzdEluZGV4ID0gdGhpcy5maW5kQ2xvc2VzdFBvaW50SW5kZXgoeFBvcyk7XG4gICAgY29uc3QgY2xvc2VzdFBvaW50ID0gdGhpcy54U2V0W2Nsb3Nlc3RJbmRleF07XG4gICAgdGhpcy5hbmNob3JQb3MgPSB0aGlzLnhTY2FsZShjbG9zZXN0UG9pbnQpO1xuICAgIHRoaXMuYW5jaG9yUG9zID0gTWF0aC5tYXgoMCwgdGhpcy5hbmNob3JQb3MpO1xuICAgIHRoaXMuYW5jaG9yUG9zID0gTWF0aC5taW4odGhpcy5kaW1zLndpZHRoLCB0aGlzLmFuY2hvclBvcyk7XG5cbiAgICB0aGlzLmFuY2hvclZhbHVlcyA9IHRoaXMuZ2V0VmFsdWVzKGNsb3Nlc3RQb2ludCk7XG4gICAgaWYgKHRoaXMuYW5jaG9yUG9zICE9PSB0aGlzLmxhc3RBbmNob3JQb3MpIHtcbiAgICAgIGNvbnN0IGV2ID0gY3JlYXRlTW91c2VFdmVudCgnbW91c2VsZWF2ZScpO1xuICAgICAgdGhpcy50b29sdGlwQW5jaG9yLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICB0aGlzLmFuY2hvck9wYWNpdHkgPSAwLjc7XG4gICAgICB0aGlzLmhvdmVyLmVtaXQoe1xuICAgICAgICB2YWx1ZTogY2xvc2VzdFBvaW50XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcblxuICAgICAgdGhpcy5sYXN0QW5jaG9yUG9zID0gdGhpcy5hbmNob3JQb3M7XG4gICAgfVxuICB9XG5cbiAgZmluZENsb3Nlc3RQb2ludEluZGV4KHhQb3M6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IG1pbkluZGV4ID0gMDtcbiAgICBsZXQgbWF4SW5kZXggPSB0aGlzLnhTZXQubGVuZ3RoIC0gMTtcbiAgICBsZXQgbWluRGlmZiA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgbGV0IGNsb3Nlc3RJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9ICgobWluSW5kZXggKyBtYXhJbmRleCkgLyAyKSB8IDA7XG4gICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IHRoaXMueFNjYWxlKHRoaXMueFNldFtjdXJyZW50SW5kZXhdKTtcblxuICAgICAgY29uc3QgY3VyRGlmZiA9IE1hdGguYWJzKGN1cnJlbnRFbGVtZW50IC0geFBvcyk7XG5cbiAgICAgIGlmIChjdXJEaWZmIDwgbWluRGlmZikge1xuICAgICAgICBtaW5EaWZmID0gY3VyRGlmZjtcbiAgICAgICAgY2xvc2VzdEluZGV4ID0gY3VycmVudEluZGV4O1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQgPCB4UG9zKSB7XG4gICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVsZW1lbnQgPiB4UG9zKSB7XG4gICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pbkRpZmYgPSAwO1xuICAgICAgICBjbG9zZXN0SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbG9zZXN0SW5kZXg7XG4gIH1cblxuICBzaG93VG9vbHRpcCgpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudCA9IGNyZWF0ZU1vdXNlRXZlbnQoJ21vdXNlZW50ZXInKTtcbiAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGhpZGVUb29sdGlwKCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlTW91c2VFdmVudCgnbW91c2VsZWF2ZScpO1xuICAgIHRoaXMudG9vbHRpcEFuY2hvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuYW5jaG9yT3BhY2l0eSA9IDA7XG4gICAgdGhpcy5sYXN0QW5jaG9yUG9zID0gLTE7XG4gIH1cblxuICBnZXRUb29sVGlwVGV4dCh0b29sdGlwSXRlbTogVG9vbHRpcCk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdDogc3RyaW5nID0gJyc7XG4gICAgaWYgKHRvb2x0aXBJdGVtLnNlcmllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgKz0gdG9vbHRpcEl0ZW0uc2VyaWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgKz0gJz8/Pyc7XG4gICAgfVxuICAgIHJlc3VsdCArPSAnOiAnO1xuICAgIGlmICh0b29sdGlwSXRlbS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgKz0gdG9vbHRpcEl0ZW0udmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHRvb2x0aXBJdGVtLm1pbiAhPT0gdW5kZWZpbmVkIHx8IHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgKz0gJyAoJztcbiAgICAgIGlmICh0b29sdGlwSXRlbS5taW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodG9vbHRpcEl0ZW0ubWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXN1bHQgKz0gJ+KJpSc7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLm1pbi50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICBpZiAodG9vbHRpcEl0ZW0ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXN1bHQgKz0gJyAtICc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodG9vbHRpcEl0ZW0ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0ICs9ICfiiaQnO1xuICAgICAgfVxuICAgICAgaWYgKHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS5tYXgudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCArPSAnKSc7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==