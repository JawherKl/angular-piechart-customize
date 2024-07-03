import { MonthsCalendarViewModel } from '../models';
export interface FlagMonthCalendarOptions {
    isDisabled: boolean;
    minDate: Date;
    maxDate: Date;
    hoveredMonth: Date;
    selectedDate: Date;
    selectedRange: Date[];
    datesDisabled: Date[];
    datesEnabled: Date[];
    displayMonths: number;
    monthIndex: number;
}
export declare function flagMonthsCalendar(monthCalendar: MonthsCalendarViewModel, options: Partial<FlagMonthCalendarOptions>): MonthsCalendarViewModel;
