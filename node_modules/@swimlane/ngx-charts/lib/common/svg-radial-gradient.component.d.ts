import { OnChanges, SimpleChanges } from '@angular/core';
import { Gradient } from './types/gradient.interface';
import * as i0 from "@angular/core";
export declare class SvgRadialGradientComponent implements OnChanges {
    color: string;
    name: string;
    startOpacity: number;
    endOpacity: number;
    cx: number;
    cy: number;
    get stops(): Gradient[];
    set stops(value: Gradient[]);
    r: string;
    private stopsInput;
    private stopsDefault;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SvgRadialGradientComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SvgRadialGradientComponent, "g[ngx-charts-svg-radial-gradient]", never, { "color": "color"; "name": "name"; "startOpacity": "startOpacity"; "endOpacity": "endOpacity"; "cx": "cx"; "cy": "cy"; "stops": "stops"; }, {}, never, never>;
}
