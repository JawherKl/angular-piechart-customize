import { ElementRef, NgZone, ChangeDetectorRef, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { VisibilityObserver } from '../utils/visibility-observer';
import { Color } from '../utils/color-sets';
import { ScaleType } from './types/scale-type.enum';
import { ViewDimensions } from './types/view-dimension.interface';
import * as i0 from "@angular/core";
export declare class BaseChartComponent implements OnChanges, AfterViewInit, OnDestroy, OnInit {
    protected chartElement: ElementRef;
    protected zone: NgZone;
    protected cd: ChangeDetectorRef;
    platformId: any;
    results: any;
    view: [number, number];
    scheme: string | Color;
    schemeType: ScaleType;
    customColors: any;
    animations: boolean;
    select: EventEmitter<any>;
    width: number;
    height: number;
    resizeSubscription: any;
    visibilityObserver: VisibilityObserver;
    constructor(chartElement: ElementRef, zone: NgZone, cd: ChangeDetectorRef, platformId: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getContainerDims(): ViewDimensions;
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    formatDates(): void;
    protected unbindEvents(): void;
    private bindWindowResizeEvent;
    /**
     * Clones the data into a new object
     *
     * @memberOf BaseChart
     */
    private cloneData;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BaseChartComponent, "base-chart", never, { "results": "results"; "view": "view"; "scheme": "scheme"; "schemeType": "schemeType"; "customColors": "customColors"; "animations": "animations"; }, { "select": "select"; }, never, never>;
}
