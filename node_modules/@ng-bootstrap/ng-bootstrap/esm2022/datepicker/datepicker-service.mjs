import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger, toInteger } from '../util/util';
import { Subject } from 'rxjs';
import { buildMonths, checkDateInRange, checkMinBeforeMax, generateSelectBoxMonths, generateSelectBoxYears, isChangedDate, isChangedMonth, isDateSelectable, nextMonthDisabled, prevMonthDisabled, } from './datepicker-tools';
import { filter } from 'rxjs/operators';
import { TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./ngb-calendar";
import * as i2 from "./datepicker-i18n";
class NgbDatepickerService {
    get model$() {
        return this._model$.pipe(filter((model) => model.months.length > 0));
    }
    get dateSelect$() {
        return this._dateSelect$.pipe(filter((date) => date !== null));
    }
    set(options) {
        let patch = Object.keys(options)
            .map((key) => this._VALIDATORS[key](options[key]))
            .reduce((obj, part) => ({ ...obj, ...part }), {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    }
    constructor(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._VALIDATORS = {
            dayTemplateData: (dayTemplateData) => {
                if (this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData };
                }
            },
            displayMonths: (displayMonths) => {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                    return { displayMonths };
                }
            },
            disabled: (disabled) => {
                if (this._state.disabled !== disabled) {
                    return { disabled };
                }
            },
            firstDayOfWeek: (firstDayOfWeek) => {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek };
                }
            },
            focusVisible: (focusVisible) => {
                if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                    return { focusVisible };
                }
            },
            markDisabled: (markDisabled) => {
                if (this._state.markDisabled !== markDisabled) {
                    return { markDisabled };
                }
            },
            maxDate: (date) => {
                const maxDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.maxDate, maxDate)) {
                    return { maxDate };
                }
            },
            minDate: (date) => {
                const minDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.minDate, minDate)) {
                    return { minDate };
                }
            },
            navigation: (navigation) => {
                if (this._state.navigation !== navigation) {
                    return { navigation };
                }
            },
            outsideDays: (outsideDays) => {
                if (this._state.outsideDays !== outsideDays) {
                    return { outsideDays };
                }
            },
            weekdays: (weekdays) => {
                const weekdayWidth = weekdays === true || weekdays === false ? TranslationWidth.Short : weekdays;
                const weekdaysVisible = weekdays === true || weekdays === false ? weekdays : true;
                if (this._state.weekdayWidth !== weekdayWidth || this._state.weekdaysVisible !== weekdaysVisible) {
                    return { weekdayWidth, weekdaysVisible };
                }
            },
        };
        this._model$ = new Subject();
        this._dateSelect$ = new Subject();
        this._state = {
            dayTemplateData: null,
            markDisabled: null,
            maxDate: null,
            minDate: null,
            disabled: false,
            displayMonths: 1,
            firstDate: null,
            firstDayOfWeek: 1,
            lastDate: null,
            focusDate: null,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectedDate: null,
            selectBoxes: { years: [], months: [] },
            weekdayWidth: TranslationWidth.Short,
            weekdaysVisible: true,
        };
    }
    focus(date) {
        const focusedDate = this.toValidDate(date, null);
        if (focusedDate != null && !this._state.disabled && isChangedDate(this._state.focusDate, focusedDate)) {
            this._nextState({ focusDate: date });
        }
    }
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    open(date) {
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (firstDate != null &&
            !this._state.disabled &&
            (!this._state.firstDate || isChangedMonth(this._state.firstDate, firstDate))) {
            this._nextState({ firstDate });
        }
    }
    select(date, options = {}) {
        const selectedDate = this.toValidDate(date, null);
        if (selectedDate != null && !this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    }
    toValidDate(date, defaultValue) {
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    getMonth(struct) {
        for (let month of this._state.months) {
            if (struct.month === month.number && struct.year === month.year) {
                return month;
            }
        }
        throw new Error(`month ${struct.month} of year ${struct.year} not found`);
    }
    _nextState(patch) {
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach((month) => {
            month.weeks.forEach((week) => {
                week.days.forEach((day) => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex =
                        !disabled && focusDate && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden =
                            outsideDays === 'hidden' ||
                                outsideDays === 'collapsed' ||
                                (displayMonths > 1 &&
                                    day.date.after(months[0].firstDate) &&
                                    day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    }
    _updateState(patch) {
        // patching fields
        const state = Object.assign({}, this._state, patch);
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 &&
                state.focusDate &&
                !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            const forceRebuild = 'dayTemplateData' in patch ||
                'firstDayOfWeek' in patch ||
                'markDisabled' in patch ||
                'minDate' in patch ||
                'maxDate' in patch ||
                'disabled' in patch ||
                'outsideDays' in patch ||
                'weekdaysVisible' in patch;
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months[0].firstDate;
            state.lastDate = months[months.length - 1].lastDate;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (!state.focusDate || state.focusDate.before(state.firstDate) || state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months = generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerService, deps: [{ token: i1.NgbCalendar }, { token: i2.NgbDatepickerI18n }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerService }); }
}
export { NgbDatepickerService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NgbCalendar }, { type: i2.NgbDatepickerI18n }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFDTixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixpQkFBaUIsR0FDakIsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFnQm5ELE1BQ2Esb0JBQW9CO0lBOEZoQyxJQUFJLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxHQUFHLENBQUMsT0FBZ0M7UUFDbkMsSUFBSSxL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USxDQUFDO2dCQUNoRSxDQUFDLFlBQVksSUFBSSxXQUFXLElBQUksU0FBUyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFVBQVUsSUFBSSxLQUFLLENBQUMsRUFDL0Y7Z0JBQ0QsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pHLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hHO1NBQ0Q7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7OEdBeFVXLG9CQUFvQjtrSEFBcEIsb0JBQW9COztTQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nYkNhbGVuZGFyIH0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHsgTmdiRGF0ZSB9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7IERhdGVwaWNrZXJWaWV3TW9kZWwsIE5nYkRheVRlbXBsYXRlRGF0YSwgTmdiTWFya0Rpc2FibGVkIH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNJbnRlZ2VyLCB0b0ludGVnZXIgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcblx0YnVpbGRNb250aHMsXG5cdGNoZWNrRGF0ZUluUmFuZ2UsXG5cdGNoZWNrTWluQmVmb3JlTWF4LFxuXHRnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyxcblx0Z2VuZXJhdGVTZWxlY3RCb3hZZWFycyxcblx0aXNDaGFuZ2VkRGF0ZSxcblx0aXNDaGFuZ2VkTW9udGgsXG5cdGlzRGF0ZVNlbGVjdGFibGUsXG5cdG5leHRNb250aERpc2FibGVkLFxuXHRwcmV2TW9udGhEaXNhYmxlZCxcbn0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcblxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmdiRGF0ZXBpY2tlckkxOG4gfSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5pbXBvcnQgeyBUcmFuc2xhdGlvbldpZHRoIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IHR5cGUgRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHMgPSBQYXJ0aWFsPHtcblx0ZGF5VGVtcGxhdGVEYXRhOiBOZ2JEYXlUZW1wbGF0ZURhdGE7XG5cdGRpc3BsYXlNb250aHM6IG51bWJlcjtcblx0ZGlzYWJsZWQ6IGJvb2xlYW47XG5cdGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG5cdGZvY3VzVmlzaWJsZTogYm9vbGVhbjtcblx0bWFya0Rpc2FibGVkOiBOZ2JNYXJrRGlzYWJsZWQ7XG5cdG1heERhdGU6IE5nYkRhdGUgfCBudWxsO1xuXHRtaW5EYXRlOiBOZ2JEYXRlIHwgbnVsbDtcblx0bmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblx0b3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbic7XG5cdHdlZWtkYXlzOiBUcmFuc2xhdGlvbldpZHRoIHwgYm9vbGVhbjtcbn0+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlclNlcnZpY2Uge1xuXHRwcml2YXRlIF9WQUxJREFUT1JTOiB7XG5cdFx0W0sgaW4ga2V5b2YgRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHNdOiAodjogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHNbS10pID0+IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD4gfCB2b2lkO1xuXHR9ID0ge1xuXHRcdGRheVRlbXBsYXRlRGF0YTogKGRheVRlbXBsYXRlRGF0YTogTmdiRGF5VGVtcGxhdGVEYXRhKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fc3RhdGUuZGF5VGVtcGxhdGVEYXRhICE9PSBkYXlUZW1wbGF0ZURhdGEpIHtcblx0XHRcdFx0cmV0dXJuIHsgZGF5VGVtcGxhdGVEYXRhIH07XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkaXNwbGF5TW9udGhzOiAoZGlzcGxheU1vbnRoczogbnVtYmVyKSA9PiB7XG5cdFx0XHRkaXNwbGF5TW9udGhzID0gdG9JbnRlZ2VyKGRpc3BsYXlNb250aHMpO1xuXHRcdFx0aWYgKGlzSW50ZWdlcihkaXNwbGF5TW9udGhzKSAmJiBkaXNwbGF5TW9udGhzID4gMCAmJiB0aGlzLl9zdGF0ZS5kaXNwbGF5TW9udGhzICE9PSBkaXNwbGF5TW9udGhzKSB7XG5cdFx0XHRcdHJldHVybiB7IGRpc3BsYXlNb250aHMgfTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcblx0XHRcdGlmICh0aGlzLl9zdGF0ZS5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHsgZGlzYWJsZWQgfTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGZpcnN0RGF5T2ZXZWVrOiAoZmlyc3REYXlPZldlZWs6IG51bWJlcikgPT4ge1xuXHRcdFx0Zmlyc3REYXlPZldlZWsgPSB0b0ludGVnZXIoZmlyc3REYXlPZldlZWspO1xuXHRcdFx0aWYgKGlzSW50ZWdlcihmaXJzdERheU9mV2VlaykgJiYgZmlyc3REYXlPZldlZWsgPj0gMCAmJiB0aGlzLl9zdGF0ZS5maXJzdERheU9mV2VlayAhPT0gZmlyc3REYXlPZldlZWspIHtcblx0XHRcdFx0cmV0dXJuIHsgZmlyc3REYXlPZldlZWsgfTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGZvY3VzVmlzaWJsZTogKGZvY3VzVmlzaWJsZTogYm9vbGVhbikgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX3N0YXRlLmZvY3VzVmlzaWJsZSAhPT0gZm9jdXNWaXNpYmxlICYmICF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xuXHRcdFx0XHRyZXR1cm4geyBmb2N1c1Zpc2libGUgfTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG1hcmtEaXNhYmxlZDogKG1hcmtEaXNhYmxlZDogTmdiTWFya0Rpc2FibGVkKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fc3RhdGUubWFya0Rpc2FibGVkICE9PSBtYXJrRGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHsgbWFya0Rpc2FibGVkIH07XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRtYXhEYXRlOiAoZGF0ZTogTmdiRGF0ZSB8IG51bGwpID0+IHtcblx0XHRcdGNvbnN0IG1heERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuXHRcdFx0aWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUubWF4RGF0ZSwgbWF4RGF0ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHsgbWF4RGF0ZSB9O1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bWluRGF0ZTogKGRhdGU6IE5nYkRhdGUgfCBudWxsKSA9PiB7XG5cdFx0XHRjb25zdCBtaW5EYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcblx0XHRcdGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLm1pbkRhdGUsIG1pbkRhdGUpKSB7XG5cdFx0XHRcdHJldHVybiB7IG1pbkRhdGUgfTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG5hdmlnYXRpb246IChuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fc3RhdGUubmF2aWdhdGlvbiAhPT0gbmF2aWdhdGlvbikge1xuXHRcdFx0XHRyZXR1cm4geyBuYXZpZ2F0aW9uIH07XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvdXRzaWRlRGF5czogKG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fc3RhdGUub3V0c2lkZURheXMgIT09IG91dHNpZGVEYXlzKSB7XG5cdFx0XHRcdHJldHVybiB7IG91dHNpZGVEYXlzIH07XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR3ZWVrZGF5czogKHdlZWtkYXlzOiBib29sZWFuIHwgVHJhbnNsYXRpb25XaWR0aCkgPT4ge1xuXHRcdFx0Y29uc3Qgd2Vla2RheVdpZHRoID0gd2Vla2RheXMgPT09IHRydWUgfHwgd2Vla2RheXMgPT09IGZhbHNlID8gVHJhbnNsYXRpb25XaWR0aC5TaG9ydCA6IHdlZWtkYXlzO1xuXHRcdFx0Y29uc3Qgd2Vla2RheXNWaXNpYmxlID0gd2Vla2RheXMgPT09IHRydWUgfHwgd2Vla2RheXMgPT09IGZhbHNlID8gd2Vla2RheXMgOiB0cnVlO1xuXHRcdFx0aWYgKHRoaXMuX3N0YXRlLndlZWtkYXlXaWR0aCAhPT0gd2Vla2RheVdpZHRoIHx8IHRoaXMuX3N0YXRlLndlZWtkYXlzVmlzaWJsZSAhPT0gd2Vla2RheXNWaXNpYmxlKSB7XG5cdFx0XHRcdHJldHVybiB7IHdlZWtkYXlXaWR0aCwgd2Vla2RheXNWaXNpYmxlIH07XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcblxuXHRwcml2YXRlIF9tb2RlbCQgPSBuZXcgU3ViamVjdDxEYXRlcGlja2VyVmlld01vZGVsPigpO1xuXG5cdHByaXZhdGUgX2RhdGVTZWxlY3QkID0gbmV3IFN1YmplY3Q8TmdiRGF0ZT4oKTtcblxuXHRwcml2YXRlIF9zdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcblx0XHRkYXlUZW1wbGF0ZURhdGE6IG51bGwsXG5cdFx0bWFya0Rpc2FibGVkOiBudWxsLFxuXHRcdG1heERhdGU6IG51bGwsXG5cdFx0bWluRGF0ZTogbnVsbCxcblx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0ZGlzcGxheU1vbnRoczogMSxcblx0XHRmaXJzdERhdGU6IG51bGwsXG5cdFx0Zmlyc3REYXlPZldlZWs6IDEsXG5cdFx0bGFzdERhdGU6IG51bGwsXG5cdFx0Zm9jdXNEYXRlOiBudWxsLFxuXHRcdGZvY3VzVmlzaWJsZTogZmFsc2UsXG5cdFx0bW9udGhzOiBbXSxcblx0XHRuYXZpZ2F0aW9uOiAnc2VsZWN0Jyxcblx0XHRvdXRzaWRlRGF5czogJ3Zpc2libGUnLFxuXHRcdHByZXZEaXNhYmxlZDogZmFsc2UsXG5cdFx0bmV4dERpc2FibGVkOiBmYWxzZSxcblx0XHRzZWxlY3RlZERhdGU6IG51bGwsXG5cdFx0c2VsZWN0Qm94ZXM6IHsgeWVhcnM6IFtdLCBtb250aHM6IFtdIH0sXG5cdFx0d2Vla2RheVdpZHRoOiBUcmFuc2xhdGlvbldpZHRoLlNob3J0LFxuXHRcdHdlZWtkYXlzVmlzaWJsZTogdHJ1ZSxcblx0fTtcblxuXHRnZXQgbW9kZWwkKCk6IE9ic2VydmFibGU8RGF0ZXBpY2tlclZpZXdNb2RlbD4ge1xuXHRcdHJldHVybiB0aGlzLl9tb2RlbCQucGlwZShmaWx0ZXIoKG1vZGVsKSA9PiBtb2RlbC5tb250aHMubGVuZ3RoID4gMCkpO1xuXHR9XG5cblx0Z2V0IGRhdGVTZWxlY3QkKCk6IE9ic2VydmFibGU8TmdiRGF0ZT4ge1xuXHRcdHJldHVybiB0aGlzLl9kYXRlU2VsZWN0JC5waXBlKGZpbHRlcigoZGF0ZSkgPT4gZGF0ZSAhPT0gbnVsbCkpO1xuXHR9XG5cblx0c2V0KG9wdGlvbnM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzKSB7XG5cdFx0bGV0IHBhdGNoID0gT2JqZWN0LmtleXMob3B0aW9ucylcblx0XHRcdC5tYXAoKGtleSkgPT4gdGhpcy5fVkFMSURBVE9SU1trZXldKG9wdGlvbnNba2V5XSkpXG5cdFx0XHQucmVkdWNlKChvYmosIHBhcnQpID0+ICh7IC4uLm9iaiwgLi4ucGFydCB9KSwge30pO1xuXG5cdFx0aWYgKE9iamVjdC5rZXlzKHBhdGNoKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLl9uZXh0U3RhdGUocGF0Y2gpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhciwgcHJpdmF0ZSBfaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XG5cblx0Zm9jdXMoZGF0ZT86IE5nYkRhdGUgfCBudWxsKSB7XG5cdFx0Y29uc3QgZm9jdXNlZERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuXHRcdGlmIChmb2N1c2VkRGF0ZSAhPSBudWxsICYmICF0aGlzLl9zdGF0ZS5kaXNhYmxlZCAmJiBpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgZm9jdXNlZERhdGUpKSB7XG5cdFx0XHR0aGlzLl9uZXh0U3RhdGUoeyBmb2N1c0RhdGU6IGRhdGUgfSk7XG5cdFx0fVxuXHR9XG5cblx0Zm9jdXNTZWxlY3QoKSB7XG5cdFx0aWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcblx0XHRcdHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cblx0b3BlbihkYXRlPzogTmdiRGF0ZSB8IG51bGwpIHtcblx0XHRjb25zdCBmaXJzdERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIHRoaXMuX2NhbGVuZGFyLmdldFRvZGF5KCkpO1xuXHRcdGlmIChcblx0XHRcdGZpcnN0RGF0ZSAhPSBudWxsICYmXG5cdFx0XHQhdGhpcy5fc3RhdGUuZGlzYWJsZWQgJiZcblx0XHRcdCghdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IGlzQ2hhbmdlZE1vbnRoKHRoaXMuX3N0YXRlLmZpcnN0RGF0ZSwgZmlyc3REYXRlKSlcblx0XHQpIHtcblx0XHRcdHRoaXMuX25leHRTdGF0ZSh7IGZpcnN0RGF0ZSB9KTtcblx0XHR9XG5cdH1cblxuXHRzZWxlY3QoZGF0ZT86IE5nYkRhdGUgfCBudWxsLCBvcHRpb25zOiB7IGVtaXRFdmVudD86IGJvb2xlYW4gfSA9IHt9KSB7XG5cdFx0Y29uc3Qgc2VsZWN0ZWREYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcblx0XHRpZiAoc2VsZWN0ZWREYXRlICE9IG51bGwgJiYgIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XG5cdFx0XHRpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5zZWxlY3RlZERhdGUsIHNlbGVjdGVkRGF0ZSkpIHtcblx0XHRcdFx0dGhpcy5fbmV4dFN0YXRlKHsgc2VsZWN0ZWREYXRlIH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5lbWl0RXZlbnQgJiYgaXNEYXRlU2VsZWN0YWJsZShzZWxlY3RlZERhdGUsIHRoaXMuX3N0YXRlKSkge1xuXHRcdFx0XHR0aGlzLl9kYXRlU2VsZWN0JC5uZXh0KHNlbGVjdGVkRGF0ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dG9WYWxpZERhdGUoZGF0ZT86IE5nYkRhdGVTdHJ1Y3QgfCBudWxsLCBkZWZhdWx0VmFsdWU/OiBOZ2JEYXRlIHwgbnVsbCk6IE5nYkRhdGUgfCBudWxsIHtcblx0XHRjb25zdCBuZ2JEYXRlID0gTmdiRGF0ZS5mcm9tKGRhdGUpO1xuXHRcdGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZGVmYXVsdFZhbHVlID0gdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2NhbGVuZGFyLmlzVmFsaWQobmdiRGF0ZSkgPyBuZ2JEYXRlIDogZGVmYXVsdFZhbHVlO1xuXHR9XG5cblx0Z2V0TW9udGgoc3RydWN0OiBOZ2JEYXRlU3RydWN0KSB7XG5cdFx0Zm9yIChsZXQgbW9udGggb2YgdGhpcy5fc3RhdGUubW9udGhzKSB7XG5cdFx0XHRpZiAoc3RydWN0Lm1vbnRoID09PSBtb250aC5udW1iZXIgJiYgc3RydWN0LnllYXIgPT09IG1vbnRoLnllYXIpIHtcblx0XHRcdFx0cmV0dXJuIG1vbnRoO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aHJvdyBuZXcgRXJyb3IoYG1vbnRoICR7c3RydWN0Lm1vbnRofSBvZiB5ZWFyICR7c3RydWN0LnllYXJ9IG5vdCBmb3VuZGApO1xuXHR9XG5cblx0cHJpdmF0ZSBfbmV4dFN0YXRlKHBhdGNoOiBQYXJ0aWFsPERhdGVwaWNrZXJWaWV3TW9kZWw+KSB7XG5cdFx0Y29uc3QgbmV3U3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZShwYXRjaCk7XG5cdFx0dGhpcy5fcGF0Y2hDb250ZXh0cyhuZXdTdGF0ZSk7XG5cdFx0dGhpcy5fc3RhdGUgPSBuZXdTdGF0ZTtcblx0XHR0aGlzLl9tb2RlbCQubmV4dCh0aGlzLl9zdGF0ZSk7XG5cdH1cblxuXHRwcml2YXRlIF9wYXRjaENvbnRleHRzKHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7XG5cdFx0Y29uc3QgeyBtb250aHMsIGRpc3BsYXlNb250aHMsIHNlbGVjdGVkRGF0ZSwgZm9jdXNEYXRlLCBmb2N1c1Zpc2libGUsIGRpc2FibGVkLCBvdXRzaWRlRGF5cyB9ID0gc3RhdGU7XG5cdFx0c3RhdGUubW9udGhzLmZvckVhY2goKG1vbnRoKSA9PiB7XG5cdFx0XHRtb250aC53ZWVrcy5mb3JFYWNoKCh3ZWVrKSA9PiB7XG5cdFx0XHRcdHdlZWsuZGF5cy5mb3JFYWNoKChkYXkpID0+IHtcblx0XHRcdFx0XHQvLyBwYXRjaCBmb2N1cyBmbGFnXG5cdFx0XHRcdFx0aWYgKGZvY3VzRGF0ZSkge1xuXHRcdFx0XHRcdFx0ZGF5LmNvbnRleHQuZm9jdXNlZCA9IGZvY3VzRGF0ZS5lcXVhbHMoZGF5LmRhdGUpICYmIGZvY3VzVmlzaWJsZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBjYWxjdWxhdGluZyB0YWJpbmRleFxuXHRcdFx0XHRcdGRheS50YWJpbmRleCA9XG5cdFx0XHRcdFx0XHQhZGlzYWJsZWQgJiYgZm9jdXNEYXRlICYmIGRheS5kYXRlLmVxdWFscyhmb2N1c0RhdGUpICYmIGZvY3VzRGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyID8gMCA6IC0xO1xuXG5cdFx0XHRcdFx0Ly8gb3ZlcnJpZGUgY29udGV4dCBkaXNhYmxlZFxuXHRcdFx0XHRcdGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0ZGF5LmNvbnRleHQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIHBhdGNoIHNlbGVjdGlvbiBmbGFnXG5cdFx0XHRcdFx0aWYgKHNlbGVjdGVkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRkYXkuY29udGV4dC5zZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZSAhPT0gbnVsbCAmJiBzZWxlY3RlZERhdGUuZXF1YWxzKGRheS5kYXRlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyB2aXNpYmlsaXR5XG5cdFx0XHRcdFx0aWYgKG1vbnRoLm51bWJlciAhPT0gZGF5LmRhdGUubW9udGgpIHtcblx0XHRcdFx0XHRcdGRheS5oaWRkZW4gPVxuXHRcdFx0XHRcdFx0XHRvdXRzaWRlRGF5cyA9PT0gJ2hpZGRlbicgfHxcblx0XHRcdFx0XHRcdFx0b3V0c2lkZURheXMgPT09ICdjb2xsYXBzZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChkaXNwbGF5TW9udGhzID4gMSAmJlxuXHRcdFx0XHRcdFx0XHRcdGRheS5kYXRlLmFmdGVyKG1vbnRoc1swXS5maXJzdERhdGUpICYmXG5cdFx0XHRcdFx0XHRcdFx0ZGF5LmRhdGUuYmVmb3JlKG1vbnRoc1tkaXNwbGF5TW9udGhzIC0gMV0ubGFzdERhdGUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGVTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPik6IERhdGVwaWNrZXJWaWV3TW9kZWwge1xuXHRcdC8vIHBhdGNoaW5nIGZpZWxkc1xuXHRcdGNvbnN0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fc3RhdGUsIHBhdGNoKTtcblxuXHRcdGxldCBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XG5cblx0XHQvLyBtaW4vbWF4IGRhdGVzIGNoYW5nZWRcblx0XHRpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCkge1xuXHRcdFx0Y2hlY2tNaW5CZWZvcmVNYXgoc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG5cdFx0XHRzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG5cdFx0XHRzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG5cdFx0XHRzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG5cdFx0fVxuXG5cdFx0Ly8gZGlzYWJsZWRcblx0XHRpZiAoJ2Rpc2FibGVkJyBpbiBwYXRjaCkge1xuXHRcdFx0c3RhdGUuZm9jdXNWaXNpYmxlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaW5pdGlhbCByZWJ1aWxkIHZpYSAnc2VsZWN0KCknXG5cdFx0aWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmIHRoaXMuX3N0YXRlLm1vbnRocy5sZW5ndGggPT09IDApIHtcblx0XHRcdHN0YXJ0RGF0ZSA9IHN0YXRlLnNlbGVjdGVkRGF0ZTtcblx0XHR9XG5cblx0XHQvLyB0ZXJtaW5hdGUgZWFybHkgaWYgb25seSBmb2N1cyB2aXNpYmlsaXR5IHdhcyBjaGFuZ2VkXG5cdFx0aWYgKCdmb2N1c1Zpc2libGUnIGluIHBhdGNoKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMgZGF0ZSBjaGFuZ2VkXG5cdFx0aWYgKCdmb2N1c0RhdGUnIGluIHBhdGNoKSB7XG5cdFx0XHRzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG5cdFx0XHRzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG5cblx0XHRcdC8vIG5vdGhpbmcgdG8gcmVidWlsZCBpZiBvbmx5IGZvY3VzIGNoYW5nZWQgYW5kIGl0IGlzIHN0aWxsIHZpc2libGVcblx0XHRcdGlmIChcblx0XHRcdFx0c3RhdGUubW9udGhzLmxlbmd0aCAhPT0gMCAmJlxuXHRcdFx0XHRzdGF0ZS5mb2N1c0RhdGUgJiZcblx0XHRcdFx0IXN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSAmJlxuXHRcdFx0XHQhc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBmaXJzdCBkYXRlIGNoYW5nZWRcblx0XHRpZiAoJ2ZpcnN0RGF0ZScgaW4gcGF0Y2gpIHtcblx0XHRcdHN0YXRlLmZpcnN0RGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcblx0XHRcdHN0YXJ0RGF0ZSA9IHN0YXRlLmZpcnN0RGF0ZTtcblx0XHR9XG5cblx0XHQvLyByZWJ1aWxkaW5nIG1vbnRoc1xuXHRcdGlmIChzdGFydERhdGUpIHtcblx0XHRcdGNvbnN0IGZvcmNlUmVidWlsZCA9XG5cdFx0XHRcdCdkYXlUZW1wbGF0ZURhdGEnIGluIHBhdGNoIHx8XG5cdFx0XHRcdCdmaXJzdERheU9mV2VlaycgaW4gcGF0Y2ggfHxcblx0XHRcdFx0J21hcmtEaXNhYmxlZCcgaW4gcGF0Y2ggfHxcblx0XHRcdFx0J21pbkRhdGUnIGluIHBhdGNoIHx8XG5cdFx0XHRcdCdtYXhEYXRlJyBpbiBwYXRjaCB8fFxuXHRcdFx0XHQnZGlzYWJsZWQnIGluIHBhdGNoIHx8XG5cdFx0XHRcdCdvdXRzaWRlRGF5cycgaW4gcGF0Y2ggfHxcblx0XHRcdFx0J3dlZWtkYXlzVmlzaWJsZScgaW4gcGF0Y2g7XG5cblx0XHRcdGNvbnN0IG1vbnRocyA9IGJ1aWxkTW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGFydERhdGUsIHN0YXRlLCB0aGlzLl9pMThuLCBmb3JjZVJlYnVpbGQpO1xuXG5cdFx0XHQvLyB1cGRhdGluZyBtb250aHMgYW5kIGJvdW5kYXJ5IGRhdGVzXG5cdFx0XHRzdGF0ZS5tb250aHMgPSBtb250aHM7XG5cdFx0XHRzdGF0ZS5maXJzdERhdGUgPSBtb250aHNbMF0uZmlyc3REYXRlO1xuXHRcdFx0c3RhdGUubGFzdERhdGUgPSBtb250aHNbbW9udGhzLmxlbmd0aCAtIDFdLmxhc3REYXRlO1xuXG5cdFx0XHQvLyByZXNldCBzZWxlY3RlZCBkYXRlIGlmICdtYXJrRGlzYWJsZWQnIHJldHVybnMgdHJ1ZVxuXHRcdFx0aWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmICFpc0RhdGVTZWxlY3RhYmxlKHN0YXRlLnNlbGVjdGVkRGF0ZSwgc3RhdGUpKSB7XG5cdFx0XHRcdHN0YXRlLnNlbGVjdGVkRGF0ZSA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGFkanVzdGluZyBmb2N1cyBhZnRlciBtb250aHMgd2VyZSBidWlsdFxuXHRcdFx0aWYgKCdmaXJzdERhdGUnIGluIHBhdGNoKSB7XG5cdFx0XHRcdGlmICghc3RhdGUuZm9jdXNEYXRlIHx8IHN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSB8fCBzdGF0ZS5mb2N1c0RhdGUuYWZ0ZXIoc3RhdGUubGFzdERhdGUpKSB7XG5cdFx0XHRcdFx0c3RhdGUuZm9jdXNEYXRlID0gc3RhcnREYXRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGFkanVzdGluZyBtb250aHMveWVhcnMgZm9yIHRoZSBzZWxlY3QgYm94IG5hdmlnYXRpb25cblx0XHRcdGNvbnN0IHllYXJDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUueWVhciAhPT0gc3RhdGUuZmlyc3REYXRlLnllYXI7XG5cdFx0XHRjb25zdCBtb250aENoYW5nZWQgPSAhdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IHRoaXMuX3N0YXRlLmZpcnN0RGF0ZS5tb250aCAhPT0gc3RhdGUuZmlyc3REYXRlLm1vbnRoO1xuXHRcdFx0aWYgKHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSB7XG5cdFx0XHRcdC8vIHllYXJzIC0+ICBib3VuZGFyaWVzIChtaW4vbWF4IHdlcmUgY2hhbmdlZClcblx0XHRcdFx0aWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMubGVuZ3RoID09PSAwIHx8IHllYXJDaGFuZ2VkKSB7XG5cdFx0XHRcdFx0c3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMgPSBnZW5lcmF0ZVNlbGVjdEJveFllYXJzKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBtb250aHMgLT4gd2hlbiBjdXJyZW50IHllYXIgb3IgYm91bmRhcmllcyBjaGFuZ2Vcblx0XHRcdFx0aWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xuXHRcdFx0XHRcdHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocyA9IGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzKFxuXHRcdFx0XHRcdFx0dGhpcy5fY2FsZW5kYXIsXG5cdFx0XHRcdFx0XHRzdGF0ZS5maXJzdERhdGUsXG5cdFx0XHRcdFx0XHRzdGF0ZS5taW5EYXRlLFxuXHRcdFx0XHRcdFx0c3RhdGUubWF4RGF0ZSxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdGF0ZS5zZWxlY3RCb3hlcyA9IHsgeWVhcnM6IFtdLCBtb250aHM6IFtdIH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIHVwZGF0aW5nIG5hdmlnYXRpb24gYXJyb3dzIC0+IGJvdW5kYXJpZXMgY2hhbmdlIChtaW4vbWF4KSBvciBtb250aC95ZWFyIGNoYW5nZXNcblx0XHRcdGlmIChcblx0XHRcdFx0KHN0YXRlLm5hdmlnYXRpb24gPT09ICdhcnJvd3MnIHx8IHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSAmJlxuXHRcdFx0XHQobW9udGhDaGFuZ2VkIHx8IHllYXJDaGFuZ2VkIHx8ICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaClcblx0XHRcdCkge1xuXHRcdFx0XHRzdGF0ZS5wcmV2RGlzYWJsZWQgPSBzdGF0ZS5kaXNhYmxlZCB8fCBwcmV2TW9udGhEaXNhYmxlZCh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlKTtcblx0XHRcdFx0c3RhdGUubmV4dERpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgbmV4dE1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmxhc3REYXRlLCBzdGF0ZS5tYXhEYXRlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cbn1cbiJdfQ==