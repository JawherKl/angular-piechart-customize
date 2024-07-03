import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridItem } from '../common/grid-layout.helper';
import { ColorHelper } from '../common/color.helper';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import * as i0 from "@angular/core";
export interface CardModel extends GridItem {
    color: string;
    tooltipText: string;
    textColor: string;
    bandColor: string;
    label: string;
}
export declare class CardSeriesComponent implements OnChanges {
    data: CardModel[];
    dims: ViewDimensions;
    colors: ColorHelper;
    innerPadding: number;
    cardColor: string;
    bandColor: string;
    emptyColor: string;
    textColor: string;
    valueFormatting: any;
    labelFormatting: any;
    animations: boolean;
    select: EventEmitter<any>;
    cards: CardModel[];
    emptySlots: any[];
    medianSize: number;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCards(): CardModel[];
    trackBy(index: any, card: any): string;
    onClick(data: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardSeriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardSeriesComponent, "g[ngx-charts-card-series]", never, { "data": "data"; "dims": "dims"; "colors": "colors"; "innerPadding": "innerPadding"; "cardColor": "cardColor"; "bandColor": "bandColor"; "emptyColor": "emptyColor"; "textColor": "textColor"; "valueFormatting": "valueFormatting"; "labelFormatting": "labelFormatting"; "animations": "animations"; }, { "select": "select"; }, never, never>;
}
