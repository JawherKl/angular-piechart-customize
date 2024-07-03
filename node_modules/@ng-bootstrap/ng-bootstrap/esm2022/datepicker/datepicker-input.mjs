import { Directive, EventEmitter, forwardRef, Inject, Input, Output, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { ngbAutoClose } from '../util/autoclose';
import { ngbFocusTrap } from '../util/focus-trap';
import { ngbPositioning } from '../util/positioning';
import { NgbDatepicker } from './datepicker';
import { NgbDate } from './ngb-date';
import { NgbInputDatepickerConfig } from './datepicker-input-config';
import { NgbDatepickerConfig } from './datepicker-config';
import { isString } from '../util/util';
import { Subject } from 'rxjs';
import { addPopperOffset } from '../util/positioning-util';
import * as i0 from "@angular/core";
import * as i1 from "./ngb-date-parser-formatter";
import * as i2 from "./ngb-calendar";
import * as i3 from "./adapters/ngb-date-adapter";
import * as i4 from "./datepicker-input-config";
/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
class NgbInputDatepicker {
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this._cRef.instance.setDisabledState(this._disabled);
        }
    }
    constructor(_parserFormatter, _elRef, _vcRef, _renderer, _ngZone, _calendar, _dateAdapter, _document, _changeDetector, config) {
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._document = _document;
        this._changeDetector = _changeDetector;
        this._cRef = null;
        this._disabled = false;
        this._elWithFocus = null;
        this._model = null;
        this._destroyCloseHandlers$ = new Subject();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * Event emitted right after the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired after closing datepicker window.
         *
         * @since 4.2.0
         */
        this.closed = new EventEmitter();
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this._validatorChange = () => { };
        ['autoClose', 'container', 'positionTarget', 'placement', 'popperOptions'].forEach((input) => (this[input] = config[input]));
        this._positioning = ngbPositioning();
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    registerOnValidatorChange(fn) {
        this._validatorChange = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    validate(c) {
        const { value } = c;
        if (value != null) {
            const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
            if (!ngbDate) {
                return { ngbDate: { invalid: value } };
            }
            if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
                return { ngbDate: { minDate: { minDate: this.minDate, actual: value } } };
            }
            if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
                return { ngbDate: { maxDate: { maxDate: this.maxDate, actual: value } } };
            }
        }
        return null;
    }
    writeValue(value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    }
    manualDateChange(value, updateView = false) {
        const inputValueChanged = value !== this._inputValue;
        if (inputValueChanged) {
            this._inputValue = value;
            this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        }
        if (inputValueChanged || !updateView) {
            this._onChange(this._model ? this._dateAdapter.toModel(this._model) : value === '' ? null : value);
        }
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    }
    isOpen() {
        return !!this._cRef;
    }
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     */
    open() {
        if (!this.isOpen()) {
            this._cRef = this._vcRef.createComponent(NgbDatepicker);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange((selectedDate) => {
                this.writeValue(selectedDate);
                this._onChange(selectedDate);
                this._onTouched();
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            this._elWithFocus = this._document.activeElement;
            ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
            setTimeout(() => this._cRef?.instance.focus());
            let hostElement;
            if (isString(this.positionTarget)) {
                hostElement = this._document.querySelector(this.positionTarget);
            }
            else if (this.positionTarget instanceof HTMLElement) {
                hostElement = this.positionTarget;
            }
            else {
                hostElement = this._elRef.nativeElement;
            }
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                if (this._cRef) {
                    this._positioning.createPopper({
                        hostElement,
                        targetElement: this._cRef.location.nativeElement,
                        placement: this.placement,
                        appendToBody: this.container === 'body',
                        updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                    });
                    this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positioning.update());
                }
            });
            if (this.positionTarget && !hostElement) {
                throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
            }
            this._setCloseHandlers();
        }
    }
    /**
     * Closes the datepicker popup.
     */
    close() {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
            this._positioning.destroy();
            this._zoneSubscription?.unsubscribe();
            this._destroyCloseHandlers$.next();
            this.closed.emit();
            this._changeDetector.markForCheck();
            // restore focus
            let elementToFocus = this._elWithFocus;
            if (isString(this.restoreFocus)) {
                elementToFocus = this._document.querySelector(this.restoreFocus);
            }
            else if (this.restoreFocus !== undefined) {
                elementToFocus = this.restoreFocus;
            }
            // in IE document.activeElement can contain an object without 'focus()' sometimes
            if (elementToFocus && elementToFocus['focus']) {
                elementToFocus.focus();
            }
            else {
                this._document.body.focus();
            }
        }
    }
    /**
     * Toggles the datepicker popup.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
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
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    }
    onBlur() {
        this._onTouched();
    }
    onFocus() {
        this._elWithFocus = this._elRef.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
            if (this.isOpen()) {
                if (changes['minDate']) {
                    this._cRef.instance.minDate = this.minDate;
                }
                if (changes['maxDate']) {
                    this._cRef.instance.maxDate = this.maxDate;
                }
                this._cRef.instance.ngOnChanges(changes);
            }
        }
        if (changes['datepickerClass']) {
            const { currentValue, previousValue } = changes['datepickerClass'];
            this._applyPopupClass(currentValue, previousValue);
        }
        if (changes['autoClose'] && this.isOpen()) {
            this._setCloseHandlers();
        }
    }
    ngOnDestroy() {
        this.close();
    }
    _applyDatepickerInputs(datepickerComponentRef) {
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
            'showNavigation',
            'showWeekNumbers',
            'weekdays',
        ].forEach((inputName) => {
            if (this[inputName] !== undefined) {
                datepickerComponentRef.setInput(inputName, this[inputName]);
            }
        });
        datepickerComponentRef.setInput('startDate', this.startDate || this._model);
    }
    _applyPopupClass(newClass, oldClass) {
        const popupEl = this._cRef?.location.nativeElement;
        if (popupEl) {
            if (newClass) {
                this._renderer.addClass(popupEl, newClass);
            }
            if (oldClass) {
                this._renderer.removeClass(popupEl, oldClass);
            }
        }
    }
    _applyPopupStyling(nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.addClass(nativeElement, 'show');
        if (this.container === 'body') {
            this._renderer.addClass(nativeElement, 'ngb-dp-body');
        }
        this._applyPopupClass(this.datepickerClass);
    }
    _subscribeForDatepickerOutputs(datepickerInstance) {
        datepickerInstance.navigate.subscribe((navigateEvent) => this.navigate.emit(navigateEvent));
        datepickerInstance.dateSelect.subscribe((date) => {
            this.dateSelect.emit(date);
            if (this.autoClose === true || this.autoClose === 'inside') {
                this.close();
            }
        });
    }
    _writeModelValue(model) {
        const value = this._parserFormatter.format(model);
        this._inputValue = value;
        this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    }
    _fromDateStruct(date) {
        const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    }
    _setCloseHandlers() {
        this._destroyCloseHandlers$.next();
        ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this._destroyCloseHandlers$, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbInputDatepicker, deps: [{ token: i1.NgbDateParserFormatter }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i2.NgbCalendar }, { token: i3.NgbDateAdapter }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i4.NgbInputDatepickerConfig }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbInputDatepicker, isStandalone: true, selector: "input[ngbDatepicker]", inputs: { autoClose: "autoClose", contentTemplate: "contentTemplate", datepickerClass: "datepickerClass", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", minDate: "minDate", maxDate: "maxDate", navigation: "navigation", outsideDays: "outsideDays", placement: "placement", popperOptions: "popperOptions", restoreFocus: "restoreFocus", showWeekNumbers: "showWeekNumbers", startDate: "startDate", container: "container", positionTarget: "positionTarget", weekdays: "weekdays", disabled: "disabled" }, outputs: { dateSelect: "dateSelect", navigate: "navigate", closed: "closed" }, host: { listeners: { "input": "manualDateChange($event.target.value)", "change": "manualDateChange($event.target.value, true)", "focus": "onFocus()", "blur": "onBlur()" }, properties: { "disabled": "disabled" } }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
            { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig },
        ], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0 }); }
}
export { NgbInputDatepicker };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbInputDatepicker, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbDatepicker]',
                    exportAs: 'ngbDatepicker',
                    standalone: true,
                    host: {
                        '(input)': 'manualDateChange($event.target.value)',
                        '(change)': 'manualDateChange($event.target.value, true)',
                        '(focus)': 'onFocus()',
                        '(blur)': 'onBlur()',
                        '[disabled]': 'disabled',
                    },
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbDateParserFormatter }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i2.NgbCalendar }, { type: i3.NgbDateAdapter }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i4.NgbInputDatepickerConfig }]; }, propDecorators: { autoClose: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], datepickerClass: [{
                type: Input
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
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], restoreFocus: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], container: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], dateSelect: [{
                type: Output
            }], navigate: [{
                type: Output
            }], closed: [{
                type: Output
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdOLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBSUwsTUFBTSxHQUtOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQW9CLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUdOLGFBQWEsRUFDYixpQkFBaUIsR0FHakIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxjQUFjLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFJckUsT0FBTyxFQUFFLGFBQWEsRUFBOEIsTUFBTSxjQUFjLENBQUM7QUFHekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUdyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFHM0Q7Ozs7R0FJRztBQUNILE1BaUJhLGtCQUFrQjtJQTJOOUIsSUFDSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFVO1FBQ3RCLElBQUksQ0FBQyxTQUFT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c0JBQXRCLEtBQUs7Z0JBT0csY0FBYztzQkFBdEIsS0FBSztnQkFTRyxZQUFZO3NCQUFwQixLQUFLO2dCQU9HLE9BQU87c0JBQWYsS0FBSztnQkFPRyxPQUFPO3NCQUFmLEtBQUs7Z0JBU0csVUFBVTtzQkFBbEIsS0FBSztnQkFXRyxXQUFXO3NCQUFuQixLQUFLO2dCQVNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBUUcsYUFBYTtzQkFBckIsS0FBSztnQkFVRyxZQUFZO3NCQUFwQixLQUFLO2dCQUtHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBVUcsU0FBUztzQkFBakIsS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQVNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBV0csUUFBUTtzQkFBaEIsS0FBSztnQkFTSSxVQUFVO3NCQUFuQixNQUFNO2dCQU9HLFFBQVE7c0JBQWpCLE1BQU07Z0JBT0csTUFBTTtzQkFBZixNQUFNO2dCQUdILFFBQVE7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRDb21wb25lbnRSZWYsXG5cdERpcmVjdGl2ZSxcblx0RWxlbWVudFJlZixcblx0RXZlbnRFbWl0dGVyLFxuXHRmb3J3YXJkUmVmLFxuXHRJbmplY3QsXG5cdElucHV0LFxuXHROZ1pvbmUsXG5cdE9uQ2hhbmdlcyxcblx0T25EZXN0cm95LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyMixcblx0U2ltcGxlQ2hhbmdlcyxcblx0VGVtcGxhdGVSZWYsXG5cdFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIFRyYW5zbGF0aW9uV2lkdGggfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcblx0QWJzdHJhY3RDb250cm9sLFxuXHRDb250cm9sVmFsdWVBY2Nlc3Nvcixcblx0TkdfVkFMSURBVE9SUyxcblx0TkdfVkFMVUVfQUNDRVNTT1IsXG5cdFZhbGlkYXRpb25FcnJvcnMsXG5cdFZhbGlkYXRvcixcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBuZ2JBdXRvQ2xvc2UgfSBmcm9tICcuLi91dGlsL2F1dG9jbG9zZSc7XG5pbXBvcnQgeyBuZ2JGb2N1c1RyYXAgfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHsgbmdiUG9zaXRpb25pbmcsIFBsYWNlbWVudEFycmF5IH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ2JEYXRlQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XG5pbXBvcnQgeyBOZ2JEYXRlcGlja2VyLCBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBEYXlUZW1wbGF0ZUNvbnRleHQgfSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHsgTmdiQ2FsZW5kYXIgfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQgeyBOZ2JEYXRlIH0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQgeyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIH0gZnJvbSAnLi9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyJztcbmltcG9ydCB7IE5nYkRhdGVTdHJ1Y3QgfSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQgeyBOZ2JJbnB1dERhdGVwaWNrZXJDb25maWcgfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQtY29uZmlnJztcbmltcG9ydCB7IE5nYkRhdGVwaWNrZXJDb25maWcgfSBmcm9tICcuL2RhdGVwaWNrZXItY29uZmlnJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGFkZFBvcHBlck9mZnNldCB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmctdXRpbCc7XG5pbXBvcnQgeyBDb250ZW50VGVtcGxhdGVDb250ZXh0IH0gZnJvbSAnLi9kYXRlcGlja2VyLWNvbnRlbnQtdGVtcGxhdGUtY29udGV4dCc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBhbGxvd3MgdG8gc3RpY2sgYSBkYXRlcGlja2VyIHBvcHVwIHRvIGFuIGlucHV0IGZpZWxkLlxuICpcbiAqIE1hbmFnZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgaW5wdXQgZmllbGQgaXRzZWxmLCBkb2VzIHZhbHVlIGZvcm1hdHRpbmcgYW5kIHByb3ZpZGVzIGZvcm1zIGludGVncmF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdpbnB1dFtuZ2JEYXRlcGlja2VyXScsXG5cdGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGhvc3Q6IHtcblx0XHQnKGlucHV0KSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJyxcblx0XHQnKGNoYW5nZSknOiAnbWFudWFsRGF0ZUNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlLCB0cnVlKScsXG5cdFx0Jyhmb2N1cyknOiAnb25Gb2N1cygpJyxcblx0XHQnKGJsdXIpJzogJ29uQmx1cigpJyxcblx0XHQnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG5cdH0sXG5cdHByb3ZpZGVyczogW1xuXHRcdHsgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYklucHV0RGF0ZXBpY2tlciksIG11bHRpOiB0cnVlIH0sXG5cdFx0eyBwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLCBtdWx0aTogdHJ1ZSB9LFxuXHRcdHsgcHJvdmlkZTogTmdiRGF0ZXBpY2tlckNvbmZpZywgdXNlRXhpc3Rpbmc6IE5nYklucHV0RGF0ZXBpY2tlckNvbmZpZyB9LFxuXHRdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JJbnB1dERhdGVwaWNrZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cdHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hdXRvQ2xvc2U6IGJvb2xlYW4gfCBzdHJpbmc7XG5cdHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogYm9vbGVhbiB8ICcnO1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbmF2aWdhdGlvbjogc3RyaW5nO1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3V0c2lkZURheXM6IHN0cmluZztcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3dlZWtkYXlzOiBib29sZWFuIHwgbnVtYmVyO1xuXG5cdHByaXZhdGUgX2NSZWY6IENvbXBvbmVudFJlZjxOZ2JEYXRlcGlja2VyPiB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXHRwcml2YXRlIF9lbFdpdGhGb2N1czogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblx0cHJpdmF0ZSBfbW9kZWw6IE5nYkRhdGUgfCBudWxsID0gbnVsbDtcblx0cHJpdmF0ZSBfaW5wdXRWYWx1ZTogc3RyaW5nO1xuXHRwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XG5cdHByaXZhdGUgX3Bvc2l0aW9uaW5nOiBSZXR1cm5UeXBlPHR5cGVvZiBuZ2JQb3NpdGlvbmluZz47XG5cdHByaXZhdGUgX2Rlc3Ryb3lDbG9zZUhhbmRsZXJzJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBkYXRlcGlja2VyIHBvcHVwIHNob3VsZCBiZSBjbG9zZWQgYXV0b21hdGljYWxseSBhZnRlciBkYXRlIHNlbGVjdGlvbiAvIG91dHNpZGUgY2xpY2sgb3Igbm90LlxuXHQgKlxuXHQgKiAqIGB0cnVlYCAtIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9uIGJvdGggZGF0ZSBzZWxlY3Rpb24gYW5kIG91dHNpZGUgY2xpY2suXG5cdCAqICogYGZhbHNlYCAtIHRoZSBwb3B1cCBjYW4gb25seSBiZSBjbG9zZWQgbWFudWFsbHkgdmlhIGBjbG9zZSgpYCBvciBgdG9nZ2xlKClgIG1ldGhvZHMuXG5cdCAqICogYFwiaW5zaWRlXCJgIC0gdGhlIHBvcHVwIHdpbGwgY2xvc2Ugb24gZGF0ZSBzZWxlY3Rpb24sIGJ1dCBub3Qgb3V0c2lkZSBjbGlja3MuXG5cdCAqICogYFwib3V0c2lkZVwiYCAtIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2sgYW5kIG5vdCBvbiBkYXRlIHNlbGVjdGlvbi9pbnNpZGUgY2xpY2tzLlxuXHQgKlxuXHQgKiBAc2luY2UgMy4wLjBcblx0ICovXG5cdEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xuXG5cdC8qKlxuXHQgKiBUaGUgcmVmZXJlbmNlIHRvIGEgY3VzdG9tIGNvbnRlbnQgdGVtcGxhdGUuXG5cdCAqXG5cdCAqIEFsbG93cyB0byBjb21wbGV0ZWx5IG92ZXJyaWRlIHRoZSB3YXkgZGF0ZXBpY2tlci5cblx0ICpcblx0ICogU2VlIFtgTmdiRGF0ZXBpY2tlckNvbnRlbnRgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjTmdiRGF0ZXBpY2tlckNvbnRlbnQpIGZvciBtb3JlIGRldGFpbHMuXG5cdCAqXG5cdCAqIEBzaW5jZSAxNC4yLjBcblx0ICovXG5cdEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8Q29udGVudFRlbXBsYXRlQ29udGV4dD47XG5cblx0LyoqXG5cdCAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gdGhlIGRhdGVwaWNrZXIgcG9wdXAgZWxlbWVudC5cblx0ICpcblx0ICogQHNpbmNlIDkuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBkYXRlcGlja2VyQ2xhc3M6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHJlZmVyZW5jZSB0byBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheS5cblx0ICpcblx0ICogQWxsb3dzIHRvIGNvbXBsZXRlbHkgb3ZlcnJpZGUgdGhlIHdheSBhIGRheSAnY2VsbCcgaW4gdGhlIGNhbGVuZGFyIGlzIGRpc3BsYXllZC5cblx0ICpcblx0ICogU2VlIFtgRGF5VGVtcGxhdGVDb250ZXh0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI0RheVRlbXBsYXRlQ29udGV4dCkgZm9yIHRoZSBkYXRhIHlvdSBnZXQgaW5zaWRlLlxuXHQgKi9cblx0QElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cblx0LyoqXG5cdCAqIFRoZSBjYWxsYmFjayB0byBwYXNzIGFueSBhcmJpdHJhcnkgZGF0YSB0byB0aGUgdGVtcGxhdGUgY2VsbCB2aWEgdGhlXG5cdCAqIFtgRGF5VGVtcGxhdGVDb250ZXh0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI0RheVRlbXBsYXRlQ29udGV4dCkncyBgZGF0YWAgcGFyYW1ldGVyLlxuXHQgKlxuXHQgKiBgY3VycmVudGAgaXMgdGhlIG1vbnRoIHRoYXQgaXMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlci5cblx0ICpcblx0ICogQHNpbmNlIDMuMy4wXG5cdCAqL1xuXHRASW5wdXQoKSBkYXlUZW1wbGF0ZURhdGE6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50PzogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXIgfSkgPT4gYW55O1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIG1vbnRocyB0byBkaXNwbGF5LlxuXHQgKi9cblx0QElucHV0KCkgZGlzcGxheU1vbnRoczogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuXHQgKlxuXHQgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuLlxuXHQgKi9cblx0QElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHJlZmVyZW5jZSB0byB0aGUgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZGF0ZXBpY2tlciBmb290ZXIuXG5cdCAqXG5cdCAqIEBzaW5jZSAzLjMuMFxuXHQgKi9cblx0QElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblx0LyoqXG5cdCAqIFRoZSBjYWxsYmFjayB0byBtYXJrIHNvbWUgZGF0ZXMgYXMgZGlzYWJsZWQuXG5cdCAqXG5cdCAqIEl0IGlzIGNhbGxlZCBmb3IgZWFjaCBuZXcgZGF0ZSB3aGVuIG5hdmlnYXRpbmcgdG8gYSBkaWZmZXJlbnQgbW9udGguXG5cdCAqXG5cdCAqIGBjdXJyZW50YCBpcyB0aGUgbW9udGggdGhhdCBpcyBjdXJyZW50bHkgZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyLlxuXHQgKi9cblx0QElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudD86IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyIH0pID0+IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBlYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZC4gQWxzbyB1c2VkIGZvciBmb3JtIHZhbGlkYXRpb24uXG5cdCAqXG5cdCAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGJlZm9yZSB0aGUgY3VycmVudCBtb250aC5cblx0ICovXG5cdEBJbnB1dCgpIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWQuIEFsc28gdXNlZCBmb3IgZm9ybSB2YWxpZGF0aW9uLlxuXHQgKlxuXHQgKiBJZiBub3QgcHJvdmlkZWQsICd5ZWFyJyBzZWxlY3QgYm94IHdpbGwgZGlzcGxheSAxMCB5ZWFycyBhZnRlciB0aGUgY3VycmVudCBtb250aC5cblx0ICovXG5cdEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cblx0LyoqXG5cdCAqIE5hdmlnYXRpb24gdHlwZS5cblx0ICpcblx0ICogKiBgXCJzZWxlY3RcImAgLSBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCBuYXZpZ2F0aW9uIGFycm93c1xuXHQgKiAqIGBcImFycm93c1wiYCAtIG9ubHkgbmF2aWdhdGlvbiBhcnJvd3Ncblx0ICogKiBgXCJub25lXCJgIC0gbm8gbmF2aWdhdGlvbiB2aXNpYmxlIGF0IGFsbFxuXHQgKi9cblx0QElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuXHQvKipcblx0ICogVGhlIHdheSBvZiBkaXNwbGF5aW5nIGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgbW9udGguXG5cdCAqXG5cdCAqICogYFwidmlzaWJsZVwiYCAtIGRheXMgYXJlIHZpc2libGVcblx0ICogKiBgXCJoaWRkZW5cImAgLSBkYXlzIGFyZSBoaWRkZW4sIHdoaXRlIHNwYWNlIHByZXNlcnZlZFxuXHQgKiAqIGBcImNvbGxhcHNlZFwiYCAtIGRheXMgYXJlIGNvbGxhcHNlZCwgc28gdGhlIGRhdGVwaWNrZXIgaGVpZ2h0IG1pZ2h0IGNoYW5nZSBiZXR3ZWVuIG1vbnRoc1xuXHQgKlxuXHQgKiBGb3IgdGhlIDIrIG1vbnRocyB2aWV3LCBkYXlzIGluIGJldHdlZW4gbW9udGhzIGFyZSBuZXZlciBzaG93bi5cblx0ICovXG5cdEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xuXG5cdC8qKlxuXHQgKiBUaGUgcHJlZmVycmVkIHBsYWNlbWVudCBvZiB0aGUgZGF0ZXBpY2tlciBwb3B1cCwgYW1vbmcgdGhlIFtwb3NzaWJsZSB2YWx1ZXNdKCMvZ3VpZGVzL3Bvc2l0aW9uaW5nI2FwaSkuXG5cdCAqXG5cdCAqIFRoZSBkZWZhdWx0IG9yZGVyIG9mIHByZWZlcmVuY2UgaXMgYFwiYm90dG9tLXN0YXJ0IGJvdHRvbS1lbmQgdG9wLXN0YXJ0IHRvcC1lbmRcImBcblx0ICpcblx0ICogUGxlYXNlIHNlZSB0aGUgW3Bvc2l0aW9uaW5nIG92ZXJ2aWV3XSgjL3Bvc2l0aW9uaW5nKSBmb3IgbW9yZSBkZXRhaWxzLlxuXHQgKi9cblx0QElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuXHQvKipcblx0ICogQWxsb3dzIHRvIGNoYW5nZSBkZWZhdWx0IFBvcHBlciBvcHRpb25zIHdoZW4gcG9zaXRpb25pbmcgdGhlIHBvcHVwLlxuXHQgKiBSZWNlaXZlcyBjdXJyZW50IHBvcHBlciBvcHRpb25zIGFuZCByZXR1cm5zIG1vZGlmaWVkIG9uZXMuXG5cdCAqXG5cdCAqIEBzaW5jZSAxMy4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvcHBlck9wdGlvbnM6IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+KSA9PiBQYXJ0aWFsPE9wdGlvbnM+O1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHdoZW4gY2xvc2luZyBkYXRlcGlja2VyIHdpbGwgZm9jdXMgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSBkYXRlcGlja2VyIHdhcyBvcGVuZWQuXG5cdCAqXG5cdCAqIEFsdGVybmF0aXZlbHkgeW91IGNvdWxkIHByb3ZpZGUgYSBzZWxlY3RvciBvciBhbiBgSFRNTEVsZW1lbnRgIHRvIGZvY3VzLiBJZiB0aGUgZWxlbWVudCBkb2Vzbid0IGV4aXN0IG9yIGludmFsaWQsXG5cdCAqIHdlJ2xsIGZhbGxiYWNrIHRvIGZvY3VzIGRvY3VtZW50IGJvZHkuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjIuMFxuXHQgKi9cblx0QElucHV0KCkgcmVzdG9yZUZvY3VzOiB0cnVlIHwgc3RyaW5nIHwgSFRNTEVsZW1lbnQ7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgd2VlayBudW1iZXJzIHdpbGwgYmUgZGlzcGxheWVkLlxuXHQgKi9cblx0QElucHV0KCkgc2hvd1dlZWtOdW1iZXJzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgZGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXG5cdCAqXG5cdCAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG5cdCAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIGlzIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxuXHQgKlxuXHQgKiBZb3UgY291bGQgdXNlIGBuYXZpZ2F0ZVRvKGRhdGUpYCBtZXRob2QgYXMgYW4gYWx0ZXJuYXRpdmUuXG5cdCAqL1xuXHRASW5wdXQoKSBzdGFydERhdGU6IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk/OiBudW1iZXIgfTtcblxuXHQvKipcblx0ICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBkYXRlcGlja2VyIHBvcHVwIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cblx0ICpcblx0ICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYFwiYm9keVwiYC5cblx0ICovXG5cdEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBIGNzcyBzZWxlY3RvciBvciBodG1sIGVsZW1lbnQgc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgZGF0ZXBpY2tlciBwb3B1cCBzaG91bGQgYmUgcG9zaXRpb25lZCBhZ2FpbnN0LlxuXHQgKlxuXHQgKiBCeSBkZWZhdWx0IHRoZSBpbnB1dCBpcyB1c2VkIGFzIGEgdGFyZ2V0LlxuXHQgKlxuXHQgKiBAc2luY2UgNC4yLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvc2l0aW9uVGFyZ2V0OiBzdHJpbmcgfCBIVE1MRWxlbWVudDtcblxuXHQvKipcblx0ICogVGhlIHdheSB3ZWVrZGF5cyBzaG91bGQgYmUgZGlzcGxheWVkLlxuXHQgKlxuXHQgKiAqIGB0cnVlYCAtIHdlZWtkYXlzIGFyZSBkaXNwbGF5ZWQgdXNpbmcgZGVmYXVsdCB3aWR0aFxuXHQgKiAqIGBmYWxzZWAgLSB3ZWVrZGF5cyBhcmUgbm90IGRpc3BsYXllZFxuXHQgKiAqIGBUcmFuc2xhdGlvbldpZHRoYCAtIHdlZWtkYXlzIGFyZSBkaXNwbGF5ZWQgdXNpbmcgc3BlY2lmaWVkIHdpZHRoXG5cdCAqXG5cdCAqIEBzaW5jZSA5LjEuMFxuXHQgKi9cblx0QElucHV0KCkgd2Vla2RheXM6IFRyYW5zbGF0aW9uV2lkdGggfCBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdXNlciBzZWxlY3RzIGEgZGF0ZSB1c2luZyBrZXlib2FyZCBvciBtb3VzZS5cblx0ICpcblx0ICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBgTmdiRGF0ZWAuXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjEuMVxuXHQgKi9cblx0QE91dHB1dCgpIGRhdGVTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cblx0LyoqXG5cdCAqIEV2ZW50IGVtaXR0ZWQgcmlnaHQgYWZ0ZXIgdGhlIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXG5cdCAqXG5cdCAqIFNlZSBbYE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50KSBmb3IgdGhlIHBheWxvYWQgaW5mby5cblx0ICovXG5cdEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGZpcmVkIGFmdGVyIGNsb3NpbmcgZGF0ZXBpY2tlciB3aW5kb3cuXG5cdCAqXG5cdCAqIEBzaW5jZSA0LjIuMFxuXHQgKi9cblx0QE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXHRASW5wdXQoKVxuXHRnZXQgZGlzYWJsZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuXHR9XG5cdHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG5cdFx0dGhpcy5fZGlzYWJsZWQgPSB2YWx1ZSA9PT0gJycgfHwgKHZhbHVlICYmIHZhbHVlICE9PSAnZmFsc2UnKTtcblxuXHRcdGlmICh0aGlzLmlzT3BlbigpKSB7XG5cdFx0XHR0aGlzLl9jUmVmIS5pbnN0YW5jZS5zZXREaXNhYmxlZFN0YXRlKHRoaXMuX2Rpc2FibGVkKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXHRwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblx0cHJpdmF0ZSBfdmFsaWRhdG9yQ2hhbmdlID0gKCkgPT4ge307XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfcGFyc2VyRm9ybWF0dGVyOiBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLFxuXHRcdHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuXHRcdHByaXZhdGUgX3ZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuXHRcdHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG5cdFx0cHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG5cdFx0cHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLFxuXHRcdHByaXZhdGUgX2RhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuXHRcdGNvbmZpZzogTmdiSW5wdXREYXRlcGlja2VyQ29uZmlnLFxuXHQpIHtcblx0XHRbJ2F1dG9DbG9zZScsICdjb250YWluZXInLCAncG9zaXRpb25UYXJnZXQnLCAncGxhY2VtZW50JywgJ3BvcHBlck9wdGlvbnMnXS5mb3JFYWNoKFxuXHRcdFx0KGlucHV0KSA9PiAodGhpc1tpbnB1dF0gPSBjb25maWdbaW5wdXRdKSxcblx0XHQpO1xuXHRcdHRoaXMuX3Bvc2l0aW9uaW5nID0gbmdiUG9zaXRpb25pbmcoKTtcblx0fVxuXG5cdHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLl9vbkNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQge1xuXHRcdHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuXHRcdHRoaXMuX3ZhbGlkYXRvckNoYW5nZSA9IGZuO1xuXHR9XG5cblx0c2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG5cdFx0dGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG5cdH1cblxuXHR2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gYztcblxuXHRcdGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRjb25zdCBuZ2JEYXRlID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fZGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XG5cblx0XHRcdGlmICghbmdiRGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4geyBuZ2JEYXRlOiB7IGludmFsaWQ6IHZhbHVlIH0gfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMubWluRGF0ZSAmJiBuZ2JEYXRlLmJlZm9yZShOZ2JEYXRlLmZyb20odGhpcy5taW5EYXRlKSkpIHtcblx0XHRcdFx0cmV0dXJuIHsgbmdiRGF0ZTogeyBtaW5EYXRlOiB7IG1pbkRhdGU6IHRoaXMubWluRGF0ZSwgYWN0dWFsOiB2YWx1ZSB9IH0gfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMubWF4RGF0ZSAmJiBuZ2JEYXRlLmFmdGVyKE5nYkRhdGUuZnJvbSh0aGlzLm1heERhdGUpKSkge1xuXHRcdFx0XHRyZXR1cm4geyBuZ2JEYXRlOiB7IG1heERhdGU6IHsgbWF4RGF0ZTogdGhpcy5tYXhEYXRlLCBhY3R1YWw6IHZhbHVlIH0gfSB9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0d3JpdGVWYWx1ZSh2YWx1ZSkge1xuXHRcdHRoaXMuX21vZGVsID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fZGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XG5cdFx0dGhpcy5fd3JpdGVNb2RlbFZhbHVlKHRoaXMuX21vZGVsKTtcblx0fVxuXG5cdG1hbnVhbERhdGVDaGFuZ2UodmFsdWU6IHN0cmluZywgdXBkYXRlVmlldyA9IGZhbHNlKSB7XG5cdFx0Y29uc3QgaW5wdXRWYWx1ZUNoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5faW5wdXRWYWx1ZTtcblx0XHRpZiAoaW5wdXRWYWx1ZUNoYW5nZWQpIHtcblx0XHRcdHRoaXMuX2lucHV0VmFsdWUgPSB2YWx1ZTtcblx0XHRcdHRoaXMuX21vZGVsID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fcGFyc2VyRm9ybWF0dGVyLnBhcnNlKHZhbHVlKSk7XG5cdFx0fVxuXHRcdGlmIChpbnB1dFZhbHVlQ2hhbmdlZCB8fCAhdXBkYXRlVmlldykge1xuXHRcdFx0dGhpcy5fb25DaGFuZ2UodGhpcy5fbW9kZWwgPyB0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSA6IHZhbHVlID09PSAnJyA/IG51bGwgOiB2YWx1ZSk7XG5cdFx0fVxuXHRcdGlmICh1cGRhdGVWaWV3ICYmIHRoaXMuX21vZGVsKSB7XG5cdFx0XHR0aGlzLl93cml0ZU1vZGVsVmFsdWUodGhpcy5fbW9kZWwpO1xuXHRcdH1cblx0fVxuXG5cdGlzT3BlbigpIHtcblx0XHRyZXR1cm4gISF0aGlzLl9jUmVmO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW5zIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxuXHQgKlxuXHQgKiBJZiB0aGUgcmVsYXRlZCBmb3JtIGNvbnRyb2wgY29udGFpbnMgYSB2YWxpZCBkYXRlLCB0aGUgY29ycmVzcG9uZGluZyBtb250aCB3aWxsIGJlIG9wZW5lZC5cblx0ICovXG5cdG9wZW4oKSB7XG5cdFx0aWYgKCF0aGlzLmlzT3BlbigpKSB7XG5cdFx0XHR0aGlzLl9jUmVmID0gdGhpcy5fdmNSZWYuY3JlYXRlQ29tcG9uZW50KE5nYkRhdGVwaWNrZXIpO1xuXG5cdFx0XHR0aGlzLl9hcHBseVBvcHVwU3R5bGluZyh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdFx0dGhpcy5fYXBwbHlEYXRlcGlja2VySW5wdXRzKHRoaXMuX2NSZWYpO1xuXHRcdFx0dGhpcy5fc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHModGhpcy5fY1JlZi5pbnN0YW5jZSk7XG5cdFx0XHR0aGlzLl9jUmVmLmluc3RhbmNlLm5nT25Jbml0KCk7XG5cdFx0XHR0aGlzLl9jUmVmLmluc3RhbmNlLndyaXRlVmFsdWUodGhpcy5fZGF0ZUFkYXB0ZXIudG9Nb2RlbCh0aGlzLl9tb2RlbCkpO1xuXG5cdFx0XHQvLyBkYXRlIHNlbGVjdGlvbiBldmVudCBoYW5kbGluZ1xuXHRcdFx0dGhpcy5fY1JlZi5pbnN0YW5jZS5yZWdpc3Rlck9uQ2hhbmdlKChzZWxlY3RlZERhdGUpID0+IHtcblx0XHRcdFx0dGhpcy53cml0ZVZhbHVlKHNlbGVjdGVkRGF0ZSk7XG5cdFx0XHRcdHRoaXMuX29uQ2hhbmdlKHNlbGVjdGVkRGF0ZSk7XG5cdFx0XHRcdHRoaXMuX29uVG91Y2hlZCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuX2NSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG5cdFx0XHR0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5kaXNhYmxlZCk7XG5cblx0XHRcdGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG5cdFx0XHRcdHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZvY3VzIGhhbmRsaW5nXG5cdFx0XHR0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0XHRuZ2JGb2N1c1RyYXAodGhpcy5fbmdab25lLCB0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMuY2xvc2VkLCB0cnVlKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fY1JlZj8uaW5zdGFuY2UuZm9jdXMoKSk7XG5cblx0XHRcdGxldCBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cdFx0XHRpZiAoaXNTdHJpbmcodGhpcy5wb3NpdGlvblRhcmdldCkpIHtcblx0XHRcdFx0aG9zdEVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucG9zaXRpb25UYXJnZXQpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uVGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcblx0XHRcdFx0aG9zdEVsZW1lbnQgPSB0aGlzLnBvc2l0aW9uVGFyZ2V0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aG9zdEVsZW1lbnQgPSB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXR0aW5nIHVwIHBvcHBlciBhbmQgc2NoZWR1bGluZyB1cGRhdGVzIHdoZW4gem9uZSBpcyBzdGFibGVcblx0XHRcdHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLl9jUmVmKSB7XG5cdFx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcuY3JlYXRlUG9wcGVyKHtcblx0XHRcdFx0XHRcdGhvc3RFbGVtZW50LFxuXHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudDogdGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0XHRcdGFwcGVuZFRvQm9keTogdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyxcblx0XHRcdFx0XHRcdHVwZGF0ZVBvcHBlck9wdGlvbnM6IChvcHRpb25zKSA9PiB0aGlzLnBvcHBlck9wdGlvbnMoYWRkUG9wcGVyT2Zmc2V0KFswLCAyXSkob3B0aW9ucykpLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IHRoaXMuX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHRoaXMucG9zaXRpb25UYXJnZXQgJiYgIWhvc3RFbGVtZW50KSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbmdiRGF0ZXBpY2tlciBjb3VsZCBub3QgZmluZCBlbGVtZW50IGRlY2xhcmVkIGluIFtwb3NpdGlvblRhcmdldF0gdG8gcG9zaXRpb24gYWdhaW5zdC4nKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIGRhdGVwaWNrZXIgcG9wdXAuXG5cdCAqL1xuXHRjbG9zZSgpIHtcblx0XHRpZiAodGhpcy5pc09wZW4oKSkge1xuXHRcdFx0dGhpcy5fdmNSZWYucmVtb3ZlKHRoaXMuX3ZjUmVmLmluZGV4T2YodGhpcy5fY1JlZiEuaG9zdFZpZXcpKTtcblx0XHRcdHRoaXMuX2NSZWYgPSBudWxsO1xuXHRcdFx0dGhpcy5fcG9zaXRpb25pbmcuZGVzdHJveSgpO1xuXHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcblx0XHRcdHRoaXMuX2Rlc3Ryb3lDbG9zZUhhbmRsZXJzJC5uZXh0KCk7XG5cdFx0XHR0aGlzLmNsb3NlZC5lbWl0KCk7XG5cdFx0XHR0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblxuXHRcdFx0Ly8gcmVzdG9yZSBmb2N1c1xuXHRcdFx0bGV0IGVsZW1lbnRUb0ZvY3VzOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLl9lbFdpdGhGb2N1cztcblx0XHRcdGlmIChpc1N0cmluZyh0aGlzLnJlc3RvcmVGb2N1cykpIHtcblx0XHRcdFx0ZWxlbWVudFRvRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucmVzdG9yZUZvY3VzKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5yZXN0b3JlRm9jdXMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRlbGVtZW50VG9Gb2N1cyA9IHRoaXMucmVzdG9yZUZvY3VzIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpbiBJRSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBjb250YWluIGFuIG9iamVjdCB3aXRob3V0ICdmb2N1cygpJyBzb21ldGltZXNcblx0XHRcdGlmIChlbGVtZW50VG9Gb2N1cyAmJiBlbGVtZW50VG9Gb2N1c1snZm9jdXMnXSkge1xuXHRcdFx0XHRlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZG9jdW1lbnQuYm9keS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUb2dnbGVzIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxuXHQgKi9cblx0dG9nZ2xlKCkge1xuXHRcdGlmICh0aGlzLmlzT3BlbigpKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3BlbigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBOYXZpZ2F0ZXMgdG8gdGhlIHByb3ZpZGVkIGRhdGUuXG5cdCAqXG5cdCAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG5cdCAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkIGNhbGVuZGFyIHdpbGwgb3BlbiBjdXJyZW50IG1vbnRoLlxuXHQgKlxuXHQgKiBVc2UgdGhlIGBbc3RhcnREYXRlXWAgaW5wdXQgYXMgYW4gYWx0ZXJuYXRpdmUuXG5cdCAqL1xuXHRuYXZpZ2F0ZVRvKGRhdGU/OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5PzogbnVtYmVyIH0pIHtcblx0XHRpZiAodGhpcy5pc09wZW4oKSkge1xuXHRcdFx0dGhpcy5fY1JlZiEuaW5zdGFuY2UubmF2aWdhdGVUbyhkYXRlKTtcblx0XHR9XG5cdH1cblxuXHRvbkJsdXIoKSB7XG5cdFx0dGhpcy5fb25Ub3VjaGVkKCk7XG5cdH1cblxuXHRvbkZvY3VzKCkge1xuXHRcdHRoaXMuX2VsV2l0aEZvY3VzID0gdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAoY2hhbmdlc1snbWluRGF0ZSddIHx8IGNoYW5nZXNbJ21heERhdGUnXSkge1xuXHRcdFx0dGhpcy5fdmFsaWRhdG9yQ2hhbmdlKCk7XG5cblx0XHRcdGlmICh0aGlzLmlzT3BlbigpKSB7XG5cdFx0XHRcdGlmIChjaGFuZ2VzWydtaW5EYXRlJ10pIHtcblx0XHRcdFx0XHR0aGlzLl9jUmVmIS5pbnN0YW5jZS5taW5EYXRlID0gdGhpcy5taW5EYXRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjaGFuZ2VzWydtYXhEYXRlJ10pIHtcblx0XHRcdFx0XHR0aGlzLl9jUmVmIS5pbnN0YW5jZS5tYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NSZWYhLmluc3RhbmNlLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChjaGFuZ2VzWydkYXRlcGlja2VyQ2xhc3MnXSkge1xuXHRcdFx0Y29uc3QgeyBjdXJyZW50VmFsdWUsIHByZXZpb3VzVmFsdWUgfSA9IGNoYW5nZXNbJ2RhdGVwaWNrZXJDbGFzcyddO1xuXHRcdFx0dGhpcy5fYXBwbHlQb3B1cENsYXNzKGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGNoYW5nZXNbJ2F1dG9DbG9zZSddICYmIHRoaXMuaXNPcGVuKCkpIHtcblx0XHRcdHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLmNsb3NlKCk7XG5cdH1cblxuXHRwcml2YXRlIF9hcHBseURhdGVwaWNrZXJJbnB1dHMoZGF0ZXBpY2tlckNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE5nYkRhdGVwaWNrZXI+KTogdm9pZCB7XG5cdFx0W1xuXHRcdFx0J2NvbnRlbnRUZW1wbGF0ZScsXG5cdFx0XHQnZGF5VGVtcGxhdGUnLFxuXHRcdFx0J2RheVRlbXBsYXRlRGF0YScsXG5cdFx0XHQnZGlzcGxheU1vbnRocycsXG5cdFx0XHQnZmlyc3REYXlPZldlZWsnLFxuXHRcdFx0J2Zvb3RlclRlbXBsYXRlJyxcblx0XHRcdCdtYXJrRGlzYWJsZWQnLFxuXHRcdFx0J21pbkRhdGUnLFxuXHRcdFx0J21heERhdGUnLFxuXHRcdFx0J25hdmlnYXRpb24nLFxuXHRcdFx0J291dHNpZGVEYXlzJyxcblx0XHRcdCdzaG93TmF2aWdhdGlvbicsXG5cdFx0XHQnc2hvd1dlZWtOdW1iZXJzJyxcblx0XHRcdCd3ZWVrZGF5cycsXG5cdFx0XS5mb3JFYWNoKChpbnB1dE5hbWU6IHN0cmluZykgPT4ge1xuXHRcdFx0aWYgKHRoaXNbaW5wdXROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGRhdGVwaWNrZXJDb21wb25lbnRSZWYuc2V0SW5wdXQoaW5wdXROYW1lLCB0aGlzW2lucHV0TmFtZV0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGRhdGVwaWNrZXJDb21wb25lbnRSZWYuc2V0SW5wdXQoJ3N0YXJ0RGF0ZScsIHRoaXMuc3RhcnREYXRlIHx8IHRoaXMuX21vZGVsKTtcblx0fVxuXG5cdHByaXZhdGUgX2FwcGx5UG9wdXBDbGFzcyhuZXdDbGFzczogc3RyaW5nLCBvbGRDbGFzcz86IHN0cmluZykge1xuXHRcdGNvbnN0IHBvcHVwRWwgPSB0aGlzLl9jUmVmPy5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuXHRcdGlmIChwb3B1cEVsKSB7XG5cdFx0XHRpZiAobmV3Q2xhc3MpIHtcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MocG9wdXBFbCwgbmV3Q2xhc3MpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG9sZENsYXNzKSB7XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHBvcHVwRWwsIG9sZENsYXNzKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9hcHBseVBvcHVwU3R5bGluZyhuYXRpdmVFbGVtZW50OiBhbnkpIHtcblx0XHR0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnZHJvcGRvd24tbWVudScpO1xuXHRcdHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsZW1lbnQsICdzaG93Jyk7XG5cblx0XHRpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuXHRcdFx0dGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxlbWVudCwgJ25nYi1kcC1ib2R5Jyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fYXBwbHlQb3B1cENsYXNzKHRoaXMuZGF0ZXBpY2tlckNsYXNzKTtcblx0fVxuXG5cdHByaXZhdGUgX3N1YnNjcmliZUZvckRhdGVwaWNrZXJPdXRwdXRzKGRhdGVwaWNrZXJJbnN0YW5jZTogTmdiRGF0ZXBpY2tlcikge1xuXHRcdGRhdGVwaWNrZXJJbnN0YW5jZS5uYXZpZ2F0ZS5zdWJzY3JpYmUoKG5hdmlnYXRlRXZlbnQpID0+IHRoaXMubmF2aWdhdGUuZW1pdChuYXZpZ2F0ZUV2ZW50KSk7XG5cdFx0ZGF0ZXBpY2tlckluc3RhbmNlLmRhdGVTZWxlY3Quc3Vic2NyaWJlKChkYXRlKSA9PiB7XG5cdFx0XHR0aGlzLmRhdGVTZWxlY3QuZW1pdChkYXRlKTtcblx0XHRcdGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScpIHtcblx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfd3JpdGVNb2RlbFZhbHVlKG1vZGVsOiBOZ2JEYXRlIHwgbnVsbCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5fcGFyc2VyRm9ybWF0dGVyLmZvcm1hdChtb2RlbCk7XG5cdFx0dGhpcy5faW5wdXRWYWx1ZSA9IHZhbHVlO1xuXHRcdHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcblx0XHRpZiAodGhpcy5pc09wZW4oKSkge1xuXHRcdFx0dGhpcy5fY1JlZiEuaW5zdGFuY2Uud3JpdGVWYWx1ZSh0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKG1vZGVsKSk7XG5cdFx0XHR0aGlzLl9vblRvdWNoZWQoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9mcm9tRGF0ZVN0cnVjdChkYXRlOiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IE5nYkRhdGUgfCBudWxsIHtcblx0XHRjb25zdCBuZ2JEYXRlID0gZGF0ZSA/IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpIDogbnVsbDtcblx0XHRyZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBfc2V0Q2xvc2VIYW5kbGVycygpIHtcblx0XHR0aGlzLl9kZXN0cm95Q2xvc2VIYW5kbGVycyQubmV4dCgpO1xuXHRcdG5nYkF1dG9DbG9zZShcblx0XHRcdHRoaXMuX25nWm9uZSxcblx0XHRcdHRoaXMuX2RvY3VtZW50LFxuXHRcdFx0dGhpcy5hdXRvQ2xvc2UsXG5cdFx0XHQoKSA9PiB0aGlzLmNsb3NlKCksXG5cdFx0XHR0aGlzLl9kZXN0cm95Q2xvc2VIYW5kbGVycyQsXG5cdFx0XHRbXSxcblx0XHRcdFt0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jUmVmIS5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XSxcblx0XHQpO1xuXHR9XG59XG4iXX0=