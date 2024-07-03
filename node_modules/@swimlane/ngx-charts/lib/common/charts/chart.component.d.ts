import { OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { LegendOptions, LegendType, LegendPosition } from '../types/legend.model';
import * as i0 from "@angular/core";
export declare class ChartComponent implements OnChanges {
    view: [number, number];
    showLegend: boolean;
    legendOptions: LegendOptions;
    legendType: LegendType;
    activeEntries: any[];
    animations: boolean;
    legendLabelClick: EventEmitter<string>;
    legendLabelActivate: EventEmitter<{
        name: string;
    }>;
    legendLabelDeactivate: EventEmitter<{
        name: string;
    }>;
    chartWidth: number;
    title: string;
    legendWidth: number;
    readonly LegendPosition: typeof LegendPosition;
    readonly LegendType: typeof LegendType;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLegendType(): LegendType;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChartComponent, "ngx-charts-chart", never, { "view": "view"; "showLegend": "showLegend"; "legendOptions": "legendOptions"; "legendType": "legendType"; "activeEntries": "activeEntries"; "animations": "animations"; }, { "legendLabelClick": "legendLabelClick"; "legendLabelActivate": "legendLabelActivate"; "legendLabelDeactivate": "legendLabelDeactivate"; }, never, ["*"]>;
}
