import { ElementRef, AfterViewInit } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ColorHelper } from '../common/color.helper';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
declare enum ElementType {
    Value = "value",
    Units = "units"
}
export declare class LinearGaugeComponent extends BaseChartComponent implements AfterViewInit {
    min: number;
    max: number;
    value: number;
    units: string;
    previousValue: number;
    valueFormatting: any;
    valueTextEl: ElementRef;
    unitsTextEl: ElementRef;
    dims: ViewDimensions;
    valueDomain: [number, number];
    valueScale: any;
    colors: ColorHelper;
    transform: string;
    margin: number[];
    transformLine: string;
    valueResizeScale: number;
    unitsResizeScale: number;
    valueTextTransform: string;
    valueTranslate: string;
    unitsTextTransform: string;
    unitsTranslate: string;
    displayValue: string;
    hasPreviousValue: boolean;
    barOrientation: typeof BarOrientation;
    ngAfterViewInit(): void;
    update(): void;
    getValueDomain(): [number, number];
    getValueScale(): any;
    getDisplayValue(): string;
    scaleText(element: ElementType, repeat?: boolean): void;
    scaleTextSSR(element: any): void;
    onClick(): void;
    setColors(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinearGaugeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LinearGaugeComponent, "ngx-charts-linear-gauge", never, { "min": "min"; "max": "max"; "value": "value"; "units": "units"; "previousValue": "previousValue"; "valueFormatting": "valueFormatting"; }, {}, never, never>;
}
export {};
