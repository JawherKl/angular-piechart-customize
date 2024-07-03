import { OnChanges, SimpleChanges } from '@angular/core';
import { TextAnchor } from '../common/types/text-anchor.enum';
import * as i0 from "@angular/core";
interface Big {
    line: string;
    text: string;
    textAnchor: string;
    textTransform: string;
}
interface Ticks {
    big: Big[];
    small: Array<{
        line: string;
    }>;
}
export declare class GaugeAxisComponent implements OnChanges {
    bigSegments: number;
    smallSegments: number;
    min: number;
    max: number;
    angleSpan: number;
    startAngle: number;
    radius: number;
    valueScale: any;
    tickFormatting: any;
    ticks: Ticks;
    rotationAngle: number;
    rotate: string;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getTicks(): Ticks;
    getTextAnchor(angle: number): TextAnchor;
    getTickPath(startDistance: number, tickLength: number, angle: number): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<GaugeAxisComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GaugeAxisComponent, "g[ngx-charts-gauge-axis]", never, { "bigSegments": "bigSegments"; "smallSegments": "smallSegments"; "min": "min"; "max": "max"; "angleSpan": "angleSpan"; "startAngle": "startAngle"; "radius": "radius"; "valueScale": "valueScale"; "tickFormatting": "tickFormatting"; }, {}, never, never>;
}
export {};
