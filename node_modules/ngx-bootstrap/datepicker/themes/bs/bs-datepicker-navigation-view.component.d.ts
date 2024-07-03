import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, NavigationViewModel } from '../../models';
import * as i0 from "@angular/core";
export declare class BsDatepickerNavigationViewComponent {
    calendar: NavigationViewModel;
    isDisabled: boolean;
    onNavigate: EventEmitter<BsNavigationDirection>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    navTo(down: boolean): void;
    view(viewMode: BsDatepickerViewMode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerNavigationViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDatepickerNavigationViewComponent, "bs-datepicker-navigation-view", never, { "calendar": { "alias": "calendar"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; }, never, never, false, never>;
}
