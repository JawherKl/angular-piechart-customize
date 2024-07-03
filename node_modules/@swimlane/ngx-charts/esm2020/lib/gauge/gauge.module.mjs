import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { GaugeComponent } from './gauge.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';
import * as i0 from "@angular/core";
export class GaugeModule {
}
GaugeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GaugeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GaugeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GaugeModule, declarations: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent], imports: [ChartCommonModule, PieChartModule, BarChartModule], exports: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent] });
GaugeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GaugeModule, imports: [[ChartCommonModule, PieChartModule, BarChartModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: GaugeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule, PieChartModule, BarChartModule],
                    declarations: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent],
                    exports: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2dhdWdlL2dhdWdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQU8vRCxNQUFNLE9BQU8sV0FBVzs7d0dBQVgsV0FBVzt5R0FBWCxXQUFXLGlCQUhQLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsYUFEaEYsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGNBQWMsYUFFakQsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQjt5R0FFMUUsV0FBVyxZQUpiLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQzsyRkFJakQsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDO29CQUM1RCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUM7b0JBQzNGLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQztpQkFDdkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMaW5lYXJHYXVnZUNvbXBvbmVudCB9IGZyb20gJy4vbGluZWFyLWdhdWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYXVnZUNvbXBvbmVudCB9IGZyb20gJy4vZ2F1Z2UuY29tcG9uZW50JztcbmltcG9ydCB7IEdhdWdlQXJjQ29tcG9uZW50IH0gZnJvbSAnLi9nYXVnZS1hcmMuY29tcG9uZW50JztcbmltcG9ydCB7IEdhdWdlQXhpc0NvbXBvbmVudCB9IGZyb20gJy4vZ2F1Z2UtYXhpcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBCYXJDaGFydE1vZHVsZSB9IGZyb20gJy4uL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlLCBQaWVDaGFydE1vZHVsZSwgQmFyQ2hhcnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtMaW5lYXJHYXVnZUNvbXBvbmVudCwgR2F1Z2VDb21wb25lbnQsIEdhdWdlQXJjQ29tcG9uZW50LCBHYXVnZUF4aXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTGluZWFyR2F1Z2VDb21wb25lbnQsIEdhdWdlQ29tcG9uZW50LCBHYXVnZUFyY0NvbXBvbmVudCwgR2F1Z2VBeGlzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBHYXVnZU1vZHVsZSB7fVxuIl19