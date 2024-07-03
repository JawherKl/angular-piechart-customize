import { EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { PieGridData, PieGridDataItem } from '../models/chart-data.model';
import * as i0 from "@angular/core";
export interface PieArc {
    animate: boolean;
    class: string;
    data: PieGridDataItem;
    endAngle: number;
    fill: string;
    pointerEvents: boolean;
    startAngle: number;
}
export declare class PieGridSeriesComponent implements OnChanges {
    colors: any;
    data: PieGridData[];
    innerRadius: number;
    outerRadius: number;
    animations: boolean;
    select: EventEmitter<any>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    element: HTMLElement;
    layout: any;
    arcs: PieArc[];
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getArcs(): PieArc[];
    onClick(data: any): void;
    trackBy(index: any, item: any): string;
    label(arc: any): string;
    color(arc: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PieGridSeriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PieGridSeriesComponent, "g[ngx-charts-pie-grid-series]", never, { "colors": "colors"; "data": "data"; "innerRadius": "innerRadius"; "outerRadius": "outerRadius"; "animations": "animations"; }, { "select": "select"; "activate": "activate"; "deactivate": "deactivate"; }, never, never>;
}
