import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { easeSinInOut } from 'd3-ease';
import rfdc from 'rfdc';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "../common/svg-linear-gradient.component";
import * as i2 from "@angular/common";
const cloneDeep = rfdc();
export class BoxComponent {
    constructor(element, cd) {
        this.cd = cd;
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.animations = true;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.BarOrientation = BarOrientation;
        this.initialized = false;
        this.hasGradient = false;
        this.hideBar = false;
        this.nativeElm = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    }
    update() {
        this.boxStrokeWidth = Math.max(this.strokeWidth, 1);
        this.whiskerStrokeWidth = Math.max(this.strokeWidth / 2, 1);
        this.medianLineWidth = 1.5 * this.strokeWidth;
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (this.gradient) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updateLineEl();
        this.updatePathEl();
        this.checkToHideBar();
        this.maskLineId = 'mask' + id().toString();
        this.maskLine = `url(#${this.maskLineId})`;
        if (this.cd) {
            this.cd.markForCheck();
        }
    }
    loadAnimation() {
        this.boxPath = this.oldPath = this.getStartingPath();
        this.oldLineCoordinates = this.getStartingLineCoordinates();
        setTimeout(this.update.bind(this), 100);
    }
    updatePathEl() {
        const nodeBar = select(this.nativeElm).selectAll('.bar');
        const path = this.getPath();
        if (this.animations) {
            nodeBar
                .attr('d', this.oldPath)
                .transition()
                .ease(easeSinInOut)
                .duration(500)
                .attrTween('d', this.pathTween(path, 4));
        }
        else {
            nodeBar.attr('d', path);
        }
        this.oldPath = path;
    }
    updateLineEl() {
        const lineEl = select(this.nativeElm).selectAll('.bar-line');
        const lineCoordinates = this.lineCoordinates;
        const oldLineCoordinates = this.oldLineCoordinates;
        if (this.animations) {
            lineEl
                .attr('x1', (_, index) => oldLineCoordinates[index].v1.x)
                .attr('y1', (_, index) => oldLineCoordinates[index].v1.y)
                .attr('x2', (_, index) => oldLineCoordinates[index].v2.x)
                .attr('y2', (_, index) => oldLineCoordinates[index].v2.y)
                .transition()
                .ease(easeSinInOut)
                .duration(500)
                .attr('x1', (_, index) => lineCoordinates[index].v1.x)
                .attr('y1', (_, index) => lineCoordinates[index].v1.y)
                .attr('x2', (_, index) => lineCoordinates[index].v2.x)
                .attr('y2', (_, index) => lineCoordinates[index].v2.y);
        }
        else {
            lineEl
                .attr('x1', (_, index) => lineCoordinates[index].v1.x)
                .attr('y1', (_, index) => lineCoordinates[index].v1.y)
                .attr('x2', (_, index) => lineCoordinates[index].v2.x)
                .attr('y2', (_, index) => lineCoordinates[index].v2.y);
        }
        this.oldLineCoordinates = [...lineCoordinates];
    }
    /**
     * See [D3 Selections](https://www.d3indepth.com/selections/)
     * @param d The joined data.
     * @param index The index of the element within the selection
     * @param node The node element (Line).
     */
    lineTween(attr, d, index, node) {
        const nodeLineEl = node[index];
        return nodeLineEl[attr].baseVal.value;
    }
    // TODO: Refactor into another .ts file if https://github.com/swimlane/ngx-charts/pull/1179 gets merged.
    pathTween(d1, precision) {
        return function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const path0 = this;
            const path1 = this.cloneNode();
            path1.setAttribute('d', d1);
            const n0 = path0?.getTotalLength();
            const n1 = path1?.getTotalLength();
            // Uniform sampling of distance based on specified precision.
            const distances = [0];
            let i = 0;
            const dt = precision / Math.max(n0, n1);
            while (i < 1) {
                distances.push(i);
                i += dt;
            }
            distances.push(1);
            // Compute point-interpolators at each distance.
            const points = distances.map((t) => {
                const p0 = path0.getPointAtLength(t * n0);
                const p1 = path1.getPointAtLength(t * n1);
                return interpolate([p0.x, p0.y], [p1.x, p1.y]);
            });
            // 't': T is the fraction of time (between 0 and 1) since the transition began.
            return (t) => {
                return t < 1 ? 'M' + points.map((p) => p(t)).join('L') : d1;
            };
        };
    }
    getStartingPath() {
        if (!this.animations) {
            return this.getPath();
        }
        const radius = this.roundEdges ? 1 : 0;
        const { x, y } = this.lineCoordinates[2].v1;
        return roundedRect(x - this.width, y - 1, this.width, 2, radius, this.edges);
    }
    getPath() {
        const radius = this.getRadius();
        let path = '';
        path = roundedRect(this.x, this.y, this.width, this.height, Math.min(this.height, radius), this.edges);
        return path;
    }
    getStartingLineCoordinates() {
        if (!this.animations) {
            return [...this.lineCoordinates];
        }
        const lineCoordinates = cloneDeep(this.lineCoordinates);
        lineCoordinates[1].v1.y = lineCoordinates[1].v2.y = lineCoordinates[3].v1.y = lineCoordinates[3].v2.y = lineCoordinates[0].v1.y = lineCoordinates[0].v2.y =
            lineCoordinates[2].v1.y;
        return lineCoordinates;
    }
    getRadius() {
        let radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    }
    getGradient() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
    getStartOpacity() {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    }
    get edges() {
        let edges = [false, false, false, false];
        if (this.roundEdges) {
            edges = [true, true, true, true];
        }
        return edges;
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
    checkToHideBar() {
        this.hideBar = this.noBarWhenZero && this.height === 0;
    }
}
BoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
BoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: BoxComponent, selector: "g[ngx-charts-box]", inputs: { strokeColor: "strokeColor", strokeWidth: "strokeWidth", fill: "fill", data: "data", width: "width", height: "height", x: "x", y: "y", lineCoordinates: "lineCoordinates", roundEdges: "roundEdges", gradient: "gradient", gradientStops: "gradientStops", offset: "offset", isActive: "isActive", animations: "animations", ariaLabel: "ariaLabel", noBarWhenZero: "noBarWhenZero" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, usesOnChanges: true, ngImport: i0, template: `
    <svg:defs>
      <svg:g
        *ngIf="hasGradient"
        ngx-charts-svg-linear-gradient
        [orientation]="BarOrientation.Vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
      <svg:mask [attr.id]="maskLineId">
        <svg:g>
          <rect height="100%" width="100%" fill="white" fill-opacity="1" />
          <path class="bar" [attr.d]="boxPath" fill="black" fill-opacity="1" />
        </svg:g>
      </svg:mask>
    </svg:defs>
    <svg:g>
      <svg:path
        class="bar"
        role="img"
        tabIndex="-1"
        [class.active]="isActive"
        [class.hidden]="hideBar"
        [attr.d]="boxPath"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="boxStrokeWidth"
        [attr.aria-label]="ariaLabel"
        [attr.fill]="hasGradient ? gradientFill : fill"
        (click)="select.emit(data)"
      />
      <svg:line
        *ngFor="let line of lineCoordinates; let i = index"
        class="bar-line"
        [class.hidden]="hideBar"
        [attr.x1]="line.v1.x"
        [attr.y1]="line.v1.y"
        [attr.x2]="line.v2.x"
        [attr.y2]="line.v2.y"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="i === 2 ? medianLineWidth : whiskerStrokeWidth"
        [attr.mask]="i ? undefined : maskLine"
        fill="none"
      />
    </svg:g>
  `, isInline: true, components: [{ type: i1.SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: ["orientation", "name", "stops"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: BoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-box]',
                    template: `
    <svg:defs>
      <svg:g
        *ngIf="hasGradient"
        ngx-charts-svg-linear-gradient
        [orientation]="BarOrientation.Vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
      <svg:mask [attr.id]="maskLineId">
        <svg:g>
          <rect height="100%" width="100%" fill="white" fill-opacity="1" />
          <path class="bar" [attr.d]="boxPath" fill="black" fill-opacity="1" />
        </svg:g>
      </svg:mask>
    </svg:defs>
    <svg:g>
      <svg:path
        class="bar"
        role="img"
        tabIndex="-1"
        [class.active]="isActive"
        [class.hidden]="hideBar"
        [attr.d]="boxPath"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="boxStrokeWidth"
        [attr.aria-label]="ariaLabel"
        [attr.fill]="hasGradient ? gradientFill : fill"
        (click)="select.emit(data)"
      />
      <svg:line
        *ngFor="let line of lineCoordinates; let i = index"
        class="bar-line"
        [class.hidden]="hideBar"
        [attr.x1]="line.v1.x"
        [attr.y1]="line.v1.y"
        [attr.x2]="line.v2.x"
        [attr.y2]="line.v2.y"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="i === 2 ? medianLineWidth : whiskerStrokeWidth"
        [attr.mask]="i ? undefined : maskLine"
        fill="none"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { strokeColor: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], fill: [{
                type: Input
            }], data: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], x: [{
                type: Input
            }], y: [{
                type: Input
            }], lineCoordinates: [{
                type: Input
            }], roundEdges: [{
                type: Input
            }], gradient: [{
                type: Input
            }], gradientStops: [{
                type: Input
            }], offset: [{
                type: Input
            }], isActive: [{
                type: Input
            }], animations: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], noBarWhenZero: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9ib3gtY2hhcnQvYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFJWix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBWSxNQUFNLGNBQWMsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV2QyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHakMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7O0FBR3RFLE1BQU0sU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDO0FBcUR6QixNQUFNLE9BQU8sWUFBWTtJQWdEdkIsWUFBWSxPQUFtQixFQUFZLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBdEN2RCxlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFN0IsV0FBTSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztR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LGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTTtZQUNMLE1BQU07aUJBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7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b25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBFbGVtZW50UmVmLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNlbGVjdCwgQmFzZVR5cGUgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGUgfSBmcm9tICdkMy1pbnRlcnBvbGF0ZSc7XG5pbXBvcnQgeyBlYXNlU2luSW5PdXQgfSBmcm9tICdkMy1lYXNlJztcblxuaW1wb3J0IHJmZGMgZnJvbSAncmZkYyc7XG5pbXBvcnQgeyByb3VuZGVkUmVjdCB9IGZyb20gJy4uL2NvbW1vbi9zaGFwZS5oZWxwZXInO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XG5pbXBvcnQgeyBJQm94TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBJVmVjdG9yMkQgfSBmcm9tICcuLi9tb2RlbHMvY29vcmRpbmF0ZXMubW9kZWwnO1xuaW1wb3J0IHsgQmFyT3JpZW50YXRpb24gfSBmcm9tICcuLi9jb21tb24vdHlwZXMvYmFyLW9yaWVudGF0aW9uLmVudW0nO1xuaW1wb3J0IHsgR3JhZGllbnQgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvZ3JhZGllbnQuaW50ZXJmYWNlJztcblxuY29uc3QgY2xvbmVEZWVwID0gcmZkYygpO1xuXG50eXBlIExpbmVDb29yZGluYXRlcyA9IFtJVmVjdG9yMkQsIElWZWN0b3IyRCwgSVZlY3RvcjJELCBJVmVjdG9yMkRdO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYm94XScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpkZWZzPlxuICAgICAgPHN2ZzpnXG4gICAgICAgICpuZ0lmPVwiaGFzR3JhZGllbnRcIlxuICAgICAgICBuZ3gtY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnRcbiAgICAgICAgW29yaWVudGF0aW9uXT1cIkJhck9yaWVudGF0aW9uLlZlcnRpY2FsXCJcbiAgICAgICAgW25hbWVdPVwiZ3JhZGllbnRJZFwiXG4gICAgICAgIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOm1hc2sgW2F0dHIuaWRdPVwibWFza0xpbmVJZFwiPlxuICAgICAgICA8c3ZnOmc+XG4gICAgICAgICAgPHJlY3QgaGVpZ2h0PVwiMTAwJVwiIHdpZHRoPVwiMTAwJVwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGwtb3BhY2l0eT1cIjFcIiAvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiYmFyXCIgW2F0dHIuZF09XCJib3hQYXRoXCIgZmlsbD1cImJsYWNrXCIgZmlsbC1vcGFjaXR5PVwiMVwiIC8+XG4gICAgICAgIDwvc3ZnOmc+XG4gICAgICA8L3N2ZzptYXNrPlxuICAgIDwvc3ZnOmRlZnM+XG4gICAgPHN2ZzpnPlxuICAgICAgPHN2ZzpwYXRoXG4gICAgICAgIGNsYXNzPVwiYmFyXCJcbiAgICAgICAgcm9sZT1cImltZ1wiXG4gICAgICAgIHRhYkluZGV4PVwiLTFcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgICAgICAgW2NsYXNzLmhpZGRlbl09XCJoaWRlQmFyXCJcbiAgICAgICAgW2F0dHIuZF09XCJib3hQYXRoXCJcbiAgICAgICAgW2F0dHIuc3Ryb2tlXT1cInN0cm9rZUNvbG9yXCJcbiAgICAgICAgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cImJveFN0cm9rZVdpZHRoXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICBbYXR0ci5maWxsXT1cImhhc0dyYWRpZW50ID8gZ3JhZGllbnRGaWxsIDogZmlsbFwiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3QuZW1pdChkYXRhKVwiXG4gICAgICAvPlxuICAgICAgPHN2ZzpsaW5lXG4gICAgICAgICpuZ0Zvcj1cImxldCBsaW5lIG9mIGxpbmVDb29yZGluYXRlczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIGNsYXNzPVwiYmFyLWxpbmVcIlxuICAgICAgICBbY2xhc3MuaGlkZGVuXT1cImhpZGVCYXJcIlxuICAgICAgICBbYXR0ci54MV09XCJsaW5lLnYxLnhcIlxuICAgICAgICBbYXR0ci55MV09XCJsaW5lLnYxLnlcIlxuICAgICAgICBbYXR0ci54Ml09XCJsaW5lLnYyLnhcIlxuICAgICAgICBbYXR0ci55Ml09XCJsaW5lLnYyLnlcIlxuICAgICAgICBbYXR0ci5zdHJva2VdPVwic3Ryb2tlQ29sb3JcIlxuICAgICAgICBbYXR0ci5zdHJva2Utd2lkdGhdPVwiaSA9PT0gMiA/IG1lZGlhbkxpbmVXaWR0aCA6IHdoaXNrZXJTdHJva2VXaWR0aFwiXG4gICAgICAgIFthdHRyLm1hc2tdPVwiaSA/IHVuZGVmaW5lZCA6IG1hc2tMaW5lXCJcbiAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBzdHJva2VXaWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBmaWxsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRhdGE6IElCb3hNb2RlbDtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHg6IG51bWJlcjtcbiAgQElucHV0KCkgeTogbnVtYmVyO1xuICBASW5wdXQoKSBsaW5lQ29vcmRpbmF0ZXM6IExpbmVDb29yZGluYXRlcztcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGdyYWRpZW50U3RvcHM6IEdyYWRpZW50W107XG4gIEBJbnB1dCgpIG9mZnNldDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBub0JhcldoZW5aZXJvOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8SUJveE1vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8SUJveE1vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxJQm94TW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEJhck9yaWVudGF0aW9uID0gQmFyT3JpZW50YXRpb247XG5cbiAgbmF0aXZlRWxtOiBhbnk7XG5cbiAgLy8gUGF0aCByZWxhdGVkIHByb3BlcnRpZXMuXG4gIG9sZFBhdGg6IHN0cmluZztcbiAgYm94UGF0aDogc3RyaW5nO1xuICBvbGRMaW5lQ29vcmRpbmF0ZXM6IExpbmVDb29yZGluYXRlcztcblxuICAvLyBDb2xvciByZWxhdGVkIHByb3BlcnRpZXMuXG4gIGdyYWRpZW50SWQ6IHN0cmluZztcbiAgZ3JhZGllbnRGaWxsOiBzdHJpbmc7XG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gIGhhc0dyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XG4gIGhpZGVCYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogTWFzayBQYXRoIHRvIGN1dCB0aGUgbGluZSBvbiB0aGUgYm94IHBhcnQuICovXG4gIG1hc2tMaW5lOiBzdHJpbmc7XG4gIC8qKiBNYXNrIFBhdGggSWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgbWFzayBlbGVtZW50ICovXG4gIG1hc2tMaW5lSWQ6IHN0cmluZztcblxuICBib3hTdHJva2VXaWR0aDogbnVtYmVyO1xuICB3aGlza2VyU3Ryb2tlV2lkdGg6IG51bWJlcjtcbiAgbWVkaWFuTGluZVdpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMubmF0aXZlRWxtID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5sb2FkQW5pbWF0aW9uKCk7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5ib3hTdHJva2VXaWR0aCA9IE1hdGgubWF4KHRoaXMuc3Ryb2tlV2lkdGgsIDEpO1xuICAgIHRoaXMud2hpc2tlclN0cm9rZVdpZHRoID0gTWF0aC5tYXgodGhpcy5zdHJva2VXaWR0aCAvIDIsIDEpO1xuICAgIHRoaXMubWVkaWFuTGluZVdpZHRoID0gMS41ICogdGhpcy5zdHJva2VXaWR0aDtcblxuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmdyYWRpZW50RmlsbCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xuXG4gICAgaWYgKHRoaXMuZ3JhZGllbnQpIHtcbiAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0dyYWRpZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVMaW5lRWwoKTtcbiAgICB0aGlzLnVwZGF0ZVBhdGhFbCgpO1xuICAgIHRoaXMuY2hlY2tUb0hpZGVCYXIoKTtcbiAgICB0aGlzLm1hc2tMaW5lSWQgPSAnbWFzaycgKyBpZCgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5tYXNrTGluZSA9IGB1cmwoIyR7dGhpcy5tYXNrTGluZUlkfSlgO1xuXG4gICAgaWYgKHRoaXMuY2QpIHtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmJveFBhdGggPSB0aGlzLm9sZFBhdGggPSB0aGlzLmdldFN0YXJ0aW5nUGF0aCgpO1xuICAgIHRoaXMub2xkTGluZUNvb3JkaW5hdGVzID0gdGhpcy5nZXRTdGFydGluZ0xpbmVDb29yZGluYXRlcygpO1xuICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGUuYmluZCh0aGlzKSwgMTAwKTtcbiAgfVxuXG4gIHVwZGF0ZVBhdGhFbCgpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlQmFyID0gc2VsZWN0KHRoaXMubmF0aXZlRWxtKS5zZWxlY3RBbGwoJy5iYXInKTtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRQYXRoKCk7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xuICAgICAgbm9kZUJhclxuICAgICAgICAuYXR0cignZCcsIHRoaXMub2xkUGF0aClcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShlYXNlU2luSW5PdXQpXG4gICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgIC5hdHRyVHdlZW4oJ2QnLCB0aGlzLnBhdGhUd2VlbihwYXRoLCA0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGVCYXIuYXR0cignZCcsIHBhdGgpO1xuICAgIH1cbiAgICB0aGlzLm9sZFBhdGggPSBwYXRoO1xuICB9XG5cbiAgdXBkYXRlTGluZUVsKCk6IHZvaWQge1xuICAgIGNvbnN0IGxpbmVFbCA9IHNlbGVjdCh0aGlzLm5hdGl2ZUVsbSkuc2VsZWN0QWxsKCcuYmFyLWxpbmUnKTtcbiAgICBjb25zdCBsaW5lQ29vcmRpbmF0ZXMgPSB0aGlzLmxpbmVDb29yZGluYXRlcztcbiAgICBjb25zdCBvbGRMaW5lQ29vcmRpbmF0ZXMgPSB0aGlzLm9sZExpbmVDb29yZGluYXRlcztcbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XG4gICAgICBsaW5lRWxcbiAgICAgICAgLmF0dHIoJ3gxJywgKF8sIGluZGV4KSA9PiBvbGRMaW5lQ29vcmRpbmF0ZXNbaW5kZXhdLnYxLngpXG4gICAgICAgIC5hdHRyKCd5MScsIChfLCBpbmRleCkgPT4gb2xkTGluZUNvb3JkaW5hdGVzW2luZGV4XS52MS55KVxuICAgICAgICAuYXR0cigneDInLCAoXywgaW5kZXgpID0+IG9sZExpbmVDb29yZGluYXRlc1tpbmRleF0udjIueClcbiAgICAgICAgLmF0dHIoJ3kyJywgKF8sIGluZGV4KSA9PiBvbGRMaW5lQ29vcmRpbmF0ZXNbaW5kZXhdLnYyLnkpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoZWFzZVNpbkluT3V0KVxuICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAuYXR0cigneDEnLCAoXywgaW5kZXgpID0+IGxpbmVDb29yZGluYXRlc1tpbmRleF0udjEueClcbiAgICAgICAgLmF0dHIoJ3kxJywgKF8sIGluZGV4KSA9PiBsaW5lQ29vcmRpbmF0ZXNbaW5kZXhdLnYxLnkpXG4gICAgICAgIC5hdHRyKCd4MicsIChfLCBpbmRleCkgPT4gbGluZUNvb3JkaW5hdGVzW2luZGV4XS52Mi54KVxuICAgICAgICAuYXR0cigneTInLCAoXywgaW5kZXgpID0+IGxpbmVDb29yZGluYXRlc1tpbmRleF0udjIueSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmVFbFxuICAgICAgICAuYXR0cigneDEnLCAoXywgaW5kZXgpID0+IGxpbmVDb29yZGluYXRlc1tpbmRleF0udjEueClcbiAgICAgICAgLmF0dHIoJ3kxJywgKF8sIGluZGV4KSA9PiBsaW5lQ29vcmRpbmF0ZXNbaW5kZXhdLnYxLnkpXG4gICAgICAgIC5hdHRyKCd4MicsIChfLCBpbmRleCkgPT4gbGluZUNvb3JkaW5hdGVzW2luZGV4XS52Mi54KVxuICAgICAgICAuYXR0cigneTInLCAoXywgaW5kZXgpID0+IGxpbmVDb29yZGluYXRlc1tpbmRleF0udjIueSk7XG4gICAgfVxuICAgIHRoaXMub2xkTGluZUNvb3JkaW5hdGVzID0gWy4uLmxpbmVDb29yZGluYXRlc107XG4gIH1cblxuICAvKipcbiAgICogU2VlIFtEMyBTZWxlY3Rpb25zXShodHRwczovL3d3dy5kM2luZGVwdGguY29tL3NlbGVjdGlvbnMvKVxuICAgKiBAcGFyYW0gZCBUaGUgam9pbmVkIGRhdGEuXG4gICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgZWxlbWVudCAoTGluZSkuXG4gICAqL1xuICBsaW5lVHdlZW4oYXR0cjogc3RyaW5nLCBkOiBhbnksIGluZGV4OiBudW1iZXIsIG5vZGU6IEJhc2VUeXBlW10gfCBBcnJheUxpa2U8QmFzZVR5cGU+KSB7XG4gICAgY29uc3Qgbm9kZUxpbmVFbCA9IG5vZGVbaW5kZXhdIGFzIFNWR0xpbmVFbGVtZW50O1xuICAgIHJldHVybiBub2RlTGluZUVsW2F0dHJdLmJhc2VWYWwudmFsdWU7XG4gIH1cblxuICAvLyBUT0RPOiBSZWZhY3RvciBpbnRvIGFub3RoZXIgLnRzIGZpbGUgaWYgaHR0cHM6Ly9naXRodWIuY29tL3N3aW1sYW5lL25neC1jaGFydHMvcHVsbC8xMTc5IGdldHMgbWVyZ2VkLlxuICBwYXRoVHdlZW4oZDE6IHN0cmluZywgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gICAgICBjb25zdCBwYXRoMCA9IHRoaXM7XG4gICAgICBjb25zdCBwYXRoMSA9IHRoaXMuY2xvbmVOb2RlKCk7XG4gICAgICBwYXRoMS5zZXRBdHRyaWJ1dGUoJ2QnLCBkMSk7XG4gICAgICBjb25zdCBuMCA9IHBhdGgwPy5nZXRUb3RhbExlbmd0aCgpO1xuICAgICAgY29uc3QgbjEgPSBwYXRoMT8uZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgIC8vIFVuaWZvcm0gc2FtcGxpbmcgb2YgZGlzdGFuY2UgYmFzZWQgb24gc3BlY2lmaWVkIHByZWNpc2lvbi5cbiAgICAgIGNvbnN0IGRpc3RhbmNlcyA9IFswXTtcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGNvbnN0IGR0ID0gcHJlY2lzaW9uIC8gTWF0aC5tYXgobjAsIG4xKTtcbiAgICAgIHdoaWxlIChpIDwgMSkge1xuICAgICAgICBkaXN0YW5jZXMucHVzaChpKTtcbiAgICAgICAgaSArPSBkdDtcbiAgICAgIH1cbiAgICAgIGRpc3RhbmNlcy5wdXNoKDEpO1xuXG4gICAgICAvLyBDb21wdXRlIHBvaW50LWludGVycG9sYXRvcnMgYXQgZWFjaCBkaXN0YW5jZS5cbiAgICAgIGNvbnN0IHBvaW50cyA9IGRpc3RhbmNlcy5tYXAoKHQ6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBwMCA9IHBhdGgwLmdldFBvaW50QXRMZW5ndGgodCAqIG4wKTtcbiAgICAgICAgY29uc3QgcDEgPSBwYXRoMS5nZXRQb2ludEF0TGVuZ3RoKHQgKiBuMSk7XG4gICAgICAgIHJldHVybiBpbnRlcnBvbGF0ZShbcDAueCwgcDAueV0sIFtwMS54LCBwMS55XSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gJ3QnOiBUIGlzIHRoZSBmcmFjdGlvbiBvZiB0aW1lIChiZXR3ZWVuIDAgYW5kIDEpIHNpbmNlIHRoZSB0cmFuc2l0aW9uIGJlZ2FuLlxuICAgICAgcmV0dXJuICh0OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHQgPCAxID8gJ00nICsgcG9pbnRzLm1hcCgocDogKHQ6IG51bWJlcikgPT4gYW55W10pID0+IHAodCkpLmpvaW4oJ0wnKSA6IGQxO1xuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZ2V0U3RhcnRpbmdQYXRoKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhdGgoKTtcbiAgICB9XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLnJvdW5kRWRnZXMgPyAxIDogMDtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMubGluZUNvb3JkaW5hdGVzWzJdLnYxO1xuXG4gICAgcmV0dXJuIHJvdW5kZWRSZWN0KHggLSB0aGlzLndpZHRoLCB5IC0gMSwgdGhpcy53aWR0aCwgMiwgcmFkaXVzLCB0aGlzLmVkZ2VzKTtcbiAgfVxuXG4gIGdldFBhdGgoKTogc3RyaW5nIHtcbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLmdldFJhZGl1cygpO1xuICAgIGxldCBwYXRoID0gJyc7XG5cbiAgICBwYXRoID0gcm91bmRlZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBNYXRoLm1pbih0aGlzLmhlaWdodCwgcmFkaXVzKSwgdGhpcy5lZGdlcyk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldFN0YXJ0aW5nTGluZUNvb3JkaW5hdGVzKCk6IExpbmVDb29yZGluYXRlcyB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIHJldHVybiBbLi4udGhpcy5saW5lQ29vcmRpbmF0ZXNdO1xuICAgIH1cblxuICAgIGNvbnN0IGxpbmVDb29yZGluYXRlczogTGluZUNvb3JkaW5hdGVzID0gY2xvbmVEZWVwKHRoaXMubGluZUNvb3JkaW5hdGVzKTtcblxuICAgIGxpbmVDb29yZGluYXRlc1sxXS52MS55ID0gbGluZUNvb3JkaW5hdGVzWzFdLnYyLnkgPSBsaW5lQ29vcmRpbmF0ZXNbM10udjEueSA9IGxpbmVDb29yZGluYXRlc1szXS52Mi55ID0gbGluZUNvb3JkaW5hdGVzWzBdLnYxLnkgPSBsaW5lQ29vcmRpbmF0ZXNbMF0udjIueSA9XG4gICAgICBsaW5lQ29vcmRpbmF0ZXNbMl0udjEueTtcblxuICAgIHJldHVybiBsaW5lQ29vcmRpbmF0ZXM7XG4gIH1cblxuICBnZXRSYWRpdXMoKTogbnVtYmVyIHtcbiAgICBsZXQgcmFkaXVzID0gMDtcblxuICAgIGlmICh0aGlzLnJvdW5kRWRnZXMgJiYgdGhpcy5oZWlnaHQgPiA1ICYmIHRoaXMud2lkdGggPiA1KSB7XG4gICAgICByYWRpdXMgPSBNYXRoLmZsb29yKE1hdGgubWluKDUsIHRoaXMuaGVpZ2h0IC8gMiwgdGhpcy53aWR0aCAvIDIpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFkaXVzO1xuICB9XG5cbiAgZ2V0R3JhZGllbnQoKTogR3JhZGllbnRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLmdldFN0YXJ0T3BhY2l0eSgpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvZmZzZXQ6IDEwMCxcbiAgICAgICAgY29sb3I6IHRoaXMuZmlsbCxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgICAgfVxuICAgIF07XG4gIH1cblxuICBnZXRTdGFydE9wYWNpdHkoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5yb3VuZEVkZ2VzKSB7XG4gICAgICByZXR1cm4gMC4yO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC41O1xuICAgIH1cbiAgfVxuXG4gIGdldCBlZGdlcygpOiBib29sZWFuW10ge1xuICAgIGxldCBlZGdlczogW2Jvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW5dID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcbiAgICBpZiAodGhpcy5yb3VuZEVkZ2VzKSB7XG4gICAgICBlZGdlcyA9IFt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXTtcbiAgICB9XG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tUb0hpZGVCYXIoKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlQmFyID0gdGhpcy5ub0JhcldoZW5aZXJvICYmIHRoaXMuaGVpZ2h0ID09PSAwO1xuICB9XG59XG4iXX0=