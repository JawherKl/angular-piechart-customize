/**
 * Get bounding client rect of given element
 */
import { getStyleComputedProperty } from './getStyleComputedProperty';
import { getBordersSize } from './getBordersSize';
import { getWindowSizes } from './getWindowSizes';
import { getClientRect } from './getClientRect';
import { isNumber } from './isNumeric';
export function getBoundingClientRect(element) {
    const rect = element.getBoundingClientRect();
    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    // try {
    //   if (isIE(10)) {
    //     const scrollTop = getScroll(element, 'top');
    //     const scrollLeft = getScroll(element, 'left');
    //     if (rect && isNumber(rect.top) && isNumber(rect.left) && isNumber(rect.bottom) && isNumber(rect.right)) {
    //       rect.top += scrollTop;
    //       rect.left += scrollLeft;
    //       rect.bottom += scrollTop;
    //       rect.right += scrollLeft;
    //     }
    //   }
    // } catch (e) {
    //   return rect;
    // }
    if (!(rect && isNumber(rect.top) && isNumber(rect.left) && isNumber(rect.bottom) && isNumber(rect.right))) {
        return rect;
    }
    const result = {
        left: rect.left,
        top: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
    // subtract scrollbar size from sizes
    const sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : undefined;
    const width = sizes?.width || element.clientWidth
        || isNumber(rect.right) && isNumber(result.left) && rect.right - result.left || 0;
    const height = sizes?.height || element.clientHeight
        || isNumber(rect.bottom) && isNumber(result.top) && rect.bottom - result.top || 0;
    let horizScrollbar = element.offsetWidth - width;
    let vertScrollbar = element.offsetHeight - height;
    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
        const styles = getStyleComputedProperty(element);
        horizScrollbar -= getBordersSize(styles, 'x');
        vertScrollbar -= getBordersSize(styles, 'y');
        result.width -= horizScrollbar;
        result.height -= vertScrollbar;
    }
    return getClientRect(result);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Bvc2l0aW9uaW5nL3V0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE9BQW9CO0lBQ3hELE1BQU0sSUFBSSxHQUFZLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRXRELG9EQUFvRDtJQUNwRCw2Q0FBNkM7SUFDN0MsNkRBQTZEO0lBQzdELFFBQVE7SUFDUixvQkFBb0I7SUFDcEIsbURBQW1EO0lBQ25ELHFEQUFxRDtJQUNyRCxnSEFBZ0g7SUFDaEgsK0JBQStCO0lBQy9CLGlDQUFpQztJQUNqQyxrQ0FBa0M7SUFDbEMsa0NBQWtDO0lBQ2xDLFFBQVE7SUFDUixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixJQUFJO0lBRUosSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6RyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxNQUFNLEdBQVk7UUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1FBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUk7UUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUc7S0FDL0IsQ0FBQztJQUVGLHFDQUFxQztJQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzlGLE1BQU0sS0FBSyxHQUFHLEtBQUssRUFBRSxLQUFLLElBQUksT0FBTyxDQUFDLFdBQVc7V0FDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDcEYsTUFBTSxNQUFNLEdBQUcsS0FBSyxFQUFFLE1BQU0sSUFBSSxPQUFPLENBQUMsWUFBWTtXQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUVwRixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNqRCxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUVsRCxnRkFBZ0Y7SUFDaEYseURBQXlEO0lBQ3pELElBQUksY0FBYyxJQUFJLGFBQWEsRUFBRTtRQUNuQyxNQUFNLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxhQUFhLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QyxNQUFNLENBQUMsS0FBSyxJQUFJLGNBQWMsQ0FBQztRQUMvQixNQUFNLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQztLQUNoQztJQUVELE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdldCBib3VuZGluZyBjbGllbnQgcmVjdCBvZiBnaXZlbiBlbGVtZW50XG4gKi9cbmltcG9ydCB7IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eSB9IGZyb20gJy4vZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5JztcbmltcG9ydCB7IGdldEJvcmRlcnNTaXplIH0gZnJvbSAnLi9nZXRCb3JkZXJzU2l6ZSc7XG5pbXBvcnQgeyBnZXRXaW5kb3dTaXplcyB9IGZyb20gJy4vZ2V0V2luZG93U2l6ZXMnO1xuaW1wb3J0IHsgZ2V0Q2xpZW50UmVjdCB9IGZyb20gJy4vZ2V0Q2xpZW50UmVjdCc7XG5pbXBvcnQgeyBPZmZzZXRzIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi9pc051bWVyaWMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogT2Zmc2V0cyB7XG4gIGNvbnN0IHJlY3Q6IE9mZnNldHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIC8vIElFMTAgMTAgRklYOiBQbGVhc2UsIGRvbid0IGFzaywgdGhlIGVsZW1lbnQgaXNuJ3RcbiAgLy8gY29uc2lkZXJlZCBpbiBET00gaW4gc29tZSBjaXJjdW1zdGFuY2VzLi4uXG4gIC8vIFRoaXMgaXNuJ3QgcmVwcm9kdWNpYmxlIGluIElFMTAgY29tcGF0aWJpbGl0eSBtb2RlIG9mIElFMTFcbiAgLy8gdHJ5IHtcbiAgLy8gICBpZiAoaXNJRSgxMCkpIHtcbiAgLy8gICAgIGNvbnN0IHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XG4gIC8vICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jyk7XG4gIC8vICAgICBpZiAocmVjdCAmJiBpc051bWJlcihyZWN0LnRvcCkgJiYgaXNOdW1iZXIocmVjdC5sZWZ0KSAmJiBpc051bWJlcihyZWN0LmJvdHRvbSkgJiYgaXNOdW1iZXIocmVjdC5yaWdodCkpIHtcbiAgLy8gICAgICAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wO1xuICAvLyAgICAgICByZWN0LmxlZnQgKz0gc2Nyb2xsTGVmdDtcbiAgLy8gICAgICAgcmVjdC5ib3R0b20gKz0gc2Nyb2xsVG9wO1xuICAvLyAgICAgICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQ7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9IGNhdGNoIChlKSB7XG4gIC8vICAgcmV0dXJuIHJlY3Q7XG4gIC8vIH1cblxuICBpZiAoIShyZWN0ICYmIGlzTnVtYmVyKHJlY3QudG9wKSAmJiBpc051bWJlcihyZWN0LmxlZnQpICYmIGlzTnVtYmVyKHJlY3QuYm90dG9tKSAmJiBpc051bWJlcihyZWN0LnJpZ2h0KSkpIHtcbiAgICByZXR1cm4gcmVjdDtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdDogT2Zmc2V0cyA9IHtcbiAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgdG9wOiByZWN0LnRvcCxcbiAgICB3aWR0aDogcmVjdC5yaWdodCAtIHJlY3QubGVmdCxcbiAgICBoZWlnaHQ6IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcbiAgfTtcblxuICAvLyBzdWJ0cmFjdCBzY3JvbGxiYXIgc2l6ZSBmcm9tIHNpemVzXG4gIGNvbnN0IHNpemVzID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnID8gZ2V0V2luZG93U2l6ZXMoZWxlbWVudC5vd25lckRvY3VtZW50KSA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgd2lkdGggPSBzaXplcz8ud2lkdGggfHwgZWxlbWVudC5jbGllbnRXaWR0aFxuICAgIHx8IGlzTnVtYmVyKHJlY3QucmlnaHQpICYmIGlzTnVtYmVyKHJlc3VsdC5sZWZ0KSAmJiByZWN0LnJpZ2h0IC0gcmVzdWx0LmxlZnQgfHwgMDtcbiAgY29uc3QgaGVpZ2h0ID0gc2l6ZXM/LmhlaWdodCB8fCBlbGVtZW50LmNsaWVudEhlaWdodFxuICAgIHx8IGlzTnVtYmVyKHJlY3QuYm90dG9tKSAmJiBpc051bWJlcihyZXN1bHQudG9wKSAmJiByZWN0LmJvdHRvbSAtIHJlc3VsdC50b3AgfHwgMDtcblxuICBsZXQgaG9yaXpTY3JvbGxiYXIgPSBlbGVtZW50Lm9mZnNldFdpZHRoIC0gd2lkdGg7XG4gIGxldCB2ZXJ0U2Nyb2xsYmFyID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBoZWlnaHQ7XG5cbiAgLy8gaWYgYW4gaHlwb3RoZXRpY2FsIHNjcm9sbGJhciBpcyBkZXRlY3RlZCwgd2UgbXVzdCBiZSBzdXJlIGl0J3Mgbm90IGEgYGJvcmRlcmBcbiAgLy8gd2UgbWFrZSB0aGlzIGNoZWNrIGNvbmRpdGlvbmFsIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gIGlmIChob3JpelNjcm9sbGJhciB8fCB2ZXJ0U2Nyb2xsYmFyKSB7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQpO1xuICAgIGhvcml6U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3gnKTtcbiAgICB2ZXJ0U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3knKTtcblxuICAgIHJlc3VsdC53aWR0aCAtPSBob3JpelNjcm9sbGJhcjtcbiAgICByZXN1bHQuaGVpZ2h0IC09IHZlcnRTY3JvbGxiYXI7XG4gIH1cblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChyZXN1bHQpO1xufVxuIl19