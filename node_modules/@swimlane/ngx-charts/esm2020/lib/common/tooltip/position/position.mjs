import { PlacementTypes } from './placement-type.enum';
const caretOffset = 7;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === PlacementTypes.Top) {
        return elDimensions.top - caretOffset;
    }
    if (alignment === PlacementTypes.Bottom) {
        return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === PlacementTypes.Center) {
        return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return undefined;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === PlacementTypes.Left) {
        return elDimensions.left - caretOffset;
    }
    if (alignment === PlacementTypes.Right) {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === PlacementTypes.Center) {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return undefined;
}
/**
 * Position helper for the popover directive.
 *
 * @export
 */
export class PositionHelper {
    /**
     * Calculate vertical alignment position
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    }
    /**
     * Calculate vertical caret position
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === PlacementTypes.Top) {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === PlacementTypes.Bottom) {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === PlacementTypes.Center) {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += popoverPosition + popoverDimensions.height - window.innerHeight;
        }
        return result;
    }
    /**
     * Calculate horz alignment position
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    }
    /**
     * Calculate horz caret position
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === PlacementTypes.Left) {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === PlacementTypes.Right) {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === PlacementTypes.Center) {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += popoverPosition + popoverDimensions.width - window.innerWidth;
        }
        return result;
    }
    /**
     * Checks if the element's position should be flipped
     *
     * @memberOf PositionHelper
     */
    static shouldFlip(elDimensions, popoverDimensions, placement, spacing) {
        let flip = false;
        if (placement === PlacementTypes.Right) {
            if (elDimensions.left + elDimensions.width + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === PlacementTypes.Left) {
            if (elDimensions.left - popoverDimensions.width - spacing < 0) {
                flip = true;
            }
        }
        if (placement === PlacementTypes.Top) {
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                flip = true;
            }
        }
        if (placement === PlacementTypes.Bottom) {
            if (elDimensions.top + elDimensions.height + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    }
    /**
     * Position caret
     *
     * @memberOf PositionHelper
     */
    static positionCaret(placement, elmDim, hostDim, caretDimensions, alignment) {
        let top = 0;
        let left = 0;
        if (placement === PlacementTypes.Right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.Left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.Top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.Bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top, left };
    }
    /**
     * Position content
     *
     * @memberOf PositionHelper
     */
    static positionContent(placement, elmDim, hostDim, spacing, alignment) {
        let top = 0;
        let left = 0;
        if (placement === PlacementTypes.Right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.Left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.Top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.Bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top, left };
    }
    /**
     * Determine placement based on flip
     *
     * @memberOf PositionHelper
     */
    static determinePlacement(placement, elmDim, hostDim, spacing) {
        const shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, spacing);
        if (shouldFlip) {
            if (placement === PlacementTypes.Right) {
                return PlacementTypes.Left;
            }
            else if (placement === PlacementTypes.Left) {
                return PlacementTypes.Right;
            }
            else if (placement === PlacementTypes.Top) {
                return PlacementTypes.Bottom;
            }
            else if (placement === PlacementTypes.Bottom) {
                return PlacementTypes.Top;
            }
        }
        return placement;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3Rvb2x0aXAvcG9zaXRpb24vcG9zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXZELE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUV0QixTQUFTLGdCQUFnQixDQUFDLFlBQXFCLEVBQUUsaUJBQTBCLEVBQUUsU0FBeUI7SUFDcEcsSUFBSSxTQUFTLEtBQUssY0FBYyxDQUFDLEdBQUcsRUFBRTtRQUNwQyxPQUFPLFlBQVksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO0tBQ3ZDO0lBRUQsSUFBSSxTQUFTLEtBQUssY0FBYyxDQUFDLE1BQU0sRUFBRTtRQUN2QyxPQUFPLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0tBQ3hGO0lBRUQsSUFBSSxTQUFTLEtBQUssY0FBYyxDQUFDLE1BQU0sRUFBRTtRQUN2QyxPQUFPLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNsRjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLFlBQXFCLEVBQUUsaUJBQTBCLEVBQUUsU0FBeUI7SUFDdEcsSUFBSSxTQUFTLEtBQUssY0FBYyxDQUFDLElBQUksRUFBRTtRQUNyQyxPQUFPLFlBQVksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxTQUFTLEtBQUssY0FBYyxDQUFDLEtBQUssRUFBRTtRQUN0QyxPQUFPLFlBQVksQ0FBQyxJQUFJ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QUMsTUFBTSxFQUFFO2dCQUM5QyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUM7YUFDM0I7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi9wbGFjZW1lbnQtdHlwZS5lbnVtJztcblxuY29uc3QgY2FyZXRPZmZzZXQgPSA3O1xuXG5mdW5jdGlvbiB2ZXJ0aWNhbFBvc2l0aW9uKGVsRGltZW5zaW9uczogRE9NUmVjdCwgcG9wb3ZlckRpbWVuc2lvbnM6IERPTVJlY3QsIGFsaWdubWVudDogUGxhY2VtZW50VHlwZXMpOiBudW1iZXIge1xuICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Ub3ApIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLnRvcCAtIGNhcmV0T2Zmc2V0O1xuICB9XG5cbiAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuQm90dG9tKSB7XG4gICAgcmV0dXJuIGVsRGltZW5zaW9ucy50b3AgKyBlbERpbWVuc2lvbnMuaGVpZ2h0IC0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0ICsgY2FyZXRPZmZzZXQ7XG4gIH1cblxuICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5DZW50ZXIpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLnRvcCArIGVsRGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0IC8gMjtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhvcml6b250YWxQb3NpdGlvbihlbERpbWVuc2lvbnM6IERPTVJlY3QsIHBvcG92ZXJEaW1lbnNpb25zOiBET01SZWN0LCBhbGlnbm1lbnQ6IFBsYWNlbWVudFR5cGVzKTogbnVtYmVyIHtcbiAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuTGVmdCkge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMubGVmdCAtIGNhcmV0T2Zmc2V0O1xuICB9XG5cbiAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuUmlnaHQpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLmxlZnQgKyBlbERpbWVuc2lvbnMud2lkdGggLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCArIGNhcmV0T2Zmc2V0O1xuICB9XG5cbiAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuQ2VudGVyKSB7XG4gICAgcmV0dXJuIGVsRGltZW5zaW9ucy5sZWZ0ICsgZWxEaW1lbnNpb25zLndpZHRoIC8gMiAtIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC8gMjtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogUG9zaXRpb24gaGVscGVyIGZvciB0aGUgcG9wb3ZlciBkaXJlY3RpdmUuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgUG9zaXRpb25IZWxwZXIge1xuICAvKipcbiAgICogQ2FsY3VsYXRlIHZlcnRpY2FsIGFsaWdubWVudCBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBjYWxjdWxhdGVWZXJ0aWNhbEFsaWdubWVudChcbiAgICBlbERpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgcG9wb3ZlckRpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgYWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlc1xuICApOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQgPSB2ZXJ0aWNhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG5cbiAgICBpZiAocmVzdWx0ICsgcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICByZXN1bHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdmVydGljYWwgY2FyZXQgcG9zaXRpb25cbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgY2FsY3VsYXRlVmVydGljYWxDYXJldChcbiAgICBlbERpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgcG9wb3ZlckRpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgY2FyZXREaW1lbnNpb25zOiBET01SZWN0LFxuICAgIGFsaWdubWVudDogUGxhY2VtZW50VHlwZXNcbiAgKTogbnVtYmVyIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuVG9wKSB7XG4gICAgICByZXN1bHQgPSBlbERpbWVuc2lvbnMuaGVpZ2h0IC8gMiAtIGNhcmV0RGltZW5zaW9ucy5oZWlnaHQgLyAyICsgY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuQm90dG9tKSB7XG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLSBlbERpbWVuc2lvbnMuaGVpZ2h0IC8gMiAtIGNhcmV0RGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuQ2VudGVyKSB7XG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXREaW1lbnNpb25zLmhlaWdodCAvIDI7XG4gICAgfVxuXG4gICAgY29uc3QgcG9wb3ZlclBvc2l0aW9uID0gdmVydGljYWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIGlmIChwb3BvdmVyUG9zaXRpb24gKyBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgIHJlc3VsdCArPSBwb3BvdmVyUG9zaXRpb24gKyBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgaG9yeiBhbGlnbm1lbnQgcG9zaXRpb25cbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgY2FsY3VsYXRlSG9yaXpvbnRhbEFsaWdubWVudChcbiAgICBlbERpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgcG9wb3ZlckRpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgYWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlc1xuICApOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQgPSBob3Jpem9udGFsUG9zaXRpb24oZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KTtcblxuICAgIGlmIChyZXN1bHQgKyBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICByZXN1bHQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGhvcnogY2FyZXQgcG9zaXRpb25cbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgY2FsY3VsYXRlSG9yaXpvbnRhbENhcmV0KFxuICAgIGVsRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBwb3BvdmVyRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBjYXJldERpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgYWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlc1xuICApOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5MZWZ0KSB7XG4gICAgICByZXN1bHQgPSBlbERpbWVuc2lvbnMud2lkdGggLyAyIC0gY2FyZXREaW1lbnNpb25zLndpZHRoIC8gMiArIGNhcmV0T2Zmc2V0O1xuICAgIH1cblxuICAgIGlmIChhbGlnbm1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlJpZ2h0KSB7XG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAtIGVsRGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldERpbWVuc2lvbnMud2lkdGggLyAyIC0gY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuQ2VudGVyKSB7XG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldERpbWVuc2lvbnMud2lkdGggLyAyO1xuICAgIH1cblxuICAgIGNvbnN0IHBvcG92ZXJQb3NpdGlvbiA9IGhvcml6b250YWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIGlmIChwb3BvdmVyUG9zaXRpb24gKyBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICByZXN1bHQgKz0gcG9wb3ZlclBvc2l0aW9uICsgcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZWxlbWVudCdzIHBvc2l0aW9uIHNob3VsZCBiZSBmbGlwcGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIHNob3VsZEZsaXAoXG4gICAgZWxEaW1lbnNpb25zOiBET01SZWN0LFxuICAgIHBvcG92ZXJEaW1lbnNpb25zOiBET01SZWN0LFxuICAgIHBsYWNlbWVudDogUGxhY2VtZW50VHlwZXMsXG4gICAgc3BhY2luZzogbnVtYmVyXG4gICk6IGJvb2xlYW4ge1xuICAgIGxldCBmbGlwID0gZmFsc2U7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5SaWdodCkge1xuICAgICAgaWYgKGVsRGltZW5zaW9ucy5sZWZ0ICsgZWxEaW1lbnNpb25zLndpZHRoICsgcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggKyBzcGFjaW5nID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgZmxpcCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMuTGVmdCkge1xuICAgICAgaWYgKGVsRGltZW5zaW9ucy5sZWZ0IC0gcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggLSBzcGFjaW5nIDwgMCkge1xuICAgICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Ub3ApIHtcbiAgICAgIGlmIChlbERpbWVuc2lvbnMudG9wIC0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0IC0gc3BhY2luZyA8IDApIHtcbiAgICAgICAgZmxpcCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMuQm90dG9tKSB7XG4gICAgICBpZiAoZWxEaW1lbnNpb25zLnRvcCArIGVsRGltZW5zaW9ucy5oZWlnaHQgKyBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgKyBzcGFjaW5nID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIGZsaXAgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmbGlwO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIGNhcmV0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIHBvc2l0aW9uQ2FyZXQocGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlcyk6IGFueSB7XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMuUmlnaHQpIHtcbiAgICAgIGxlZnQgPSAtNztcbiAgICAgIHRvcCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZVZlcnRpY2FsQ2FyZXQoaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkxlZnQpIHtcbiAgICAgIGxlZnQgPSBlbG1EaW0ud2lkdGg7XG4gICAgICB0b3AgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVWZXJ0aWNhbENhcmV0KGhvc3REaW0sIGVsbURpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Ub3ApIHtcbiAgICAgIHRvcCA9IGVsbURpbS5oZWlnaHQ7XG4gICAgICBsZWZ0ID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlSG9yaXpvbnRhbENhcmV0KGhvc3REaW0sIGVsbURpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Cb3R0b20pIHtcbiAgICAgIHRvcCA9IC03O1xuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxDYXJldChob3N0RGltLCBlbG1EaW0sIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBjb250ZW50XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIHBvc2l0aW9uQ29udGVudChwbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgc3BhY2luZywgYWxpZ25tZW50KTogYW55IHtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5SaWdodCkge1xuICAgICAgbGVmdCA9IGhvc3REaW0ubGVmdCArIGhvc3REaW0ud2lkdGggKyBzcGFjaW5nO1xuICAgICAgdG9wID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlVmVydGljYWxBbGlnbm1lbnQoaG9zdERpbSwgZWxtRGltLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5MZWZ0KSB7XG4gICAgICBsZWZ0ID0gaG9zdERpbS5sZWZ0IC0gZWxtRGltLndpZHRoIC0gc3BhY2luZztcbiAgICAgIHRvcCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZVZlcnRpY2FsQWxpZ25tZW50KGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMuVG9wKSB7XG4gICAgICB0b3AgPSBob3N0RGltLnRvcCAtIGVsbURpbS5oZWlnaHQgLSBzcGFjaW5nO1xuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxBbGlnbm1lbnQoaG9zdERpbSwgZWxtRGltLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Cb3R0b20pIHtcbiAgICAgIHRvcCA9IGhvc3REaW0udG9wICsgaG9zdERpbS5oZWlnaHQgKyBzcGFjaW5nO1xuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxBbGlnbm1lbnQoaG9zdERpbSwgZWxtRGltLCBhbGlnbm1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB7IHRvcCwgbGVmdCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBwbGFjZW1lbnQgYmFzZWQgb24gZmxpcFxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBkZXRlcm1pbmVQbGFjZW1lbnQocGxhY2VtZW50OiBQbGFjZW1lbnRUeXBlcywgZWxtRGltOiBET01SZWN0LCBob3N0RGltOiBET01SZWN0LCBzcGFjaW5nOiBudW1iZXIpOiBhbnkge1xuICAgIGNvbnN0IHNob3VsZEZsaXAgPSBQb3NpdGlvbkhlbHBlci5zaG91bGRGbGlwKGhvc3REaW0sIGVsbURpbSwgcGxhY2VtZW50LCBzcGFjaW5nKTtcblxuICAgIGlmIChzaG91bGRGbGlwKSB7XG4gICAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5SaWdodCkge1xuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMuTGVmdDtcbiAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5MZWZ0KSB7XG4gICAgICAgIHJldHVybiBQbGFjZW1lbnRUeXBlcy5SaWdodDtcbiAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Ub3ApIHtcbiAgICAgICAgcmV0dXJuIFBsYWNlbWVudFR5cGVzLkJvdHRvbTtcbiAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Cb3R0b20pIHtcbiAgICAgICAgcmV0dXJuIFBsYWNlbWVudFR5cGVzLlRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9XG59XG4iXX0=