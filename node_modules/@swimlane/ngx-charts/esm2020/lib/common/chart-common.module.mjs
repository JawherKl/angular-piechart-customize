import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './charts/chart.component';
import { BaseChartComponent } from './base-chart.component';
import { AxesModule } from './axes/axes.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { CircleSeriesComponent } from './circle-series.component';
import { CircleComponent } from './circle.component';
import { GridPanelComponent } from './grid-panel.component';
import { GridPanelSeriesComponent } from './grid-panel-series.component';
import { SvgLinearGradientComponent } from './svg-linear-gradient.component';
import { SvgRadialGradientComponent } from './svg-radial-gradient.component';
import { AreaComponent } from './area.component';
import { CountUpDirective } from './count/count.directive';
import { TooltipArea } from './tooltip-area.component';
import { Timeline } from './timeline/timeline.component';
import { VisibilityObserver } from '../utils/visibility-observer';
import { LegendComponent } from './legend/legend.component';
import { LegendEntryComponent } from './legend/legend-entry.component';
import { ScaleLegendComponent } from './legend/scale-legend.component';
import { AdvancedLegendComponent } from './legend/advanced-legend.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipArea,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    Timeline,
    AdvancedLegendComponent
];
export class ChartCommonModule {
}
ChartCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: ChartCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChartCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: ChartCommonModule, declarations: [AreaComponent,
        BaseChartComponent,
        CountUpDirective,
        TooltipArea,
        ChartComponent,
        LegendComponent,
        LegendEntryComponent,
        ScaleLegendComponent,
        CircleComponent,
        CircleSeriesComponent,
        GridPanelComponent,
        GridPanelSeriesComponent,
        SvgLinearGradientComponent,
        SvgRadialGradientComponent,
        Timeline,
        AdvancedLegendComponent, VisibilityObserver], imports: [CommonModule, AxesModule, TooltipModule], exports: [CommonModule, AxesModule, TooltipModule, AreaComponent,
        BaseChartComponent,
        CountUpDirective,
        TooltipArea,
        ChartComponent,
        LegendComponent,
        LegendEntryComponent,
        ScaleLegendComponent,
        CircleComponent,
        CircleSeriesComponent,
        GridPanelComponent,
        GridPanelSeriesComponent,
        SvgLinearGradientComponent,
        SvgRadialGradientComponent,
        Timeline,
        AdvancedLegendComponent, VisibilityObserver] });
ChartCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: ChartCommonModule, imports: [[CommonModule, AxesModule, TooltipModule], CommonModule, AxesModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: ChartCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AxesModule, TooltipModule],
                    declarations: [...COMPONENTS, VisibilityObserver],
                    exports: [CommonModule, AxesModule, TooltipModule, ...COMPONENTS, VisibilityObserver]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQUU3RSxNQUFNLFVBQVUsR0FBRztJQUNqQixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsY0FBYztJQUNkLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLFFBQVE7SUFDUix1QkFBdUI7Q0FDeEIsQ0FBQztBQU9GLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkF2QjVCLGFBQWE7UUFDYixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxjQUFjO1FBQ2QsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsUUFBUTtRQUNSLHVCQUF1QixFQUtPLGtCQUFrQixhQUR0QyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsYUFFdkMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBckJqRCxhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsY0FBYztRQUNkLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLFFBQVE7UUFDUix1QkFBdUIsRUFNMkMsa0JBQWtCOytHQUV6RSxpQkFBaUIsWUFKbkIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxFQUV4QyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWE7MkZBRXRDLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQztvQkFDbEQsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsa0JBQWtCLENBQUM7b0JBQ2pELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEdBQUcsVUFBVSxFQUFFLGtCQUFrQixDQUFDO2lCQUN0RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDaGFydENvbXBvbmVudCB9IGZyb20gJy4vY2hhcnRzL2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEF4ZXNNb2R1bGUgfSBmcm9tICcuL2F4ZXMvYXhlcy5tb2R1bGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBDaXJjbGVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2NpcmNsZS1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IENpcmNsZUNvbXBvbmVudCB9IGZyb20gJy4vY2lyY2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRQYW5lbFNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFN2Z0xpbmVhckdyYWRpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9zdmctbGluZWFyLWdyYWRpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXJlYUNvbXBvbmVudCB9IGZyb20gJy4vYXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291bnRVcERpcmVjdGl2ZSB9IGZyb20gJy4vY291bnQvY291bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2x0aXBBcmVhIH0gZnJvbSAnLi90b29sdGlwLWFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVsaW5lIH0gZnJvbSAnLi90aW1lbGluZS90aW1lbGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlzaWJpbGl0eU9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvdmlzaWJpbGl0eS1vYnNlcnZlcic7XG5pbXBvcnQgeyBMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xlZ2VuZC9sZWdlbmQuY29tcG9uZW50JztcbmltcG9ydCB7IExlZ2VuZEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY2FsZUxlZ2VuZENvbXBvbmVudCB9IGZyb20gJy4vbGVnZW5kL3NjYWxlLWxlZ2VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWR2YW5jZWRMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xlZ2VuZC9hZHZhbmNlZC1sZWdlbmQuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQXJlYUNvbXBvbmVudCxcbiAgQmFzZUNoYXJ0Q29tcG9uZW50LFxuICBDb3VudFVwRGlyZWN0aXZlLFxuICBUb29sdGlwQXJlYSxcbiAgQ2hhcnRDb21wb25lbnQsXG4gIExlZ2VuZENvbXBvbmVudCxcbiAgTGVnZW5kRW50cnlDb21wb25lbnQsXG4gIFNjYWxlTGVnZW5kQ29tcG9uZW50LFxuICBDaXJjbGVDb21wb25lbnQsXG4gIENpcmNsZVNlcmllc0NvbXBvbmVudCxcbiAgR3JpZFBhbmVsQ29tcG9uZW50LFxuICBHcmlkUGFuZWxTZXJpZXNDb21wb25lbnQsXG4gIFN2Z0xpbmVhckdyYWRpZW50Q29tcG9uZW50LFxuICBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCxcbiAgVGltZWxpbmUsXG4gIEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBeGVzTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQ09NUE9ORU5UUywgVmlzaWJpbGl0eU9ic2VydmVyXSxcbiAgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQXhlc01vZHVsZSwgVG9vbHRpcE1vZHVsZSwgLi4uQ09NUE9ORU5UUywgVmlzaWJpbGl0eU9ic2VydmVyXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFydENvbW1vbk1vZHVsZSB7fVxuIl19