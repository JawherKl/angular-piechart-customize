import { SimpleChanges, OnChanges } from '@angular/core';
import { BarOrientation } from './types/bar-orientation.enum';
import { ViewDimensions } from './types/view-dimension.interface';
import * as i0 from "@angular/core";
interface GridPanel {
    class: ClassEnum;
    height: number;
    name: string;
    width: number;
    x: number;
    y: number;
}
declare enum ClassEnum {
    Odd = "odd",
    Even = "even"
}
export declare class GridPanelSeriesComponent implements OnChanges {
    gridPanels: GridPanel[];
    data: any[];
    dims: ViewDimensions;
    xScale: any;
    yScale: any;
    orient: BarOrientation;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getGridPanels(): GridPanel[];
    static ɵfac: i0.ɵɵFactoryDeclaration<GridPanelSeriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridPanelSeriesComponent, "g[ngx-charts-grid-panel-series]", never, { "data": "data"; "dims": "dims"; "xScale": "xScale"; "yScale": "yScale"; "orient": "orient"; }, {}, never, never>;
}
export {};
