import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { HeatMapCellComponent } from './heat-map-cell.component';
import { HeatCellSeriesComponent } from './heat-map-cell-series.component';
import { HeatMapComponent } from './heat-map.component';
import * as i0 from "@angular/core";
export class HeatMapModule {
}
HeatMapModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: HeatMapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
HeatMapModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: HeatMapModule, declarations: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent], imports: [ChartCommonModule], exports: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent] });
HeatMapModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: HeatMapModule, imports: [[ChartCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: HeatMapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule],
                    declarations: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent],
                    exports: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2hlYXQtbWFwL2hlYXQtbWFwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQU94RCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQUhULG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixhQURwRSxpQkFBaUIsYUFFakIsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCOzJHQUU5RCxhQUFhLFlBSmYsQ0FBQyxpQkFBaUIsQ0FBQzsyRkFJakIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDNUIsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUM7b0JBQy9FLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDO2lCQUMzRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IEhlYXRNYXBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9oZWF0LW1hcC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWF0Q2VsbFNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IEhlYXRNYXBDb21wb25lbnQgfSBmcm9tICcuL2hlYXQtbWFwLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0hlYXRNYXBDZWxsQ29tcG9uZW50LCBIZWF0Q2VsbFNlcmllc0NvbXBvbmVudCwgSGVhdE1hcENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtIZWF0TWFwQ2VsbENvbXBvbmVudCwgSGVhdENlbGxTZXJpZXNDb21wb25lbnQsIEhlYXRNYXBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEhlYXRNYXBNb2R1bGUge31cbiJdfQ==