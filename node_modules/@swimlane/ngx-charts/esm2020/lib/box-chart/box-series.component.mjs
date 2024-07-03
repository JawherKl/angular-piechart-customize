import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { min, max, quantile } from 'd3-array';
import { trigger, transition, style, animate } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { StyleTypes } from '../common/tooltip/style.type';
import { PlacementTypes } from '../common/tooltip/position';
import { ScaleType } from '../common/types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "./box.component";
import * as i2 from "../common/tooltip/tooltip.directive";
export class BoxSeriesComponent {
    constructor() {
        this.animations = true;
        this.tooltipDisabled = false;
        this.gradient = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    onClick(data) {
        this.select.emit(data);
    }
    update() {
        this.updateTooltipSettings();
        const width = this.series && this.series.series.length ? Math.round(this.xScale.bandwidth()) : null;
        const seriesName = this.series.name;
        // Calculate Quantile and Whiskers for each box serie.
        this.counts = this.series.series;
        const mappedCounts = this.counts.map(serie => Number(serie.value));
        this.whiskers = [min(mappedCounts), max(mappedCounts)];
        // We get the group count and must sort it in order to retrieve quantiles.
        const groupCounts = this.counts.map(item => item.value).sort((a, b) => Number(a) - Number(b));
        this.quartiles = this.getBoxQuantiles(groupCounts);
        this.lineCoordinates = this.getLinesCoordinates(seriesName.toString(), this.whiskers, this.quartiles, width);
        const value = this.quartiles[1];
        const formattedLabel = formatLabel(seriesName);
        const box = {
            value,
            data: this.counts,
            label: seriesName,
            formattedLabel,
            width,
            height: 0,
            x: 0,
            y: 0,
            roundEdges: this.roundEdges,
            quartiles: this.quartiles,
            lineCoordinates: this.lineCoordinates
        };
        box.height = Math.abs(this.yScale(this.quartiles[0]) - this.yScale(this.quartiles[2]));
        box.x = this.xScale(seriesName.toString());
        box.y = this.yScale(this.quartiles[2]);
        box.ariaLabel = formattedLabel + ' - Median: ' + value.toLocaleString();
        if (this.colors.scaleType === ScaleType.Ordinal) {
            box.color = this.colors.getColor(seriesName);
        }
        else {
            box.color = this.colors.getColor(this.quartiles[1]);
            box.gradientStops = this.colors.getLinearGradientStops(this.quartiles[0], this.quartiles[2]);
        }
        const tooltipLabel = formattedLabel;
        const formattedTooltipLabel = `
    <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
    <span class="tooltip-val">
      • Q1: ${this.quartiles[0]} • Q2: ${this.quartiles[1]} • Q3: ${this.quartiles[2]}<br>
      • Min: ${this.whiskers[0]} • Max: ${this.whiskers[1]}
    </span>`;
        box.tooltipText = this.tooltipDisabled ? undefined : formattedTooltipLabel;
        this.tooltipTitle = this.tooltipDisabled ? undefined : box.tooltipText;
        this.box = box;
    }
    getBoxQuantiles(inputData) {
        return [quantile(inputData, 0.25), quantile(inputData, 0.5), quantile(inputData, 0.75)];
    }
    getLinesCoordinates(seriesName, whiskers, quartiles, barWidth) {
        // The X value is not being centered, so had to sum half the width to align it.
        const commonX = this.xScale(seriesName);
        const offsetX = commonX + barWidth / 2;
        const medianLineWidth = Math.max(barWidth + 4 * this.strokeWidth, 1);
        const whiskerLineWidth = Math.max(barWidth / 3, 1);
        const whiskerZero = this.yScale(whiskers[0]);
        const whiskerOne = this.yScale(whiskers[1]);
        const median = this.yScale(quartiles[1]);
        const topLine = {
            v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerZero },
            v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerZero }
        };
        const medianLine = {
            v1: { x: offsetX + medianLineWidth / 2, y: median },
            v2: { x: offsetX - medianLineWidth / 2, y: median }
        };
        const bottomLine = {
            v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerOne },
            v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerOne }
        };
        const verticalLine = {
            v1: { x: offsetX, y: whiskerZero },
            v2: { x: offsetX, y: whiskerOne }
        };
        return [verticalLine, topLine, medianLine, bottomLine];
    }
    updateTooltipSettings() {
        if (this.tooltipDisabled) {
            this.tooltipPlacement = undefined;
            this.tooltipType = undefined;
        }
        else {
            if (!this.tooltipPlacement) {
                this.tooltipPlacement = PlacementTypes.Top;
            }
            if (!this.tooltipType) {
                this.tooltipType = StyleTypes.tooltip;
            }
        }
    }
}
BoxSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BoxSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BoxSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: BoxSeriesComponent, selector: "g[ngx-charts-box-series]", inputs: { dims: "dims", series: "series", xScale: "xScale", yScale: "yScale", colors: "colors", animations: "animations", strokeColor: "strokeColor", strokeWidth: "strokeWidth", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate", tooltipPlacement: "tooltipPlacement", tooltipType: "tooltipType", roundEdges: "roundEdges", gradient: "gradient" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g
      ngx-charts-box
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="box.width"
      [height]="box.height"
      [x]="box.x"
      [y]="box.y"
      [roundEdges]="box.roundEdges"
      [fill]="box.color"
      [gradientStops]="box.gradientStops"
      [strokeColor]="strokeColor"
      [strokeWidth]="strokeWidth"
      [data]="box.data"
      [lineCoordinates]="box.lineCoordinates"
      [gradient]="gradient"
      [ariaLabel]="box.ariaLabel"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTitle"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="box.data"
      [animations]="animations"
    ></svg:g>
  `, isInline: true, components: [{ type: i1.BoxComponent, selector: "g[ngx-charts-box]", inputs: ["strokeColor", "strokeWidth", "fill", "data", "width", "height", "x", "y", "lineCoordinates", "roundEdges", "gradient", "gradientStops", "offset", "isActive", "animations", "ariaLabel", "noBarWhenZero"], outputs: ["select", "activate", "deactivate"] }], directives: [{ type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }], animations: [
        trigger('animationState', [
            transition(':leave', [
                style({
                    opacity: 1
                }),
                animate(500, style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BoxSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-box-series]',
                    template: `
    <svg:g
      ngx-charts-box
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="box.width"
      [height]="box.height"
      [x]="box.x"
      [y]="box.y"
      [roundEdges]="box.roundEdges"
      [fill]="box.color"
      [gradientStops]="box.gradientStops"
      [strokeColor]="strokeColor"
      [strokeWidth]="strokeWidth"
      [data]="box.data"
      [lineCoordinates]="box.lineCoordinates"
      [gradient]="gradient"
      [ariaLabel]="box.ariaLabel"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTitle"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="box.data"
      [animations]="animations"
    ></svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition(':leave', [
                                style({
                                    opacity: 1
                                }),
                                animate(500, style({ opacity: 0 }))
                            ])
                        ])
                    ]
                }]
        }], propDecorators: { dims: [{
                type: Input
            }], series: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], colors: [{
                type: Input
            }], animations: [{
                type: Input
            }], strokeColor: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipType: [{
                type: Input
            }], roundEdges: [{
                type: Input
            }], gradient: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvYm94LWNoYXJ0L2JveC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUk5QyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7OztBQWdENUQsTUFBTSxPQUFPLGtCQUFrQjtJQTdDL0I7UUFtRFcsZUFBVSxHQUFZLElBQUksQ0FBQztRQUczQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUtqQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxhQUFRLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsZUFBVSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO0tBZ0lwRTtJQXZIQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFB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LFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtaW4sIG1heCwgcXVhbnRpbGUgfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQgeyBTY2FsZUxpbmVhciwgU2NhbGVCYW5kIH0gZnJvbSAnZDMtc2NhbGUnO1xuaW1wb3J0IHsgSUJveE1vZGVsLCBCb3hDaGFydFNlcmllcywgRGF0YUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBJVmVjdG9yMkQgfSBmcm9tICcuLi9tb2RlbHMvY29vcmRpbmF0ZXMubW9kZWwnO1xuaW1wb3J0IHsgdHJpZ2dlciwgdHJhbnNpdGlvbiwgc3R5bGUsIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCwgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuLi9jb21tb24vdG9vbHRpcC9zdHlsZS50eXBlJztcbmltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi4vY29tbW9uL3Rvb2x0aXAvcG9zaXRpb24nO1xuaW1wb3J0IHsgU2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NjYWxlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92aWV3LWRpbWVuc2lvbi5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYm94LXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6Z1xuICAgICAgbmd4LWNoYXJ0cy1ib3hcbiAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxuICAgICAgW0AuZGlzYWJsZWRdPVwiIWFuaW1hdGlvbnNcIlxuICAgICAgW3dpZHRoXT1cImJveC53aWR0aFwiXG4gICAgICBbaGVpZ2h0XT1cImJveC5oZWlnaHRcIlxuICAgICAgW3hdPVwiYm94LnhcIlxuICAgICAgW3ldPVwiYm94LnlcIlxuICAgICAgW3JvdW5kRWRnZXNdPVwiYm94LnJvdW5kRWRnZXNcIlxuICAgICAgW2ZpbGxdPVwiYm94LmNvbG9yXCJcbiAgICAgIFtncmFkaWVudFN0b3BzXT1cImJveC5ncmFkaWVudFN0b3BzXCJcbiAgICAgIFtzdHJva2VDb2xvcl09XCJzdHJva2VDb2xvclwiXG4gICAgICBbc3Ryb2tlV2lkdGhdPVwic3Ryb2tlV2lkdGhcIlxuICAgICAgW2RhdGFdPVwiYm94LmRhdGFcIlxuICAgICAgW2xpbmVDb29yZGluYXRlc109XCJib3gubGluZUNvb3JkaW5hdGVzXCJcbiAgICAgIFtncmFkaWVudF09XCJncmFkaWVudFwiXG4gICAgICBbYXJpYUxhYmVsXT1cImJveC5hcmlhTGFiZWxcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICBuZ3gtdG9vbHRpcFxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICBbdG9vbHRpcFR5cGVdPVwidG9vbHRpcFR5cGVcIlxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGl0bGVcIlxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImJveC5kYXRhXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgID48L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCb3hTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkaW1zOiBWaWV3RGltZW5zaW9ucztcbiAgQElucHV0KCkgc2VyaWVzOiBCb3hDaGFydFNlcmllcztcbiAgQElucHV0KCkgeFNjYWxlOiBTY2FsZUJhbmQ8c3RyaW5nPjtcbiAgQElucHV0KCkgeVNjYWxlOiBTY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBzdHJva2VXaWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRUeXBlcztcbiAgQElucHV0KCkgdG9vbHRpcFR5cGU6IFN0eWxlVHlwZXM7XG4gIEBJbnB1dCgpIHJvdW5kRWRnZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPElCb3hNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPElCb3hNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8SUJveE1vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBib3g6IElCb3hNb2RlbDtcbiAgY291bnRzOiBEYXRhSXRlbVtdO1xuICBxdWFydGlsZXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgd2hpc2tlcnM6IFtudW1iZXIsIG51bWJlcl07XG4gIGxpbmVDb29yZGluYXRlczogW0lWZWN0b3IyRCwgSVZlY3RvcjJELCBJVmVjdG9yMkQsIElWZWN0b3IyRF07XG4gIHRvb2x0aXBUaXRsZTogc3RyaW5nO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgb25DbGljayhkYXRhOiBJQm94TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlVG9vbHRpcFNldHRpbmdzKCk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnNlcmllcyAmJiB0aGlzLnNlcmllcy5zZXJpZXMubGVuZ3RoID8gTWF0aC5yb3VuZCh0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKSkgOiBudWxsO1xuICAgIGNvbnN0IHNlcmllc05hbWUgPSB0aGlzLnNlcmllcy5uYW1lO1xuXG4gICAgLy8gQ2FsY3VsYXRlIFF1YW50aWxlIGFuZCBXaGlza2VycyBmb3IgZWFjaCBib3ggc2VyaWUuXG4gICAgdGhpcy5jb3VudHMgPSB0aGlzLnNlcmllcy5zZXJpZXM7XG5cbiAgICBjb25zdCBtYXBwZWRDb3VudHMgPSB0aGlzLmNvdW50cy5tYXAoc2VyaWUgPT4gTnVtYmVyKHNlcmllLnZhbHVlKSk7XG4gICAgdGhpcy53aGlza2VycyA9IFttaW4obWFwcGVkQ291bnRzKSwgbWF4KG1hcHBlZENvdW50cyldO1xuXG4gICAgLy8gV2UgZ2V0IHRoZSBncm91cCBjb3VudCBhbmQgbXVzdCBzb3J0IGl0IGluIG9yZGVyIHRvIHJldHJpZXZlIHF1YW50aWxlcy5cbiAgICBjb25zdCBncm91cENvdW50cyA9IHRoaXMuY291bnRzLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpLnNvcnQoKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKSk7XG4gICAgdGhpcy5xdWFydGlsZXMgPSB0aGlzLmdldEJveFF1YW50aWxlcyhncm91cENvdW50cyk7XG4gICAgdGhpcy5saW5lQ29vcmRpbmF0ZXMgPSB0aGlzLmdldExpbmVzQ29vcmRpbmF0ZXMoc2VyaWVzTmFtZS50b1N0cmluZygpLCB0aGlzLndoaXNrZXJzLCB0aGlzLnF1YXJ0aWxlcywgd2lkdGgpO1xuXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnF1YXJ0aWxlc1sxXTtcbiAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IGZvcm1hdExhYmVsKHNlcmllc05hbWUpO1xuICAgIGNvbnN0IGJveDogSUJveE1vZGVsID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBkYXRhOiB0aGlzLmNvdW50cyxcbiAgICAgIGxhYmVsOiBzZXJpZXNOYW1lLFxuICAgICAgZm9ybWF0dGVkTGFiZWwsXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgcm91bmRFZGdlczogdGhpcy5yb3VuZEVkZ2VzLFxuICAgICAgcXVhcnRpbGVzOiB0aGlzLnF1YXJ0aWxlcyxcbiAgICAgIGxpbmVDb29yZGluYXRlczogdGhpcy5saW5lQ29vcmRpbmF0ZXNcbiAgICB9O1xuXG4gICAgYm94LmhlaWdodCA9IE1hdGguYWJzKHRoaXMueVNjYWxlKHRoaXMucXVhcnRpbGVzWzBdKSAtIHRoaXMueVNjYWxlKHRoaXMucXVhcnRpbGVzWzJdKSk7XG4gICAgYm94LnggPSB0aGlzLnhTY2FsZShzZXJpZXNOYW1lLnRvU3RyaW5nKCkpO1xuICAgIGJveC55ID0gdGhpcy55U2NhbGUodGhpcy5xdWFydGlsZXNbMl0pO1xuICAgIGJveC5hcmlhTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbCArICcgLSBNZWRpYW46ICcgKyB2YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuXG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLk9yZGluYWwpIHtcbiAgICAgIGJveC5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHNlcmllc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3guY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih0aGlzLnF1YXJ0aWxlc1sxXSk7XG4gICAgICBib3guZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHModGhpcy5xdWFydGlsZXNbMF0sIHRoaXMucXVhcnRpbGVzWzJdKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b29sdGlwTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbDtcbiAgICBjb25zdCBmb3JtYXR0ZWRUb29sdGlwTGFiZWwgPSBgXG4gICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbCh0b29sdGlwTGFiZWwpfTwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+XG4gICAgICDigKIgUTE6ICR7dGhpcy5xdWFydGlsZXNbMF19IOKAoiBRMjogJHt0aGlzLnF1YXJ0aWxlc1sxXX0g4oCiIFEzOiAke3RoaXMucXVhcnRpbGVzWzJdfTxicj5cbiAgICAgIOKAoiBNaW46ICR7dGhpcy53aGlza2Vyc1swXX0g4oCiIE1heDogJHt0aGlzLndoaXNrZXJzWzFdfVxuICAgIDwvc3Bhbj5gO1xuXG4gICAgYm94LnRvb2x0aXBUZXh0ID0gdGhpcy50b29sdGlwRGlzYWJsZWQgPyB1bmRlZmluZWQgOiBmb3JtYXR0ZWRUb29sdGlwTGFiZWw7XG4gICAgdGhpcy50b29sdGlwVGl0bGUgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6IGJveC50b29sdGlwVGV4dDtcblxuICAgIHRoaXMuYm94ID0gYm94O1xuICB9XG5cbiAgZ2V0Qm94UXVhbnRpbGVzKGlucHV0RGF0YTogQXJyYXk8bnVtYmVyIHwgRGF0ZT4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICAgIHJldHVybiBbcXVhbnRpbGUoaW5wdXREYXRhLCAwLjI1KSwgcXVhbnRpbGUoaW5wdXREYXRhLCAwLjUpLCBxdWFudGlsZShpbnB1dERhdGEsIDAuNzUpXTtcbiAgfVxuXG4gIGdldExpbmVzQ29vcmRpbmF0ZXMoXG4gICAgc2VyaWVzTmFtZTogc3RyaW5nLFxuICAgIHdoaXNrZXJzOiBbbnVtYmVyLCBudW1iZXJdLFxuICAgIHF1YXJ0aWxlczogW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgIGJhcldpZHRoOiBudW1iZXJcbiAgKTogW0lWZWN0b3IyRCwgSVZlY3RvcjJELCBJVmVjdG9yMkQsIElWZWN0b3IyRF0ge1xuICAgIC8vIFRoZSBYIHZhbHVlIGlzIG5vdCBiZWluZyBjZW50ZXJlZCwgc28gaGFkIHRvIHN1bSBoYWxmIHRoZSB3aWR0aCB0byBhbGlnbiBpdC5cbiAgICBjb25zdCBjb21tb25YID0gdGhpcy54U2NhbGUoc2VyaWVzTmFtZSk7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IGNvbW1vblggKyBiYXJXaWR0aCAvIDI7XG5cbiAgICBjb25zdCBtZWRpYW5MaW5lV2lkdGggPSBNYXRoLm1heChiYXJXaWR0aCArIDQgKiB0aGlzLnN0cm9rZVdpZHRoLCAxKTtcbiAgICBjb25zdCB3aGlza2VyTGluZVdpZHRoID0gTWF0aC5tYXgoYmFyV2lkdGggLyAzLCAxKTtcblxuICAgIGNvbnN0IHdoaXNrZXJaZXJvID0gdGhpcy55U2NhbGUod2hpc2tlcnNbMF0pO1xuICAgIGNvbnN0IHdoaXNrZXJPbmUgPSB0aGlzLnlTY2FsZSh3aGlza2Vyc1sxXSk7XG4gICAgY29uc3QgbWVkaWFuID0gdGhpcy55U2NhbGUocXVhcnRpbGVzWzFdKTtcblxuICAgIGNvbnN0IHRvcExpbmU6IElWZWN0b3IyRCA9IHtcbiAgICAgIHYxOiB7IHg6IG9mZnNldFggKyB3aGlza2VyTGluZVdpZHRoIC8gMiwgeTogd2hpc2tlclplcm8gfSxcbiAgICAgIHYyOiB7IHg6IG9mZnNldFggLSB3aGlza2VyTGluZVdpZHRoIC8gMiwgeTogd2hpc2tlclplcm8gfVxuICAgIH07XG4gICAgY29uc3QgbWVkaWFuTGluZTogSVZlY3RvcjJEID0ge1xuICAgICAgdjE6IHsgeDogb2Zmc2V0WCArIG1lZGlhbkxpbmVXaWR0aCAvIDIsIHk6IG1lZGlhbiB9LFxuICAgICAgdjI6IHsgeDogb2Zmc2V0WCAtIG1lZGlhbkxpbmVXaWR0aCAvIDIsIHk6IG1lZGlhbiB9XG4gICAgfTtcbiAgICBjb25zdCBib3R0b21MaW5lOiBJVmVjdG9yMkQgPSB7XG4gICAgICB2MTogeyB4OiBvZmZzZXRYICsgd2hpc2tlckxpbmVXaWR0aCAvIDIsIHk6IHdoaXNrZXJPbmUgfSxcbiAgICAgIHYyOiB7IHg6IG9mZnNldFggLSB3aGlza2VyTGluZVdpZHRoIC8gMiwgeTogd2hpc2tlck9uZSB9XG4gICAgfTtcbiAgICBjb25zdCB2ZXJ0aWNhbExpbmU6IElWZWN0b3IyRCA9IHtcbiAgICAgIHYxOiB7IHg6IG9mZnNldFgsIHk6IHdoaXNrZXJaZXJvIH0sXG4gICAgICB2MjogeyB4OiBvZmZzZXRYLCB5OiB3aGlza2VyT25lIH1cbiAgICB9O1xuICAgIHJldHVybiBbdmVydGljYWxMaW5lLCB0b3BMaW5lLCBtZWRpYW5MaW5lLCBib3R0b21MaW5lXTtcbiAgfVxuXG4gIHVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpIHtcbiAgICBpZiAodGhpcy50b29sdGlwRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMudG9vbHRpcFBsYWNlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudG9vbHRpcFR5cGUgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy50b29sdGlwUGxhY2VtZW50KSB7XG4gICAgICAgIHRoaXMudG9vbHRpcFBsYWNlbWVudCA9IFBsYWNlbWVudFR5cGVzLlRvcDtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy50b29sdGlwVHlwZSkge1xuICAgICAgICB0aGlzLnRvb2x0aXBUeXBlID0gU3R5bGVUeXBlcy50b29sdGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19