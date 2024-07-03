import { EventEmitter, ElementRef, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { BaseType } from 'd3-selection';
import { IBoxModel } from '../models/chart-data.model';
import { IVector2D } from '../models/coordinates.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { Gradient } from '../common/types/gradient.interface';
import * as i0 from "@angular/core";
declare type LineCoordinates = [IVector2D, IVector2D, IVector2D, IVector2D];
export declare class BoxComponent implements OnChanges {
    protected cd: ChangeDetectorRef;
    strokeColor: string;
    strokeWidth: number;
    fill: string;
    data: IBoxModel;
    width: number;
    height: number;
    x: number;
    y: number;
    lineCoordinates: LineCoordinates;
    roundEdges: boolean;
    gradient: boolean;
    gradientStops: Gradient[];
    offset: number;
    isActive: boolean;
    animations: boolean;
    ariaLabel: string;
    noBarWhenZero: boolean;
    select: EventEmitter<IBoxModel>;
    activate: EventEmitter<IBoxModel>;
    deactivate: EventEmitter<IBoxModel>;
    BarOrientation: typeof BarOrientation;
    nativeElm: any;
    oldPath: string;
    boxPath: string;
    oldLineCoordinates: LineCoordinates;
    gradientId: string;
    gradientFill: string;
    initialized: boolean;
    hasGradient: boolean;
    hideBar: boolean;
    /** Mask Path to cut the line on the box part. */
    maskLine: string;
    /** Mask Path Id to keep track of the mask element */
    maskLineId: string;
    boxStrokeWidth: number;
    whiskerStrokeWidth: number;
    medianLineWidth: number;
    constructor(element: ElementRef, cd: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    loadAnimation(): void;
    updatePathEl(): void;
    updateLineEl(): void;
    /**
     * See [D3 Selections](https://www.d3indepth.com/selections/)
     * @param d The joined data.
     * @param index The index of the element within the selection
     * @param node The node element (Line).
     */
    lineTween(attr: string, d: any, index: number, node: BaseType[] | ArrayLike<BaseType>): any;
    pathTween(d1: string, precision: number): () => (t: any) => string;
    getStartingPath(): string;
    getPath(): string;
    getStartingLineCoordinates(): LineCoordinates;
    getRadius(): number;
    getGradient(): Gradient[];
    getStartOpacity(): number;
    get edges(): boolean[];
    onMouseEnter(): void;
    onMouseLeave(): void;
    private checkToHideBar;
    static ɵfac: i0.ɵɵFactoryDeclaration<BoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BoxComponent, "g[ngx-charts-box]", never, { "strokeColor": "strokeColor"; "strokeWidth": "strokeWidth"; "fill": "fill"; "data": "data"; "width": "width"; "height": "height"; "x": "x"; "y": "y"; "lineCoordinates": "lineCoordinates"; "roundEdges": "roundEdges"; "gradient": "gradient"; "gradientStops": "gradientStops"; "offset": "offset"; "isActive": "isActive"; "animations": "animations"; "ariaLabel": "ariaLabel"; "noBarWhenZero": "noBarWhenZero"; }, { "select": "select"; "activate": "activate"; "deactivate": "deactivate"; }, never, never>;
}
export {};
