import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Orientation } from '../types/orientation.enum';
import * as i0 from "@angular/core";
export declare class AxisLabelComponent implements OnChanges {
    orient: Orientation;
    label: string;
    offset: number;
    width: number;
    height: number;
    x: number;
    y: number;
    transform: string;
    strokeWidth: string;
    textAnchor: string;
    element: ElementRef;
    textHeight: number;
    margin: number;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AxisLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AxisLabelComponent, "g[ngx-charts-axis-label]", never, { "orient": "orient"; "label": "label"; "offset": "offset"; "width": "width"; "height": "height"; }, {}, never, never>;
}
