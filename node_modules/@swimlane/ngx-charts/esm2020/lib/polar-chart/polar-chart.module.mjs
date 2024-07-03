import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { LineChartModule } from '../line-chart/line-chart.module';
import * as i0 from "@angular/core";
export class PolarChartModule {
}
PolarChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PolarChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PolarChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PolarChartModule, declarations: [PolarChartComponent, PolarSeriesComponent], imports: [ChartCommonModule, PieChartModule, LineChartModule], exports: [PolarChartComponent, PolarSeriesComponent] });
PolarChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PolarChartModule, imports: [[ChartCommonModule, PieChartModule, LineChartModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: PolarChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule, PieChartModule, LineChartModule],
                    declarations: [PolarChartComponent, PolarSeriesComponent],
                    exports: [PolarChartComponent, PolarSeriesComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL3BvbGFyLWNoYXJ0L3BvbGFyLWNoYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBT2xFLE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFIWixtQkFBbUIsRUFBRSxvQkFBb0IsYUFEOUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsYUFFbEQsbUJBQW1CLEVBQUUsb0JBQW9COzhHQUV4QyxnQkFBZ0IsWUFKbEIsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDOzJGQUlsRCxnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztvQkFDN0QsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDO2lCQUNyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IFBvbGFyQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL3BvbGFyLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb2xhclNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vcG9sYXItc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaWVDaGFydE1vZHVsZSB9IGZyb20gJy4uL3BpZS1jaGFydC9waWUtY2hhcnQubW9kdWxlJztcbmltcG9ydCB7IExpbmVDaGFydE1vZHVsZSB9IGZyb20gJy4uL2xpbmUtY2hhcnQvbGluZS1jaGFydC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGUsIFBpZUNoYXJ0TW9kdWxlLCBMaW5lQ2hhcnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtQb2xhckNoYXJ0Q29tcG9uZW50LCBQb2xhclNlcmllc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQb2xhckNoYXJ0Q29tcG9uZW50LCBQb2xhclNlcmllc0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUG9sYXJDaGFydE1vZHVsZSB7fVxuIl19