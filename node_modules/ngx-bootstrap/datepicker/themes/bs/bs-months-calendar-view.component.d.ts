import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent, CellHoverEvent, MonthsCalendarViewModel, CalendarCellViewModel } from '../../models';
import * as i0 from "@angular/core";
export declare class BsMonthCalendarViewComponent {
    calendar: MonthsCalendarViewModel;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<CalendarCellViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    navigateTo(event: BsNavigationDirection): void;
    viewMonth(month: CalendarCellViewModel): void;
    hoverMonth(cell: CalendarCellViewModel, isHovered: boolean): void;
    changeViewMode(event: BsDatepickerViewMode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsMonthCalendarViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsMonthCalendarViewComponent, "bs-month-calendar-view", never, { "calendar": { "alias": "calendar"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; "onSelect": "onSelect"; "onHover": "onHover"; }, never, never, false, never>;
}
