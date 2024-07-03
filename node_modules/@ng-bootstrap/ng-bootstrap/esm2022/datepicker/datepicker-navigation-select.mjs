import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ElementRef, } from '@angular/core';
import { NgbDate } from './ngb-date';
import { toInteger } from '../util/util';
import { NgFor } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
class NgbDatepickerNavigationSelect {
    constructor(i18n, _renderer) {
        this.i18n = i18n;
        this._renderer = _renderer;
        this.select = new EventEmitter();
        this._month = -1;
        this._year = -1;
    }
    changeMonth(month) {
        this.select.emit(new NgbDate(this.date.year, toInteger(month), 1));
    }
    changeYear(year) {
        this.select.emit(new NgbDate(toInteger(year), this.date.month, 1));
    }
    ngAfterViewChecked() {
        if (this.date) {
            if (this.date.month !== this._month) {
                this._month = this.date.month;
                this._renderer.setProperty(this.monthSelect.nativeElement, 'value', this._month);
            }
            if (this.date.year !== this._year) {
                this._year = this.date.year;
                this._renderer.setProperty(this.yearSelect.nativeElement, 'value', this._year);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerNavigationSelect, deps: [{ token: i1.NgbDatepickerI18n }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbDatepickerNavigationSelect, isStandalone: true, selector: "ngb-datepicker-navigation-select", inputs: { date: "date", disabled: "disabled", months: "months", years: "years" }, outputs: { select: "select" }, viewQueries: [{ propertyName: "monthSelect", first: true, predicate: ["month"], descendants: true, read: ElementRef, static: true }, { propertyName: "yearSelect", first: true, predicate: ["year"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: `
		<select
			#month
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-month"
			aria-label="Select month"
			i18n-title="@@ngb.datepicker.select-month"
			title="Select month"
			(change)="changeMonth($any($event).target.value)"
		>
			<option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date.year)" [value]="m">{{
				i18n.getMonthShortName(m, date.year)
			}}</option> </select
		><select
			#year
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-year"
			aria-label="Select year"
			i18n-title="@@ngb.datepicker.select-year"
			title="Select year"
			(change)="changeYear($any($event).target.value)"
		>
			<option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
		</select>
	`, isInline: true, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"], dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbDatepickerNavigationSelect };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerNavigationSelect, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation-select', standalone: true, imports: [NgFor], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `
		<select
			#month
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-month"
			aria-label="Select month"
			i18n-title="@@ngb.datepicker.select-month"
			title="Select month"
			(change)="changeMonth($any($event).target.value)"
		>
			<option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date.year)" [value]="m">{{
				i18n.getMonthShortName(m, date.year)
			}}</option> </select
		><select
			#year
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-year"
			aria-label="Select year"
			i18n-title="@@ngb.datepicker.select-year"
			title="Select year"
			(change)="changeYear($any($event).target.value)"
		>
			<option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
		</select>
	`, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }, { type: i0.Renderer2 }]; }, propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], years: [{
                type: Input
            }], select: [{
                type: Output
            }], monthSelect: [{
                type: ViewChild,
                args: ['month', { static: true, read: ElementRef }]
            }], yearSelect: [{
                type: ViewChild,
                args: ['year', { static: true, read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLFNBQVMsRUFDVCxVQUFVLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBRXhDLE1BbUNhLDZCQUE2QjtJQWN6QyxZQUFtQixJQUF1QixFQUFVLFNBQW9CO1FBQXJELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVI5RCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUt2QyxXQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDWixVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFd0QsQ0FBQztJQUU1RSxXQUFXLENBQUMsS0FBYTtRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVk7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakY7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0U7U0FDRDtJQUNGLENBQUM7OEdBbkNXLDZCQUE2QjtrR0FBN0IsNkJBQTZCLDhSQVFDLFVBQVUsMkdBQ1gsVUFBVSwyQ0FyQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTBCVCx1VkE5QlMsS0FBSzs7U0FnQ0gsNkJBQTZCOzJGQUE3Qiw2QkFBNkI7a0JBbkN6QyxTQUFTOytCQUNDLGtDQUFrQyxjQUNoQyxJQUFJLFdBQ1AsQ0FBQyxLQUFLLENBQUMsbUJBQ0MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxZQUUzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEwQlQ7Z0lBR1EsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBRWlELFdBQVc7c0JBQWxFLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUNDLFVBQVU7c0JBQWhFLFNBQVM7dUJBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHRFdmVudEVtaXR0ZXIsXG5cdENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuXHRWaWV3RW5jYXBzdWxhdGlvbixcblx0QWZ0ZXJWaWV3Q2hlY2tlZCxcblx0Vmlld0NoaWxkLFxuXHRFbGVtZW50UmVmLFxuXHRSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiRGF0ZSB9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHsgdG9JbnRlZ2VyIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nYkRhdGVwaWNrZXJJMThuIH0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHsgTmdGb3IgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCcsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ0Zvcl0sXG5cdGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnNjc3MnXSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8c2VsZWN0XG5cdFx0XHQjbW9udGhcblx0XHRcdFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5cdFx0XHRjbGFzcz1cImZvcm0tc2VsZWN0XCJcblx0XHRcdGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LW1vbnRoXCJcblx0XHRcdGFyaWEtbGFiZWw9XCJTZWxlY3QgbW9udGhcIlxuXHRcdFx0aTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LW1vbnRoXCJcblx0XHRcdHRpdGxlPVwiU2VsZWN0IG1vbnRoXCJcblx0XHRcdChjaGFuZ2UpPVwiY2hhbmdlTW9udGgoJGFueSgkZXZlbnQpLnRhcmdldC52YWx1ZSlcIlxuXHRcdD5cblx0XHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IG0gb2YgbW9udGhzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJpMThuLmdldE1vbnRoRnVsbE5hbWUobSwgZGF0ZS55ZWFyKVwiIFt2YWx1ZV09XCJtXCI+e3tcblx0XHRcdFx0aTE4bi5nZXRNb250aFNob3J0TmFtZShtLCBkYXRlLnllYXIpXG5cdFx0XHR9fTwvb3B0aW9uPiA8L3NlbGVjdFxuXHRcdD48c2VsZWN0XG5cdFx0XHQjeWVhclxuXHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdGNsYXNzPVwiZm9ybS1zZWxlY3RcIlxuXHRcdFx0aTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QteWVhclwiXG5cdFx0XHRhcmlhLWxhYmVsPVwiU2VsZWN0IHllYXJcIlxuXHRcdFx0aTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LXllYXJcIlxuXHRcdFx0dGl0bGU9XCJTZWxlY3QgeWVhclwiXG5cdFx0XHQoY2hhbmdlKT1cImNoYW5nZVllYXIoJGFueSgkZXZlbnQpLnRhcmdldC52YWx1ZSlcIlxuXHRcdD5cblx0XHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IHkgb2YgeWVhcnNcIiBbdmFsdWVdPVwieVwiPnt7IGkxOG4uZ2V0WWVhck51bWVyYWxzKHkpIH19PC9vcHRpb24+XG5cdFx0PC9zZWxlY3Q+XG5cdGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cdEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XG5cdEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXHRASW5wdXQoKSBtb250aHM6IG51bWJlcltdO1xuXHRASW5wdXQoKSB5ZWFyczogbnVtYmVyW107XG5cblx0QE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuXHRAVmlld0NoaWxkKCdtb250aCcsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBFbGVtZW50UmVmIH0pIG1vbnRoU2VsZWN0OiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKCd5ZWFyJywgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWYgfSkgeWVhclNlbGVjdDogRWxlbWVudFJlZjtcblxuXHRwcml2YXRlIF9tb250aCA9IC0xO1xuXHRwcml2YXRlIF95ZWFyID0gLTE7XG5cblx0Y29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG5cdGNoYW5nZU1vbnRoKG1vbnRoOiBzdHJpbmcpIHtcblx0XHR0aGlzLnNlbGVjdC5lbWl0KG5ldyBOZ2JEYXRlKHRoaXMuZGF0ZS55ZWFyLCB0b0ludGVnZXIobW9udGgpLCAxKSk7XG5cdH1cblxuXHRjaGFuZ2VZZWFyKHllYXI6IHN0cmluZykge1xuXHRcdHRoaXMuc2VsZWN0LmVtaXQobmV3IE5nYkRhdGUodG9JbnRlZ2VyKHllYXIpLCB0aGlzLmRhdGUubW9udGgsIDEpKTtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcblx0XHRpZiAodGhpcy5kYXRlKSB7XG5cdFx0XHRpZiAodGhpcy5kYXRlLm1vbnRoICE9PSB0aGlzLl9tb250aCkge1xuXHRcdFx0XHR0aGlzLl9tb250aCA9IHRoaXMuZGF0ZS5tb250aDtcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5tb250aFNlbGVjdC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB0aGlzLl9tb250aCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXRlLnllYXIgIT09IHRoaXMuX3llYXIpIHtcblx0XHRcdFx0dGhpcy5feWVhciA9IHRoaXMuZGF0ZS55ZWFyO1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnllYXJTZWxlY3QubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGhpcy5feWVhcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXX0=