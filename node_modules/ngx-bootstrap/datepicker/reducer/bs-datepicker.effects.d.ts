import { Observable } from 'rxjs';
import { BsDatepickerAbstractComponent } from '../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../bs-datepicker.config';
import { BsLocaleService } from '../bs-locale.service';
import { BsDatepickerViewMode, DatepickerDateCustomClasses, DatepickerDateTooltipText, DatepickerRenderOptions, DaysCalendarViewModel, MonthsCalendarViewModel, YearsCalendarViewModel } from '../models';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { BsDatepickerStore } from './bs-datepicker.store';
import * as i0 from "@angular/core";
export declare class BsDatepickerEffects {
    private _actions;
    private _localeService;
    viewMode?: Observable<BsDatepickerViewMode>;
    daysCalendar?: Observable<DaysCalendarViewModel[]>;
    monthsCalendar?: Observable<MonthsCalendarViewModel[]>;
    yearsCalendar?: Observable<YearsCalendarViewModel[]>;
    options?: Observable<DatepickerRenderOptions>;
    private _store?;
    private _subs;
    constructor(_actions: BsDatepickerActions, _localeService: BsLocaleService);
    init(_bsDatepickerStore: BsDatepickerStore): BsDatepickerEffects;
    /** setters */
    setValue(value?: Date): void;
    setRangeValue(value?: (Date | undefined)[] | undefined): void;
    setMinDate(value?: Date): BsDatepickerEffects;
    setMaxDate(value?: Date): BsDatepickerEffects;
    setDaysDisabled(value?: number[]): BsDatepickerEffects;
    setDatesDisabled(value?: Date[]): BsDatepickerEffects;
    setDatesEnabled(value?: Date[]): BsDatepickerEffects;
    setDisabled(value?: boolean): BsDatepickerEffects;
    setDateCustomClasses(value?: DatepickerDateCustomClasses[]): BsDatepickerEffects;
    setDateTooltipTexts(value?: DatepickerDateTooltipText[]): BsDatepickerEffects;
    setOptions(_config: BsDatepickerConfig): BsDatepickerEffects;
    /** view to mode bindings */
    setBindings(container: BsDatepickerAbstractComponent): BsDatepickerEffects;
    /** event handlers */
    setEventHandlers(container: BsDatepickerAbstractComponent): BsDatepickerEffects;
    registerDatepickerSideEffects(): BsDatepickerEffects;
    destroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDatepickerEffects>;
}
