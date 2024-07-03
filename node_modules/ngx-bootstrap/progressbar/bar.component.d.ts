import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ProgressbarType } from './progressbar-type.interface';
import * as i0 from "@angular/core";
export declare class BarComponent implements OnChanges {
    private el;
    private renderer;
    /** maximum total value of progress element */
    max: number;
    /** current value of progress bar */
    value?: number | undefined;
    /** if `true` changing value of progress bar will be animated */
    animate?: boolean | undefined;
    /** If `true`, striped classes are applied */
    striped?: boolean | undefined;
    /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
    type?: ProgressbarType;
    percent: number;
    private _prevType?;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    private applyTypeClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<BarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BarComponent, "bar", never, { "max": { "alias": "max"; "required": false; }; "value": { "alias": "value"; "required": false; }; "animate": { "alias": "animate"; "required": false; }; "striped": { "alias": "striped"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, never, ["*"], false, never>;
}
