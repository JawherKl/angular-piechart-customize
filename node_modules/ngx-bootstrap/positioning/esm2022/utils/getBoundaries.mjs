import { findCommonOffsetParent } from './findCommonOffsetParent';
import { getFixedPositionOffsetParent } from './getFixedPositionOffsetParent';
import { getOffsetRectRelativeToArbitraryNode } from './getOffsetRectRelativeToArbitraryNode';
import { getParentNode } from './getParentNode';
import { getScrollParent } from './getScrollParent';
import { getViewportOffsetRectRelativeToArtbitraryNode } from './getViewportOffsetRectRelativeToArtbitraryNode';
import { getWindowSizes } from './getWindowSizes';
import { isFixed } from './isFixed';
import { isNumber } from './isNumeric';
export function getBoundaries(target, host, padding = 0, boundariesElement, fixedPosition = false) {
    // NOTE: 1 DOM access here
    let boundaries = { top: 0, left: 0 };
    const offsetParent = fixedPosition ? getFixedPositionOffsetParent(target) : findCommonOffsetParent(target, host);
    // Handle viewport case
    if (boundariesElement === 'viewport') {
        boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    }
    else {
        // Handle other cases based on DOM element used as boundaries
        let boundariesNode;
        if (boundariesElement === 'scrollParent') {
            boundariesNode = getScrollParent(getParentNode(host));
            if (boundariesNode.nodeName === 'BODY') {
                boundariesNode = target.ownerDocument.documentElement;
            }
        }
        else if (boundariesElement === 'window') {
            boundariesNode = target.ownerDocument.documentElement;
        }
        else {
            boundariesNode = boundariesElement;
        }
        const offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
        // In case of HTML, we need a different computation
        if (offsets && boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
            const { height, width } = getWindowSizes(target.ownerDocument);
            if (isNumber(boundaries.top) && isNumber(offsets.top) && isNumber(offsets.marginTop)) {
                boundaries.top += offsets.top - offsets.marginTop;
            }
            if (isNumber(boundaries.top)) {
                boundaries.bottom = Number(height) + Number(offsets.top);
            }
            if (isNumber(boundaries.left) && isNumber(offsets.left) && isNumber(offsets.marginLeft)) {
                boundaries.left += offsets.left - offsets.marginLeft;
            }
            if (isNumber(boundaries.top)) {
                boundaries.right = Number(width) + Number(offsets.left);
            }
        }
        else if (offsets) {
            // for all the other DOM elements, this one is good
            boundaries = offsets;
        }
    }
    // Add paddings
    if (isNumber(boundaries.left)) {
        boundaries.left += padding;
    }
    if (isNumber(boundaries.top)) {
        boundaries.top += padding;
    }
    if (isNumber(boundaries.right)) {
        boundaries.right -= padding;
    }
    if (isNumber(boundaries.bottom)) {
        boundaries.bottom -= padding;
    }
    return boundaries;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Qm91bmRhcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wb3NpdGlvbmluZy91dGlscy9nZXRCb3VuZGFyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLDZDQUE2QyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDaEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLFVBQVUsYUFBYSxDQUMzQixNQUFtQixFQUNuQixJQUFpQixFQUNqQixPQUFPLEdBQUcsQ0FBQyxFQUNYLGlCQUF5QixFQUN6QixhQUFhLEdBQUcsS0FBSztJQUVyQiwwQkFBMEI7SUFFMUIsSUFBSSxVQUFVLEdBQXFCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdkQsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWpILHVCQUF1QjtJQUN2QixJQUFJLGlCQUFpQixLQUFLLFVBQVUsRUFBRTtRQUNwQyxVQUFVLEdBQUcsNkNB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IGFuZCByZXR1cm4gdGhlbVxuICovXG5pbXBvcnQgeyBPZmZzZXRzIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGZpbmRDb21tb25PZmZzZXRQYXJlbnQgfSBmcm9tICcuL2ZpbmRDb21tb25PZmZzZXRQYXJlbnQnO1xuaW1wb3J0IHsgZ2V0Rml4ZWRQb3NpdGlvbk9mZnNldFBhcmVudCB9IGZyb20gJy4vZ2V0Rml4ZWRQb3NpdGlvbk9mZnNldFBhcmVudCc7XG5pbXBvcnQgeyBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUgfSBmcm9tICcuL2dldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZSc7XG5pbXBvcnQgeyBnZXRQYXJlbnROb2RlIH0gZnJvbSAnLi9nZXRQYXJlbnROb2RlJztcbmltcG9ydCB7IGdldFNjcm9sbFBhcmVudCB9IGZyb20gJy4vZ2V0U2Nyb2xsUGFyZW50JztcbmltcG9ydCB7IGdldFZpZXdwb3J0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcnRiaXRyYXJ5Tm9kZSB9IGZyb20gJy4vZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlJztcbmltcG9ydCB7IGdldFdpbmRvd1NpemVzIH0gZnJvbSAnLi9nZXRXaW5kb3dTaXplcyc7XG5pbXBvcnQgeyBpc0ZpeGVkIH0gZnJvbSAnLi9pc0ZpeGVkJztcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi9pc051bWVyaWMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRhcmllcyhcbiAgdGFyZ2V0OiBIVE1MRWxlbWVudCxcbiAgaG9zdDogSFRNTEVsZW1lbnQsXG4gIHBhZGRpbmcgPSAwLFxuICBib3VuZGFyaWVzRWxlbWVudDogc3RyaW5nLFxuICBmaXhlZFBvc2l0aW9uID0gZmFsc2Vcbik6IFBhcnRpYWw8T2Zmc2V0cz4ge1xuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuXG4gIGxldCBib3VuZGFyaWVzOiBQYXJ0aWFsPE9mZnNldHM+ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gZml4ZWRQb3NpdGlvbiA/IGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQodGFyZ2V0KSA6IGZpbmRDb21tb25PZmZzZXRQYXJlbnQodGFyZ2V0LCBob3N0KTtcblxuICAvLyBIYW5kbGUgdmlld3BvcnQgY2FzZVxuICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd2aWV3cG9ydCcpIHtcbiAgICBib3VuZGFyaWVzID0gZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlKG9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gSGFuZGxlIG90aGVyIGNhc2VzIGJhc2VkIG9uIERPTSBlbGVtZW50IHVzZWQgYXMgYm91bmRhcmllc1xuICAgIGxldCBib3VuZGFyaWVzTm9kZTtcbiAgICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKGhvc3QpKTtcbiAgICAgIGlmIChib3VuZGFyaWVzTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgIGJvdW5kYXJpZXNOb2RlID0gdGFyZ2V0Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd3aW5kb3cnKSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IHRhcmdldC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmRhcmllc05vZGUgPSBib3VuZGFyaWVzRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZzZXRzID0gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKFxuICAgICAgYm91bmRhcmllc05vZGUsXG4gICAgICBvZmZzZXRQYXJlbnQsXG4gICAgICBmaXhlZFBvc2l0aW9uXG4gICAgKTtcblxuICAgIC8vIEluIGNhc2Ugb2YgSFRNTCwgd2UgbmVlZCBhIGRpZmZlcmVudCBjb21wdXRhdGlvblxuICAgIGlmIChvZmZzZXRzICYmIGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnSFRNTCcgJiYgIWlzRml4ZWQob2Zmc2V0UGFyZW50KSkge1xuICAgICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBnZXRXaW5kb3dTaXplcyh0YXJnZXQub3duZXJEb2N1bWVudCk7XG4gICAgICBpZiAoaXNOdW1iZXIoYm91bmRhcmllcy50b3ApICYmIGlzTnVtYmVyKG9mZnNldHMudG9wKSAmJiBpc051bWJlcihvZmZzZXRzLm1hcmdpblRvcCkpIHtcbiAgICAgICAgYm91bmRhcmllcy50b3AgKz0gb2Zmc2V0cy50b3AgLSBvZmZzZXRzLm1hcmdpblRvcDtcbiAgICAgIH1cbiAgICAgIGlmIChpc051bWJlcihib3VuZGFyaWVzLnRvcCkpIHtcbiAgICAgICAgYm91bmRhcmllcy5ib3R0b20gPSBOdW1iZXIoaGVpZ2h0KSArIE51bWJlcihvZmZzZXRzLnRvcCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNOdW1iZXIoYm91bmRhcmllcy5sZWZ0KSAmJiBpc051bWJlcihvZmZzZXRzLmxlZnQpICYmIGlzTnVtYmVyKG9mZnNldHMubWFyZ2luTGVmdCkpIHtcbiAgICAgICAgYm91bmRhcmllcy5sZWZ0ICs9IG9mZnNldHMubGVmdCAtIG9mZnNldHMubWFyZ2luTGVmdDtcbiAgICAgIH1cbiAgICAgIGlmIChpc051bWJlcihib3VuZGFyaWVzLnRvcCkpIHtcbiAgICAgICAgYm91bmRhcmllcy5yaWdodCA9IE51bWJlcih3aWR0aCkgKyBOdW1iZXIob2Zmc2V0cy5sZWZ0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9mZnNldHMpIHtcbiAgICAgIC8vIGZvciBhbGwgdGhlIG90aGVyIERPTSBlbGVtZW50cywgdGhpcyBvbmUgaXMgZ29vZFxuICAgICAgYm91bmRhcmllcyA9IG9mZnNldHM7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHBhZGRpbmdzXG4gIGlmIChpc051bWJlcihib3VuZGFyaWVzLmxlZnQpKSB7XG4gICAgYm91bmRhcmllcy5sZWZ0ICs9IHBhZGRpbmc7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKGJvdW5kYXJpZXMudG9wKSkge1xuICAgIGJvdW5kYXJpZXMudG9wICs9IHBhZGRpbmc7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKGJvdW5kYXJpZXMucmlnaHQpKSB7XG4gICAgYm91bmRhcmllcy5yaWdodCAtPSBwYWRkaW5nO1xuICB9XG4gIGlmIChpc051bWJlcihib3VuZGFyaWVzLmJvdHRvbSkpIHtcbiAgICBib3VuZGFyaWVzLmJvdHRvbSAtPSBwYWRkaW5nO1xuICB9XG5cbiAgcmV0dXJuIGJvdW5kYXJpZXM7XG59XG4iXX0=