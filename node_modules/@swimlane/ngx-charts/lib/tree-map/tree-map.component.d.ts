import { EventEmitter, TemplateRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import * as i0 from "@angular/core";
export declare class TreeMapComponent extends BaseChartComponent {
    results: DataItem[];
    tooltipDisabled: boolean;
    valueFormatting: any;
    labelFormatting: any;
    gradient: boolean;
    select: EventEmitter<any>;
    tooltipTemplate: TemplateRef<any>;
    dims: ViewDimensions;
    domain: any;
    transform: any;
    colors: ColorHelper;
    treemap: any;
    data: DataItem;
    margin: number[];
    update(): void;
    getDomain(): any[];
    onClick(data: DataItem): void;
    setColors(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeMapComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeMapComponent, "ngx-charts-tree-map", never, { "results": "results"; "tooltipDisabled": "tooltipDisabled"; "valueFormatting": "valueFormatting"; "labelFormatting": "labelFormatting"; "gradient": "gradient"; }, { "select": "select"; }, ["tooltipTemplate"], never>;
}
