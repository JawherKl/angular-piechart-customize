import * as i0 from "@angular/core";
/** Default values provider for tooltip */
export declare class TooltipConfig {
    /** sets disable adaptive position */
    adaptivePosition: boolean;
    /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
    placement: string;
    /** array of event names which triggers tooltip opening */
    triggers: string;
    /** a selector specifying the element the tooltip should be appended to. */
    container?: string;
    /** delay before showing the tooltip */
    delay: number;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TooltipConfig>;
}
