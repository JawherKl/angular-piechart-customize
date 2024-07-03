import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent, CellHoverEvent, DatepickerRenderOptions, DaysCalendarViewModel, DayViewModel, WeekViewModel } from '../../models';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import * as i0 from "@angular/core";
export declare class BsDaysCalendarViewComponent {
    private _config;
    calendar: DaysCalendarViewModel;
    options?: DatepickerRenderOptions | null;
    isDisabled?: boolean;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<DayViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    onHoverWeek: EventEmitter<WeekViewModel>;
    isWeekHovered?: boolean;
    isiOS: boolean;
    isShowTooltip?: boolean;
    constructor(_config: BsDatepickerConfig);
    navigateTo(event: BsNavigationDirection): void;
    changeViewMode(event: BsDatepickerViewMode): void;
    selectDay(event: DayViewModel): void;
    selectWeek(week: WeekViewModel): void;
    weekHoverHandler(cell: WeekViewModel, isHovered: boolean): void;
    hoverDay(cell: DayViewModel, isHovered: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaysCalendarViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDaysCalendarViewComponent, "bs-days-calendar-view", never, { "calendar": { "alias": "calendar"; "required": false; }; "options": { "alias": "options"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; "onSelect": "onSelect"; "onHover": "onHover"; "onHoverWeek": "onHoverWeek"; }, never, never, false, never>;
}
