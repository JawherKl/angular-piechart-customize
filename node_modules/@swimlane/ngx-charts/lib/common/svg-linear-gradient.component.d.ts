import { OnChanges, SimpleChanges } from '@angular/core';
import { BarOrientation } from './types/bar-orientation.enum';
import { Gradient } from './types/gradient.interface';
import * as i0 from "@angular/core";
export declare class SvgLinearGradientComponent implements OnChanges {
    orientation: BarOrientation;
    name: string;
    stops: Gradient[];
    x1: string;
    x2: string;
    y1: string;
    y2: string;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SvgLinearGradientComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SvgLinearGradientComponent, "g[ngx-charts-svg-linear-gradient]", never, { "orientation": "orientation"; "name": "name"; "stops": "stops"; }, {}, never, never>;
}
