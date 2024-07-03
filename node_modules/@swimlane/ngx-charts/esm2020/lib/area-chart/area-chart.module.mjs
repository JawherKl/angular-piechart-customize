import { NgModule } from '@angular/core';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../common/chart-common.module';
import * as i0 from "@angular/core";
export class AreaChartModule {
}
AreaChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AreaChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AreaChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AreaChartModule, declarations: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent], imports: [ChartCommonModule], exports: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent] });
AreaChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AreaChartModule, imports: [[ChartCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: AreaChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule],
                    declarations: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent],
                    exports: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvYXJlYS1jaGFydC9hcmVhLWNoYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQU9sRSxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQUhYLGtCQUFrQixFQUFFLDRCQUE0QixFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixhQURyRyxpQkFBaUIsYUFFakIsa0JBQWtCLEVBQUUsNEJBQTRCLEVBQUUseUJBQXlCLEVBQUUsbUJBQW1COzZHQUUvRixlQUFlLFlBSmpCLENBQUMsaUJBQWlCLENBQUM7MkZBSWpCLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQzVCLFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLDRCQUE0QixFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixDQUFDO29CQUNoSCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSw0QkFBNEIsRUFBRSx5QkFBeUIsRUFBRSxtQkFBbUIsQ0FBQztpQkFDNUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXJlYUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9hcmVhLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50IH0gZnJvbSAnLi9hcmVhLWNoYXJ0LW5vcm1hbGl6ZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFyZWFDaGFydFN0YWNrZWRDb21wb25lbnQgfSBmcm9tICcuL2FyZWEtY2hhcnQtc3RhY2tlZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXJlYVNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vYXJlYS1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBcmVhQ2hhcnRDb21wb25lbnQsIEFyZWFDaGFydE5vcm1hbGl6ZWRDb21wb25lbnQsIEFyZWFDaGFydFN0YWNrZWRDb21wb25lbnQsIEFyZWFTZXJpZXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQXJlYUNoYXJ0Q29tcG9uZW50LCBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50LCBBcmVhQ2hhcnRTdGFja2VkQ29tcG9uZW50LCBBcmVhU2VyaWVzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcmVhQ2hhcnRNb2R1bGUge31cbiJdfQ==