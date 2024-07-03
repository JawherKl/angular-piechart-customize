import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TimepickerModule, TimepickerActions } from 'ngx-bootstrap/timepicker';
import { BsDatepickerInputDirective } from './bs-datepicker-input.directive';
import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsDaterangepickerInputDirective } from './bs-daterangepicker-input.directive';
import { BsDaterangepickerDirective } from './bs-daterangepicker.component';
import { BsDatepickerInlineDirective } from './bs-datepicker-inline.component';
import { BsLocaleService } from './bs-locale.service';
import { BsDatepickerActions } from './reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from './reducer/bs-datepicker.effects';
import { BsDatepickerStore } from './reducer/bs-datepicker.store';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { BsDaterangepickerContainerComponent } from './themes/bs/bs-daterangepicker-container.component';
import { BsDatepickerInlineContainerComponent } from './themes/bs/bs-datepicker-inline-container.component';
import { BsDaterangepickerInlineContainerComponent } from './themes/bs/bs-daterangepicker-inline-container.component';
import { BsDaterangepickerInlineDirective } from './bs-daterangepicker-inline.component';
import { BsCalendarLayoutComponent } from './themes/bs/bs-calendar-layout.component';
import { BsCurrentDateViewComponent } from './themes/bs/bs-current-date-view.component';
import { BsCustomDatesViewComponent } from './themes/bs/bs-custom-dates-view.component';
import { BsDatepickerDayDecoratorComponent } from './themes/bs/bs-datepicker-day-decorator.directive';
import { BsDatepickerNavigationViewComponent } from './themes/bs/bs-datepicker-navigation-view.component';
import { BsDaysCalendarViewComponent } from './themes/bs/bs-days-calendar-view.component';
import { BsMonthCalendarViewComponent } from './themes/bs/bs-months-calendar-view.component';
import { BsTimepickerViewComponent } from './themes/bs/bs-timepicker-view.component';
import { BsYearsCalendarViewComponent } from './themes/bs/bs-years-calendar-view.component';
import * as i0 from "@angular/core";
export class BsDatepickerModule {
    static forRoot() {
        return {
            ngModule: BsDatepickerModule,
            providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsDatepickerStore,
                BsDatepickerActions,
                BsDatepickerEffects,
                BsLocaleService,
                TimepickerActions
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.4", ngImport: i0, type: BsDatepickerModule, declarations: [BsCalendarLayoutComponent,
            BsCurrentDateViewComponent,
            BsCustomDatesViewComponent,
            BsDatepickerDayDecoratorComponent,
            BsDatepickerNavigationViewComponent,
            BsDaysCalendarViewComponent,
            BsMonthCalendarViewComponent,
            BsTimepickerViewComponent,
            BsYearsCalendarViewComponent,
            BsDatepickerContainerComponent,
            BsDatepickerDirective,
            BsDatepickerInlineContainerComponent,
            BsDatepickerInlineDirective,
            BsDatepickerInputDirective,
            BsDaterangepickerContainerComponent,
            BsDaterangepickerDirective,
            BsDaterangepickerInlineContainerComponent,
            BsDaterangepickerInlineDirective,
            BsDaterangepickerInputDirective], imports: [CommonModule, TooltipModule, TimepickerModule], exports: [BsDatepickerContainerComponent,
            BsDatepickerDirective,
            BsDatepickerInlineContainerComponent,
            BsDatepickerInlineDirective,
            BsDatepickerInputDirective,
            BsDaterangepickerContainerComponent,
            BsDaterangepickerDirective,
            BsDaterangepickerInlineContainerComponent,
            BsDaterangepickerInlineDirective,
            BsDaterangepickerInputDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDatepickerModule, imports: [CommonModule, TooltipModule, TimepickerModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, TooltipModule, TimepickerModule],
                    declarations: [
                        BsCalendarLayoutComponent,
                        BsCurrentDateViewComponent,
                        BsCustomDatesViewComponent,
                        BsDatepickerDayDecoratorComponent,
                        BsDatepickerNavigationViewComponent,
                        BsDaysCalendarViewComponent,
                        BsMonthCalendarViewComponent,
                        BsTimepickerViewComponent,
                        BsYearsCalendarViewComponent,
                        BsDatepickerContainerComponent,
                        BsDatepickerDirective,
                        BsDatepickerInlineContainerComponent,
                        BsDatepickerInlineDirective,
                        BsDatepickerInputDirective,
                        BsDaterangepickerContainerComponent,
                        BsDaterangepickerDirective,
                        BsDaterangepickerInlineContainerComponent,
                        BsDaterangepickerInlineDirective,
                        BsDaterangepickerInputDirective
                    ],
                    exports: [
                        BsDatepickerContainerComponent,
                        BsDatepickerDirective,
                        BsDatepickerInlineContainerComponent,
                        BsDatepickerInlineDirective,
                        BsDatepickerInputDirective,
                        BsDaterangepickerContainerComponent,
                        BsDaterangepickerDirective,
                        BsDaterangepickerInlineContainerComponent,
                        BsDaterangepickerInlineDirective,
                        BsDaterangepickerInputDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9icy1kYXRlcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9FLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTVFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsbUNBQW1DLEVBQUUs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QkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlcic7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcblxuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvdG9vbHRpcCc7XG5pbXBvcnQgeyBUaW1lcGlja2VyTW9kdWxlLCBUaW1lcGlja2VyQWN0aW9ucyB9IGZyb20gJ25neC1ib290c3RyYXAvdGltZXBpY2tlcic7XG5cbmltcG9ydCB7IEJzRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRhdGVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJzRGF0ZXJhbmdlcGlja2VySW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRhdGVyYW5nZXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQnNEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRhdGVyYW5nZXBpY2tlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJJbmxpbmVEaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRhdGVwaWNrZXItaW5saW5lLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEJzTG9jYWxlU2VydmljZSB9IGZyb20gJy4vYnMtbG9jYWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWN0aW9ucyB9IGZyb20gJy4vcmVkdWNlci9icy1kYXRlcGlja2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyRWZmZWN0cyB9IGZyb20gJy4vcmVkdWNlci9icy1kYXRlcGlja2VyLmVmZmVjdHMnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyU3RvcmUgfSBmcm9tICcuL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5zdG9yZSc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnNEYXRlcmFuZ2VwaWNrZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RoZW1lcy9icy9icy1kYXRlcmFuZ2VwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItaW5saW5lLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnNEYXRlcmFuZ2VwaWNrZXJJbmxpbmVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RoZW1lcy9icy9icy1kYXRlcmFuZ2VwaWNrZXItaW5saW5lLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBCc0RhdGVyYW5nZXBpY2tlcklubGluZURpcmVjdGl2ZSB9IGZyb20gJy4vYnMtZGF0ZXJhbmdlcGlja2VyLWlubGluZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBCc0NhbGVuZGFyTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtY2FsZW5kYXItbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCc0N1cnJlbnREYXRlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWN1cnJlbnQtZGF0ZS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCc0N1c3RvbURhdGVzVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWN1c3RvbS1kYXRlcy12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJEYXlEZWNvcmF0b3JDb21wb25lbnQgfSBmcm9tICcuL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLWRheS1kZWNvcmF0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlck5hdmlnYXRpb25WaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEJzRGF5c0NhbGVuZGFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWRheXMtY2FsZW5kYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnNNb250aENhbGVuZGFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLW1vbnRocy1jYWxlbmRhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCc1RpbWVwaWNrZXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtdGltZXBpY2tlci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCc1llYXJzQ2FsZW5kYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMteWVhcnMtY2FsZW5kYXItdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFRpbWVwaWNrZXJNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBCc0NhbGVuZGFyTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBCc0N1cnJlbnREYXRlVmlld0NvbXBvbmVudCxcbiAgICAgICAgQnNDdXN0b21EYXRlc1ZpZXdDb21wb25lbnQsXG4gICAgICAgIEJzRGF0ZXBpY2tlckRheURlY29yYXRvckNvbXBvbmVudCxcbiAgICAgICAgQnNEYXRlcGlja2VyTmF2aWdhdGlvblZpZXdDb21wb25lbnQsXG4gICAgICAgIEJzRGF5c0NhbGVuZGFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgQnNNb250aENhbGVuZGFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgQnNUaW1lcGlja2VyVmlld0NvbXBvbmVudCxcbiAgICAgICAgQnNZZWFyc0NhbGVuZGFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgQnNEYXRlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBCc0RhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgQnNEYXRlcGlja2VySW5saW5lRGlyZWN0aXZlLFxuICAgICAgICBCc0RhdGVwaWNrZXJJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgQnNEYXRlcmFuZ2VwaWNrZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIEJzRGF0ZXJhbmdlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBCc0RhdGVyYW5nZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgQnNEYXRlcmFuZ2VwaWNrZXJJbmxpbmVEaXJlY3RpdmUsXG4gICAgICAgIEJzRGF0ZXJhbmdlcGlja2VySW5wdXREaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQnNEYXRlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBCc0RhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgQnNEYXRlcGlja2VySW5saW5lRGlyZWN0aXZlLFxuICAgICAgICBCc0RhdGVwaWNrZXJJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgQnNEYXRlcmFuZ2VwaWNrZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIEJzRGF0ZXJhbmdlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBCc0RhdGVyYW5nZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgQnNEYXRlcmFuZ2VwaWNrZXJJbmxpbmVEaXJlY3RpdmUsXG4gICAgICAgIEJzRGF0ZXJhbmdlcGlja2VySW5wdXREaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnNEYXRlcGlja2VyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCc0RhdGVwaWNrZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcbiAgICAgICAgUG9zaXRpb25pbmdTZXJ2aWNlLFxuICAgICAgICBCc0RhdGVwaWNrZXJTdG9yZSxcbiAgICAgICAgQnNEYXRlcGlja2VyQWN0aW9ucyxcbiAgICAgICAgQnNEYXRlcGlja2VyRWZmZWN0cyxcbiAgICAgICAgQnNMb2NhbGVTZXJ2aWNlLFxuICAgICAgICBUaW1lcGlja2VyQWN0aW9uc1xuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==