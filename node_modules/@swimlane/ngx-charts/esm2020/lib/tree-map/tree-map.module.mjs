import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TreeMapCellComponent } from './tree-map-cell.component';
import { TreeMapCellSeriesComponent } from './tree-map-cell-series.component';
import { TreeMapComponent } from './tree-map.component';
import * as i0 from "@angular/core";
export class TreeMapModule {
}
TreeMapModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TreeMapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TreeMapModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TreeMapModule, declarations: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent], imports: [ChartCommonModule], exports: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent] });
TreeMapModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TreeMapModule, imports: [[ChartCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TreeMapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule],
                    declarations: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent],
                    exports: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL3RyZWUtbWFwL3RyZWUtbWFwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQU94RCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQUhULG9CQUFvQixFQUFFLDBCQUEwQixFQUFFLGdCQUFnQixhQUR2RSxpQkFBaUIsYUFFakIsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUUsZ0JBQWdCOzJHQUVqRSxhQUFhLFlBSmYsQ0FBQyxpQkFBaUIsQ0FBQzsyRkFJakIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDNUIsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ2xGLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDO2lCQUM5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IFRyZWVNYXBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLW1hcC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTWFwQ2VsbFNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVNYXBDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtbWFwLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1RyZWVNYXBDZWxsQ29tcG9uZW50LCBUcmVlTWFwQ2VsbFNlcmllc0NvbXBvbmVudCwgVHJlZU1hcENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUcmVlTWFwQ2VsbENvbXBvbmVudCwgVHJlZU1hcENlbGxTZXJpZXNDb21wb25lbnQsIFRyZWVNYXBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNYXBNb2R1bGUge31cbiJdfQ==