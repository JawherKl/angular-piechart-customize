import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NavigationEvent } from './datepicker-view-model';
import { NgFor, NgIf } from '@angular/common';
import { NgbDatepickerNavigationSelect } from './datepicker-navigation-select';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
class NgbDatepickerNavigation {
    constructor(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    onClickPrev(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.PREV);
    }
    onClickNext(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.NEXT);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerNavigation, deps: [{ token: i1.NgbDatepickerI18n }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbDatepickerNavigation, isStandalone: true, selector: "ngb-datepicker-navigation", inputs: { date: "date", disabled: "disabled", months: "months", showSelect: "showSelect", prevDisabled: "prevDisabled", nextDisabled: "nextDisabled", selectBoxes: "selectBoxes" }, outputs: { navigate: "navigate", select: "select" }, ngImport: i0, template: `
		<div class="ngb-dp-arrow ngb-dp-arrow-prev">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickPrev($event)"
				[disabled]="prevDisabled"
				i18n-aria-label="@@ngb.datepicker.previous-month"
				aria-label="Previous month"
				i18n-title="@@ngb.datepicker.previous-month"
				title="Previous month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
		<ngb-datepicker-navigation-select
			*ngIf="showSelect"
			class="ngb-dp-navigation-select"
			[date]="date"
			[disabled]="disabled"
			[months]="selectBoxes.months"
			[years]="selectBoxes.years"
			(select)="select.emit($event)"
		>
		</ngb-datepicker-navigation-select>

		<ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
			<div class="ngb-dp-arrow" *ngIf="i > 0"></div>
			<div class="ngb-dp-month-name">
				{{ i18n.getMonthLabel(month.firstDate) }}
			</div>
			<div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
		</ng-template>
		<div class="ngb-dp-arrow ngb-dp-arrow-next">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickNext($event)"
				[disabled]="nextDisabled"
				i18n-aria-label="@@ngb.datepicker.next-month"
				aria-label="Next month"
				i18n-title="@@ngb.datepicker.next-month"
				title="Next month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
	`, isInline: true, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: NgbDatepickerNavigationSelect, selector: "ngb-datepicker-navigation-select", inputs: ["date", "disabled", "months", "years"], outputs: ["select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbDatepickerNavigation };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerNavigation, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation', standalone: true, imports: [NgIf, NgFor, NgbDatepickerNavigationSelect], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `
		<div class="ngb-dp-arrow ngb-dp-arrow-prev">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickPrev($event)"
				[disabled]="prevDisabled"
				i18n-aria-label="@@ngb.datepicker.previous-month"
				aria-label="Previous month"
				i18n-title="@@ngb.datepicker.previous-month"
				title="Previous month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
		<ngb-datepicker-navigation-select
			*ngIf="showSelect"
			class="ngb-dp-navigation-select"
			[date]="date"
			[disabled]="disabled"
			[months]="selectBoxes.months"
			[years]="selectBoxes.years"
			(select)="select.emit($event)"
		>
		</ngb-datepicker-navigation-select>

		<ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
			<div class="ngb-dp-arrow" *ngIf="i > 0"></div>
			<div class="ngb-dp-month-name">
				{{ i18n.getMonthLabel(month.firstDate) }}
			</div>
			<div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
		</ng-template>
		<div class="ngb-dp-arrow ngb-dp-arrow-next">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickNext($event)"
				[disabled]="nextDisabled"
				i18n-aria-label="@@ngb.datepicker.next-month"
				aria-label="Next month"
				i18n-title="@@ngb.datepicker.next-month"
				title="Next month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
	`, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }]; }, propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], showSelect: [{
                type: Input
            }], prevDisabled: [{
                type: Input
            }], nextDisabled: [{
                type: Input
            }], selectBoxes: [{
                type: Input
            }], navigate: [{
                type: Output
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSx5QkFBeUIsQ0FBQztBQUcxRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7QUFFL0UsTUF3RGEsdUJBQXVCO0lBY25DLFlBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBYjFDLGVBQVUsR0FBRyxlQUFlLENBQUM7UUFJcEIsV0FBTSxHQUFxQixFQUFFLENBQUM7UUFNN0IsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQy9DLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRUYsQ0FBQztJQUU5QyxXQUFXLENBQUMsS0FBaUI7UUFDM0IsS0FBSyxDQUFDLGFBQTZCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWlCO1FBQzNCLEtBQUssQ0FBQyxhQUE2QixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs4R0F4QlcsdUJBQXVCO2tHQUF2Qix1QkFBdUIsOFRBakR6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUErQ1QsdTlCQW5EUyxJQUFJLDZGQUFFLEtBQUssbUhBQUUsNkJBQTZCOztTQXFEeEMsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBeERuQyxTQUFTOytCQUNDLDJCQUEyQixjQUN6QixJQUFJLFdBQ1AsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLDZCQUE2QixDQUFDLG1CQUNwQyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFlBRTNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQStDVDt3R0FLUSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFFSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FdmVudCwgTW9udGhWaWV3TW9kZWwgfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQgeyBOZ2JEYXRlIH0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQgeyBOZ2JEYXRlcGlja2VySTE4biB9IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcbmltcG9ydCB7IE5nRm9yLCBOZ0lmIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0IH0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0JztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbicsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ0lmLCBOZ0ZvciwgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3RdLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0c3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLnNjc3MnXSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93IG5nYi1kcC1hcnJvdy1wcmV2XCI+XG5cdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRjbGFzcz1cImJ0biBidG4tbGluayBuZ2ItZHAtYXJyb3ctYnRuXCJcblx0XHRcdFx0KGNsaWNrKT1cIm9uQ2xpY2tQcmV2KCRldmVudClcIlxuXHRcdFx0XHRbZGlzYWJsZWRdPVwicHJldkRpc2FibGVkXCJcblx0XHRcdFx0aTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5wcmV2aW91cy1tb250aFwiXG5cdFx0XHRcdGFyaWEtbGFiZWw9XCJQcmV2aW91cyBtb250aFwiXG5cdFx0XHRcdGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCJcblx0XHRcdFx0dGl0bGU9XCJQcmV2aW91cyBtb250aFwiXG5cdFx0XHQ+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cblx0XHRcdDwvYnV0dG9uPlxuXHRcdDwvZGl2PlxuXHRcdDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdFxuXHRcdFx0Km5nSWY9XCJzaG93U2VsZWN0XCJcblx0XHRcdGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tc2VsZWN0XCJcblx0XHRcdFtkYXRlXT1cImRhdGVcIlxuXHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFttb250aHNdPVwic2VsZWN0Qm94ZXMubW9udGhzXCJcblx0XHRcdFt5ZWFyc109XCJzZWxlY3RCb3hlcy55ZWFyc1wiXG5cdFx0XHQoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIlxuXHRcdD5cblx0XHQ8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0PlxuXG5cdFx0PG5nLXRlbXBsYXRlICpuZ0lmPVwiIXNob3dTZWxlY3RcIiBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSA+IDBcIj48L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxuXHRcdFx0XHR7eyBpMThuLmdldE1vbnRoTGFiZWwobW9udGguZmlyc3REYXRlKSB9fVxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCIgKm5nSWY9XCJpICE9PSBtb250aHMubGVuZ3RoIC0gMVwiPjwvZGl2PlxuXHRcdDwvbmctdGVtcGxhdGU+XG5cdFx0PGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvdyBuZ2ItZHAtYXJyb3ctbmV4dFwiPlxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0Y2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiXG5cdFx0XHRcdChjbGljayk9XCJvbkNsaWNrTmV4dCgkZXZlbnQpXCJcblx0XHRcdFx0W2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiXG5cdFx0XHRcdGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiXG5cdFx0XHRcdGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcblx0XHRcdFx0aTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiXG5cdFx0XHRcdHRpdGxlPVwiTmV4dCBtb250aFwiXG5cdFx0XHQ+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cblx0XHRcdDwvYnV0dG9uPlxuXHRcdDwvZGl2PlxuXHRgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbiB7XG5cdG5hdmlnYXRpb24gPSBOYXZpZ2F0aW9uRXZlbnQ7XG5cblx0QElucHV0KCkgZGF0ZTogTmdiRGF0ZTtcblx0QElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cdEBJbnB1dCgpIG1vbnRoczogTW9udGhWaWV3TW9kZWxbXSA9IFtdO1xuXHRASW5wdXQoKSBzaG93U2VsZWN0OiBib29sZWFuO1xuXHRASW5wdXQoKSBwcmV2RGlzYWJsZWQ6IGJvb2xlYW47XG5cdEBJbnB1dCgpIG5leHREaXNhYmxlZDogYm9vbGVhbjtcblx0QElucHV0KCkgc2VsZWN0Qm94ZXM6IHsgeWVhcnM6IG51bWJlcltdOyBtb250aHM6IG51bWJlcltdIH07XG5cblx0QE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XG5cdEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cblx0Y29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG5cdG9uQ2xpY2tQcmV2KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG5cdFx0KGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG5cdFx0dGhpcy5uYXZpZ2F0ZS5lbWl0KHRoaXMubmF2aWdhdGlvbi5QUkVWKTtcblx0fVxuXG5cdG9uQ2xpY2tOZXh0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG5cdFx0KGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG5cdFx0dGhpcy5uYXZpZ2F0ZS5lbWl0KHRoaXMubmF2aWdhdGlvbi5ORVhUKTtcblx0fVxufVxuIl19