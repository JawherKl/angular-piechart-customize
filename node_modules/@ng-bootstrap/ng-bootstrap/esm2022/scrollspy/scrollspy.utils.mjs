import { isString } from '../util/util';
export function toFragmentElement(container, id) {
    if (!container || id == null) {
        return null;
    }
    return isString(id) ? container.querySelector(`#${CSS.escape(id)}`) : id;
}
function getOrderedFragments(container, fragments) {
    const selector = [...fragments].map(({ id }) => `#${CSS.escape(id)}`).join(',');
    return Array.from(container.querySelectorAll(selector));
}
export const defaultProcessChanges = (state, changeActive, ctx) => {
    const { rootElement, fragments, scrollSpy, options, entries } = state;
    const orderedFragments = getOrderedFragments(rootElement, fragments);
    if (!ctx.initialized) {
        ctx.initialized = true;
        ctx.gapFragment = null;
        ctx.visibleFragments = new Set();
        // special case when one of the fragments was pre-selected
        const preSelectedFragment = toFragmentElement(rootElement, options?.initialFragment);
        if (preSelectedFragment) {
            scrollSpy.scrollTo(preSelectedFragment);
            return;
        }
    }
    for (const entry of entries) {
        const { isIntersecting, target: fragment } = entry;
        // 1. an entry became visible
        if (isIntersecting) {
            // if we were in-between two elements, we have to clear it up
            if (ctx.gapFragment) {
                ctx.visibleFragments.delete(ctx.gapFragment);
                ctx.gapFragment = null;
            }
            ctx.visibleFragments.add(fragment);
        }
        // 2. an entry became invisible
        else {
            ctx.visibleFragments.delete(fragment);
            // nothing is visible anymore, but something just was actually
            if (ctx.visibleFragments.size === 0 && scrollSpy.active !== '') {
                // 2.1 scrolling down - keeping the same element
                if (entry.boundingClientRect.top < entry.rootBounds.top) {
                    ctx.gapFragment = fragment;
                    ctx.visibleFragments.add(ctx.gapFragment);
                }
                // 2.2 scrolling up - getting the previous element
                else {
                    // scrolling up and no more fragments above
                    if (fragment === orderedFragments[0]) {
                        ctx.gapFragment = null;
                        ctx.visibleFragments.clear();
                        changeActive('');
                        return;
                    }
                    // getting previous fragment
                    else {
                        const fragmentIndex = orderedFragments.indexOf(fragment);
                        ctx.gapFragment = orderedFragments[fragmentIndex - 1] || null;
                        if (ctx.gapFragment) {
                            ctx.visibleFragments.add(ctx.gapFragment);
                        }
                    }
                }
            }
        }
    }
    // getting the first visible element in the DOM order of the fragments
    for (const fragment of orderedFragments) {
        if (ctx.visibleFragments.has(fragment)) {
            changeActive(fragment.id);
            break;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Njcm9sbHNweS9zY3JvbGxzcHkudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsU0FBeUIsRUFBRSxFQUFnQztJQUM1RixJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7UUFDN0IsT0FBTyxJQUFJLENBQUM7S0FDWjtJQUNELE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRSxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxTQUFrQixFQUFFLFNBQXVCO0lBQ3ZFLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUErQixDQUNoRSxLQU1DLEVBQ0QsWUFBc0MsRUFDdEMsR0FJQyxFQUNBLEVBQUU7SUFDSCxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUN0RSxNQUFNLGdC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bnMsIE5nYlNjcm9sbFNweVByb2Nlc3NDaGFuZ2VzLCBOZ2JTY3JvbGxTcHlTZXJ2aWNlIH0gZnJvbSAnLi9zY3JvbGxzcHkuc2VydmljZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0ZyYWdtZW50RWxlbWVudChjb250YWluZXI6IEVsZW1lbnQgfCBudWxsLCBpZD86IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgbnVsbCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG5cdGlmICghY29udGFpbmVyIHx8IGlkID09IG51bGwpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gaXNTdHJpbmcoaWQpID8gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYCMke0NTUy5lc2NhcGUoaWQpfWApIDogaWQ7XG59XG5cbmZ1bmN0aW9uIGdldE9yZGVyZWRGcmFnbWVudHMoY29udGFpbmVyOiBFbGVtZW50LCBmcmFnbWVudHM6IFNldDxFbGVtZW50Pik6IEVsZW1lbnRbXSB7XG5cdGNvbnN0IHNlbGVjdG9yID0gWy4uLmZyYWdtZW50c10ubWFwKCh7IGlkIH0pID0+IGAjJHtDU1MuZXNjYXBlKGlkKX1gKS5qb2luKCcsJyk7XG5cdHJldHVybiBBcnJheS5mcm9tKGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvY2Vzc0NoYW5nZXM6IE5nYlNjcm9sbFNweVByb2Nlc3NDaGFuZ2VzID0gKFxuXHRzdGF0ZToge1xuXHRcdGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXTtcblx0XHRyb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cdFx0ZnJhZ21lbnRzOiBTZXQ8RWxlbWVudD47XG5cdFx0c2Nyb2xsU3B5OiBOZ2JTY3JvbGxTcHlTZXJ2aWNlO1xuXHRcdG9wdGlvbnM6IE5nYlNjcm9sbFNweU9wdGlvbnM7XG5cdH0sXG5cdGNoYW5nZUFjdGl2ZTogKGFjdGl2ZTogc3RyaW5nKSA9PiB2b2lkLFxuXHRjdHg6IHtcblx0XHRpbml0aWFsaXplZDogYm9vbGVhbjtcblx0XHRnYXBGcmFnbWVudDogRWxlbWVudCB8IG51bGw7XG5cdFx0dmlzaWJsZUZyYWdtZW50czogU2V0PEVsZW1lbnQ+O1xuXHR9LFxuKSA9PiB7XG5cdGNvbnN0IHsgcm9vdEVsZW1lbnQsIGZyYWdtZW50cywgc2Nyb2xsU3B5LCBvcHRpb25zLCBlbnRyaWVzIH0gPSBzdGF0ZTtcblx0Y29uc3Qgb3JkZXJlZEZyYWdtZW50cyA9IGdldE9yZGVyZWRGcmFnbWVudHMocm9vdEVsZW1lbnQsIGZyYWdtZW50cyk7XG5cblx0aWYgKCFjdHguaW5pdGlhbGl6ZWQpIHtcblx0XHRjdHguaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdGN0eC5nYXBGcmFnbWVudCA9IG51bGw7XG5cdFx0Y3R4LnZpc2libGVGcmFnbWVudHMgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBzcGVjaWFsIGNhc2Ugd2hlbiBvbmUgb2YgdGhlIGZyYWdtZW50cyB3YXMgcHJlLXNlbGVjdGVkXG5cdFx0Y29uc3QgcHJlU2VsZWN0ZWRGcmFnbWVudCA9IHRvRnJhZ21lbnRFbGVtZW50KHJvb3RFbGVtZW50LCBvcHRpb25zPy5pbml0aWFsRnJhZ21lbnQpO1xuXHRcdGlmIChwcmVTZWxlY3RlZEZyYWdtZW50KSB7XG5cdFx0XHRzY3JvbGxTcHkuc2Nyb2xsVG8ocHJlU2VsZWN0ZWRGcmFnbWVudCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0Zm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG5cdFx0Y29uc3QgeyBpc0ludGVyc2VjdGluZywgdGFyZ2V0OiBmcmFnbWVudCB9ID0gZW50cnk7XG5cblx0XHQvLyAxLiBhbiBlbnRyeSBiZWNhbWUgdmlzaWJsZVxuXHRcdGlmIChpc0ludGVyc2VjdGluZykge1xuXHRcdFx0Ly8gaWYgd2Ugd2VyZSBpbi1iZXR3ZWVuIHR3byBlbGVtZW50cywgd2UgaGF2ZSB0byBjbGVhciBpdCB1cFxuXHRcdFx0aWYgKGN0eC5nYXBGcmFnbWVudCkge1xuXHRcdFx0XHRjdHgudmlzaWJsZUZyYWdtZW50cy5kZWxldGUoY3R4LmdhcEZyYWdtZW50KTtcblx0XHRcdFx0Y3R4LmdhcEZyYWdtZW50ID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Y3R4LnZpc2libGVGcmFnbWVudHMuYWRkKGZyYWdtZW50KTtcblx0XHR9XG5cblx0XHQvLyAyLiBhbiBlbnRyeSBiZWNhbWUgaW52aXNpYmxlXG5cdFx0ZWxzZSB7XG5cdFx0XHRjdHgudmlzaWJsZUZyYWdtZW50cy5kZWxldGUoZnJhZ21lbnQpO1xuXG5cdFx0XHQvLyBub3RoaW5nIGlzIHZpc2libGUgYW55bW9yZSwgYnV0IHNvbWV0aGluZyBqdXN0IHdhcyBhY3R1YWxseVxuXHRcdFx0aWYgKGN0eC52aXNpYmxlRnJhZ21lbnRzLnNpemUgPT09IDAgJiYgc2Nyb2xsU3B5LmFjdGl2ZSAhPT0gJycpIHtcblx0XHRcdFx0Ly8gMi4xIHNjcm9sbGluZyBkb3duIC0ga2VlcGluZyB0aGUgc2FtZSBlbGVtZW50XG5cdFx0XHRcdGlmIChlbnRyeS5ib3VuZGluZ0NsaWVudFJlY3QudG9wIDwgZW50cnkucm9vdEJvdW5kcyEudG9wKSB7XG5cdFx0XHRcdFx0Y3R4LmdhcEZyYWdtZW50ID0gZnJhZ21lbnQ7XG5cdFx0XHRcdFx0Y3R4LnZpc2libGVGcmFnbWVudHMuYWRkKGN0eC5nYXBGcmFnbWVudCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gMi4yIHNjcm9sbGluZyB1cCAtIGdldHRpbmcgdGhlIHByZXZpb3VzIGVsZW1lbnRcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly8gc2Nyb2xsaW5nIHVwIGFuZCBubyBtb3JlIGZyYWdtZW50cyBhYm92ZVxuXHRcdFx0XHRcdGlmIChmcmFnbWVudCA9PT0gb3JkZXJlZEZyYWdtZW50c1swXSkge1xuXHRcdFx0XHRcdFx0Y3R4LmdhcEZyYWdtZW50ID0gbnVsbDtcblx0XHRcdFx0XHRcdGN0eC52aXNpYmxlRnJhZ21lbnRzLmNsZWFyKCk7XG5cdFx0XHRcdFx0XHRjaGFuZ2VBY3RpdmUoJycpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGdldHRpbmcgcHJldmlvdXMgZnJhZ21lbnRcblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnN0IGZyYWdtZW50SW5kZXggPSBvcmRlcmVkRnJhZ21lbnRzLmluZGV4T2YoZnJhZ21lbnQpO1xuXHRcdFx0XHRcdFx0Y3R4LmdhcEZyYWdtZW50ID0gb3JkZXJlZEZyYWdtZW50c1tmcmFnbWVudEluZGV4IC0gMV0gfHwgbnVsbDtcblx0XHRcdFx0XHRcdGlmIChjdHguZ2FwRnJhZ21lbnQpIHtcblx0XHRcdFx0XHRcdFx0Y3R4LnZpc2libGVGcmFnbWVudHMuYWRkKGN0eC5nYXBGcmFnbWVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gZ2V0dGluZyB0aGUgZmlyc3QgdmlzaWJsZSBlbGVtZW50IGluIHRoZSBET00gb3JkZXIgb2YgdGhlIGZyYWdtZW50c1xuXHRmb3IgKGNvbnN0IGZyYWdtZW50IG9mIG9yZGVyZWRGcmFnbWVudHMpIHtcblx0XHRpZiAoY3R4LnZpc2libGVGcmFnbWVudHMuaGFzKGZyYWdtZW50KSkge1xuXHRcdFx0Y2hhbmdlQWN0aXZlKGZyYWdtZW50LmlkKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxufTtcbiJdfQ==