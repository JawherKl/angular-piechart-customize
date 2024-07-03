import { PlacementTypes } from './placement-type.enum';
/**
 * Position helper for the popover directive.
 *
 * @export
 */
export declare class PositionHelper {
    /**
     * Calculate vertical alignment position
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalAlignment(elDimensions: DOMRect, popoverDimensions: DOMRect, alignment: PlacementTypes): number;
    /**
     * Calculate vertical caret position
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalCaret(elDimensions: DOMRect, popoverDimensions: DOMRect, caretDimensions: DOMRect, alignment: PlacementTypes): number;
    /**
     * Calculate horz alignment position
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalAlignment(elDimensions: DOMRect, popoverDimensions: DOMRect, alignment: PlacementTypes): number;
    /**
     * Calculate horz caret position
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalCaret(elDimensions: DOMRect, popoverDimensions: DOMRect, caretDimensions: DOMRect, alignment: PlacementTypes): number;
    /**
     * Checks if the element's position should be flipped
     *
     * @memberOf PositionHelper
     */
    static shouldFlip(elDimensions: DOMRect, popoverDimensions: DOMRect, placement: PlacementTypes, spacing: number): boolean;
    /**
     * Position caret
     *
     * @memberOf PositionHelper
     */
    static positionCaret(placement: any, elmDim: any, hostDim: any, caretDimensions: any, alignment: PlacementTypes): any;
    /**
     * Position content
     *
     * @memberOf PositionHelper
     */
    static positionContent(placement: any, elmDim: any, hostDim: any, spacing: any, alignment: any): any;
    /**
     * Determine placement based on flip
     *
     * @memberOf PositionHelper
     */
    static determinePlacement(placement: PlacementTypes, elmDim: DOMRect, hostDim: DOMRect, spacing: number): any;
}
