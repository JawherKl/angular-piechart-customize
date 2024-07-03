import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { pie } from 'd3-shape';
import * as i0 from "@angular/core";
import * as i1 from "./pie-arc.component";
import * as i2 from "@angular/common";
export class PieGridSeriesComponent {
    constructor(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.layout = pie()
            .value(d => d.data.value)
            .sort(null);
        this.arcs = this.getArcs();
    }
    getArcs() {
        return this.layout(this.data).map((arc, index) => {
            const label = arc.data.data.name;
            const other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            const color = this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: this.animations && !other,
                pointerEvents: !other
            };
        });
    }
    onClick(data) {
        this.select.emit(this.data[0].data);
    }
    trackBy(index, item) {
        return item.data.name;
    }
    label(arc) {
        return arc.data.name;
    }
    color(arc) {
        return this.colors(this.label(arc));
    }
}
PieGridSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PieGridSeriesComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
PieGridSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: PieGridSeriesComponent, selector: "g[ngx-charts-pie-grid-series]", inputs: { colors: "colors", data: "data", innerRadius: "innerRadius", outerRadius: "outerRadius", animations: "animations" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g class="pie-grid-arcs">
      <svg:g
        ngx-charts-pie-arc
        *ngFor="let arc of arcs; trackBy: trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
      ></svg:g>
    </svg:g>
  `, isInline: true, components: [{ type: i1.PieArcComponent, selector: "g[ngx-charts-pie-arc]", inputs: ["fill", "startAngle", "endAngle", "innerRadius", "outerRadius", "cornerRadius", "value", "max", "data", "explodeSlices", "gradient", "animate", "pointerEvents", "isActive"], outputs: ["select", "activate", "deactivate", "dblclick"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PieGridSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-pie-grid-series]',
                    template: `
    <svg:g class="pie-grid-arcs">
      <svg:g
        ngx-charts-pie-arc
        *ngFor="let arc of arcs; trackBy: trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
      ></svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { colors: [{
                type: Input
            }], data: [{
                type: Input
            }], innerRadius: [{
                type: Input
            }], outerRadius: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQtc2VyaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWdyaWQtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUlaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7O0FBdUMvQixNQUFNLE9BQU8sc0JBQXNCO0lBZWpDLFlBQVksT0FBbUI7UUFadEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU94QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBWTthQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQy9DLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFbEMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxPQUFPO2dCQUNMLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQ25CLEtBQUssRUFBRSxNQUFNLEdBQUcsS0FBSyxHQUFHLEtBQUs7Z0JBQzdCLElBQUksRUFBRSxLQUFLO2dCQUNYLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVU7Z0JBQ3RDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLO2dCQUNsQyxhQUFhLEVBQUUsQ0FBQyxLQUFLO2FBQ3RCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRztRQUNQLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDOzttSEFuRVUsc0JBQXNCO3VHQUF0QixzQkFBc0IsdVNBeEJ2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUOzJGQUdVLHNCQUFzQjtrQkExQmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2lHQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGllIH0gZnJvbSAnZDMtc2hhcGUnO1xuaW1wb3J0IHsgUGllR3JpZERhdGEsIFBpZUdyaWREYXRhSXRlbSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBQaWVBcmMge1xuICBhbmltYXRlOiBib29sZWFuO1xuICBjbGFzczogc3RyaW5nO1xuICBkYXRhOiBQaWVHcmlkRGF0YUl0ZW07XG4gIGVuZEFuZ2xlOiBudW1iZXI7XG4gIGZpbGw6IHN0cmluZztcbiAgcG9pbnRlckV2ZW50czogYm9vbGVhbjtcbiAgc3RhcnRBbmdsZTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtcGllLWdyaWQtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIGNsYXNzPVwicGllLWdyaWQtYXJjc1wiPlxuICAgICAgPHN2ZzpnXG4gICAgICAgIG5neC1jaGFydHMtcGllLWFyY1xuICAgICAgICAqbmdGb3I9XCJsZXQgYXJjIG9mIGFyY3M7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgICBbYXR0ci5jbGFzc109XCJhcmMuY2xhc3NcIlxuICAgICAgICBbc3RhcnRBbmdsZV09XCJhcmMuc3RhcnRBbmdsZVwiXG4gICAgICAgIFtlbmRBbmdsZV09XCJhcmMuZW5kQW5nbGVcIlxuICAgICAgICBbaW5uZXJSYWRpdXNdPVwiaW5uZXJSYWRpdXNcIlxuICAgICAgICBbb3V0ZXJSYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxuICAgICAgICBbZmlsbF09XCJjb2xvcihhcmMpXCJcbiAgICAgICAgW3ZhbHVlXT1cImFyYy5kYXRhLnZhbHVlXCJcbiAgICAgICAgW2RhdGFdPVwiYXJjLmRhdGFcIlxuICAgICAgICBbZ3JhZGllbnRdPVwiZmFsc2VcIlxuICAgICAgICBbcG9pbnRlckV2ZW50c109XCJhcmMucG9pbnRlckV2ZW50c1wiXG4gICAgICAgIFthbmltYXRlXT1cImFyYy5hbmltYXRlXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgPjwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGllR3JpZFNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgZGF0YTogUGllR3JpZERhdGFbXTtcbiAgQElucHV0KCkgaW5uZXJSYWRpdXMgPSA3MDtcbiAgQElucHV0KCkgb3V0ZXJSYWRpdXMgPSA4MDtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgbGF5b3V0OiBhbnk7XG4gIGFyY3M6IFBpZUFyY1tdO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmxheW91dCA9IHBpZTxhbnksIGFueT4oKVxuICAgICAgLnZhbHVlKGQgPT4gZC5kYXRhLnZhbHVlKVxuICAgICAgLnNvcnQobnVsbCk7XG5cbiAgICB0aGlzLmFyY3MgPSB0aGlzLmdldEFyY3MoKTtcbiAgfVxuXG4gIGdldEFyY3MoKTogUGllQXJjW10ge1xuICAgIHJldHVybiB0aGlzLmxheW91dCh0aGlzLmRhdGEpLm1hcCgoYXJjLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBhcmMuZGF0YS5kYXRhLm5hbWU7XG4gICAgICBjb25zdCBvdGhlciA9IGFyYy5kYXRhLmRhdGEub3RoZXI7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICBhcmMuc3RhcnRBbmdsZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnMobGFiZWwpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogYXJjLmRhdGEuZGF0YSxcbiAgICAgICAgY2xhc3M6ICdhcmMgJyArICdhcmMnICsgaW5kZXgsXG4gICAgICAgIGZpbGw6IGNvbG9yLFxuICAgICAgICBzdGFydEFuZ2xlOiBvdGhlciA/IDAgOiBhcmMuc3RhcnRBbmdsZSxcbiAgICAgICAgZW5kQW5nbGU6IGFyYy5lbmRBbmdsZSxcbiAgICAgICAgYW5pbWF0ZTogdGhpcy5hbmltYXRpb25zICYmICFvdGhlcixcbiAgICAgICAgcG9pbnRlckV2ZW50czogIW90aGVyXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGFbMF0uZGF0YSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5kYXRhLm5hbWU7XG4gIH1cblxuICBsYWJlbChhcmMpOiBzdHJpbmcge1xuICAgIHJldHVybiBhcmMuZGF0YS5uYW1lO1xuICB9XG5cbiAgY29sb3IoYXJjKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcnModGhpcy5sYWJlbChhcmMpKTtcbiAgfVxufVxuIl19