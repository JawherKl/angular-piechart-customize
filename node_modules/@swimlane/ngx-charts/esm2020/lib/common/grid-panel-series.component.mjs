import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BarOrientation } from './types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "./grid-panel.component";
import * as i2 from "@angular/common";
var ClassEnum;
(function (ClassEnum) {
    ClassEnum["Odd"] = "odd";
    ClassEnum["Even"] = "even";
})(ClassEnum || (ClassEnum = {}));
export class GridPanelSeriesComponent {
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.gridPanels = this.getGridPanels();
    }
    getGridPanels() {
        return this.data.map(d => {
            let offset;
            let width;
            let height;
            let x;
            let y;
            let className = ClassEnum.Odd;
            if (this.orient === BarOrientation.Vertical) {
                const position = this.xScale(d.name);
                const positionIndex = Number.parseInt((position / this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = ClassEnum.Even;
                }
                offset = this.xScale.bandwidth() * this.xScale.paddingInner();
                width = this.xScale.bandwidth() + offset;
                height = this.dims.height;
                x = this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (this.orient === BarOrientation.Horizontal) {
                const position = this.yScale(d.name);
                const positionIndex = Number.parseInt((position / this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = ClassEnum.Even;
                }
                offset = this.yScale.bandwidth() * this.yScale.paddingInner();
                width = this.dims.width;
                height = this.yScale.bandwidth() + offset;
                x = 0;
                y = this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height,
                width,
                x,
                y
            };
        });
    }
}
GridPanelSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GridPanelSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridPanelSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: GridPanelSeriesComponent, selector: "g[ngx-charts-grid-panel-series]", inputs: { data: "data", dims: "dims", xScale: "xScale", yScale: "yScale", orient: "orient" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g
      ngx-charts-grid-panel
      *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'"
    ></svg:g>
  `, isInline: true, components: [{ type: i1.GridPanelComponent, selector: "g[ngx-charts-grid-panel]", inputs: ["width", "height", "x", "y"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GridPanelSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-grid-panel-series]',
                    template: `
    <svg:g
      ngx-charts-grid-panel
      *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'"
    ></svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { data: [{
                type: Input
            }], dims: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], orient: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9ncmlkLXBhbmVsLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFhLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQVk5RCxJQUFLLFNBR0o7QUFIRCxXQUFLLFNBQVM7SUFDWix3QkFBVyxDQUFBO0lBQ1gsMEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFISSxTQUFTLEtBQVQsU0FBUyxRQUdiO0FBbUJELE1BQU0sT0FBTyx3QkFBd0I7SUFhbkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxNQUFNLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUU5QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssY0FBYyxDQUFDLFFBQVEsRUFBRTtnQkFDM0MsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixJQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztpQkFDNUI7Z0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDOUQsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1A7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFdEYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDM0IsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQzVCO2dCQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRTlELEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUMxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNOLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsT0FBTztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE1BQU07Z0JBQ04sS0FBSztnQkFDTCxDQUFDO2dCQUNELENBQUM7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztxSEFsRVUsd0JBQXdCO3lHQUF4Qix3QkFBd0IsMExBZnpCOzs7Ozs7Ozs7Ozs7R0FZVDsyRkFHVSx3QkFBd0I7a0JBakJwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUlVLElBQUk7c0JBQVosS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFNpbXBsZUNoYW5nZXMsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXJPcmllbnRhdGlvbiB9IGZyb20gJy4vdHlwZXMvYmFyLW9yaWVudGF0aW9uLmVudW0nO1xuaW1wb3J0IHsgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuL3R5cGVzL3ZpZXctZGltZW5zaW9uLmludGVyZmFjZSc7XG5cbmludGVyZmFjZSBHcmlkUGFuZWwge1xuICBjbGFzczogQ2xhc3NFbnVtO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICB3aWR0aDogbnVtYmVyO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuZW51bSBDbGFzc0VudW0ge1xuICBPZGQgPSAnb2RkJyxcbiAgRXZlbiA9ICdldmVuJ1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtZ3JpZC1wYW5lbC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIG5neC1jaGFydHMtZ3JpZC1wYW5lbFxuICAgICAgKm5nRm9yPVwibGV0IGdyaWRQYW5lbCBvZiBncmlkUGFuZWxzXCJcbiAgICAgIFtoZWlnaHRdPVwiZ3JpZFBhbmVsLmhlaWdodFwiXG4gICAgICBbd2lkdGhdPVwiZ3JpZFBhbmVsLndpZHRoXCJcbiAgICAgIFt4XT1cImdyaWRQYW5lbC54XCJcbiAgICAgIFt5XT1cImdyaWRQYW5lbC55XCJcbiAgICAgIFtjbGFzcy5ncmlkLXBhbmVsXT1cInRydWVcIlxuICAgICAgW2NsYXNzLm9kZF09XCJncmlkUGFuZWwuY2xhc3MgPT09ICdvZGQnXCJcbiAgICAgIFtjbGFzcy5ldmVuXT1cImdyaWRQYW5lbC5jbGFzcyA9PT0gJ2V2ZW4nXCJcbiAgICA+PC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR3JpZFBhbmVsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgZ3JpZFBhbmVsczogR3JpZFBhbmVsW107XG5cbiAgQElucHV0KCkgZGF0YTogYW55W107XG5cbiAgQElucHV0KCkgZGltczogVmlld0RpbWVuc2lvbnM7XG5cbiAgQElucHV0KCkgeFNjYWxlOiBhbnk7XG5cbiAgQElucHV0KCkgeVNjYWxlOiBhbnk7XG5cbiAgQElucHV0KCkgb3JpZW50OiBCYXJPcmllbnRhdGlvbjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRQYW5lbHMgPSB0aGlzLmdldEdyaWRQYW5lbHMoKTtcbiAgfVxuXG4gIGdldEdyaWRQYW5lbHMoKTogR3JpZFBhbmVsW10ge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKGQgPT4ge1xuICAgICAgbGV0IG9mZnNldDtcbiAgICAgIGxldCB3aWR0aDtcbiAgICAgIGxldCBoZWlnaHQ7XG4gICAgICBsZXQgeDtcbiAgICAgIGxldCB5O1xuICAgICAgbGV0IGNsYXNzTmFtZSA9IENsYXNzRW51bS5PZGQ7XG5cbiAgICAgIGlmICh0aGlzLm9yaWVudCA9PT0gQmFyT3JpZW50YXRpb24uVmVydGljYWwpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9IHRoaXMueFNjYWxlKGQubmFtZSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoKHBvc2l0aW9uIC8gdGhpcy54U2NhbGUuc3RlcCgpKS50b1N0cmluZygpLCAxMCk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uSW5kZXggJSAyID09PSAxKSB7XG4gICAgICAgICAgY2xhc3NOYW1lID0gQ2xhc3NFbnVtLkV2ZW47XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCkgKiB0aGlzLnhTY2FsZS5wYWRkaW5nSW5uZXIoKTtcbiAgICAgICAgd2lkdGggPSB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKSArIG9mZnNldDtcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5kaW1zLmhlaWdodDtcbiAgICAgICAgeCA9IHRoaXMueFNjYWxlKGQubmFtZSkgLSBvZmZzZXQgLyAyO1xuICAgICAgICB5ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmllbnQgPT09IEJhck9yaWVudGF0aW9uLkhvcml6b250YWwpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnlTY2FsZShkLm5hbWUpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkluZGV4ID0gTnVtYmVyLnBhcnNlSW50KChwb3NpdGlvbiAvIHRoaXMueVNjYWxlLnN0ZXAoKSkudG9TdHJpbmcoKSwgMTApO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbkluZGV4ICUgMiA9PT0gMSkge1xuICAgICAgICAgIGNsYXNzTmFtZSA9IENsYXNzRW51bS5FdmVuO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICogdGhpcy55U2NhbGUucGFkZGluZ0lubmVyKCk7XG5cbiAgICAgICAgd2lkdGggPSB0aGlzLmRpbXMud2lkdGg7XG4gICAgICAgIGhlaWdodCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xuICAgICAgICB4ID0gMDtcbiAgICAgICAgeSA9IHRoaXMueVNjYWxlKGQubmFtZSkgLSBvZmZzZXQgLyAyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBkLm5hbWUsXG4gICAgICAgIGNsYXNzOiBjbGFzc05hbWUsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==