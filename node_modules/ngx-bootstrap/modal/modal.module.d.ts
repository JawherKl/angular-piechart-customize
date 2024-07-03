import { ModuleWithProviders } from '@angular/core';
import { FocusTrapModule } from 'ngx-bootstrap/focus-trap';
import * as i0 from "@angular/core";
import * as i1 from "./modal-backdrop.component";
import * as i2 from "./modal.directive";
import * as i3 from "./modal-container.component";
import * as i4 from "ngx-bootstrap/focus-trap";
export declare const focusTrapModule: ModuleWithProviders<FocusTrapModule>;
export declare class ModalModule {
    static forRoot(): ModuleWithProviders<ModalModule>;
    static forChild(): ModuleWithProviders<ModalModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ModalModule, [typeof i1.ModalBackdropComponent, typeof i2.ModalDirective, typeof i3.ModalContainerComponent], [typeof i4.FocusTrapModule], [typeof i1.ModalBackdropComponent, typeof i2.ModalDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ModalModule>;
}
