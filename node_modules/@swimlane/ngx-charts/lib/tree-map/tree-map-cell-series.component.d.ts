import { OnChanges, SimpleChanges, EventEmitter, TemplateRef } from '@angular/core';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';
import { StyleTypes } from '../common/tooltip/style.type';
import { PlacementTypes } from '../common/tooltip/position';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import * as i0 from "@angular/core";
interface TreeMapCell {
    data: DataItem;
    fill: string;
    height: number;
    label: string;
    value: any;
    width: number;
    x: number;
    y: number;
}
export declare class TreeMapCellSeriesComponent implements OnChanges {
    data: any;
    dims: ViewDimensions;
    colors: ColorHelper;
    valueFormatting: any;
    labelFormatting: any;
    gradient: boolean;
    tooltipDisabled: boolean;
    tooltipTemplate: TemplateRef<any>;
    animations: boolean;
    select: EventEmitter<any>;
    cells: TreeMapCell[];
    styleTypes: typeof StyleTypes;
    placementTypes: typeof PlacementTypes;
    ngOnChanges(changes: SimpleChanges): void;
    getCells(): TreeMapCell[];
    getTooltipText({ label, value }: {
        label: any;
        value: any;
    }): string;
    onClick(data: any): void;
    trackBy(index: any, item: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeMapCellSeriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeMapCellSeriesComponent, "g[ngx-charts-tree-map-cell-series]", never, { "data": "data"; "dims": "dims"; "colors": "colors"; "valueFormatting": "valueFormatting"; "labelFormatting": "labelFormatting"; "gradient": "gradient"; "tooltipDisabled": "tooltipDisabled"; "tooltipTemplate": "tooltipTemplate"; "animations": "animations"; }, { "select": "select"; }, never, never>;
}
export {};
