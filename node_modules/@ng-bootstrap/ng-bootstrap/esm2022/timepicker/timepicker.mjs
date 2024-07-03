import { Component, forwardRef, Input, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isInteger, isNumber, padNumber, toInteger } from '../util/util';
import { NgbTime } from './ngb-time';
import { NgIf } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./timepicker-config";
import * as i2 from "./ngb-time-adapter";
import * as i3 from "./timepicker-i18n";
const FILTER_REGEX = /[^0-9]/g;
/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
class NgbTimepicker {
    /**
     * The number of hours to add/subtract when clicking hour spinners.
     */
    set hourStep(step) {
        this._hourStep = isInteger(step) ? step : this._config.hourStep;
    }
    get hourStep() {
        return this._hourStep;
    }
    /**
     * The number of minutes to add/subtract when clicking minute spinners.
     */
    set minuteStep(step) {
        this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
    }
    get minuteStep() {
        return this._minuteStep;
    }
    /**
     * The number of seconds to add/subtract when clicking second spinners.
     */
    set secondStep(step) {
        this._secondStep = isInteger(step) ? step : this._config.secondStep;
    }
    get secondStep() {
        return this._secondStep;
    }
    constructor(_config, _ngbTimeAdapter, _cd, i18n) {
        this._config = _config;
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this._cd = _cd;
        this.i18n = i18n;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.meridian = _config.meridian;
        this.spinners = _config.spinners;
        this.seconds = _config.seconds;
        this.hourStep = _config.hourStep;
        this.minuteStep = _config.minuteStep;
        this.secondStep = _config.secondStep;
        this.disabled = _config.disabled;
        this.readonlyInputs = _config.readonlyInputs;
        this.size = _config.size;
    }
    writeValue(value) {
        const structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Increments the hours by the given step.
     */
    changeHour(step) {
        this.model?.changeHour(step);
        this.propagateModelChange();
    }
    /**
     * Increments the minutes by the given step.
     */
    changeMinute(step) {
        this.model?.changeMinute(step);
        this.propagateModelChange();
    }
    /**
     * Increments the seconds by the given step.
     */
    changeSecond(step) {
        this.model?.changeSecond(step);
        this.propagateModelChange();
    }
    /**
     * Update hours with the new value.
     */
    updateHour(newVal) {
        const isPM = this.model ? this.model.hour >= 12 : false;
        const enteredHour = toInteger(newVal);
        if (this.meridian && ((isPM && enteredHour < 12) || (!isPM && enteredHour === 12))) {
            this.model?.updateHour(enteredHour + 12);
        }
        else {
            this.model?.updateHour(enteredHour);
        }
        this.propagateModelChange();
    }
    /**
     * Update minutes with the new value.
     */
    updateMinute(newVal) {
        this.model?.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * Update seconds with the new value.
     */
    updateSecond(newVal) {
        this.model?.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    }
    toggleMeridian() {
        if (this.meridian) {
            this.changeHour(12);
        }
    }
    formatInput(input) {
        input.value = input.value.replace(FILTER_REGEX, '');
    }
    formatHour(value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    }
    formatMinSec(value) {
        return padNumber(isNumber(value) ? value : NaN);
    }
    handleBlur() {
        this.onTouched();
    }
    get isSmallSize() {
        return this.size === 'small';
    }
    get isLargeSize() {
        return this.size === 'large';
    }
    ngOnChanges(changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    }
    propagateModelChange(touched = true) {
        if (touched) {
            this.onTouched();
        }
        if (this.model?.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepicker, deps: [{ token: i1.NgbTimepickerConfig }, { token: i2.NgbTimeAdapter }, { token: i0.ChangeDetectorRef }, { token: i3.NgbTimepickerI18n }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbTimepicker, isStandalone: true, selector: "ngb-timepicker", inputs: { meridian: "meridian", spinners: "spinners", seconds: "seconds", hourStep: "hourStep", minuteStep: "minuteStep", secondStep: "secondStep", readonlyInputs: "readonlyInputs", size: "size" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTimepicker), multi: true }], exportAs: ["ngbTimepicker"], usesOnChanges: true, ngImport: i0, template: `
		<fieldset [disabled]="disabled" [class.disabled]="disabled">
			<div class="ngb-tp">
				<div class="ngb-tp-input-container ngb-tp-hour">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeHour(hourStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="HH"
						i18n-placeholder="@@ngb.timepicker.HH"
						[value]="formatHour(model?.hour)"
						(change)="updateHour($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Hours"
						i18n-aria-label="@@ngb.timepicker.hours"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeHour(-hourStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
					</button>
				</div>
				<div class="ngb-tp-spacer">:</div>
				<div class="ngb-tp-input-container ngb-tp-minute">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeMinute(minuteStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="MM"
						i18n-placeholder="@@ngb.timepicker.MM"
						[value]="formatMinSec(model?.minute)"
						(change)="updateMinute($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Minutes"
						i18n-aria-label="@@ngb.timepicker.minutes"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeMinute(-minuteStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
					</button>
				</div>
				<div *ngIf="seconds" class="ngb-tp-spacer">:</div>
				<div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeSecond(secondStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="SS"
						i18n-placeholder="@@ngb.timepicker.SS"
						[value]="formatMinSec(model?.second)"
						(change)="updateSecond($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Seconds"
						i18n-aria-label="@@ngb.timepicker.seconds"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeSecond(-secondStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
					</button>
				</div>
				<div *ngIf="meridian" class="ngb-tp-spacer"></div>
				<div *ngIf="meridian" class="ngb-tp-meridian">
					<button
						type="button"
						class="btn btn-outline-primary"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[disabled]="disabled"
						[class.disabled]="disabled"
						(click)="toggleMeridian()"
					>
						<ng-container *ngIf="model && model.hour >= 12; else am" i18n="@@ngb.timepicker.PM">{{
							i18n.getAfternoonPeriod()
						}}</ng-container>
						<ng-template #am i18n="@@ngb.timepicker.AM">{{ i18n.getMorningPeriod() }}</ng-template>
					</button>
				</div>
			</div>
		</fieldset>
	`, isInline: true, styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbTimepicker };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepicker, decorators: [{
            type: Component,
            args: [{ exportAs: 'ngbTimepicker', selector: 'ngb-timepicker', standalone: true, imports: [NgIf], encapsulation: ViewEncapsulation.None, template: `
		<fieldset [disabled]="disabled" [class.disabled]="disabled">
			<div class="ngb-tp">
				<div class="ngb-tp-input-container ngb-tp-hour">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeHour(hourStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="HH"
						i18n-placeholder="@@ngb.timepicker.HH"
						[value]="formatHour(model?.hour)"
						(change)="updateHour($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Hours"
						i18n-aria-label="@@ngb.timepicker.hours"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeHour(-hourStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
					</button>
				</div>
				<div class="ngb-tp-spacer">:</div>
				<div class="ngb-tp-input-container ngb-tp-minute">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeMinute(minuteStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="MM"
						i18n-placeholder="@@ngb.timepicker.MM"
						[value]="formatMinSec(model?.minute)"
						(change)="updateMinute($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Minutes"
						i18n-aria-label="@@ngb.timepicker.minutes"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeMinute(-minuteStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
					</button>
				</div>
				<div *ngIf="seconds" class="ngb-tp-spacer">:</div>
				<div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeSecond(secondStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="SS"
						i18n-placeholder="@@ngb.timepicker.SS"
						[value]="formatMinSec(model?.second)"
						(change)="updateSecond($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Seconds"
						i18n-aria-label="@@ngb.timepicker.seconds"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeSecond(-secondStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
					</button>
				</div>
				<div *ngIf="meridian" class="ngb-tp-spacer"></div>
				<div *ngIf="meridian" class="ngb-tp-meridian">
					<button
						type="button"
						class="btn btn-outline-primary"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[disabled]="disabled"
						[class.disabled]="disabled"
						(click)="toggleMeridian()"
					>
						<ng-container *ngIf="model && model.hour >= 12; else am" i18n="@@ngb.timepicker.PM">{{
							i18n.getAfternoonPeriod()
						}}</ng-container>
						<ng-template #am i18n="@@ngb.timepicker.AM">{{ i18n.getMorningPeriod() }}</ng-template>
					</button>
				</div>
			</div>
		</fieldset>
	`, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTimepicker), multi: true }], styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbTimepickerConfig }, { type: i2.NgbTimeAdapter }, { type: i0.ChangeDetectorRef }, { type: i3.NgbTimepickerI18n }]; }, propDecorators: { meridian: [{
                type: Input
            }], spinners: [{
                type: Input
            }], seconds: [{
                type: Input
            }], hourStep: [{
                type: Input
            }], minuteStep: [{
                type: Input
            }], secondStep: [{
                type: Input
            }], readonlyInputs: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90aW1lcGlja2VyL3RpbWVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLGlCQUFpQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBSXJDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFFdkMsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBRS9COztHQUVHO0FBQ0gsTUF3TGEsYUFBYTtJQXlCekI7O09BRUc7SUFDSCxJQUNJLFFBQVEsQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFDSSxVQUFVLENBQUMsSUFBWTtRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUNyRSxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3pCLENBQUM7SUFF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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE4S1QsdXFCQWpMUyxJQUFJOztTQW9MRixhQUFhOzJGQUFiLGFBQWE7a0JBeEx6QixTQUFTOytCQUNDLGVBQWUsWUFDZixnQkFBZ0IsY0FDZCxJQUFJLFdBQ1AsQ0FBQyxJQUFJLENBQUMsaUJBQ0EsaUJBQWlCLENBQUMsSUFBSSxZQUUzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOEtULGFBQ1UsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7dU1BZTdGLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxPQUFPO3NCQUFmLEtBQUs7Z0JBTUYsUUFBUTtzQkFEWCxLQUFLO2dCQWFGLFVBQVU7c0JBRGIsS0FBSztnQkFhRixVQUFVO3NCQURiLEtBQUs7Z0JBWUcsY0FBYztzQkFBdEIsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0Q29tcG9uZW50LFxuXHRmb3J3YXJkUmVmLFxuXHRJbnB1dCxcblx0T25DaGFuZ2VzLFxuXHRTaW1wbGVDaGFuZ2VzLFxuXHRWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IGlzSW50ZWdlciwgaXNOdW1iZXIsIHBhZE51bWJlciwgdG9JbnRlZ2VyIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nYlRpbWUgfSBmcm9tICcuL25nYi10aW1lJztcbmltcG9ydCB7IE5nYlRpbWVwaWNrZXJDb25maWcgfSBmcm9tICcuL3RpbWVwaWNrZXItY29uZmlnJztcbmltcG9ydCB7IE5nYlRpbWVBZGFwdGVyIH0gZnJvbSAnLi9uZ2ItdGltZS1hZGFwdGVyJztcbmltcG9ydCB7IE5nYlRpbWVwaWNrZXJJMThuIH0gZnJvbSAnLi90aW1lcGlja2VyLWkxOG4nO1xuaW1wb3J0IHsgTmdJZiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmNvbnN0IEZJTFRFUl9SRUdFWCA9IC9bXjAtOV0vZztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IGhlbHBzIHdpdGggd3RoIHBpY2tpbmcgaG91cnMsIG1pbnV0ZXMgYW5kIHNlY29uZHMuXG4gKi9cbkBDb21wb25lbnQoe1xuXHRleHBvcnRBczogJ25nYlRpbWVwaWNrZXInLFxuXHRzZWxlY3RvcjogJ25nYi10aW1lcGlja2VyJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aW1wb3J0czogW05nSWZdLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRzdHlsZVVybHM6IFsnLi90aW1lcGlja2VyLnNjc3MnXSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZmllbGRzZXQgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwibmdiLXRwXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1ob3VyXCI+XG5cdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0Km5nSWY9XCJzcGlubmVyc1wiXG5cdFx0XHRcdFx0XHR0YWJpbmRleD1cIi0xXCJcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdFx0KGNsaWNrKT1cImNoYW5nZUhvdXIoaG91clN0ZXApXCJcblx0XHRcdFx0XHRcdGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcblx0XHRcdFx0XHRcdFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuXHRcdFx0XHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1ob3Vyc1wiPkluY3JlbWVudCBob3Vyczwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHRcdHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0XHRcdGNsYXNzPVwibmdiLXRwLWlucHV0IGZvcm0tY29udHJvbFwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZm9ybS1jb250cm9sLXNtXT1cImlzU21hbGxTaXplXCJcblx0XHRcdFx0XHRcdFtjbGFzcy5mb3JtLWNvbnRyb2wtbGddPVwiaXNMYXJnZVNpemVcIlxuXHRcdFx0XHRcdFx0bWF4bGVuZ3RoPVwiMlwiXG5cdFx0XHRcdFx0XHRpbnB1dG1vZGU9XCJudW1lcmljXCJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiSEhcIlxuXHRcdFx0XHRcdFx0aTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuSEhcIlxuXHRcdFx0XHRcdFx0W3ZhbHVlXT1cImZvcm1hdEhvdXIobW9kZWw/LmhvdXIpXCJcblx0XHRcdFx0XHRcdChjaGFuZ2UpPVwidXBkYXRlSG91cigkYW55KCRldmVudCkudGFyZ2V0LnZhbHVlKVwiXG5cdFx0XHRcdFx0XHRbcmVhZE9ubHldPVwicmVhZG9ubHlJbnB1dHNcIlxuXHRcdFx0XHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJIb3Vyc1wiXG5cdFx0XHRcdFx0XHRpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLmhvdXJzXCJcblx0XHRcdFx0XHRcdChibHVyKT1cImhhbmRsZUJsdXIoKVwiXG5cdFx0XHRcdFx0XHQoaW5wdXQpPVwiZm9ybWF0SW5wdXQoJGFueSgkZXZlbnQpLnRhcmdldClcIlxuXHRcdFx0XHRcdFx0KGtleWRvd24uQXJyb3dVcCk9XCJjaGFuZ2VIb3VyKGhvdXJTdGVwKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFx0KGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZUhvdXIoLWhvdXJTdGVwKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0Km5nSWY9XCJzcGlubmVyc1wiXG5cdFx0XHRcdFx0XHR0YWJpbmRleD1cIi0xXCJcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdFx0KGNsaWNrKT1cImNoYW5nZUhvdXIoLWhvdXJTdGVwKVwiXG5cdFx0XHRcdFx0XHRjbGFzcz1cImJ0biBidG4tbGlua1wiXG5cdFx0XHRcdFx0XHRbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCJcblx0XHRcdFx0XHRcdFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHRcdFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJjaGV2cm9uIG5nYi10cC1jaGV2cm9uIGJvdHRvbVwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LWhvdXJzXCI+RGVjcmVtZW50IGhvdXJzPC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj46PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1taW51dGVcIj5cblx0XHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0XHQqbmdJZj1cInNwaW5uZXJzXCJcblx0XHRcdFx0XHRcdHRhYmluZGV4PVwiLTFcIlxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHQoY2xpY2spPVwiY2hhbmdlTWludXRlKG1pbnV0ZVN0ZXApXCJcblx0XHRcdFx0XHRcdGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcblx0XHRcdFx0XHRcdFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuXHRcdFx0XHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1taW51dGVzXCI+SW5jcmVtZW50IG1pbnV0ZXM8L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRjbGFzcz1cIm5nYi10cC1pbnB1dCBmb3JtLWNvbnRyb2xcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmZvcm0tY29udHJvbC1zbV09XCJpc1NtYWxsU2l6ZVwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcblx0XHRcdFx0XHRcdG1heGxlbmd0aD1cIjJcIlxuXHRcdFx0XHRcdFx0aW5wdXRtb2RlPVwibnVtZXJpY1wiXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk1NXCJcblx0XHRcdFx0XHRcdGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLk1NXCJcblx0XHRcdFx0XHRcdFt2YWx1ZV09XCJmb3JtYXRNaW5TZWMobW9kZWw/Lm1pbnV0ZSlcIlxuXHRcdFx0XHRcdFx0KGNoYW5nZSk9XCJ1cGRhdGVNaW51dGUoJGFueSgkZXZlbnQpLnRhcmdldC52YWx1ZSlcIlxuXHRcdFx0XHRcdFx0W3JlYWRPbmx5XT1cInJlYWRvbmx5SW5wdXRzXCJcblx0XHRcdFx0XHRcdFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5cdFx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiTWludXRlc1wiXG5cdFx0XHRcdFx0XHRpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLm1pbnV0ZXNcIlxuXHRcdFx0XHRcdFx0KGJsdXIpPVwiaGFuZGxlQmx1cigpXCJcblx0XHRcdFx0XHRcdChpbnB1dCk9XCJmb3JtYXRJbnB1dCgkYW55KCRldmVudCkudGFyZ2V0KVwiXG5cdFx0XHRcdFx0XHQoa2V5ZG93bi5BcnJvd1VwKT1cImNoYW5nZU1pbnV0ZShtaW51dGVTdGVwKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFx0KGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRcdCpuZ0lmPVwic3Bpbm5lcnNcIlxuXHRcdFx0XHRcdFx0dGFiaW5kZXg9XCItMVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdChjbGljayk9XCJjaGFuZ2VNaW51dGUoLW1pbnV0ZVN0ZXApXCJcblx0XHRcdFx0XHRcdGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcblx0XHRcdFx0XHRcdFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuXHRcdFx0XHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtbWludXRlc1wiPkRlY3JlbWVudCBtaW51dGVzPC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiAqbmdJZj1cInNlY29uZHNcIiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj46PC9kaXY+XG5cdFx0XHRcdDxkaXYgKm5nSWY9XCJzZWNvbmRzXCIgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1zZWNvbmRcIj5cblx0XHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0XHQqbmdJZj1cInNwaW5uZXJzXCJcblx0XHRcdFx0XHRcdHRhYmluZGV4PVwiLTFcIlxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHQoY2xpY2spPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCJcblx0XHRcdFx0XHRcdGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcblx0XHRcdFx0XHRcdFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuXHRcdFx0XHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1zZWNvbmRzXCI+SW5jcmVtZW50IHNlY29uZHM8L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRjbGFzcz1cIm5nYi10cC1pbnB1dCBmb3JtLWNvbnRyb2xcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmZvcm0tY29udHJvbC1zbV09XCJpc1NtYWxsU2l6ZVwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcblx0XHRcdFx0XHRcdG1heGxlbmd0aD1cIjJcIlxuXHRcdFx0XHRcdFx0aW5wdXRtb2RlPVwibnVtZXJpY1wiXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIlNTXCJcblx0XHRcdFx0XHRcdGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLlNTXCJcblx0XHRcdFx0XHRcdFt2YWx1ZV09XCJmb3JtYXRNaW5TZWMobW9kZWw/LnNlY29uZClcIlxuXHRcdFx0XHRcdFx0KGNoYW5nZSk9XCJ1cGRhdGVTZWNvbmQoJGFueSgkZXZlbnQpLnRhcmdldC52YWx1ZSlcIlxuXHRcdFx0XHRcdFx0W3JlYWRPbmx5XT1cInJlYWRvbmx5SW5wdXRzXCJcblx0XHRcdFx0XHRcdFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5cdFx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiU2Vjb25kc1wiXG5cdFx0XHRcdFx0XHRpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLnNlY29uZHNcIlxuXHRcdFx0XHRcdFx0KGJsdXIpPVwiaGFuZGxlQmx1cigpXCJcblx0XHRcdFx0XHRcdChpbnB1dCk9XCJmb3JtYXRJbnB1dCgkYW55KCRldmVudCkudGFyZ2V0KVwiXG5cdFx0XHRcdFx0XHQoa2V5ZG93bi5BcnJvd1VwKT1cImNoYW5nZVNlY29uZChzZWNvbmRTdGVwKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFx0KGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRcdCpuZ0lmPVwic3Bpbm5lcnNcIlxuXHRcdFx0XHRcdFx0dGFiaW5kZXg9XCItMVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdChjbGljayk9XCJjaGFuZ2VTZWNvbmQoLXNlY29uZFN0ZXApXCJcblx0XHRcdFx0XHRcdGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcblx0XHRcdFx0XHRcdFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG5cdFx0XHRcdFx0XHRbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuXHRcdFx0XHRcdFx0W2Rpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtc2Vjb25kc1wiPkRlY3JlbWVudCBzZWNvbmRzPC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiAqbmdJZj1cIm1lcmlkaWFuXCIgY2xhc3M9XCJuZ2ItdHAtc3BhY2VyXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgKm5nSWY9XCJtZXJpZGlhblwiIGNsYXNzPVwibmdiLXRwLW1lcmlkaWFuXCI+XG5cdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRjbGFzcz1cImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XCJcblx0XHRcdFx0XHRcdFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG5cdFx0XHRcdFx0XHRbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuXHRcdFx0XHRcdFx0W2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcblx0XHRcdFx0XHRcdChjbGljayk9XCJ0b2dnbGVNZXJpZGlhbigpXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ0lmPVwibW9kZWwgJiYgbW9kZWwuaG91ciA+PSAxMjsgZWxzZSBhbVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLlBNXCI+e3tcblx0XHRcdFx0XHRcdFx0aTE4bi5nZXRBZnRlcm5vb25QZXJpb2QoKVxuXHRcdFx0XHRcdFx0fX08L25nLWNvbnRhaW5lcj5cblx0XHRcdFx0XHRcdDxuZy10ZW1wbGF0ZSAjYW0gaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuQU1cIj57eyBpMThuLmdldE1vcm5pbmdQZXJpb2QoKSB9fTwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9maWVsZHNldD5cblx0YCxcblx0cHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVGltZXBpY2tlciksIG11bHRpOiB0cnVlIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lcGlja2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XG5cdHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaXplOiBzdHJpbmc7XG5cblx0ZGlzYWJsZWQ6IGJvb2xlYW47XG5cdG1vZGVsPzogTmdiVGltZTtcblxuXHRwcml2YXRlIF9ob3VyU3RlcDogbnVtYmVyO1xuXHRwcml2YXRlIF9taW51dGVTdGVwOiBudW1iZXI7XG5cdHByaXZhdGUgX3NlY29uZFN0ZXA6IG51bWJlcjtcblxuXHQvKipcblx0ICogV2hldGhlciB0byBkaXNwbGF5IDEySCBvciAyNEggbW9kZS5cblx0ICovXG5cdEBJbnB1dCgpIG1lcmlkaWFuOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRoZSBzcGlubmVycyBhYm92ZSBhbmQgYmVsb3cgaW5wdXRzIGFyZSB2aXNpYmxlLlxuXHQgKi9cblx0QElucHV0KCkgc3Bpbm5lcnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgaXQgaXMgcG9zc2libGUgdG8gc2VsZWN0IHNlY29uZHMuXG5cdCAqL1xuXHRASW5wdXQoKSBzZWNvbmRzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGhvdXJzIHRvIGFkZC9zdWJ0cmFjdCB3aGVuIGNsaWNraW5nIGhvdXIgc3Bpbm5lcnMuXG5cdCAqL1xuXHRASW5wdXQoKVxuXHRzZXQgaG91clN0ZXAoc3RlcDogbnVtYmVyKSB7XG5cdFx0dGhpcy5faG91clN0ZXAgPSBpc0ludGVnZXIoc3RlcCkgPyBzdGVwIDogdGhpcy5fY29uZmlnLmhvdXJTdGVwO1xuXHR9XG5cblx0Z2V0IGhvdXJTdGVwKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX2hvdXJTdGVwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgbWludXRlcyB0byBhZGQvc3VidHJhY3Qgd2hlbiBjbGlja2luZyBtaW51dGUgc3Bpbm5lcnMuXG5cdCAqL1xuXHRASW5wdXQoKVxuXHRzZXQgbWludXRlU3RlcChzdGVwOiBudW1iZXIpIHtcblx0XHR0aGlzLl9taW51dGVTdGVwID0gaXNJbnRlZ2VyKHN0ZXApID8gc3RlcCA6IHRoaXMuX2NvbmZpZy5taW51dGVTdGVwO1xuXHR9XG5cblx0Z2V0IG1pbnV0ZVN0ZXAoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fbWludXRlU3RlcDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gYWRkL3N1YnRyYWN0IHdoZW4gY2xpY2tpbmcgc2Vjb25kIHNwaW5uZXJzLlxuXHQgKi9cblx0QElucHV0KClcblx0c2V0IHNlY29uZFN0ZXAoc3RlcDogbnVtYmVyKSB7XG5cdFx0dGhpcy5fc2Vjb25kU3RlcCA9IGlzSW50ZWdlcihzdGVwKSA/IHN0ZXAgOiB0aGlzLl9jb25maWcuc2Vjb25kU3RlcDtcblx0fVxuXG5cdGdldCBzZWNvbmRTdGVwKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX3NlY29uZFN0ZXA7XG5cdH1cblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgdGltZXBpY2tlciBpcyByZWFkb25seSBhbmQgY2FuJ3QgYmUgY2hhbmdlZC5cblx0ICovXG5cdEBJbnB1dCgpIHJlYWRvbmx5SW5wdXRzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2l6ZSBvZiBpbnB1dHMgYW5kIGJ1dHRvbnMuXG5cdCAqL1xuXHRASW5wdXQoKSBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogTmdiVGltZXBpY2tlckNvbmZpZyxcblx0XHRwcml2YXRlIF9uZ2JUaW1lQWRhcHRlcjogTmdiVGltZUFkYXB0ZXI8YW55Pixcblx0XHRwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cdFx0cHVibGljIGkxOG46IE5nYlRpbWVwaWNrZXJJMThuLFxuXHQpIHtcblx0XHR0aGlzLm1lcmlkaWFuID0gX2NvbmZpZy5tZXJpZGlhbjtcblx0XHR0aGlzLnNwaW5uZXJzID0gX2NvbmZpZy5zcGlubmVycztcblx0XHR0aGlzLnNlY29uZHMgPSBfY29uZmlnLnNlY29uZHM7XG5cdFx0dGhpcy5ob3VyU3RlcCA9IF9jb25maWcuaG91clN0ZXA7XG5cdFx0dGhpcy5taW51dGVTdGVwID0gX2NvbmZpZy5taW51dGVTdGVwO1xuXHRcdHRoaXMuc2Vjb25kU3RlcCA9IF9jb25maWcuc2Vjb25kU3RlcDtcblx0XHR0aGlzLmRpc2FibGVkID0gX2NvbmZpZy5kaXNhYmxlZDtcblx0XHR0aGlzLnJlYWRvbmx5SW5wdXRzID0gX2NvbmZpZy5yZWFkb25seUlucHV0cztcblx0XHR0aGlzLnNpemUgPSBfY29uZmlnLnNpemU7XG5cdH1cblxuXHRvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXHRvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuXHR3cml0ZVZhbHVlKHZhbHVlKSB7XG5cdFx0Y29uc3Qgc3RydWN0VmFsdWUgPSB0aGlzLl9uZ2JUaW1lQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpO1xuXHRcdHRoaXMubW9kZWwgPSBzdHJ1Y3RWYWx1ZSA/IG5ldyBOZ2JUaW1lKHN0cnVjdFZhbHVlLmhvdXIsIHN0cnVjdFZhbHVlLm1pbnV0ZSwgc3RydWN0VmFsdWUuc2Vjb25kKSA6IG5ldyBOZ2JUaW1lKCk7XG5cdFx0aWYgKCF0aGlzLnNlY29uZHMgJiYgKCFzdHJ1Y3RWYWx1ZSB8fCAhaXNOdW1iZXIoc3RydWN0VmFsdWUuc2Vjb25kKSkpIHtcblx0XHRcdHRoaXMubW9kZWwuc2Vjb25kID0gMDtcblx0XHR9XG5cdFx0dGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG5cdH1cblxuXHRyZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7XG5cdFx0dGhpcy5vbkNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQge1xuXHRcdHRoaXMub25Ub3VjaGVkID0gZm47XG5cdH1cblxuXHRzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcblx0XHR0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZW1lbnRzIHRoZSBob3VycyBieSB0aGUgZ2l2ZW4gc3RlcC5cblx0ICovXG5cdGNoYW5nZUhvdXIoc3RlcDogbnVtYmVyKSB7XG5cdFx0dGhpcy5tb2RlbD8uY2hhbmdlSG91cihzdGVwKTtcblx0XHR0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5jcmVtZW50cyB0aGUgbWludXRlcyBieSB0aGUgZ2l2ZW4gc3RlcC5cblx0ICovXG5cdGNoYW5nZU1pbnV0ZShzdGVwOiBudW1iZXIpIHtcblx0XHR0aGlzLm1vZGVsPy5jaGFuZ2VNaW51dGUoc3RlcCk7XG5cdFx0dGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlbWVudHMgdGhlIHNlY29uZHMgYnkgdGhlIGdpdmVuIHN0ZXAuXG5cdCAqL1xuXHRjaGFuZ2VTZWNvbmQoc3RlcDogbnVtYmVyKSB7XG5cdFx0dGhpcy5tb2RlbD8uY2hhbmdlU2Vjb25kKHN0ZXApO1xuXHRcdHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgaG91cnMgd2l0aCB0aGUgbmV3IHZhbHVlLlxuXHQgKi9cblx0dXBkYXRlSG91cihuZXdWYWw6IHN0cmluZykge1xuXHRcdGNvbnN0IGlzUE0gPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5ob3VyID49IDEyIDogZmFsc2U7XG5cdFx0Y29uc3QgZW50ZXJlZEhvdXIgPSB0b0ludGVnZXIobmV3VmFsKTtcblx0XHRpZiAodGhpcy5tZXJpZGlhbiAmJiAoKGlzUE0gJiYgZW50ZXJlZEhvdXIgPCAxMikgfHwgKCFpc1BNICYmIGVudGVyZWRIb3VyID09PSAxMikpKSB7XG5cdFx0XHR0aGlzLm1vZGVsPy51cGRhdGVIb3VyKGVudGVyZWRIb3VyICsgMTIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm1vZGVsPy51cGRhdGVIb3VyKGVudGVyZWRIb3VyKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBtaW51dGVzIHdpdGggdGhlIG5ldyB2YWx1ZS5cblx0ICovXG5cdHVwZGF0ZU1pbnV0ZShuZXdWYWw6IHN0cmluZykge1xuXHRcdHRoaXMubW9kZWw/LnVwZGF0ZU1pbnV0ZSh0b0ludGVnZXIobmV3VmFsKSk7XG5cdFx0dGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBzZWNvbmRzIHdpdGggdGhlIG5ldyB2YWx1ZS5cblx0ICovXG5cdHVwZGF0ZVNlY29uZChuZXdWYWw6IHN0cmluZykge1xuXHRcdHRoaXMubW9kZWw/LnVwZGF0ZVNlY29uZCh0b0ludGVnZXIobmV3VmFsKSk7XG5cdFx0dGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuXHR9XG5cblx0dG9nZ2xlTWVyaWRpYW4oKSB7XG5cdFx0aWYgKHRoaXMubWVyaWRpYW4pIHtcblx0XHRcdHRoaXMuY2hhbmdlSG91cigxMik7XG5cdFx0fVxuXHR9XG5cblx0Zm9ybWF0SW5wdXQoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcblx0XHRpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoRklMVEVSX1JFR0VYLCAnJyk7XG5cdH1cblxuXHRmb3JtYXRIb3VyKHZhbHVlPzogbnVtYmVyKSB7XG5cdFx0aWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuXHRcdFx0aWYgKHRoaXMubWVyaWRpYW4pIHtcblx0XHRcdFx0cmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDEyID09PSAwID8gMTIgOiB2YWx1ZSAlIDEyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBwYWROdW1iZXIodmFsdWUgJSAyNCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBwYWROdW1iZXIoTmFOKTtcblx0XHR9XG5cdH1cblxuXHRmb3JtYXRNaW5TZWModmFsdWU/OiBudW1iZXIpIHtcblx0XHRyZXR1cm4gcGFkTnVtYmVyKGlzTnVtYmVyKHZhbHVlKSA/IHZhbHVlIDogTmFOKTtcblx0fVxuXG5cdGhhbmRsZUJsdXIoKSB7XG5cdFx0dGhpcy5vblRvdWNoZWQoKTtcblx0fVxuXG5cdGdldCBpc1NtYWxsU2l6ZSgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5zaXplID09PSAnc21hbGwnO1xuXHR9XG5cblx0Z2V0IGlzTGFyZ2VTaXplKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnNpemUgPT09ICdsYXJnZSc7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cdFx0aWYgKGNoYW5nZXNbJ3NlY29uZHMnXSAmJiAhdGhpcy5zZWNvbmRzICYmIHRoaXMubW9kZWwgJiYgIWlzTnVtYmVyKHRoaXMubW9kZWwuc2Vjb25kKSkge1xuXHRcdFx0dGhpcy5tb2RlbC5zZWNvbmQgPSAwO1xuXHRcdFx0dGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZShmYWxzZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBwcm9wYWdhdGVNb2RlbENoYW5nZSh0b3VjaGVkID0gdHJ1ZSkge1xuXHRcdGlmICh0b3VjaGVkKSB7XG5cdFx0XHR0aGlzLm9uVG91Y2hlZCgpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5tb2RlbD8uaXNWYWxpZCh0aGlzLnNlY29uZHMpKSB7XG5cdFx0XHR0aGlzLm9uQ2hhbmdlKFxuXHRcdFx0XHR0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKHsgaG91cjogdGhpcy5tb2RlbC5ob3VyLCBtaW51dGU6IHRoaXMubW9kZWwubWludXRlLCBzZWNvbmQ6IHRoaXMubW9kZWwuc2Vjb25kIH0pLFxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vbkNoYW5nZSh0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKG51bGwpKTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==