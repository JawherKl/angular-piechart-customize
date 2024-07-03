import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent, CalendarCellViewModel, CellHoverEvent, YearsCalendarViewModel } from '../../models';
import * as i0 from "@angular/core";
export declare class BsYearsCalendarViewComponent {
    calendar: YearsCalendarViewModel;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<CalendarCellViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    navigateTo(event: BsNavigationDirection): void;
    viewYear(year: CalendarCellViewModel): void;
    hoverYear(cell: CalendarCellViewModel, isHovered: boolean): void;
    changeViewMode(event: BsDatepickerViewMode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsYearsCalendarViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsYearsCalendarViewComponent, "bs-years-calendar-view", never, { "calendar": { "alias": "calendar"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; "onSelect": "onSelect"; "onHover": "onHover"; }, never, never, false, never>;
}
