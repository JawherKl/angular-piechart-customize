import { InjectionService } from './injection.service';
import { TooltipContentComponent } from './tooltip.component';
import { InjectionRegisteryService } from './injection-registery.service';
import * as i0 from "@angular/core";
export declare class TooltipService extends InjectionRegisteryService<TooltipContentComponent> {
    type: any;
    constructor(injectionService: InjectionService);
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TooltipService>;
}
