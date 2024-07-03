import { fromEvent, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, EventEmitter, forwardRef, inject, Inject, Injector, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbDate } from './ngb-date';
import { NgbDatepickerService } from './datepicker-service';
import { NavigationEvent } from './datepicker-view-model';
import { isChangedDate, isChangedMonth } from './datepicker-tools';
import { NgbDatepickerDayView } from './datepicker-day-view';
import { NgbDatepickerNavigation } from './datepicker-navigation';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
import * as i2 from "./datepicker-keyboard-service";
import * as i3 from "./datepicker-service";
import * as i4 from "./ngb-calendar";
import * as i5 from "./datepicker-config";
import * as i6 from "./adapters/ngb-date-adapter";
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
class NgbDatepickerContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbDatepickerContent, isStandalone: true, selector: "ng-template[ngbDatepickerContent]", ngImport: i0 }); }
}
export { NgbDatepickerContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbDatepickerContent]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
class NgbDatepickerMonth {
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     */
    set month(month) {
        this.viewModel = this._service.getMonth(month);
    }
    constructor(i18n, datepicker, _keyboardService, _service) {
        this.i18n = i18n;
        this.datepicker = datepicker;
        this._keyboardService = _keyboardService;
        this._service = _service;
    }
    onKeyDown(event) {
        this._keyboardService.processKey(event, this.datepicker);
    }
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.datepicker.onDateSelect(day.date);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerMonth, deps: [{ token: i1.NgbDatepickerI18n }, { token: forwardRef(() => NgbDatepicker) }, { token: i2.NgbDatepickerKeyboardService }, { token: i3.NgbDatepickerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbDatepickerMonth, isStandalone: true, selector: "ngb-datepicker-month", inputs: { month: "month" }, host: { attributes: { "role": "grid" }, listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0, template: `
		<div *ngIf="viewModel.weekdays.length > 0" class="ngb-dp-week ngb-dp-weekdays" role="row">
			<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek small">{{
				i18n.getWeekLabel()
			}}</div>
			<div *ngFor="let weekday of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">{{
				weekday
			}}</div>
		</div>
		<ng-template ngFor let-week [ngForOf]="viewModel.weeks">
			<div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
				<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{
					i18n.getWeekNumerals(week.number)
				}}</div>
				<div
					*ngFor="let day of week.days"
					(click)="doSelect(day); $event.preventDefault()"
					class="ngb-dp-day"
					role="gridcell"
					[class.disabled]="day.context.disabled"
					[tabindex]="day.tabindex"
					[class.hidden]="day.hidden"
					[class.ngb-dp-today]="day.context.today"
					[attr.aria-label]="day.ariaLabel"
				>
					<ng-template [ngIf]="!day.hidden">
						<ng-template
							[ngTemplateOutlet]="datepicker.dayTemplate"
							[ngTemplateOutletContext]="day.context"
						></ng-template>
					</ng-template>
				</div>
			</div>
		</ng-template>
	`, isInline: true, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-light)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbDatepickerMonth };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerMonth, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-month', standalone: true, imports: [NgIf, NgFor, NgTemplateOutlet], host: { role: 'grid', '(keydown)': 'onKeyDown($event)' }, encapsulation: ViewEncapsulation.None, template: `
		<div *ngIf="viewModel.weekdays.length > 0" class="ngb-dp-week ngb-dp-weekdays" role="row">
			<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek small">{{
				i18n.getWeekLabel()
			}}</div>
			<div *ngFor="let weekday of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">{{
				weekday
			}}</div>
		</div>
		<ng-template ngFor let-week [ngForOf]="viewModel.weeks">
			<div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
				<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{
					i18n.getWeekNumerals(week.number)
				}}</div>
				<div
					*ngFor="let day of week.days"
					(click)="doSelect(day); $event.preventDefault()"
					class="ngb-dp-day"
					role="gridcell"
					[class.disabled]="day.context.disabled"
					[tabindex]="day.tabindex"
					[class.hidden]="day.hidden"
					[class.ngb-dp-today]="day.context.today"
					[attr.aria-label]="day.ariaLabel"
				>
					<ng-template [ngIf]="!day.hidden">
						<ng-template
							[ngTemplateOutlet]="datepicker.dayTemplate"
							[ngTemplateOutletContext]="day.context"
						></ng-template>
					</ng-template>
				</div>
			</div>
		</ng-template>
	`, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-light)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }, { type: NgbDatepicker, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDatepicker)]
                }] }, { type: i2.NgbDatepickerKeyboardService }, { type: i3.NgbDatepickerService }]; }, propDecorators: { month: [{
                type: Input
            }] } });
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
class NgbDatepicker {
    constructor(_service, _calendar, _i18n, config, cd, _elementRef, _ngbDateAdapter, _ngZone) {
        this._service = _service;
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        this.injector = inject(Injector);
        this._controlValue = null;
        this._destroyed$ = new Subject();
        this._publicState = {};
        /**
         * An event emitted right before the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 5.2.0
         */
        this.dateSelect = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = () => { };
        [
            'contentTemplate',
            'dayTemplate',
            'dayTemplateData',
            'displayMonths',
            'firstDayOfWeek',
            'footerTemplate',
            'markDisabled',
            'minDate',
            'maxDate',
            'navigation',
            'outsideDays',
            'showWeekNumbers',
            'startDate',
            'weekdays',
        ].forEach((input) => (this[input] = config[input]));
        _service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe((date) => {
            this.dateSelect.emit(date);
        });
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe((model) => {
            const newDate = model.firstDate;
            const oldDate = this.model ? this.model.firstDate : null;
            // update public state
            this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map((viewModel) => viewModel.firstDate),
            };
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: () => (navigationPrevented = true),
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.open(oldDate);
                    return;
                }
            }
            const newSelectedDate = model.selectedDate;
            const newFocusedDate = model.focusDate;
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, this._controlValue)) {
                this._controlValue = newSelectedDate;
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            cd.markForCheck();
        });
    }
    /**
     *  Returns the readonly public state of the datepicker
     *
     * @since 5.2.0
     */
    get state() {
        return this._publicState;
    }
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     *  @since 5.3.0
     */
    get calendar() {
        return this._calendar;
    }
    /**
     * Returns the i18n service used in the specific datepicker instance.
     *
     * @since 14.2.0
     */
    get i18n() {
        return this._i18n;
    }
    /**
     *  Focuses on given date.
     */
    focusDate(date) {
        this._service.focus(NgbDate.from(date));
    }
    /**
     *  Selects focused date.
     */
    focusSelect() {
        this._service.focusSelect();
    }
    focus() {
        this._ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            const elementToFocus = this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? (date.day ? date : { ...date, day: 1 }) : null));
    }
    ngAfterViewInit() {
        this._ngZone.runOutsideAngular(() => {
            const focusIns$ = fromEvent(this._contentEl.nativeElement, 'focusin');
            const focusOuts$ = fromEvent(this._contentEl.nativeElement, 'focusout');
            const { nativeElement } = this._elementRef;
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter((focusEvent) => {
                const target = focusEvent.target;
                const relatedTarget = focusEvent.relatedTarget;
                return !(target?.classList.contains('ngb-dp-day') &&
                    relatedTarget?.classList.contains('ngb-dp-day') &&
                    nativeElement.contains(target) &&
                    nativeElement.contains(relatedTarget));
            }), takeUntil(this._destroyed$))
                .subscribe(({ type }) => this._ngZone.run(() => this._service.set({ focusVisible: type === 'focusin' })));
        });
    }
    ngOnDestroy() {
        this._destroyed$.next();
    }
    ngOnInit() {
        if (this.model === undefined) {
            const inputs = {};
            [
                'dayTemplateData',
                'displayMonths',
                'markDisabled',
                'firstDayOfWeek',
                'navigation',
                'minDate',
                'maxDate',
                'outsideDays',
                'weekdays',
            ].forEach((name) => (inputs[name] = this[name]));
            this._service.set(inputs);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
    }
    ngOnChanges(changes) {
        const inputs = {};
        [
            'dayTemplateData',
            'displayMonths',
            'markDisabled',
            'firstDayOfWeek',
            'navigation',
            'minDate',
            'maxDate',
            'outsideDays',
            'weekdays',
        ]
            .filter((name) => name in changes)
            .forEach((name) => (inputs[name] = this[name]));
        this._service.set(inputs);
        if ('startDate' in changes) {
            const { currentValue, previousValue } = changes.startDate;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    }
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    onNavigateDateSelect(date) {
        this._service.open(date);
    }
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this._service.set({ disabled });
    }
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepicker, deps: [{ token: i3.NgbDatepickerService }, { token: i4.NgbCalendar }, { token: i1.NgbDatepickerI18n }, { token: i5.NgbDatepickerConfig }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i6.NgbDateAdapter }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbDatepicker, isStandalone: true, selector: "ngb-datepicker", inputs: { contentTemplate: "contentTemplate", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", maxDate: "maxDate", minDate: "minDate", navigation: "navigation", outsideDays: "outsideDays", showWeekNumbers: "showWeekNumbers", startDate: "startDate", weekdays: "weekdays" }, outputs: { navigate: "navigate", dateSelect: "dateSelect" }, host: { properties: { "class.disabled": "model.disabled" } }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
            NgbDatepickerService,
        ], queries: [{ propertyName: "contentTemplateFromContent", first: true, predicate: NgbDatepickerContent, descendants: true, static: true }], viewQueries: [{ propertyName: "_defaultDayTemplate", first: true, predicate: ["defaultDayTemplate"], descendants: true, static: true }, { propertyName: "_contentEl", first: true, predicate: ["content"], descendants: true, static: true }], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			<div *ngFor="let month of model.months; let i = index" class="ngb-dp-month">
				<div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')" class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				<ngb-datepicker-month [month]="month.firstDate"></ngb-datepicker-month>
			</div>
		</ng-template>

		<div class="ngb-dp-header">
			<ngb-datepicker-navigation
				*ngIf="navigation !== 'none'"
				[date]="model.firstDate!"
				[months]="model.months"
				[disabled]="model.disabled"
				[showSelect]="model.navigation === 'select'"
				[prevDisabled]="model.prevDisabled"
				[nextDisabled]="model.nextDisabled"
				[selectBoxes]="model.selectBoxes"
				(navigate)="onNavigateEvent($event)"
				(select)="onNavigateDateSelect($event)"
			>
			</ngb-datepicker-navigation>
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			></ng-template>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
	`, isInline: true, styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-light)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NgbDatepickerDayView, selector: "[ngbDatepickerDayView]", inputs: ["currentMonth", "date", "disabled", "focused", "selected"] }, { kind: "component", type: NgbDatepickerMonth, selector: "ngb-datepicker-month", inputs: ["month"] }, { kind: "component", type: NgbDatepickerNavigation, selector: "ngb-datepicker-navigation", inputs: ["date", "disabled", "months", "showSelect", "prevDisabled", "nextDisabled", "selectBoxes"], outputs: ["navigate", "select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbDatepicker };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepicker, decorators: [{
            type: Component,
            args: [{ exportAs: 'ngbDatepicker', selector: 'ngb-datepicker', standalone: true, imports: [NgIf, NgFor, NgTemplateOutlet, NgbDatepickerDayView, NgbDatepickerMonth, NgbDatepickerNavigation], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: { '[class.disabled]': 'model.disabled' }, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			<div *ngFor="let month of model.months; let i = index" class="ngb-dp-month">
				<div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')" class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				<ngb-datepicker-month [month]="month.firstDate"></ngb-datepicker-month>
			</div>
		</ng-template>

		<div class="ngb-dp-header">
			<ngb-datepicker-navigation
				*ngIf="navigation !== 'none'"
				[date]="model.firstDate!"
				[months]="model.months"
				[disabled]="model.disabled"
				[showSelect]="model.navigation === 'select'"
				[prevDisabled]="model.prevDisabled"
				[nextDisabled]="model.nextDisabled"
				[selectBoxes]="model.selectBoxes"
				(navigate)="onNavigateEvent($event)"
				(select)="onNavigateDateSelect($event)"
			>
			</ngb-datepicker-navigation>
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			></ng-template>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
	`, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
                        NgbDatepickerService,
                    ], styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-light)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i3.NgbDatepickerService }, { type: i4.NgbCalendar }, { type: i1.NgbDatepickerI18n }, { type: i5.NgbDatepickerConfig }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i6.NgbDateAdapter }, { type: i0.NgZone }]; }, propDecorators: { _defaultDayTemplate: [{
                type: ViewChild,
                args: ['defaultDayTemplate', { static: true }]
            }], _contentEl: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }], contentTemplate: [{
                type: Input
            }], contentTemplateFromContent: [{
                type: ContentChild,
                args: [NgbDatepickerContent, { static: true }]
            }], dayTemplate: [{
                type: Input
            }], dayTemplateData: [{
                type: Input
            }], displayMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], markDisabled: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], minDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], navigate: [{
                type: Output
            }], dateSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFFTix1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBS0wsTUFBTSxFQUdOLFNBQVMsRUFDVCxpQkFBaUIsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFvQixNQUFNLGlCQUFpQixDQUFDO0FBR2xGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUEyQixvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JGLE9BQU8sRUFBcUQsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFPN0csT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7QUFrRWxFOzs7O0dBSUc7QUFDSCxNQUNhLG9CQUFvQjtJQUNoQyxZQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFD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TSxFQUFFLElBQUksRUFBRTtnQkFTM0MsV0FBVztzQkFBbkIsS0FBSztnQkFVRyxlQUFlO3NCQUF2QixLQUFLO2dCQUtHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBT0csY0FBYztzQkFBdEIsS0FBSztnQkFPRyxjQUFjO3NCQUF0QixLQUFLO2dCQVNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBT0csT0FBTztzQkFBZixLQUFLO2dCQU9HLE9BQU87c0JBQWYsS0FBSztnQkFTRyxVQUFVO3NCQUFsQixLQUFLO2dCQVdHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csZUFBZTtzQkFBdkIsS0FBSztnQkFVRyxTQUFTO3NCQUFqQixLQUFLO2dCQVdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBT0ksUUFBUTtzQkFBakIsTUFBTTtnQkFTRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LFxuXHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudCxcblx0Q29udGVudENoaWxkLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0Zm9yd2FyZFJlZixcblx0aW5qZWN0LFxuXHRJbmplY3QsXG5cdEluamVjdG9yLFxuXHRJbnB1dCxcblx0Tmdab25lLFxuXHRPbkNoYW5nZXMsXG5cdE9uRGVzdHJveSxcblx0T25Jbml0LFxuXHRPdXRwdXQsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3Q2hpbGQsXG5cdFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nRm9yLCBOZ0lmLCBOZ1RlbXBsYXRlT3V0bGV0LCBUcmFuc2xhdGlvbldpZHRoIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTmdiQ2FsZW5kYXIgfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQgeyBOZ2JEYXRlIH0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyU2VydmljZUlucHV0cywgTmdiRGF0ZXBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyVmlld01vZGVsLCBEYXlWaWV3TW9kZWwsIE1vbnRoVmlld01vZGVsLCBOYXZpZ2F0aW9uRXZlbnQgfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQgeyBEYXlUZW1wbGF0ZUNvbnRleHQgfSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHsgTmdiRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25maWcnO1xuaW1wb3J0IHsgTmdiRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7IE5nYkRhdGVwaWNrZXJJMThuIH0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHsgTmdiRGF0ZXBpY2tlcktleWJvYXJkU2VydmljZSB9IGZyb20gJy4vZGF0ZXBpY2tlci1rZXlib2FyZC1zZXJ2aWNlJztcbmltcG9ydCB7IGlzQ2hhbmdlZERhdGUsIGlzQ2hhbmdlZE1vbnRoIH0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcbmltcG9ydCB7IE5nYkRhdGVwaWNrZXJEYXlWaWV3IH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS12aWV3JztcbmltcG9ydCB7IE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uIH0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24nO1xuaW1wb3J0IHsgQ29udGVudFRlbXBsYXRlQ29udGV4dCB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb250ZW50LXRlbXBsYXRlLWNvbnRleHQnO1xuXG4vKipcbiAqIEFuIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSBuYXZpZ2F0aW9uIGhhcHBlbnMgYW5kIHRoZSBtb250aCBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXIgY2hhbmdlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCB7XG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudGx5IGRpc3BsYXllZCBtb250aC5cblx0ICovXG5cdGN1cnJlbnQ6IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyIH0gfCBudWxsO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9udGggd2UncmUgbmF2aWdhdGluZyB0by5cblx0ICovXG5cdG5leHQ6IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyIH07XG5cblx0LyoqXG5cdCAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgbmF2aWdhdGlvbiBmcm9tIGhhcHBlbmluZy5cblx0ICpcblx0ICogQHNpbmNlIDQuMS4wXG5cdCAqL1xuXHRwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgdGhhdCByZXByZXNlbnRzIHRoZSByZWFkb25seSBwdWJsaWMgc3RhdGUgb2YgdGhlIGRhdGVwaWNrZXIuXG4gKlxuICogQWNjZXNzaWJsZSB2aWEgdGhlIGBkYXRlcGlja2VyLnN0YXRlYCBnZXR0ZXJcbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JEYXRlcGlja2VyU3RhdGUge1xuXHQvKipcblx0ICogVGhlIGVhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIG9yIHNlbGVjdGVkXG5cdCAqL1xuXHRyZWFkb25seSBtaW5EYXRlOiBOZ2JEYXRlIHwgbnVsbDtcblxuXHQvKipcblx0ICogVGhlIGxhdGVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZFxuXHQgKi9cblx0cmVhZG9ubHkgbWF4RGF0ZTogTmdiRGF0ZSB8IG51bGw7XG5cblx0LyoqXG5cdCAqIFRoZSBmaXJzdCB2aXNpYmxlIGRhdGUgb2YgY3VycmVudGx5IGRpc3BsYXllZCBtb250aHNcblx0ICovXG5cdHJlYWRvbmx5IGZpcnN0RGF0ZTogTmdiRGF0ZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgdmlzaWJsZSBkYXRlIG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGhzXG5cdCAqL1xuXHRyZWFkb25seSBsYXN0RGF0ZTogTmdiRGF0ZTtcblxuXHQvKipcblx0ICogVGhlIGRhdGUgY3VycmVudGx5IGZvY3VzZWQgYnkgdGhlIGRhdGVwaWNrZXJcblx0ICovXG5cdHJlYWRvbmx5IGZvY3VzZWREYXRlOiBOZ2JEYXRlO1xuXG5cdC8qKlxuXHQgKiBGaXJzdCBkYXRlcyBvZiBtb250aHMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlclxuXHQgKlxuXHQgKiBAc2luY2UgNS4zLjBcblx0ICovXG5cdHJlYWRvbmx5IG1vbnRoczogTmdiRGF0ZVtdO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbWFya3MgdGhlIGNvbnRlbnQgdGVtcGxhdGUgdGhhdCBjdXN0b21pemVzIHRoZSB3YXkgZGF0ZXBpY2tlciBtb250aHMgYXJlIGRpc3BsYXllZFxuICpcbiAqIEBzaW5jZSA1LjMuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JEYXRlcGlja2VyQ29udGVudF0nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckNvbnRlbnQge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCByZW5kZXJzIG9uZSBtb250aCBpbmNsdWRpbmcgYWxsIHRoZSBkYXlzLCB3ZWVrZGF5cyBhbmQgd2VlayBudW1iZXJzLiBDYW4gYmUgdXNlZCBpbnNpZGVcbiAqIHRoZSBgPG5nLXRlbXBsYXRlIG5nYkRhdGVwaWNrZXJNb250aHM+PC9uZy10ZW1wbGF0ZT5gIHdoZW4geW91IHdhbnQgdG8gY3VzdG9taXplIG1vbnRocyBsYXlvdXQuXG4gKlxuICogRm9yIGEgdXNhZ2UgZXhhbXBsZSwgc2VlIFtjdXN0b20gbW9udGggbGF5b3V0IGRlbW9dKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2V4YW1wbGVzI2N1c3RvbW1vbnRoKVxuICpcbiAqIEBzaW5jZSA1LjMuMFxuICovXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1tb250aCcsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ0lmLCBOZ0ZvciwgTmdUZW1wbGF0ZU91dGxldF0sXG5cdGhvc3Q6IHsgcm9sZTogJ2dyaWQnLCAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyB9LFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLW1vbnRoLnNjc3MnXSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2ICpuZ0lmPVwidmlld01vZGVsLndlZWtkYXlzLmxlbmd0aCA+IDBcIiBjbGFzcz1cIm5nYi1kcC13ZWVrIG5nYi1kcC13ZWVrZGF5c1wiIHJvbGU9XCJyb3dcIj5cblx0XHRcdDxkaXYgKm5nSWY9XCJkYXRlcGlja2VyLnNob3dXZWVrTnVtYmVyc1wiIGNsYXNzPVwibmdiLWRwLXdlZWtkYXkgbmdiLWRwLXNob3d3ZWVrIHNtYWxsXCI+e3tcblx0XHRcdFx0aTE4bi5nZXRXZWVrTGFiZWwoKVxuXHRcdFx0fX08L2Rpdj5cblx0XHRcdDxkaXYgKm5nRm9yPVwibGV0IHdlZWtkYXkgb2Ygdmlld01vZGVsLndlZWtkYXlzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla2RheSBzbWFsbFwiIHJvbGU9XCJjb2x1bW5oZWFkZXJcIj57e1xuXHRcdFx0XHR3ZWVrZGF5XG5cdFx0XHR9fTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtd2VlayBbbmdGb3JPZl09XCJ2aWV3TW9kZWwud2Vla3NcIj5cblx0XHRcdDxkaXYgKm5nSWY9XCIhd2Vlay5jb2xsYXBzZWRcIiBjbGFzcz1cIm5nYi1kcC13ZWVrXCIgcm9sZT1cInJvd1wiPlxuXHRcdFx0XHQ8ZGl2ICpuZ0lmPVwiZGF0ZXBpY2tlci5zaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrLW51bWJlciBzbWFsbCB0ZXh0LW11dGVkXCI+e3tcblx0XHRcdFx0XHRpMThuLmdldFdlZWtOdW1lcmFscyh3ZWVrLm51bWJlcilcblx0XHRcdFx0fX08L2Rpdj5cblx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdCpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vlay5kYXlzXCJcblx0XHRcdFx0XHQoY2xpY2spPVwiZG9TZWxlY3QoZGF5KTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdGNsYXNzPVwibmdiLWRwLWRheVwiXG5cdFx0XHRcdFx0cm9sZT1cImdyaWRjZWxsXCJcblx0XHRcdFx0XHRbY2xhc3MuZGlzYWJsZWRdPVwiZGF5LmNvbnRleHQuZGlzYWJsZWRcIlxuXHRcdFx0XHRcdFt0YWJpbmRleF09XCJkYXkudGFiaW5kZXhcIlxuXHRcdFx0XHRcdFtjbGFzcy5oaWRkZW5dPVwiZGF5LmhpZGRlblwiXG5cdFx0XHRcdFx0W2NsYXNzLm5nYi1kcC10b2RheV09XCJkYXkuY29udGV4dC50b2RheVwiXG5cdFx0XHRcdFx0W2F0dHIuYXJpYS1sYWJlbF09XCJkYXkuYXJpYUxhYmVsXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZGF5LmhpZGRlblwiPlxuXHRcdFx0XHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRhdGVwaWNrZXIuZGF5VGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF5LmNvbnRleHRcIlxuXHRcdFx0XHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdFx0PC9uZy10ZW1wbGF0ZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L25nLXRlbXBsYXRlPlxuXHRgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTW9udGgge1xuXHQvKipcblx0ICogVGhlIGZpcnN0IGRhdGUgb2YgbW9udGggdG8gYmUgcmVuZGVyZWQuXG5cdCAqXG5cdCAqIFRoaXMgbW9udGggbXVzdCBvbmUgb2YgdGhlIG1vbnRocyBwcmVzZW50IGluIHRoZVxuXHQgKiBbZGF0ZXBpY2tlciBzdGF0ZV0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJTdGF0ZSkuXG5cdCAqL1xuXHRASW5wdXQoKVxuXHRzZXQgbW9udGgobW9udGg6IE5nYkRhdGVTdHJ1Y3QpIHtcblx0XHR0aGlzLnZpZXdNb2RlbCA9IHRoaXMuX3NlcnZpY2UuZ2V0TW9udGgobW9udGgpO1xuXHR9XG5cblx0dmlld01vZGVsOiBNb250aFZpZXdNb2RlbDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXG5cdFx0QEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRhdGVwaWNrZXIpKSBwdWJsaWMgZGF0ZXBpY2tlcjogTmdiRGF0ZXBpY2tlcixcblx0XHRwcml2YXRlIF9rZXlib2FyZFNlcnZpY2U6IE5nYkRhdGVwaWNrZXJLZXlib2FyZFNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBfc2VydmljZTogTmdiRGF0ZXBpY2tlclNlcnZpY2UsXG5cdCkge31cblxuXHRvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcblx0XHR0aGlzLl9rZXlib2FyZFNlcnZpY2UucHJvY2Vzc0tleShldmVudCwgdGhpcy5kYXRlcGlja2VyKTtcblx0fVxuXG5cdGRvU2VsZWN0KGRheTogRGF5Vmlld01vZGVsKSB7XG5cdFx0aWYgKCFkYXkuY29udGV4dC5kaXNhYmxlZCAmJiAhZGF5LmhpZGRlbikge1xuXHRcdFx0dGhpcy5kYXRlcGlja2VyLm9uRGF0ZVNlbGVjdChkYXkuZGF0ZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQSBoaWdobHkgY29uZmlndXJhYmxlIGNvbXBvbmVudCB0aGF0IGhlbHBzIHlvdSB3aXRoIHNlbGVjdGluZyBjYWxlbmRhciBkYXRlcy5cbiAqXG4gKiBgTmdiRGF0ZXBpY2tlcmAgaXMgbWVhbnQgdG8gYmUgZGlzcGxheWVkIGlubGluZSBvbiBhIHBhZ2Ugb3IgcHV0IGluc2lkZSBhIHBvcHVwLlxuICovXG5AQ29tcG9uZW50KHtcblx0ZXhwb3J0QXM6ICduZ2JEYXRlcGlja2VyJyxcblx0c2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlcicsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ0lmLCBOZ0ZvciwgTmdUZW1wbGF0ZU91dGxldCwgTmdiRGF0ZXBpY2tlckRheVZpZXcsIE5nYkRhdGVwaWNrZXJNb250aCwgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb25dLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0c3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci5zY3NzJ10sXG5cdGhvc3Q6IHsgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnbW9kZWwuZGlzYWJsZWQnIH0sXG5cdHRlbXBsYXRlOiBgXG5cdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHQjZGVmYXVsdERheVRlbXBsYXRlXG5cdFx0XHRsZXQtZGF0ZT1cImRhdGVcIlxuXHRcdFx0bGV0LWN1cnJlbnRNb250aD1cImN1cnJlbnRNb250aFwiXG5cdFx0XHRsZXQtc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG5cdFx0XHRsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG5cdFx0XHRsZXQtZm9jdXNlZD1cImZvY3VzZWRcIlxuXHRcdD5cblx0XHRcdDxkaXZcblx0XHRcdFx0bmdiRGF0ZXBpY2tlckRheVZpZXdcblx0XHRcdFx0W2RhdGVdPVwiZGF0ZVwiXG5cdFx0XHRcdFtjdXJyZW50TW9udGhdPVwiY3VycmVudE1vbnRoXCJcblx0XHRcdFx0W3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcblx0XHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0W2ZvY3VzZWRdPVwiZm9jdXNlZFwiXG5cdFx0XHQ+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L25nLXRlbXBsYXRlPlxuXG5cdFx0PG5nLXRlbXBsYXRlICNkZWZhdWx0Q29udGVudFRlbXBsYXRlPlxuXHRcdFx0PGRpdiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9kZWwubW9udGhzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJuZ2ItZHAtbW9udGhcIj5cblx0XHRcdFx0PGRpdiAqbmdJZj1cIm5hdmlnYXRpb24gPT09ICdub25lJyB8fCAoZGlzcGxheU1vbnRocyA+IDEgJiYgbmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpXCIgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxuXHRcdFx0XHRcdHt7IGkxOG4uZ2V0TW9udGhMYWJlbChtb250aC5maXJzdERhdGUpIH19XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8bmdiLWRhdGVwaWNrZXItbW9udGggW21vbnRoXT1cIm1vbnRoLmZpcnN0RGF0ZVwiPjwvbmdiLWRhdGVwaWNrZXItbW9udGg+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L25nLXRlbXBsYXRlPlxuXG5cdFx0PGRpdiBjbGFzcz1cIm5nYi1kcC1oZWFkZXJcIj5cblx0XHRcdDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uXG5cdFx0XHRcdCpuZ0lmPVwibmF2aWdhdGlvbiAhPT0gJ25vbmUnXCJcblx0XHRcdFx0W2RhdGVdPVwibW9kZWwuZmlyc3REYXRlIVwiXG5cdFx0XHRcdFttb250aHNdPVwibW9kZWwubW9udGhzXCJcblx0XHRcdFx0W2Rpc2FibGVkXT1cIm1vZGVsLmRpc2FibGVkXCJcblx0XHRcdFx0W3Nob3dTZWxlY3RdPVwibW9kZWwubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCdcIlxuXHRcdFx0XHRbcHJldkRpc2FibGVkXT1cIm1vZGVsLnByZXZEaXNhYmxlZFwiXG5cdFx0XHRcdFtuZXh0RGlzYWJsZWRdPVwibW9kZWwubmV4dERpc2FibGVkXCJcblx0XHRcdFx0W3NlbGVjdEJveGVzXT1cIm1vZGVsLnNlbGVjdEJveGVzXCJcblx0XHRcdFx0KG5hdmlnYXRlKT1cIm9uTmF2aWdhdGVFdmVudCgkZXZlbnQpXCJcblx0XHRcdFx0KHNlbGVjdCk9XCJvbk5hdmlnYXRlRGF0ZVNlbGVjdCgkZXZlbnQpXCJcblx0XHRcdD5cblx0XHRcdDwvbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbj5cblx0XHQ8L2Rpdj5cblxuXHRcdDxkaXYgY2xhc3M9XCJuZ2ItZHAtY29udGVudFwiIFtjbGFzcy5uZ2ItZHAtbW9udGhzXT1cIiFjb250ZW50VGVtcGxhdGVcIiAjY29udGVudD5cblx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VGVtcGxhdGUgfHwgY29udGVudFRlbXBsYXRlRnJvbUNvbnRlbnQ/LnRlbXBsYXRlUmVmIHx8IGRlZmF1bHRDb250ZW50VGVtcGxhdGVcIlxuXHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHRoaXMgfVwiXG5cdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0SW5qZWN0b3JdPVwiaW5qZWN0b3JcIlxuXHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0PC9kaXY+XG5cblx0XHQ8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuXHRgLFxuXHRwcm92aWRlcnM6IFtcblx0XHR7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEYXRlcGlja2VyKSwgbXVsdGk6IHRydWUgfSxcblx0XHROZ2JEYXRlcGlja2VyU2VydmljZSxcblx0XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DbG9zZTogYm9vbGVhbiB8IHN0cmluZztcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX25hdmlnYXRpb246IHN0cmluZztcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX291dHNpZGVEYXlzOiBzdHJpbmc7XG5cdHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV93ZWVrZGF5czogYm9vbGVhbiB8IG51bWJlcjtcblxuXHRtb2RlbDogRGF0ZXBpY2tlclZpZXdNb2RlbDtcblxuXHRAVmlld0NoaWxkKCdkZWZhdWx0RGF5VGVtcGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIF9kZWZhdWx0RGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cdEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIF9jb250ZW50RWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG5cdHByb3RlY3RlZCBpbmplY3RvciA9IGluamVjdChJbmplY3Rvcik7XG5cblx0cHJpdmF0ZSBfY29udHJvbFZhbHVlOiBOZ2JEYXRlIHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX2Rlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRwcml2YXRlIF9wdWJsaWNTdGF0ZTogTmdiRGF0ZXBpY2tlclN0YXRlID0gPGFueT57fTtcblxuXHQvKipcblx0ICogVGhlIHJlZmVyZW5jZSB0byBhIGN1c3RvbSBjb250ZW50IHRlbXBsYXRlLlxuXHQgKlxuXHQgKiBBbGxvd3MgdG8gY29tcGxldGVseSBvdmVycmlkZSB0aGUgd2F5IGRhdGVwaWNrZXIgZGlzcGxheXMgbW9udGhzLlxuXHQgKlxuXHQgKiBTZWUgW2BOZ2JEYXRlcGlja2VyQ29udGVudGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JEYXRlcGlja2VyQ29udGVudCkgYW5kXG5cdCAqIFtgQ29udGVudFRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNDb250ZW50VGVtcGxhdGVDb250ZXh0KSBmb3IgbW9yZSBkZXRhaWxzLlxuXHQgKlxuXHQgKiBAc2luY2UgMTQuMi4wXG5cdCAqL1xuXHRASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPENvbnRlbnRUZW1wbGF0ZUNvbnRleHQ+O1xuXHRAQ29udGVudENoaWxkKE5nYkRhdGVwaWNrZXJDb250ZW50LCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50VGVtcGxhdGVGcm9tQ29udGVudD86IE5nYkRhdGVwaWNrZXJDb250ZW50O1xuXG5cdC8qKlxuXHQgKiBUaGUgcmVmZXJlbmNlIHRvIGEgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZGF5LlxuXHQgKlxuXHQgKiBBbGxvd3MgdG8gY29tcGxldGVseSBvdmVycmlkZSB0aGUgd2F5IGEgZGF5ICdjZWxsJyBpbiB0aGUgY2FsZW5kYXIgaXMgZGlzcGxheWVkLlxuXHQgKlxuXHQgKiBTZWUgW2BEYXlUZW1wbGF0ZUNvbnRleHRgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjRGF5VGVtcGxhdGVDb250ZXh0KSBmb3IgdGhlIGRhdGEgeW91IGdldCBpbnNpZGUuXG5cdCAqL1xuXHRASW5wdXQoKSBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcblxuXHQvKipcblx0ICogVGhlIGNhbGxiYWNrIHRvIHBhc3MgYW55IGFyYml0cmFyeSBkYXRhIHRvIHRoZSB0ZW1wbGF0ZSBjZWxsIHZpYSB0aGVcblx0ICogW2BEYXlUZW1wbGF0ZUNvbnRleHRgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjRGF5VGVtcGxhdGVDb250ZXh0KSdzIGBkYXRhYCBwYXJhbWV0ZXIuXG5cdCAqXG5cdCAqIGBjdXJyZW50YCBpcyB0aGUgbW9udGggdGhhdCBpcyBjdXJyZW50bHkgZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyLlxuXHQgKlxuXHQgKiBAc2luY2UgMy4zLjBcblx0ICovXG5cdEBJbnB1dCgpIGRheVRlbXBsYXRlRGF0YTogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ/OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlciB9KSA9PiBhbnk7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgbW9udGhzIHRvIGRpc3BsYXkuXG5cdCAqL1xuXHRASW5wdXQoKSBkaXNwbGF5TW9udGhzOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG5cdCAqXG5cdCAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW4uXG5cdCAqL1xuXHRASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgcmVmZXJlbmNlIHRvIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXRlcGlja2VyIGZvb3Rlci5cblx0ICpcblx0ICogQHNpbmNlIDMuMy4wXG5cdCAqL1xuXHRASW5wdXQoKSBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXHQvKipcblx0ICogVGhlIGNhbGxiYWNrIHRvIG1hcmsgc29tZSBkYXRlcyBhcyBkaXNhYmxlZC5cblx0ICpcblx0ICogSXQgaXMgY2FsbGVkIGZvciBlYWNoIG5ldyBkYXRlIHdoZW4gbmF2aWdhdGluZyB0byBhIGRpZmZlcmVudCBtb250aC5cblx0ICpcblx0ICogYGN1cnJlbnRgIGlzIHRoZSBtb250aCB0aGF0IGlzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG5cdCAqL1xuXHRASW5wdXQoKSBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50PzogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXIgfSkgPT4gYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGxhdGVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZC5cblx0ICpcblx0ICogSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYWZ0ZXIgdGhlIGN1cnJlbnQgbW9udGguXG5cdCAqL1xuXHRASW5wdXQoKSBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xuXG5cdC8qKlxuXHQgKiBUaGUgZWFybGllc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWQuXG5cdCAqXG5cdCAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGJlZm9yZSB0aGUgY3VycmVudCBtb250aC5cblx0ICovXG5cdEBJbnB1dCgpIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cblx0LyoqXG5cdCAqIE5hdmlnYXRpb24gdHlwZS5cblx0ICpcblx0ICogKiBgXCJzZWxlY3RcImAgLSBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCBuYXZpZ2F0aW9uIGFycm93c1xuXHQgKiAqIGBcImFycm93c1wiYCAtIG9ubHkgbmF2aWdhdGlvbiBhcnJvd3Ncblx0ICogKiBgXCJub25lXCJgIC0gbm8gbmF2aWdhdGlvbiB2aXNpYmxlIGF0IGFsbFxuXHQgKi9cblx0QElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuXHQvKipcblx0ICogVGhlIHdheSBvZiBkaXNwbGF5aW5nIGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgbW9udGguXG5cdCAqXG5cdCAqICogYFwidmlzaWJsZVwiYCAtIGRheXMgYXJlIHZpc2libGVcblx0ICogKiBgXCJoaWRkZW5cImAgLSBkYXlzIGFyZSBoaWRkZW4sIHdoaXRlIHNwYWNlIHByZXNlcnZlZFxuXHQgKiAqIGBcImNvbGxhcHNlZFwiYCAtIGRheXMgYXJlIGNvbGxhcHNlZCwgc28gdGhlIGRhdGVwaWNrZXIgaGVpZ2h0IG1pZ2h0IGNoYW5nZSBiZXR3ZWVuIG1vbnRoc1xuXHQgKlxuXHQgKiBGb3IgdGhlIDIrIG1vbnRocyB2aWV3LCBkYXlzIGluIGJldHdlZW4gbW9udGhzIGFyZSBuZXZlciBzaG93bi5cblx0ICovXG5cdEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHdlZWsgbnVtYmVycyB3aWxsIGJlIGRpc3BsYXllZC5cblx0ICovXG5cdEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGRhdGUgdG8gb3BlbiBjYWxlbmRhciB3aXRoLlxuXHQgKlxuXHQgKiBXaXRoIHRoZSBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxuXHQgKiBJZiBub3RoaW5nIG9yIGludmFsaWQgZGF0ZSBpcyBwcm92aWRlZCwgY2FsZW5kYXIgd2lsbCBvcGVuIHdpdGggY3VycmVudCBtb250aC5cblx0ICpcblx0ICogWW91IGNvdWxkIHVzZSBgbmF2aWdhdGVUbyhkYXRlKWAgbWV0aG9kIGFzIGFuIGFsdGVybmF0aXZlLlxuXHQgKi9cblx0QElucHV0KCkgc3RhcnREYXRlOiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5PzogbnVtYmVyIH07XG5cblx0LyoqXG5cdCAqIFRoZSB3YXkgd2Vla2RheXMgc2hvdWxkIGJlIGRpc3BsYXllZC5cblx0ICpcblx0ICogKiBgdHJ1ZWAgLSB3ZWVrZGF5cyBhcmUgZGlzcGxheWVkIHVzaW5nIGRlZmF1bHQgd2lkdGhcblx0ICogKiBgZmFsc2VgIC0gd2Vla2RheXMgYXJlIG5vdCBkaXNwbGF5ZWRcblx0ICogKiBgVHJhbnNsYXRpb25XaWR0aGAgLSB3ZWVrZGF5cyBhcmUgZGlzcGxheWVkIHVzaW5nIHNwZWNpZmllZCB3aWR0aFxuXHQgKlxuXHQgKiBAc2luY2UgOS4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHdlZWtkYXlzOiBUcmFuc2xhdGlvbldpZHRoIHwgYm9vbGVhbjtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXG5cdCAqXG5cdCAqIFNlZSBbYE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50KSBmb3IgdGhlIHBheWxvYWQgaW5mby5cblx0ICovXG5cdEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBkYXRlIHVzaW5nIGtleWJvYXJkIG9yIG1vdXNlLlxuXHQgKlxuXHQgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkIGBOZ2JEYXRlYC5cblx0ICpcblx0ICogQHNpbmNlIDUuMi4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgZGF0ZVNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuXHRvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXHRvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSxcblx0XHRwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsXG5cdFx0cHJpdmF0ZSBfaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXG5cdFx0Y29uZmlnOiBOZ2JEYXRlcGlja2VyQ29uZmlnLFxuXHRcdGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pixcblx0XHRwcml2YXRlIF9uZ2JEYXRlQWRhcHRlcjogTmdiRGF0ZUFkYXB0ZXI8YW55Pixcblx0XHRwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcblx0KSB7XG5cdFx0W1xuXHRcdFx0J2NvbnRlbnRUZW1wbGF0ZScsXG5cdFx0XHQnZGF5VGVtcGxhdGUnLFxuXHRcdFx0J2RheVRlbXBsYXRlRGF0YScsXG5cdFx0XHQnZGlzcGxheU1vbnRocycsXG5cdFx0XHQnZmlyc3REYXlPZldlZWsnLFxuXHRcdFx0J2Zvb3RlclRlbXBsYXRlJyxcblx0XHRcdCdtYXJrRGlzYWJsZWQnLFxuXHRcdFx0J21pbkRhdGUnLFxuXHRcdFx0J21heERhdGUnLFxuXHRcdFx0J25hdmlnYXRpb24nLFxuXHRcdFx0J291dHNpZGVEYXlzJyxcblx0XHRcdCdzaG93V2Vla051bWJlcnMnLFxuXHRcdFx0J3N0YXJ0RGF0ZScsXG5cdFx0XHQnd2Vla2RheXMnLFxuXHRcdF0uZm9yRWFjaCgoaW5wdXQpID0+ICh0aGlzW2lucHV0XSA9IGNvbmZpZ1tpbnB1dF0pKTtcblxuXHRcdF9zZXJ2aWNlLmRhdGVTZWxlY3QkLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpKS5zdWJzY3JpYmUoKGRhdGUpID0+IHtcblx0XHRcdHRoaXMuZGF0ZVNlbGVjdC5lbWl0KGRhdGUpO1xuXHRcdH0pO1xuXG5cdFx0X3NlcnZpY2UubW9kZWwkLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpKS5zdWJzY3JpYmUoKG1vZGVsKSA9PiB7XG5cdFx0XHRjb25zdCBuZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlITtcblx0XHRcdGNvbnN0IG9sZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5maXJzdERhdGUgOiBudWxsO1xuXG5cdFx0XHQvLyB1cGRhdGUgcHVibGljIHN0YXRlXG5cdFx0XHR0aGlzLl9wdWJsaWNTdGF0ZSA9IHtcblx0XHRcdFx0bWF4RGF0ZTogbW9kZWwubWF4RGF0ZSxcblx0XHRcdFx0bWluRGF0ZTogbW9kZWwubWluRGF0ZSxcblx0XHRcdFx0Zmlyc3REYXRlOiBtb2RlbC5maXJzdERhdGUhLFxuXHRcdFx0XHRsYXN0RGF0ZTogbW9kZWwubGFzdERhdGUhLFxuXHRcdFx0XHRmb2N1c2VkRGF0ZTogbW9kZWwuZm9jdXNEYXRlISxcblx0XHRcdFx0bW9udGhzOiBtb2RlbC5tb250aHMubWFwKCh2aWV3TW9kZWwpID0+IHZpZXdNb2RlbC5maXJzdERhdGUpLFxuXHRcdFx0fTtcblxuXHRcdFx0bGV0IG5hdmlnYXRpb25QcmV2ZW50ZWQgPSBmYWxzZTtcblx0XHRcdC8vIGVtaXR0aW5nIG5hdmlnYXRpb24gZXZlbnQgaWYgdGhlIGZpcnN0IG1vbnRoIGNoYW5nZXNcblx0XHRcdGlmICghbmV3RGF0ZS5lcXVhbHMob2xkRGF0ZSkpIHtcblx0XHRcdFx0dGhpcy5uYXZpZ2F0ZS5lbWl0KHtcblx0XHRcdFx0XHRjdXJyZW50OiBvbGREYXRlID8geyB5ZWFyOiBvbGREYXRlLnllYXIsIG1vbnRoOiBvbGREYXRlLm1vbnRoIH0gOiBudWxsLFxuXHRcdFx0XHRcdG5leHQ6IHsgeWVhcjogbmV3RGF0ZS55ZWFyLCBtb250aDogbmV3RGF0ZS5tb250aCB9LFxuXHRcdFx0XHRcdHByZXZlbnREZWZhdWx0OiAoKSA9PiAobmF2aWdhdGlvblByZXZlbnRlZCA9IHRydWUpLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBjYW4ndCBwcmV2ZW50IHRoZSB2ZXJ5IGZpcnN0IG5hdmlnYXRpb25cblx0XHRcdFx0aWYgKG5hdmlnYXRpb25QcmV2ZW50ZWQgJiYgb2xkRGF0ZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHRoaXMuX3NlcnZpY2Uub3BlbihvbGREYXRlKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgbmV3U2VsZWN0ZWREYXRlID0gbW9kZWwuc2VsZWN0ZWREYXRlO1xuXHRcdFx0Y29uc3QgbmV3Rm9jdXNlZERhdGUgPSBtb2RlbC5mb2N1c0RhdGU7XG5cdFx0XHRjb25zdCBvbGRGb2N1c2VkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZvY3VzRGF0ZSA6IG51bGw7XG5cblx0XHRcdHRoaXMubW9kZWwgPSBtb2RlbDtcblxuXHRcdFx0Ly8gaGFuZGxpbmcgc2VsZWN0aW9uIGNoYW5nZVxuXHRcdFx0aWYgKGlzQ2hhbmdlZERhdGUobmV3U2VsZWN0ZWREYXRlLCB0aGlzLl9jb250cm9sVmFsdWUpKSB7XG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xWYWx1ZSA9IG5ld1NlbGVjdGVkRGF0ZTtcblx0XHRcdFx0dGhpcy5vblRvdWNoZWQoKTtcblx0XHRcdFx0dGhpcy5vbkNoYW5nZSh0aGlzLl9uZ2JEYXRlQWRhcHRlci50b01vZGVsKG5ld1NlbGVjdGVkRGF0ZSkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBoYW5kbGluZyBmb2N1cyBjaGFuZ2Vcblx0XHRcdGlmIChpc0NoYW5nZWREYXRlKG5ld0ZvY3VzZWREYXRlLCBvbGRGb2N1c2VkRGF0ZSkgJiYgb2xkRm9jdXNlZERhdGUgJiYgbW9kZWwuZm9jdXNWaXNpYmxlKSB7XG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdH1cblxuXHRcdFx0Y2QubWFya0ZvckNoZWNrKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogIFJldHVybnMgdGhlIHJlYWRvbmx5IHB1YmxpYyBzdGF0ZSBvZiB0aGUgZGF0ZXBpY2tlclxuXHQgKlxuXHQgKiBAc2luY2UgNS4yLjBcblx0ICovXG5cdGdldCBzdGF0ZSgpOiBOZ2JEYXRlcGlja2VyU3RhdGUge1xuXHRcdHJldHVybiB0aGlzLl9wdWJsaWNTdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAgUmV0dXJucyB0aGUgY2FsZW5kYXIgc2VydmljZSB1c2VkIGluIHRoZSBzcGVjaWZpYyBkYXRlcGlja2VyIGluc3RhbmNlLlxuXHQgKlxuXHQgKiAgQHNpbmNlIDUuMy4wXG5cdCAqL1xuXHRnZXQgY2FsZW5kYXIoKTogTmdiQ2FsZW5kYXIge1xuXHRcdHJldHVybiB0aGlzLl9jYWxlbmRhcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBpMThuIHNlcnZpY2UgdXNlZCBpbiB0aGUgc3BlY2lmaWMgZGF0ZXBpY2tlciBpbnN0YW5jZS5cblx0ICpcblx0ICogQHNpbmNlIDE0LjIuMFxuXHQgKi9cblx0Z2V0IGkxOG4oKTogTmdiRGF0ZXBpY2tlckkxOG4ge1xuXHRcdHJldHVybiB0aGlzLl9pMThuO1xuXHR9XG5cblx0LyoqXG5cdCAqICBGb2N1c2VzIG9uIGdpdmVuIGRhdGUuXG5cdCAqL1xuXHRmb2N1c0RhdGUoZGF0ZT86IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogdm9pZCB7XG5cdFx0dGhpcy5fc2VydmljZS5mb2N1cyhOZ2JEYXRlLmZyb20oZGF0ZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqICBTZWxlY3RzIGZvY3VzZWQgZGF0ZS5cblx0ICovXG5cdGZvY3VzU2VsZWN0KCk6IHZvaWQge1xuXHRcdHRoaXMuX3NlcnZpY2UuZm9jdXNTZWxlY3QoKTtcblx0fVxuXG5cdGZvY3VzKCkge1xuXHRcdHRoaXMuX25nWm9uZS5vblN0YWJsZVxuXHRcdFx0LmFzT2JzZXJ2YWJsZSgpXG5cdFx0XHQucGlwZSh0YWtlKDEpKVxuXHRcdFx0LnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnRUb0ZvY3VzID1cblx0XHRcdFx0XHR0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJ2Rpdi5uZ2ItZHAtZGF5W3RhYmluZGV4PVwiMFwiXScpO1xuXHRcdFx0XHRpZiAoZWxlbWVudFRvRm9jdXMpIHtcblx0XHRcdFx0XHRlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBOYXZpZ2F0ZXMgdG8gdGhlIHByb3ZpZGVkIGRhdGUuXG5cdCAqXG5cdCAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG5cdCAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkIGNhbGVuZGFyIHdpbGwgb3BlbiBjdXJyZW50IG1vbnRoLlxuXHQgKlxuXHQgKiBVc2UgdGhlIGBbc3RhcnREYXRlXWAgaW5wdXQgYXMgYW4gYWx0ZXJuYXRpdmUuXG5cdCAqL1xuXHRuYXZpZ2F0ZVRvKGRhdGU/OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5PzogbnVtYmVyIH0pIHtcblx0XHR0aGlzLl9zZXJ2aWNlLm9wZW4oTmdiRGF0ZS5mcm9tKGRhdGUgPyAoZGF0ZS5kYXkgPyAoZGF0ZSBhcyBOZ2JEYXRlU3RydWN0KSA6IHsgLi4uZGF0ZSwgZGF5OiAxIH0pIDogbnVsbCkpO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRjb25zdCBmb2N1c0lucyQgPSBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4odGhpcy5fY29udGVudEVsLm5hdGl2ZUVsZW1lbnQsICdmb2N1c2luJyk7XG5cdFx0XHRjb25zdCBmb2N1c091dHMkID0gZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KHRoaXMuX2NvbnRlbnRFbC5uYXRpdmVFbGVtZW50LCAnZm9jdXNvdXQnKTtcblx0XHRcdGNvbnN0IHsgbmF0aXZlRWxlbWVudCB9ID0gdGhpcy5fZWxlbWVudFJlZjtcblxuXHRcdFx0Ly8gd2UncmUgY2hhbmdpbmcgJ2ZvY3VzVmlzaWJsZScgb25seSB3aGVuIGVudGVyaW5nIG9yIGxlYXZpbmcgbW9udGhzIHZpZXdcblx0XHRcdC8vIGFuZCBpZ25vcmluZyBhbGwgZm9jdXMgZXZlbnRzIHdoZXJlIGJvdGggJ3RhcmdldCcgYW5kICdyZWxhdGVkJyB0YXJnZXQgYXJlIGRheSBjZWxsc1xuXHRcdFx0bWVyZ2UoZm9jdXNJbnMkLCBmb2N1c091dHMkKVxuXHRcdFx0XHQucGlwZShcblx0XHRcdFx0XHRmaWx0ZXIoKGZvY3VzRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldCA9IGZvY3VzRXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblx0XHRcdFx0XHRcdGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSBmb2N1c0V2ZW50LnJlbGF0ZWRUYXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gIShcblx0XHRcdFx0XHRcdFx0dGFyZ2V0Py5jbGFzc0xpc3QuY29udGFpbnMoJ25nYi1kcC1kYXknKSAmJlxuXHRcdFx0XHRcdFx0XHRyZWxhdGVkVGFyZ2V0Py5jbGFzc0xpc3QuY29udGFpbnMoJ25nYi1kcC1kYXknKSAmJlxuXHRcdFx0XHRcdFx0XHRuYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkgJiZcblx0XHRcdFx0XHRcdFx0bmF0aXZlRWxlbWVudC5jb250YWlucyhyZWxhdGVkVGFyZ2V0KVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHR0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCksXG5cdFx0XHRcdClcblx0XHRcdFx0LnN1YnNjcmliZSgoeyB0eXBlIH0pID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5fc2VydmljZS5zZXQoeyBmb2N1c1Zpc2libGU6IHR5cGUgPT09ICdmb2N1c2luJyB9KSkpO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG5cdFx0XHRbXG5cdFx0XHRcdCdkYXlUZW1wbGF0ZURhdGEnLFxuXHRcdFx0XHQnZGlzcGxheU1vbnRocycsXG5cdFx0XHRcdCdtYXJrRGlzYWJsZWQnLFxuXHRcdFx0XHQnZmlyc3REYXlPZldlZWsnLFxuXHRcdFx0XHQnbmF2aWdhdGlvbicsXG5cdFx0XHRcdCdtaW5EYXRlJyxcblx0XHRcdFx0J21heERhdGUnLFxuXHRcdFx0XHQnb3V0c2lkZURheXMnLFxuXHRcdFx0XHQnd2Vla2RheXMnLFxuXHRcdFx0XS5mb3JFYWNoKChuYW1lKSA9PiAoaW5wdXRzW25hbWVdID0gdGhpc1tuYW1lXSkpO1xuXHRcdFx0dGhpcy5fc2VydmljZS5zZXQoaW5wdXRzKTtcblxuXHRcdFx0dGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmRheVRlbXBsYXRlKSB7XG5cdFx0XHR0aGlzLmRheVRlbXBsYXRlID0gdGhpcy5fZGVmYXVsdERheVRlbXBsYXRlO1xuXHRcdH1cblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG5cdFx0W1xuXHRcdFx0J2RheVRlbXBsYXRlRGF0YScsXG5cdFx0XHQnZGlzcGxheU1vbnRocycsXG5cdFx0XHQnbWFya0Rpc2FibGVkJyxcblx0XHRcdCdmaXJzdERheU9mV2VlaycsXG5cdFx0XHQnbmF2aWdhdGlvbicsXG5cdFx0XHQnbWluRGF0ZScsXG5cdFx0XHQnbWF4RGF0ZScsXG5cdFx0XHQnb3V0c2lkZURheXMnLFxuXHRcdFx0J3dlZWtkYXlzJyxcblx0XHRdXG5cdFx0XHQuZmlsdGVyKChuYW1lKSA9PiBuYW1lIGluIGNoYW5nZXMpXG5cdFx0XHQuZm9yRWFjaCgobmFtZSkgPT4gKGlucHV0c1tuYW1lXSA9IHRoaXNbbmFtZV0pKTtcblx0XHR0aGlzLl9zZXJ2aWNlLnNldChpbnB1dHMpO1xuXG5cdFx0aWYgKCdzdGFydERhdGUnIGluIGNoYW5nZXMpIHtcblx0XHRcdGNvbnN0IHsgY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlIH0gPSBjaGFuZ2VzLnN0YXJ0RGF0ZTtcblx0XHRcdGlmIChpc0NoYW5nZWRNb250aChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpKSB7XG5cdFx0XHRcdHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25EYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHtcblx0XHR0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xuXHRcdHRoaXMuX3NlcnZpY2Uuc2VsZWN0KGRhdGUsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuXHR9XG5cblx0b25OYXZpZ2F0ZURhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkge1xuXHRcdHRoaXMuX3NlcnZpY2Uub3BlbihkYXRlKTtcblx0fVxuXG5cdG9uTmF2aWdhdGVFdmVudChldmVudDogTmF2aWdhdGlvbkV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudCkge1xuXHRcdFx0Y2FzZSBOYXZpZ2F0aW9uRXZlbnQuUFJFVjpcblx0XHRcdFx0dGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldFByZXYodGhpcy5tb2RlbC5maXJzdERhdGUhLCAnbScsIDEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIE5hdmlnYXRpb25FdmVudC5ORVhUOlxuXHRcdFx0XHR0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0TmV4dCh0aGlzLm1vZGVsLmZpcnN0RGF0ZSEsICdtJywgMSkpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRyZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7XG5cdFx0dGhpcy5vbkNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQge1xuXHRcdHRoaXMub25Ub3VjaGVkID0gZm47XG5cdH1cblxuXHRzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fc2VydmljZS5zZXQoeyBkaXNhYmxlZCB9KTtcblx0fVxuXG5cdHdyaXRlVmFsdWUodmFsdWUpIHtcblx0XHR0aGlzLl9jb250cm9sVmFsdWUgPSBOZ2JEYXRlLmZyb20odGhpcy5fbmdiRGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XG5cdFx0dGhpcy5fc2VydmljZS5zZWxlY3QodGhpcy5fY29udHJvbFZhbHVlKTtcblx0fVxufVxuIl19