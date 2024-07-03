import { YearsCalendarViewModel } from '../models';
export interface FlagYearsCalendarOptions {
    isDisabled: boolean;
    minDate: Date;
    maxDate: Date;
    hoveredYear: Date;
    selectedDate: Date;
    selectedRange: Date[];
    datesDisabled: Date[];
    datesEnabled: Date[];
    displayMonths: number;
    yearIndex: number;
}
export declare function flagYearsCalendar(yearsCalendar: YearsCalendarViewModel, options: Partial<FlagYearsCalendarOptions>): YearsCalendarViewModel;
