import { TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NgTranscludeDirective {
    viewRef: ViewContainerRef;
    protected _ngTransclude?: TemplateRef<any>;
    set ngTransclude(templateRef: TemplateRef<any> | undefined);
    get ngTransclude(): TemplateRef<any> | undefined;
    constructor(viewRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgTranscludeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgTranscludeDirective, "[ngTransclude]", never, { "ngTransclude": { "alias": "ngTransclude"; "required": false; }; }, {}, never, never, false, never>;
}
