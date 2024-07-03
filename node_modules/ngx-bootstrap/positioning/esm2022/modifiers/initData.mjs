import { computeAutoPlacement, getReferenceOffsets, getTargetOffsets } from '../utils';
export function initData(targetElement, hostElement, position, options) {
    if (!targetElement || !hostElement) {
        return;
    }
    const hostElPosition = getReferenceOffsets(targetElement, hostElement);
    if (!position.match(/^(auto)*\s*(left|right|top|bottom|start|end)*$/)
        && !position.match(/^(left|right|top|bottom|start|end)*(?: (left|right|top|bottom|start|end))*$/)) {
        position = 'auto';
    }
    const placementAuto = !!position.match(/auto/g);
    // support old placements 'auto left|right|top|bottom'
    let placement = position.match(/auto\s(left|right|top|bottom|start|end)/)
        ? position.split(' ')[1] || 'auto'
        : position;
    // Normalize placements that have identical main placement and variation ("right right" => "right").
    const matches = placement.match(/^(left|right|top|bottom|start|end)* ?(?!\1)(left|right|top|bottom|start|end)?/);
    if (matches) {
        placement = matches[1] + (matches[2] ? ` ${matches[2]}` : '');
    }
    // "left right", "top bottom" etc. placements also considered incorrect.
    if (['left right', 'right left', 'top bottom', 'bottom top'].indexOf(placement) !== -1) {
        placement = 'auto';
    }
    placement = computeAutoPlacement(placement, hostElPosition, targetElement, hostElement, options ? options.allowedPositions : undefined);
    const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);
    return {
        options: options || { modifiers: {} },
        instance: {
            target: targetElement,
            host: hostElement,
            arrow: void 0
        },
        offsets: {
            target: targetOffset,
            host: hostElPosition,
            arrow: void 0
        },
        positionFixed: false,
        placement,
        placementAuto
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcG9zaXRpb25pbmcvbW9kaWZpZXJzL2luaXREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNqQixNQUFNLFVBQVUsQ0FBQztBQUlsQixNQUFNLFVBQVUsUUFBUSxDQUN0QixhQUErQixFQUFFLFdBQTZCLEVBQUUsUUFBZ0IsRUFBRSxPQUFpQjtJQUduRyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2xDLE9BQVE7S0FDVDtJQUVELE1BQU0sY0FBYyxHQUFHLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV2RSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQztXQUNoRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkVBQTZFLENBQUMsRUFBRTtRQUMzRixRQUFRLEdBQUcsTUFBTSxDQUFDO0tBQ3pCO0lBRUgsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEQsc0RBQXNEO0lBQ3RELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMseUNBQXlDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTTtRQUNsQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBRWIsb0dBQW9HO0lBQ3BHLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQztJQUNqSCxJQUFJLE9BQU8sRUFBRTtRQUNYLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsd0VBQXdFO0lBQ3hFLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDdEYsU0FBUyxHQUFHLE1BQU0sQ0FBQztLQUNwQjtJQUVELFNBQVMsR0FBRyxvQkFBb0IsQ0FDOUIsU0FBUyxFQUNULGNBQWMsRUFDZCxhQUFhLEVBQ2IsV0FBVyxFQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQy9DLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRWhGLE9BQU87UUFDTCxPQUFPLEVBQUUsT0FBTyxJQUFJLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBQztRQUNuQyxRQUFRLEVBQUU7WUFDUixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxNQUFNLEVBQUUsWUFBWTtZQUNwQixJQUFJLEVBQUUsY0FBYztZQUNwQixLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ2Q7UUFDRCxhQUFhLEVBQUUsS0FBSztRQUNwQixTQUFTO1FBQ1QsYUFBYTtLQUNkLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY29tcHV0ZUF1dG9QbGFjZW1lbnQsXG4gIGdldFJlZmVyZW5jZU9mZnNldHMsXG4gIGdldFRhcmdldE9mZnNldHNcbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQgeyBEYXRhLCBPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREYXRhKFxuICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudHxudWxsLCBob3N0RWxlbWVudDogSFRNTEVsZW1lbnR8bnVsbCwgcG9zaXRpb246IHN0cmluZywgb3B0aW9ucz86IE9wdGlvbnNcbik6IERhdGF8dW5kZWZpbmVkIHtcblxuICBpZiAoIXRhcmdldEVsZW1lbnQgfHwgIWhvc3RFbGVtZW50KSB7XG4gICAgcmV0dXJuIDtcbiAgfVxuXG4gIGNvbnN0IGhvc3RFbFBvc2l0aW9uID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyh0YXJnZXRFbGVtZW50LCBob3N0RWxlbWVudCk7XG5cbiAgaWYgKCFwb3NpdGlvbi5tYXRjaCgvXihhdXRvKSpcXHMqKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpKiQvKVxuICAgICYmICFwb3NpdGlvbi5tYXRjaCgvXihsZWZ0fHJpZ2h0fHRvcHxib3R0b218c3RhcnR8ZW5kKSooPzogKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpKSokLykpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gJ2F1dG8nO1xuICAgIH1cblxuICBjb25zdCBwbGFjZW1lbnRBdXRvID0gISFwb3NpdGlvbi5tYXRjaCgvYXV0by9nKTtcblxuICAvLyBzdXBwb3J0IG9sZCBwbGFjZW1lbnRzICdhdXRvIGxlZnR8cmlnaHR8dG9wfGJvdHRvbSdcbiAgbGV0IHBsYWNlbWVudCA9IHBvc2l0aW9uLm1hdGNoKC9hdXRvXFxzKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpLylcbiAgICA/IHBvc2l0aW9uLnNwbGl0KCcgJylbMV0gfHwgJ2F1dG8nXG4gICAgOiBwb3NpdGlvbjtcblxuICAvLyBOb3JtYWxpemUgcGxhY2VtZW50cyB0aGF0IGhhdmUgaWRlbnRpY2FsIG1haW4gcGxhY2VtZW50IGFuZCB2YXJpYXRpb24gKFwicmlnaHQgcmlnaHRcIiA9PiBcInJpZ2h0XCIpLlxuICBjb25zdCBtYXRjaGVzID0gcGxhY2VtZW50Lm1hdGNoKC9eKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpKiA/KD8hXFwxKShsZWZ0fHJpZ2h0fHRvcHxib3R0b218c3RhcnR8ZW5kKT8vKTtcbiAgaWYgKG1hdGNoZXMpIHtcbiAgICBwbGFjZW1lbnQgPSBtYXRjaGVzWzFdICsgKG1hdGNoZXNbMl0gPyBgICR7bWF0Y2hlc1syXX1gIDogJycpO1xuICB9XG5cbiAgLy8gXCJsZWZ0IHJpZ2h0XCIsIFwidG9wIGJvdHRvbVwiIGV0Yy4gcGxhY2VtZW50cyBhbHNvIGNvbnNpZGVyZWQgaW5jb3JyZWN0LlxuICBpZiAoWydsZWZ0IHJpZ2h0JywgJ3JpZ2h0IGxlZnQnLCAndG9wIGJvdHRvbScsICdib3R0b20gdG9wJ10uaW5kZXhPZihwbGFjZW1lbnQpICE9PSAtMSkge1xuICAgIHBsYWNlbWVudCA9ICdhdXRvJztcbiAgfVxuXG4gIHBsYWNlbWVudCA9IGNvbXB1dGVBdXRvUGxhY2VtZW50KFxuICAgIHBsYWNlbWVudCxcbiAgICBob3N0RWxQb3NpdGlvbixcbiAgICB0YXJnZXRFbGVtZW50LFxuICAgIGhvc3RFbGVtZW50LFxuICAgIG9wdGlvbnMgPyBvcHRpb25zLmFsbG93ZWRQb3NpdGlvbnMgOiB1bmRlZmluZWRcbiAgKTtcblxuICBjb25zdCB0YXJnZXRPZmZzZXQgPSBnZXRUYXJnZXRPZmZzZXRzKHRhcmdldEVsZW1lbnQsIGhvc3RFbFBvc2l0aW9uLCBwbGFjZW1lbnQpO1xuXG4gIHJldHVybiB7XG4gICAgb3B0aW9uczogb3B0aW9ucyB8fCB7bW9kaWZpZXJzOiB7fX0sXG4gICAgaW5zdGFuY2U6IHtcbiAgICAgIHRhcmdldDogdGFyZ2V0RWxlbWVudCxcbiAgICAgIGhvc3Q6IGhvc3RFbGVtZW50LFxuICAgICAgYXJyb3c6IHZvaWQgMFxuICAgIH0sXG4gICAgb2Zmc2V0czoge1xuICAgICAgdGFyZ2V0OiB0YXJnZXRPZmZzZXQsXG4gICAgICBob3N0OiBob3N0RWxQb3NpdGlvbixcbiAgICAgIGFycm93OiB2b2lkIDBcbiAgICB9LFxuICAgIHBvc2l0aW9uRml4ZWQ6IGZhbHNlLFxuICAgIHBsYWNlbWVudCxcbiAgICBwbGFjZW1lbnRBdXRvXG4gIH07XG59XG4iXX0=