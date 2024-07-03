import { OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ScaleLegendComponent implements OnChanges {
    valueRange: number[];
    colors: any;
    height: number;
    width: number;
    horizontal: boolean;
    gradient: string;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param colors array of colors
     * @param splits array of splits on a scale of (0, 1)
     */
    gradientString(colors: string[], splits: number[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScaleLegendComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScaleLegendComponent, "ngx-charts-scale-legend", never, { "valueRange": "valueRange"; "colors": "colors"; "height": "height"; "width": "width"; "horizontal": "horizontal"; }, {}, never, never>;
}
