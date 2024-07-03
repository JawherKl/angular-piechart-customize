import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { DayViewModel } from '../../models';
import * as i0 from "@angular/core";
export declare class BsDatepickerDayDecoratorComponent implements OnInit {
    private _config;
    private _elRef;
    private _renderer;
    day: DayViewModel;
    constructor(_config: BsDatepickerConfig, _elRef: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerDayDecoratorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDatepickerDayDecoratorComponent, "[bsDatepickerDayDecorator]", never, { "day": { "alias": "day"; "required": false; }; }, {}, never, never, false, never>;
}
