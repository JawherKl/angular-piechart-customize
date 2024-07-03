import { Component, Input, Output, EventEmitter } from '@angular/core';
import { count, decimalChecker } from './count.helper';
import * as i0 from "@angular/core";
/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 */
export class CountUpDirective {
    constructor(cd, element) {
        this.cd = cd;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new EventEmitter();
        this.countFinish = new EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    set countDecimals(val) {
        this._countDecimals = val;
    }
    get countDecimals() {
        if (this._countDecimals)
            return this._countDecimals;
        return decimalChecker(this.countTo);
    }
    set countTo(val) {
        this._countTo = parseFloat(val);
        this.start();
    }
    get countTo() {
        return this._countTo;
    }
    set countFrom(val) {
        this._countFrom = parseFloat(val);
        this.start();
    }
    get countFrom() {
        return this._countFrom;
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    start() {
        cancelAnimationFrame(this.animationReq);
        const valueFormatting = this.valueFormatting || (value => `${this.countPrefix}${value.toLocaleString()}${this.countSuffix}`);
        const callback = ({ value, progress, finished }) => {
            this.value = valueFormatting(value);
            this.cd.markForCheck();
            if (!finished)
                this.countChange.emit({ value: this.value, progress });
            if (finished)
                this.countFinish.emit({ value: this.value, progress });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    }
}
CountUpDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CountUpDirective, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
CountUpDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: CountUpDirective, selector: "[ngx-charts-count-up]", inputs: { countDuration: "countDuration", countPrefix: "countPrefix", countSuffix: "countSuffix", valueFormatting: "valueFormatting", countDecimals: "countDecimals", countTo: "countTo", countFrom: "countFrom" }, outputs: { countChange: "countChange", countFinish: "countFinish" }, ngImport: i0, template: ` {{ value }} `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CountUpDirective, decorators: [{
            type: Component,
            args: [{
                    selector: '[ngx-charts-count-up]',
                    template: ` {{ value }} `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { countDuration: [{
                type: Input
            }], countPrefix: [{
                type: Input
            }], countSuffix: [{
                type: Input
            }], valueFormatting: [{
                type: Input
            }], countDecimals: [{
                type: Input
            }], countTo: [{
                type: Input
            }], countFrom: [{
                type: Input
            }], countChange: [{
                type: Output
            }], countFinish: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9jb3VudC9jb3VudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBNEMsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFdkQ7Ozs7Ozs7O0dBUUc7QUFLSCxNQUFNLE9BQU8sZ0JBQWdCO0lBa0QzQixZQUFvQixFQUFxQixFQUFFLE9BQW1CO1FBQTFDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBakRoQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQWlDeEIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUkzQyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBS1IsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBOUNELElBQ0ksYUFBYSxDQUFDLEdBQVc7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksYUFBYTtRQUNmLElBQUksSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDcEQsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUNJLE9BQU8sQ0FBQyxHQUFHO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFDSSxTQUFTLENBQUMsR0FBRztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQW9CRCxXQUFXO1FBQ1Qsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLO1FBQ0gsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXhDLE1BQU0sZUFBZSxHQUNuQixJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXZHLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxRQUFRO2dCQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVHLENBQUM7OzZHQXhFVSxnQkFBZ0I7aUdBQWhCLGdCQUFnQixzVkFGakIsZUFBZTsyRkFFZCxnQkFBZ0I7a0JBSjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLGVBQWU7aUJBQzFCO2lJQUVVLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0YsYUFBYTtzQkFEaEIsS0FBSztnQkFXRixPQUFPO3NCQURWLEtBQUs7Z0JBV0YsU0FBUztzQkFEWixLQUFLO2dCQVVJLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb3VudCwgZGVjaW1hbENoZWNrZXIgfSBmcm9tICcuL2NvdW50LmhlbHBlcic7XG5cbi8qKlxuICogQ291bnQgdXAgY29tcG9uZW50XG4gKlxuICogTG9vc2VseSBpbnNwaXJlZCBieTpcbiAqICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9penVwZXQvYW5ndWxhcjItY291bnRvXG4gKiAgLSBodHRwczovL2lub3JnYW5pay5naXRodWIuaW8vY291bnRVcC5qcy9cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuZ3gtY2hhcnRzLWNvdW50LXVwXScsXG4gIHRlbXBsYXRlOiBgIHt7IHZhbHVlIH19IGBcbn0pXG5leHBvcnQgY2xhc3MgQ291bnRVcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGNvdW50RHVyYXRpb246IG51bWJlciA9IDE7XG4gIEBJbnB1dCgpIGNvdW50UHJlZml4OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgY291bnRTdWZmaXg6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcblxuICBASW5wdXQoKVxuICBzZXQgY291bnREZWNpbWFscyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2NvdW50RGVjaW1hbHMgPSB2YWw7XG4gIH1cblxuICBnZXQgY291bnREZWNpbWFscygpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9jb3VudERlY2ltYWxzKSByZXR1cm4gdGhpcy5fY291bnREZWNpbWFscztcbiAgICByZXR1cm4gZGVjaW1hbENoZWNrZXIodGhpcy5jb3VudFRvKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjb3VudFRvKHZhbCkge1xuICAgIHRoaXMuX2NvdW50VG8gPSBwYXJzZUZsb2F0KHZhbCk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgZ2V0IGNvdW50VG8oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fY291bnRUbztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjb3VudEZyb20odmFsKSB7XG4gICAgdGhpcy5fY291bnRGcm9tID0gcGFyc2VGbG9hdCh2YWwpO1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIGdldCBjb3VudEZyb20oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fY291bnRGcm9tO1xuICB9XG5cbiAgQE91dHB1dCgpIGNvdW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY291bnRGaW5pc2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbmF0aXZlRWxlbWVudDogYW55O1xuXG4gIHZhbHVlOiBhbnkgPSAnJztcbiAgZm9ybWF0dGVkVmFsdWU6IHN0cmluZztcblxuICBwcml2YXRlIGFuaW1hdGlvblJlcTogYW55O1xuXG4gIHByaXZhdGUgX2NvdW50RGVjaW1hbHM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvdW50VG86IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvdW50RnJvbTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcblxuICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9XG4gICAgICB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAodmFsdWUgPT4gYCR7dGhpcy5jb3VudFByZWZpeH0ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9JHt0aGlzLmNvdW50U3VmZml4fWApO1xuXG4gICAgY29uc3QgY2FsbGJhY2sgPSAoeyB2YWx1ZSwgcHJvZ3Jlc3MsIGZpbmlzaGVkIH0pID0+IHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZUZvcm1hdHRpbmcodmFsdWUpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIGlmICghZmluaXNoZWQpIHRoaXMuY291bnRDaGFuZ2UuZW1pdCh7IHZhbHVlOiB0aGlzLnZhbHVlLCBwcm9ncmVzcyB9KTtcbiAgICAgIGlmIChmaW5pc2hlZCkgdGhpcy5jb3VudEZpbmlzaC5lbWl0KHsgdmFsdWU6IHRoaXMudmFsdWUsIHByb2dyZXNzIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmFuaW1hdGlvblJlcSA9IGNvdW50KHRoaXMuY291bnRGcm9tLCB0aGlzLmNvdW50VG8sIHRoaXMuY291bnREZWNpbWFscywgdGhpcy5jb3VudER1cmF0aW9uLCBjYWxsYmFjayk7XG4gIH1cbn1cbiJdfQ==