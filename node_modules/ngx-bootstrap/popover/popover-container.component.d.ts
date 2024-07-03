import { PopoverConfig } from './popover.config';
import { IBsVersion } from 'ngx-bootstrap/utils';
import { AvailbleBSPositions } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
export declare class PopoverContainerComponent {
    set placement(value: AvailbleBSPositions);
    title?: string;
    containerClass?: string;
    popoverId?: string;
    _placement: string;
    get _bsVersions(): IBsVersion;
    constructor(config: PopoverConfig);
    checkMarginNecessity(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopoverContainerComponent, "popover-container", never, { "placement": { "alias": "placement"; "required": false; }; "title": { "alias": "title"; "required": false; }; }, {}, never, ["*"], false, never>;
}
