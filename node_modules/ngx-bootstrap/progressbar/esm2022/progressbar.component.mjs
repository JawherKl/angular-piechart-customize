import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import * as i0 from "@angular/core";
import * as i1 from "./progressbar.config";
import * as i2 from "@angular/common";
import * as i3 from "./bar.component";
export class ProgressbarComponent {
    /** current value of progress bar. Could be a number or array of objects
     * like {"value":15,"type":"info","label":"15 %"}
     */
    set value(value) {
        this.isStacked = Array.isArray(value);
        if (typeof value === 'number') {
            this._value = value;
            this._values = void 0;
        }
        else {
            this._value = void 0;
            this._values = value;
        }
    }
    constructor(config) {
        /** maximum total value of progress element */
        this.max = 100;
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** If `true`, striped classes are applied */
        this.striped = false;
        this.isStacked = false;
        this._value = 0;
        Object.assign(this, config);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: ProgressbarComponent, deps: [{ token: i1.ProgressbarConfig }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.4", type: ProgressbarComponent, selector: "progressbar", inputs: { max: "max", animate: "animate", striped: "striped", type: "type", value: "value" }, host: { properties: { "class.progress": "true", "attr.max": "max" } }, ngImport: i0, template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\n\n<ng-template #NotStacked>\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\n    <ng-content></ng-content>\n  </bar>\n</ng-template>\n\n<ng-template #Stacked>\n  <bar *ngFor=\"let item of _values\"\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\n</ng-template>\n", styles: [":host{width:100%;display:flex}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.BarComponent, selector: "bar", inputs: ["max", "value", "animate", "striped", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: ProgressbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'progressbar', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.progress]': 'true',
                        '[attr.max]': 'max'
                    }, template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\n\n<ng-template #NotStacked>\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\n    <ng-content></ng-content>\n  </bar>\n</ng-template>\n\n<ng-template #Stacked>\n  <bar *ngFor=\"let item of _values\"\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\n</ng-template>\n", styles: [":host{width:100%;display:flex}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ProgressbarConfig }]; }, propDecorators: { max: [{
                type: Input
            }], animate: [{
                type: Input
            }], striped: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFpQnpELE1BQU0sT0FBTyxvQkFBb0I7SUFhL0I7O09BRUc7SUFDSCxJQUNJLEtBQUssQ0FBQyxLQUEwQjtRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0QjtJQUNILENBQUM7SUFNRCxZQUFZLE1BQXlCO1FBL0JyQyw4Q0FBOEM7UUFDckMsUUFBRyxHQUFHLEdBQUcsQ0FBQztRQUVuQixnRUFBZ0U7UUFDdkQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUV6Qiw2Q0FBNkM7UUFDcEMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQW9CekIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixXQUFNLEdBQUksQ0FBQyxDQUFDO1FBSVYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs4R0FsQ1Usb0JBQW9CO2tHQUFwQixvQkFBb0Isd05DbkJqQyxpZkFZQTs7MkZET2Esb0JBQW9CO2tCQWZoQyxTQUFTOytCQUNFLGFBQWEsbUJBRU4sdUJBQXVCLENBQUMsTUFBTSxRQUV6Qzt3QkFDSixrQkFBa0IsRUFBRSxNQUFNO3dCQUMxQixZQUFZLEVBQUUsS0FBSztxQkFDcEI7d0dBU1EsR0FBRztzQkFBWCxLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFHRyxPQUFPO3NCQUFmLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQU1GLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXJWYWx1ZSwgUHJvZ3Jlc3NiYXJUeXBlIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci10eXBlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQcm9ncmVzc2JhckNvbmZpZyB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvZ3Jlc3NiYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3NiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnByb2dyZXNzXSc6ICd0cnVlJyxcbiAgICAnW2F0dHIubWF4XSc6ICdtYXgnXG4gIH0sXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfSBgXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc2JhckNvbXBvbmVudCB7XG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cbiAgQElucHV0KCkgbWF4ID0gMTAwO1xuXG4gIC8qKiBpZiBgdHJ1ZWAgY2hhbmdpbmcgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIHdpbGwgYmUgYW5pbWF0ZWQgKi9cbiAgQElucHV0KCkgYW5pbWF0ZSA9IGZhbHNlO1xuXG4gIC8qKiBJZiBgdHJ1ZWAsIHN0cmlwZWQgY2xhc3NlcyBhcmUgYXBwbGllZCAqL1xuICBASW5wdXQoKSBzdHJpcGVkID0gZmFsc2U7XG5cbiAgLyoqIHByb3ZpZGUgb25lIG9mIHRoZSBmb3VyIHN1cHBvcnRlZCBjb250ZXh0dWFsIGNsYXNzZXM6IGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AsIGBkYW5nZXJgICovXG4gIEBJbnB1dCgpIHR5cGU/OiBQcm9ncmVzc2JhclR5cGU7XG5cbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyLiBDb3VsZCBiZSBhIG51bWJlciBvciBhcnJheSBvZiBvYmplY3RzXG4gICAqIGxpa2Uge1widmFsdWVcIjoxNSxcInR5cGVcIjpcImluZm9cIixcImxhYmVsXCI6XCIxNSAlXCJ9XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWU6IG51bWJlciB8IEJhclZhbHVlW10pIHtcbiAgICB0aGlzLmlzU3RhY2tlZCA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVzID0gdm9pZCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZvaWQgMDtcbiAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGlzU3RhY2tlZCA9IGZhbHNlO1xuICBfdmFsdWU/ID0gMDtcbiAgX3ZhbHVlcz86IEJhclZhbHVlW107XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBQcm9ncmVzc2JhckNvbmZpZykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1N0YWNrZWQgdGhlbiBOb3RTdGFja2VkIGVsc2UgU3RhY2tlZFwiPjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGUgI05vdFN0YWNrZWQ+XG4gIDxiYXIgW3R5cGVdPVwidHlwZVwiIFt2YWx1ZV09XCJfdmFsdWVcIiBbbWF4XT1cIm1heFwiIFthbmltYXRlXT1cImFuaW1hdGVcIiBbc3RyaXBlZF09XCJzdHJpcGVkXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Jhcj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjU3RhY2tlZD5cbiAgPGJhciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfdmFsdWVzXCJcbiAgICAgICBbdHlwZV09XCJpdGVtLnR5cGVcIiBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiIFttYXhdPVwiaXRlbS5tYXggfHwgbWF4XCIgW2FuaW1hdGVdPVwiYW5pbWF0ZVwiIFtzdHJpcGVkXT1cInN0cmlwZWRcIj57eyBpdGVtLmxhYmVsIH19PC9iYXI+XG48L25nLXRlbXBsYXRlPlxuIl19