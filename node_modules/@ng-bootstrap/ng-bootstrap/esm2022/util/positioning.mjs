import { arrow, createPopperLite, flip, preventOverflow, } from '@popperjs/core';
import { NgbRTL } from './rtl';
import { inject } from '@angular/core';
const placementSeparator = /\s+/;
const spacesRegExp = /  +/gi;
/**
 * Matching classes from the Bootstrap ones to the poppers ones.
 * The first index of each array is used for the left to right direction,
 * the second one is used for the right to left, defaulting to the first index (when LTR and RTL lead to the same class)
 *
 * See [Bootstrap alignments](https://getbootstrap.com/docs/5.1/components/dropdowns/#alignment-options)
 * and [Popper placements](https://popper.js.org/docs/v2/constructors/#options)
 */
const bootstrapPopperMatches = {
    top: ['top'],
    bottom: ['bottom'],
    start: ['left', 'right'],
    left: ['left'],
    end: ['right', 'left'],
    right: ['right'],
    'top-start': ['top-start', 'top-end'],
    'top-left': ['top-start'],
    'top-end': ['top-end', 'top-start'],
    'top-right': ['top-end'],
    'bottom-start': ['bottom-start', 'bottom-end'],
    'bottom-left': ['bottom-start'],
    'bottom-end': ['bottom-end', 'bottom-start'],
    'bottom-right': ['bottom-end'],
    'start-top': ['left-start', 'right-start'],
    'left-top': ['left-start'],
    'start-bottom': ['left-end', 'right-end'],
    'left-bottom': ['left-end'],
    'end-top': ['right-start', 'left-start'],
    'right-top': ['right-start'],
    'end-bottom': ['right-end', 'left-end'],
    'right-bottom': ['right-end'],
};
export function getPopperClassPlacement(placement, isRTL) {
    const [leftClass, rightClass] = bootstrapPopperMatches[placement];
    return isRTL ? rightClass || leftClass : leftClass;
}
const popperStartPrimaryPlacement = /^left/;
const popperEndPrimaryPlacement = /^right/;
const popperStartSecondaryPlacement = /^start/;
const popperEndSecondaryPlacement = /^end/;
export function getBootstrapBaseClassPlacement(baseClass, placement) {
    let [primary, secondary] = placement.split('-');
    const newPrimary = primary.replace(popperStartPrimaryPlacement, 'start').replace(popperEndPrimaryPlacement, 'end');
    let classnames = [newPrimary];
    if (secondary) {
        let newSecondary = secondary;
        if (primary === 'left' || primary === 'right') {
            newSecondary = newSecondary
                .replace(popperStartSecondaryPlacement, 'top')
                .replace(popperEndSecondaryPlacement, 'bottom');
        }
        classnames.push(`${newPrimary}-${newSecondary}`);
    }
    if (baseClass) {
        classnames = classnames.map((classname) => `${baseClass}-${classname}`);
    }
    return classnames.join(' ');
}
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'start', 'end',
 *   'top-start', 'top-end',
 *   'bottom-start', 'bottom-end',
 *   'start-top', 'start-bottom',
 *   'end-top', 'end-bottom'.
 * */
export function getPopperOptions({ placement, baseClass }, rtl) {
    let placementVals = Array.isArray(placement)
        ? placement
        : placement.split(placementSeparator);
    // No need to consider left and right here, as start and end are enough, and it is used for 'auto' placement only
    const allowedPlacements = [
        'top',
        'bottom',
        'start',
        'end',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'start-top',
        'start-bottom',
        'end-top',
        'end-bottom',
    ];
    // replace auto placement with other placements
    let hasAuto = placementVals.findIndex((val) => val === 'auto');
    if (hasAuto >= 0) {
        allowedPlacements.forEach(function (obj) {
            if (placementVals.find((val) => val.search('^' + obj) !== -1) == null) {
                placementVals.splice(hasAuto++, 1, obj);
            }
        });
    }
    const popperPlacements = placementVals.map((_placement) => {
        return getPopperClassPlacement(_placement, rtl.isRTL());
    });
    let mainPlacement = popperPlacements.shift();
    const bsModifier = {
        name: 'bootstrapClasses',
        enabled: !!baseClass,
        phase: 'write',
        fn({ state }) {
            const bsClassRegExp = new RegExp(baseClass + '(-[a-z]+)*', 'gi');
            const popperElement = state.elements.popper;
            const popperPlacement = state.placement;
            let className = popperElement.className;
            // Remove old bootstrap classes
            className = className.replace(bsClassRegExp, '');
            // Add current placements
            className += ` ${getBootstrapBaseClassPlacement(baseClass, popperPlacement)}`;
            // Remove multiple spaces
            className = className.trim().replace(spacesRegExp, ' ');
            // Reassign
            popperElement.className = className;
        },
    };
    return {
        placement: mainPlacement,
        modifiers: [
            bsModifier,
            flip,
            preventOverflow,
            arrow,
            {
                enabled: true,
                name: 'flip',
                options: {
                    fallbackPlacements: popperPlacements,
                },
            },
            {
                enabled: true,
                name: 'preventOverflow',
                phase: 'main',
                fn: function () { },
            },
        ],
    };
}
function noop(arg) {
    return arg;
}
export function ngbPositioning() {
    const rtl = inject(NgbRTL);
    let popperInstance = null;
    return {
        createPopper(positioningOption) {
            if (!popperInstance) {
                const updatePopperOptions = positioningOption.updatePopperOptions || noop;
                let popperOptions = updatePopperOptions(getPopperOptions(positioningOption, rtl));
                popperInstance = createPopperLite(positioningOption.hostElement, positioningOption.targetElement, popperOptions);
            }
        },
        update() {
            if (popperInstance) {
                popperInstance.update();
            }
        },
        setOptions(positioningOption) {
            if (popperInstance) {
                const updatePopperOptions = positioningOption.updatePopperOptions || noop;
                let popperOptions = updatePopperOptions(getPopperOptions(positioningOption, rtl));
                popperInstance.setOptions(popperOptions);
            }
        },
        destroy() {
            if (popperInstance) {
                popperInstance.destroy();
                popperInstance = null;
            }
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9wb3NpdGlvbmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ04sS0FBSyxFQUNMLGdCQUFnQixFQUNoQixJQUFJLEVBSUosZUFBZSxHQUVmLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQ2pDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQztBQUU3Qjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxzQkFBc0IsR0FBRztJQUM5QixHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDWixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDbEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztJQUN4QixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDZCxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3RCLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNoQixXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDO0lBQ3JDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUN6QixTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO0lBQ25DLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN4QixjQUFjLEVBQUUsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDO0lBQzlDLGFBQWEsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUMvQixZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO0lBQzVDLGNBQWMsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUM5QixXQUFXLEVBQUUsQ0FBQyxZ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LGNBQWMsR0FBRyxnQkFBZ0IsQ0FDaEMsaUJBQWlCLENBQUMsV0FBVyxFQUM3QixpQkFBaUIsQ0FBQyxhQUFhLEVBQy9CLGFBQWEsQ0FDYixDQUFDO2FBQ0Y7UUFDRixDQUFDO1FBQ0QsTUFBTTtZQUNMLElBQUksY0FBYyxFQUFFO2dCQUNuQixjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEI7UUFDRixDQUFDO1FBQ0QsVUFBVSxDQUFDLGlCQUFxQztZQUMvQyxJQUFJLGNBQWMsRUFBRTtnQkFDbkIsTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUM7Z0JBQzFFLElBQUksYUFBYSxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLGNBQWMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDekM7UUFDRixDQUFDO1FBQ0QsT0FBTztZQUNOLElBQUksY0FBYyxFQUFFO2dCQUNuQixjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDRixDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRhcnJvdyxcblx0Y3JlYXRlUG9wcGVyTGl0ZSxcblx0ZmxpcCxcblx0SW5zdGFuY2UsXG5cdE1vZGlmaWVyLFxuXHRQbGFjZW1lbnQgYXMgUG9wcGVyUGxhY2VtZW50LFxuXHRwcmV2ZW50T3ZlcmZsb3csXG5cdE9wdGlvbnMsXG59IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbmltcG9ydCB7IE5nYlJUTCB9IGZyb20gJy4vcnRsJztcbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBwbGFjZW1lbnRTZXBhcmF0b3IgPSAvXFxzKy87XG5jb25zdCBzcGFjZXNSZWdFeHAgPSAvICArL2dpO1xuXG4vKipcbiAqIE1hdGNoaW5nIGNsYXNzZXMgZnJvbSB0aGUgQm9vdHN0cmFwIG9uZXMgdG8gdGhlIHBvcHBlcnMgb25lcy5cbiAqIFRoZSBmaXJzdCBpbmRleCBvZiBlYWNoIGFycmF5IGlzIHVzZWQgZm9yIHRoZSBsZWZ0IHRvIHJpZ2h0IGRpcmVjdGlvbixcbiAqIHRoZSBzZWNvbmQgb25lIGlzIHVzZWQgZm9yIHRoZSByaWdodCB0byBsZWZ0LCBkZWZhdWx0aW5nIHRvIHRoZSBmaXJzdCBpbmRleCAod2hlbiBMVFIgYW5kIFJUTCBsZWFkIHRvIHRoZSBzYW1lIGNsYXNzKVxuICpcbiAqIFNlZSBbQm9vdHN0cmFwIGFsaWdubWVudHNdKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzUuMS9jb21wb25lbnRzL2Ryb3Bkb3ducy8jYWxpZ25tZW50LW9wdGlvbnMpXG4gKiBhbmQgW1BvcHBlciBwbGFjZW1lbnRzXShodHRwczovL3BvcHBlci5qcy5vcmcvZG9jcy92Mi9jb25zdHJ1Y3RvcnMvI29wdGlvbnMpXG4gKi9cbmNvbnN0IGJvb3RzdHJhcFBvcHBlck1hdGNoZXMgPSB7XG5cdHRvcDogWyd0b3AnXSxcblx0Ym90dG9tOiBbJ2JvdHRvbSddLFxuXHRzdGFydDogWydsZWZ0JywgJ3JpZ2h0J10sXG5cdGxlZnQ6IFsnbGVmdCddLFxuXHRlbmQ6IFsncmlnaHQnLCAnbGVmdCddLFxuXHRyaWdodDogWydyaWdodCddLFxuXHQndG9wLXN0YXJ0JzogWyd0b3Atc3RhcnQnLCAndG9wLWVuZCddLFxuXHQndG9wLWxlZnQnOiBbJ3RvcC1zdGFydCddLFxuXHQndG9wLWVuZCc6IFsndG9wLWVuZCcsICd0b3Atc3RhcnQnXSxcblx0J3RvcC1yaWdodCc6IFsndG9wLWVuZCddLFxuXHQnYm90dG9tLXN0YXJ0JzogWydib3R0b20tc3RhcnQnLCAnYm90dG9tLWVuZCddLFxuXHQnYm90dG9tLWxlZnQnOiBbJ2JvdHRvbS1zdGFydCddLFxuXHQnYm90dG9tLWVuZCc6IFsnYm90dG9tLWVuZCcsICdib3R0b20tc3RhcnQnXSxcblx0J2JvdHRvbS1yaWdodCc6IFsnYm90dG9tLWVuZCddLFxuXHQnc3RhcnQtdG9wJzogWydsZWZ0LXN0YXJ0JywgJ3JpZ2h0LXN0YXJ0J10sXG5cdCdsZWZ0LXRvcCc6IFsnbGVmdC1zdGFydCddLFxuXHQnc3RhcnQtYm90dG9tJzogWydsZWZ0LWVuZCcsICdyaWdodC1lbmQnXSxcblx0J2xlZnQtYm90dG9tJzogWydsZWZ0LWVuZCddLFxuXHQnZW5kLXRvcCc6IFsncmlnaHQtc3RhcnQnLCAnbGVmdC1zdGFydCddLFxuXHQncmlnaHQtdG9wJzogWydyaWdodC1zdGFydCddLFxuXHQnZW5kLWJvdHRvbSc6IFsncmlnaHQtZW5kJywgJ2xlZnQtZW5kJ10sXG5cdCdyaWdodC1ib3R0b20nOiBbJ3JpZ2h0LWVuZCddLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcHBlckNsYXNzUGxhY2VtZW50KHBsYWNlbWVudDogUGxhY2VtZW50LCBpc1JUTDogYm9vbGVhbik6IFBvcHBlclBsYWNlbWVudCB7XG5cdGNvbnN0IFtsZWZ0Q2xhc3MsIHJpZ2h0Q2xhc3NdID0gYm9vdHN0cmFwUG9wcGVyTWF0Y2hlc1twbGFjZW1lbnRdO1xuXHRyZXR1cm4gaXNSVEwgPyByaWdodENsYXNzIHx8IGxlZnRDbGFzcyA6IGxlZnRDbGFzcztcbn1cblxuY29uc3QgcG9wcGVyU3RhcnRQcmltYXJ5UGxhY2VtZW50ID0gL15sZWZ0LztcbmNvbnN0IHBvcHBlckVuZFByaW1hcnlQbGFjZW1lbnQgPSAvXnJpZ2h0LztcbmNvbnN0IHBvcHBlclN0YXJ0U2Vjb25kYXJ5UGxhY2VtZW50ID0gL15zdGFydC87XG5jb25zdCBwb3BwZXJFbmRTZWNvbmRhcnlQbGFjZW1lbnQgPSAvXmVuZC87XG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm9vdHN0cmFwQmFzZUNsYXNzUGxhY2VtZW50KGJhc2VDbGFzczogc3RyaW5nLCBwbGFjZW1lbnQ6IFBvcHBlclBsYWNlbWVudCk6IHN0cmluZyB7XG5cdGxldCBbcHJpbWFyeSwgc2Vjb25kYXJ5XSA9IHBsYWNlbWVudC5zcGxpdCgnLScpO1xuXHRjb25zdCBuZXdQcmltYXJ5ID0gcHJpbWFyeS5yZXBsYWNlKHBvcHBlclN0YXJ0UHJpbWFyeVBsYWNlbWVudCwgJ3N0YXJ0JykucmVwbGFjZShwb3BwZXJFbmRQcmltYXJ5UGxhY2VtZW50LCAnZW5kJyk7XG5cdGxldCBjbGFzc25hbWVzID0gW25ld1ByaW1hcnldO1xuXHRpZiAoc2Vjb25kYXJ5KSB7XG5cdFx0bGV0IG5ld1NlY29uZGFyeSA9IHNlY29uZGFyeTtcblx0XHRpZiAocHJpbWFyeSA9PT0gJ2xlZnQnIHx8IHByaW1hcnkgPT09ICdyaWdodCcpIHtcblx0XHRcdG5ld1NlY29uZGFyeSA9IG5ld1NlY29uZGFyeVxuXHRcdFx0XHQucmVwbGFjZShwb3BwZXJTdGFydFNlY29uZGFyeVBsYWNlbWVudCwgJ3RvcCcpXG5cdFx0XHRcdC5yZXBsYWNlKHBvcHBlckVuZFNlY29uZGFyeVBsYWNlbWVudCwgJ2JvdHRvbScpO1xuXHRcdH1cblx0XHRjbGFzc25hbWVzLnB1c2goYCR7bmV3UHJpbWFyeX0tJHtuZXdTZWNvbmRhcnl9YCBhcyBQbGFjZW1lbnQpO1xuXHR9XG5cdGlmIChiYXNlQ2xhc3MpIHtcblx0XHRjbGFzc25hbWVzID0gY2xhc3NuYW1lcy5tYXAoKGNsYXNzbmFtZSkgPT4gYCR7YmFzZUNsYXNzfS0ke2NsYXNzbmFtZX1gKTtcblx0fVxuXHRyZXR1cm4gY2xhc3NuYW1lcy5qb2luKCcgJyk7XG59XG5cbi8qXG4gKiBBY2NlcHQgdGhlIHBsYWNlbWVudCBhcnJheSBhbmQgYXBwbGllcyB0aGUgYXBwcm9wcmlhdGUgcGxhY2VtZW50IGRlcGVuZGVudCBvbiB0aGUgdmlld3BvcnQuXG4gKiBSZXR1cm5zIHRoZSBhcHBsaWVkIHBsYWNlbWVudC5cbiAqIEluIGNhc2Ugb2YgYXV0byBwbGFjZW1lbnQsIHBsYWNlbWVudHMgYXJlIHNlbGVjdGVkIGluIG9yZGVyXG4gKiAgICd0b3AnLCAnYm90dG9tJywgJ3N0YXJ0JywgJ2VuZCcsXG4gKiAgICd0b3Atc3RhcnQnLCAndG9wLWVuZCcsXG4gKiAgICdib3R0b20tc3RhcnQnLCAnYm90dG9tLWVuZCcsXG4gKiAgICdzdGFydC10b3AnLCAnc3RhcnQtYm90dG9tJyxcbiAqICAgJ2VuZC10b3AnLCAnZW5kLWJvdHRvbScuXG4gKiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcHBlck9wdGlvbnMoeyBwbGFjZW1lbnQsIGJhc2VDbGFzcyB9OiBQb3NpdGlvbmluZ09wdGlvbnMsIHJ0bDogTmdiUlRMKTogUGFydGlhbDxPcHRpb25zPiB7XG5cdGxldCBwbGFjZW1lbnRWYWxzOiBBcnJheTxQbGFjZW1lbnQ+ID0gQXJyYXkuaXNBcnJheShwbGFjZW1lbnQpXG5cdFx0PyBwbGFjZW1lbnRcblx0XHQ6IChwbGFjZW1lbnQuc3BsaXQocGxhY2VtZW50U2VwYXJhdG9yKSBhcyBBcnJheTxQbGFjZW1lbnQ+KTtcblxuXHQvLyBObyBuZWVkIHRvIGNvbnNpZGVyIGxlZnQgYW5kIHJpZ2h0IGhlcmUsIGFzIHN0YXJ0IGFuZCBlbmQgYXJlIGVub3VnaCwgYW5kIGl0IGlzIHVzZWQgZm9yICdhdXRvJyBwbGFjZW1lbnQgb25seVxuXHRjb25zdCBhbGxvd2VkUGxhY2VtZW50cyA9IFtcblx0XHQndG9wJyxcblx0XHQnYm90dG9tJyxcblx0XHQnc3RhcnQnLFxuXHRcdCdlbmQnLFxuXHRcdCd0b3Atc3RhcnQnLFxuXHRcdCd0b3AtZW5kJyxcblx0XHQnYm90dG9tLXN0YXJ0Jyxcblx0XHQnYm90dG9tLWVuZCcsXG5cdFx0J3N0YXJ0LXRvcCcsXG5cdFx0J3N0YXJ0LWJvdHRvbScsXG5cdFx0J2VuZC10b3AnLFxuXHRcdCdlbmQtYm90dG9tJyxcblx0XTtcblxuXHQvLyByZXBsYWNlIGF1dG8gcGxhY2VtZW50IHdpdGggb3RoZXIgcGxhY2VtZW50c1xuXHRsZXQgaGFzQXV0byA9IHBsYWNlbWVudFZhbHMuZmluZEluZGV4KCh2YWwpID0+IHZhbCA9PT0gJ2F1dG8nKTtcblx0aWYgKGhhc0F1dG8gPj0gMCkge1xuXHRcdGFsbG93ZWRQbGFjZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0aWYgKHBsYWNlbWVudFZhbHMuZmluZCgodmFsKSA9PiB2YWwuc2VhcmNoKCdeJyArIG9iaikgIT09IC0xKSA9PSBudWxsKSB7XG5cdFx0XHRcdHBsYWNlbWVudFZhbHMuc3BsaWNlKGhhc0F1dG8rKywgMSwgb2JqIGFzIFBsYWNlbWVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRjb25zdCBwb3BwZXJQbGFjZW1lbnRzID0gcGxhY2VtZW50VmFscy5tYXAoKF9wbGFjZW1lbnQpID0+IHtcblx0XHRyZXR1cm4gZ2V0UG9wcGVyQ2xhc3NQbGFjZW1lbnQoX3BsYWNlbWVudCwgcnRsLmlzUlRMKCkpO1xuXHR9KTtcblxuXHRsZXQgbWFpblBsYWNlbWVudCA9IHBvcHBlclBsYWNlbWVudHMuc2hpZnQoKTtcblxuXHRjb25zdCBic01vZGlmaWVyOiBQYXJ0aWFsPE1vZGlmaWVyPGFueSwgYW55Pj4gPSB7XG5cdFx0bmFtZTogJ2Jvb3RzdHJhcENsYXNzZXMnLFxuXHRcdGVuYWJsZWQ6ICEhYmFzZUNsYXNzLFxuXHRcdHBoYXNlOiAnd3JpdGUnLFxuXHRcdGZuKHsgc3RhdGUgfSkge1xuXHRcdFx0Y29uc3QgYnNDbGFzc1JlZ0V4cCA9IG5ldyBSZWdFeHAoYmFzZUNsYXNzICsgJygtW2Etel0rKSonLCAnZ2knKTtcblxuXHRcdFx0Y29uc3QgcG9wcGVyRWxlbWVudDogSFRNTEVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5wb3BwZXIgYXMgSFRNTEVsZW1lbnQ7XG5cdFx0XHRjb25zdCBwb3BwZXJQbGFjZW1lbnQgPSBzdGF0ZS5wbGFjZW1lbnQ7XG5cblx0XHRcdGxldCBjbGFzc05hbWUgPSBwb3BwZXJFbGVtZW50LmNsYXNzTmFtZTtcblxuXHRcdFx0Ly8gUmVtb3ZlIG9sZCBib290c3RyYXAgY2xhc3Nlc1xuXHRcdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lLnJlcGxhY2UoYnNDbGFzc1JlZ0V4cCwgJycpO1xuXG5cdFx0XHQvLyBBZGQgY3VycmVudCBwbGFjZW1lbnRzXG5cdFx0XHRjbGFzc05hbWUgKz0gYCAke2dldEJvb3RzdHJhcEJhc2VDbGFzc1BsYWNlbWVudChiYXNlQ2xhc3MhLCBwb3BwZXJQbGFjZW1lbnQpfWA7XG5cblx0XHRcdC8vIFJlbW92ZSBtdWx0aXBsZSBzcGFjZXNcblx0XHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZS50cmltKCkucmVwbGFjZShzcGFjZXNSZWdFeHAsICcgJyk7XG5cblx0XHRcdC8vIFJlYXNzaWduXG5cdFx0XHRwb3BwZXJFbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0XHR9LFxuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0cGxhY2VtZW50OiBtYWluUGxhY2VtZW50LFxuXHRcdG1vZGlmaWVyczogW1xuXHRcdFx0YnNNb2RpZmllcixcblx0XHRcdGZsaXAsXG5cdFx0XHRwcmV2ZW50T3ZlcmZsb3csXG5cdFx0XHRhcnJvdyxcblx0XHRcdHtcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdFx0bmFtZTogJ2ZsaXAnLFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0ZmFsbGJhY2tQbGFjZW1lbnRzOiBwb3BwZXJQbGFjZW1lbnRzLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdFx0bmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG5cdFx0XHRcdHBoYXNlOiAnbWFpbicsXG5cdFx0XHRcdGZuOiBmdW5jdGlvbiAoKSB7fSxcblx0XHRcdH0sXG5cdFx0XSxcblx0fTtcbn1cblxuZXhwb3J0IHR5cGUgUGxhY2VtZW50ID1cblx0fCAnYXV0bydcblx0fCAndG9wJ1xuXHR8ICdib3R0b20nXG5cdHwgJ3N0YXJ0J1xuXHR8ICdsZWZ0J1xuXHR8ICdlbmQnXG5cdHwgJ3JpZ2h0J1xuXHR8ICd0b3Atc3RhcnQnXG5cdHwgJ3RvcC1sZWZ0J1xuXHR8ICd0b3AtZW5kJ1xuXHR8ICd0b3AtcmlnaHQnXG5cdHwgJ2JvdHRvbS1zdGFydCdcblx0fCAnYm90dG9tLWxlZnQnXG5cdHwgJ2JvdHRvbS1lbmQnXG5cdHwgJ2JvdHRvbS1yaWdodCdcblx0fCAnc3RhcnQtdG9wJ1xuXHR8ICdsZWZ0LXRvcCdcblx0fCAnc3RhcnQtYm90dG9tJ1xuXHR8ICdsZWZ0LWJvdHRvbSdcblx0fCAnZW5kLXRvcCdcblx0fCAncmlnaHQtdG9wJ1xuXHR8ICdlbmQtYm90dG9tJ1xuXHR8ICdyaWdodC1ib3R0b20nO1xuXG5leHBvcnQgdHlwZSBQbGFjZW1lbnRBcnJheSA9IFBsYWNlbWVudCB8IEFycmF5PFBsYWNlbWVudD4gfCBzdHJpbmc7XG5cbmludGVyZmFjZSBQb3NpdGlvbmluZ09wdGlvbnMge1xuXHRob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cdHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXHRwbGFjZW1lbnQ6IHN0cmluZyB8IFBsYWNlbWVudCB8IFBsYWNlbWVudEFycmF5O1xuXHRhcHBlbmRUb0JvZHk/OiBib29sZWFuO1xuXHRiYXNlQ2xhc3M/OiBzdHJpbmc7XG5cdHVwZGF0ZVBvcHBlck9wdGlvbnM/OiAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikgPT4gUGFydGlhbDxPcHRpb25zPjtcbn1cblxuZnVuY3Rpb24gbm9vcChhcmcpIHtcblx0cmV0dXJuIGFyZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5nYlBvc2l0aW9uaW5nKCkge1xuXHRjb25zdCBydGwgPSBpbmplY3QoTmdiUlRMKTtcblx0bGV0IHBvcHBlckluc3RhbmNlOiBJbnN0YW5jZSB8IG51bGwgPSBudWxsO1xuXG5cdHJldHVybiB7XG5cdFx0Y3JlYXRlUG9wcGVyKHBvc2l0aW9uaW5nT3B0aW9uOiBQb3NpdGlvbmluZ09wdGlvbnMpIHtcblx0XHRcdGlmICghcG9wcGVySW5zdGFuY2UpIHtcblx0XHRcdFx0Y29uc3QgdXBkYXRlUG9wcGVyT3B0aW9ucyA9IHBvc2l0aW9uaW5nT3B0aW9uLnVwZGF0ZVBvcHBlck9wdGlvbnMgfHwgbm9vcDtcblx0XHRcdFx0bGV0IHBvcHBlck9wdGlvbnMgPSB1cGRhdGVQb3BwZXJPcHRpb25zKGdldFBvcHBlck9wdGlvbnMocG9zaXRpb25pbmdPcHRpb24sIHJ0bCkpO1xuXHRcdFx0XHRwb3BwZXJJbnN0YW5jZSA9IGNyZWF0ZVBvcHBlckxpdGUoXG5cdFx0XHRcdFx0cG9zaXRpb25pbmdPcHRpb24uaG9zdEVsZW1lbnQsXG5cdFx0XHRcdFx0cG9zaXRpb25pbmdPcHRpb24udGFyZ2V0RWxlbWVudCxcblx0XHRcdFx0XHRwb3BwZXJPcHRpb25zLFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dXBkYXRlKCkge1xuXHRcdFx0aWYgKHBvcHBlckluc3RhbmNlKSB7XG5cdFx0XHRcdHBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c2V0T3B0aW9ucyhwb3NpdGlvbmluZ09wdGlvbjogUG9zaXRpb25pbmdPcHRpb25zKSB7XG5cdFx0XHRpZiAocG9wcGVySW5zdGFuY2UpIHtcblx0XHRcdFx0Y29uc3QgdXBkYXRlUG9wcGVyT3B0aW9ucyA9IHBvc2l0aW9uaW5nT3B0aW9uLnVwZGF0ZVBvcHBlck9wdGlvbnMgfHwgbm9vcDtcblx0XHRcdFx0bGV0IHBvcHBlck9wdGlvbnMgPSB1cGRhdGVQb3BwZXJPcHRpb25zKGdldFBvcHBlck9wdGlvbnMocG9zaXRpb25pbmdPcHRpb24sIHJ0bCkpO1xuXHRcdFx0XHRwb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKHBvcHBlck9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGVzdHJveSgpIHtcblx0XHRcdGlmIChwb3BwZXJJbnN0YW5jZSkge1xuXHRcdFx0XHRwb3BwZXJJbnN0YW5jZS5kZXN0cm95KCk7XG5cdFx0XHRcdHBvcHBlckluc3RhbmNlID0gbnVsbDtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuIl19