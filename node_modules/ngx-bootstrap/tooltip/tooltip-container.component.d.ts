import { AfterViewInit } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { IBsVersion } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
export declare class TooltipContainerComponent implements AfterViewInit {
    classMap?: {
        [key: string]: boolean;
    };
    placement?: string;
    containerClass?: string;
    animation?: boolean;
    id?: string;
    get _bsVersions(): IBsVersion;
    constructor(config: TooltipConfig);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipContainerComponent, "bs-tooltip-container", never, {}, {}, never, ["*"], false, never>;
}
