import { BaseChartComponent } from '../common/base-chart.component';
import { ColorHelper } from '../common/color.helper';
import { CardModel } from './card-series.component';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import * as i0 from "@angular/core";
export declare class NumberCardComponent extends BaseChartComponent {
    cardColor: string;
    bandColor: string;
    emptyColor: string;
    innerPadding: number;
    textColor: string;
    valueFormatting: any;
    labelFormatting: any;
    designatedTotal: number;
    dims: ViewDimensions;
    data: CardModel[];
    colors: ColorHelper;
    transform: string;
    domain: any[];
    margin: number[];
    get clickable(): boolean;
    update(): void;
    getDomain(): string[];
    onClick(data: any): void;
    setColors(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NumberCardComponent, "ngx-charts-number-card", never, { "cardColor": "cardColor"; "bandColor": "bandColor"; "emptyColor": "emptyColor"; "innerPadding": "innerPadding"; "textColor": "textColor"; "valueFormatting": "valueFormatting"; "labelFormatting": "labelFormatting"; "designatedTotal": "designatedTotal"; }, {}, never, never>;
}
