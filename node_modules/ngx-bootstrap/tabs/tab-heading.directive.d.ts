import { TemplateRef } from '@angular/core';
import { TabDirective } from './tab.directive';
import * as i0 from "@angular/core";
/** Should be used to mark <ng-template> element as a template for tab heading */
export declare class TabHeadingDirective {
    templateRef?: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>, tab: TabDirective);
    static ɵfac: i0.ɵɵFactoryDeclaration<TabHeadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TabHeadingDirective, "[tabHeading]", never, {}, {}, never, never, false, never>;
}
