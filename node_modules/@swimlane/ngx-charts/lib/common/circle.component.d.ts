import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CircleComponent implements OnChanges {
    cx: number;
    cy: number;
    r: number;
    fill: string;
    stroke: string;
    data: number | string;
    classNames: string[] | string;
    circleOpacity: number;
    pointerEvents: string;
    select: EventEmitter<number | string>;
    activate: EventEmitter<number | string>;
    deactivate: EventEmitter<number | string>;
    onClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CircleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CircleComponent, "g[ngx-charts-circle]", never, { "cx": "cx"; "cy": "cy"; "r": "r"; "fill": "fill"; "stroke": "stroke"; "data": "data"; "classNames": "classNames"; "circleOpacity": "circleOpacity"; "pointerEvents": "pointerEvents"; }, { "select": "select"; "activate": "activate"; "deactivate": "deactivate"; }, never, never>;
}
