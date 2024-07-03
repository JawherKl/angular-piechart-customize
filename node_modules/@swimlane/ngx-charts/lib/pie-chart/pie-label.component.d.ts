import { OnChanges, SimpleChanges } from '@angular/core';
import { DefaultArcObject } from 'd3-shape';
import { TextAnchor } from '../common/types/text-anchor.enum';
import { DataItem } from '../models/chart-data.model';
import * as i0 from "@angular/core";
export interface PieData extends DefaultArcObject {
    data: DataItem;
    index: number;
    pos: [number, number];
    value: number;
}
export declare class PieLabelComponent implements OnChanges {
    platformId: any;
    data: PieData;
    radius: number;
    label: string;
    color: string;
    max: number;
    value: number;
    explodeSlices: boolean;
    animations: boolean;
    labelTrim: boolean;
    labelTrimSize: number;
    trimLabel: (label: string, max?: number) => string;
    line: string;
    styleTransform: string;
    attrTransform: string;
    textTransition: string;
    constructor(platformId: any);
    ngOnChanges(changes: SimpleChanges): void;
    setTransforms(): void;
    update(): void;
    get textX(): number;
    get textY(): number;
    textAnchor(): TextAnchor;
    midAngle(d: any): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<PieLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PieLabelComponent, "g[ngx-charts-pie-label]", never, { "data": "data"; "radius": "radius"; "label": "label"; "color": "color"; "max": "max"; "value": "value"; "explodeSlices": "explodeSlices"; "animations": "animations"; "labelTrim": "labelTrim"; "labelTrimSize": "labelTrimSize"; }, {}, never, never>;
}
