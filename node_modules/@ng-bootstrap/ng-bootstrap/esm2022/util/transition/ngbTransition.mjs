import { EMPTY, fromEvent, of, race, Subject, timer } from 'rxjs';
import { endWith, filter, takeUntil } from 'rxjs/operators';
import { getTransitionDurationMs } from './util';
import { environment } from '../../environment';
import { runInZone } from '../util';
const noopFn = () => { };
const { transitionTimerDelayMs } = environment;
const runningTransitions = new Map();
export const ngbRunTransition = (zone, element, startFn, options) => {
    // Getting initial context from options
    let context = options.context || {};
    // Checking if there are already running transitions on the given element.
    const running = runningTransitions.get(element);
    if (running) {
        switch (options.runningTransition) {
            // If there is one running and we want for it to 'continue' to run, we have to cancel the new one.
            // We're not emitting any values, but simply completing the observable (EMPTY).
            case 'continue':
                return EMPTY;
            // If there is one running and we want for it to 'stop', we have to complete the running one.
            // We're simply completing the running one and not emitting any values and merging newly provided context
            // with the one coming from currently running transition.
            case 'stop':
                zone.run(() => running.transition$.complete());
                context = Object.assign(running.context, context);
                runningTransitions.delete(element);
        }
    }
    // Running the start function
    const endFn = startFn(element, options.animation, context) || noopFn;
    // If 'prefer-reduced-motion' is enabled, the 'transition' will be set to 'none'.
    // If animations are disabled, we have to emit a value and complete the observable
    // In this case we have to call the end function, but can finish immediately by emitting a value,
    // completing the observable and executing end functions synchronously.
    if (!options.animation || window.getComputedStyle(element).transitionProperty === 'none') {
        zone.run(() => endFn());
        return of(undefined).pipe(runInZone(zone));
    }
    // Starting a new transition
    const transition$ = new Subject();
    const finishTransition$ = new Subject();
    const stop$ = transition$.pipe(endWith(true));
    runningTransitions.set(element, {
        transition$,
        complete: () => {
            finishTransition$.next();
            finishTransition$.complete();
        },
        context,
    });
    const transitionDurationMs = getTransitionDurationMs(element);
    // 1. We have to both listen for the 'transitionend' event and have a 'just-in-case' timer,
    // because 'transitionend' event might not be fired in some browsers, if the transitioning
    // element becomes invisible (ex. when scrolling, making browser tab inactive, etc.). The timer
    // guarantees, that we'll release the DOM element and complete 'ngbRunTransition'.
    // 2. We need to filter transition end events, because they might bubble from shorter transitions
    // on inner DOM elements. We're only interested in the transition on the 'element' itself.
    zone.runOutsideAngular(() => {
        const transitionEnd$ = fromEvent(element, 'transitionend').pipe(takeUntil(stop$), filter(({ target }) => target === element));
        const timer$ = timer(transitionDurationMs + transitionTimerDelayMs).pipe(takeUntil(stop$));
        race(timer$, transitionEnd$, finishTransition$)
            .pipe(takeUntil(stop$))
            .subscribe(() => {
            runningTransitions.delete(element);
            zone.run(() => {
                endFn();
                transition$.next();
                transition$.complete();
            });
        });
    });
    return transition$.asObservable();
};
export const ngbCompleteTransition = (element) => {
    runningTransitions.get(element)?.complete();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiVHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBcUJwQyxNQUFNLE1BQU0sR0FBdUIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0FBRTVDLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxHQUFHLFdBQVcsQ0FBQztBQUMvQyxNQUFNLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFzQyxDQUFDO0FBRXpFLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLENBQy9CLElBQVksRUFDWixPQUFvQixFQUNwQixPQUFnQyxFQUNoQyxPQUFnQyxFQUNiLEVBQUU7SUFDckIsdUNBQXVDO0lBQ3ZDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQU8sRUFBRSxDQUFDO0lBRXZDLDBFQUEwRTtJQUMxRSxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxPQUFPLEVBQUU7UUFDWixRQUFRLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUNsQyxrR0FBa0c7WUFDbEcsK0VBQStFO1lBQy9FLEtBQUssVUFBVTtnQkFDZCxPQUFPLEtBQUssQ0FBQztZ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bkMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxPQUFvQixFQUFFLEVBQUU7SUFDN0Qsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQzdDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgb2YsIHJhY2UsIFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBlbmRXaXRoLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGdldFRyYW5zaXRpb25EdXJhdGlvbk1zIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgcnVuSW5ab25lIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCB0eXBlIE5nYlRyYW5zaXRpb25TdGFydEZuPFQgPSBhbnk+ID0gKFxuXHRlbGVtZW50OiBIVE1MRWxlbWVudCxcblx0YW5pbWF0aW9uOiBib29sZWFuLFxuXHRjb250ZXh0OiBULFxuKSA9PiBOZ2JUcmFuc2l0aW9uRW5kRm4gfCB2b2lkO1xuZXhwb3J0IHR5cGUgTmdiVHJhbnNpdGlvbkVuZEZuID0gKCkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBOZ2JUcmFuc2l0aW9uT3B0aW9uczxUPiB7XG5cdGFuaW1hdGlvbjogYm9vbGVhbjtcblx0cnVubmluZ1RyYW5zaXRpb246ICdjb250aW51ZScgfCAnc3RvcCc7XG5cdGNvbnRleHQ/OiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5nYlRyYW5zaXRpb25DdHg8VD4ge1xuXHR0cmFuc2l0aW9uJDogU3ViamVjdDxhbnk+O1xuXHRjb21wbGV0ZTogKCkgPT4gdm9pZDtcblx0Y29udGV4dDogVDtcbn1cblxuY29uc3Qgbm9vcEZuOiBOZ2JUcmFuc2l0aW9uRW5kRm4gPSAoKSA9PiB7fTtcblxuY29uc3QgeyB0cmFuc2l0aW9uVGltZXJEZWxheU1zIH0gPSBlbnZpcm9ubWVudDtcbmNvbnN0IHJ1bm5pbmdUcmFuc2l0aW9ucyA9IG5ldyBNYXA8SFRNTEVsZW1lbnQsIE5nYlRyYW5zaXRpb25DdHg8YW55Pj4oKTtcblxuZXhwb3J0IGNvbnN0IG5nYlJ1blRyYW5zaXRpb24gPSA8VD4oXG5cdHpvbmU6IE5nWm9uZSxcblx0ZWxlbWVudDogSFRNTEVsZW1lbnQsXG5cdHN0YXJ0Rm46IE5nYlRyYW5zaXRpb25TdGFydEZuPFQ+LFxuXHRvcHRpb25zOiBOZ2JUcmFuc2l0aW9uT3B0aW9uczxUPixcbik6IE9ic2VydmFibGU8dm9pZD4gPT4ge1xuXHQvLyBHZXR0aW5nIGluaXRpYWwgY29udGV4dCBmcm9tIG9wdGlvbnNcblx0bGV0IGNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgPFQ+e307XG5cblx0Ly8gQ2hlY2tpbmcgaWYgdGhlcmUgYXJlIGFscmVhZHkgcnVubmluZyB0cmFuc2l0aW9ucyBvbiB0aGUgZ2l2ZW4gZWxlbWVudC5cblx0Y29uc3QgcnVubmluZyA9IHJ1bm5pbmdUcmFuc2l0aW9ucy5nZXQoZWxlbWVudCk7XG5cdGlmIChydW5uaW5nKSB7XG5cdFx0c3dpdGNoIChvcHRpb25zLnJ1bm5pbmdUcmFuc2l0aW9uKSB7XG5cdFx0XHQvLyBJZiB0aGVyZSBpcyBvbmUgcnVubmluZyBhbmQgd2Ugd2FudCBmb3IgaXQgdG8gJ2NvbnRpbnVlJyB0byBydW4sIHdlIGhhdmUgdG8gY2FuY2VsIHRoZSBuZXcgb25lLlxuXHRcdFx0Ly8gV2UncmUgbm90IGVtaXR0aW5nIGFueSB2YWx1ZXMsIGJ1dCBzaW1wbHkgY29tcGxldGluZyB0aGUgb2JzZXJ2YWJsZSAoRU1QVFkpLlxuXHRcdFx0Y2FzZSAnY29udGludWUnOlxuXHRcdFx0XHRyZXR1cm4gRU1QVFk7XG5cdFx0XHQvLyBJZiB0aGVyZSBpcyBvbmUgcnVubmluZyBhbmQgd2Ugd2FudCBmb3IgaXQgdG8gJ3N0b3AnLCB3ZSBoYXZlIHRvIGNvbXBsZXRlIHRoZSBydW5uaW5nIG9uZS5cblx0XHRcdC8vIFdlJ3JlIHNpbXBseSBjb21wbGV0aW5nIHRoZSBydW5uaW5nIG9uZSBhbmQgbm90IGVtaXR0aW5nIGFueSB2YWx1ZXMgYW5kIG1lcmdpbmcgbmV3bHkgcHJvdmlkZWQgY29udGV4dFxuXHRcdFx0Ly8gd2l0aCB0aGUgb25lIGNvbWluZyBmcm9tIGN1cnJlbnRseSBydW5uaW5nIHRyYW5zaXRpb24uXG5cdFx0XHRjYXNlICdzdG9wJzpcblx0XHRcdFx0em9uZS5ydW4oKCkgPT4gcnVubmluZy50cmFuc2l0aW9uJC5jb21wbGV0ZSgpKTtcblx0XHRcdFx0Y29udGV4dCA9IE9iamVjdC5hc3NpZ24ocnVubmluZy5jb250ZXh0LCBjb250ZXh0KTtcblx0XHRcdFx0cnVubmluZ1RyYW5zaXRpb25zLmRlbGV0ZShlbGVtZW50KTtcblx0XHR9XG5cdH1cblxuXHQvLyBSdW5uaW5nIHRoZSBzdGFydCBmdW5jdGlvblxuXHRjb25zdCBlbmRGbiA9IHN0YXJ0Rm4oZWxlbWVudCwgb3B0aW9ucy5hbmltYXRpb24sIGNvbnRleHQpIHx8IG5vb3BGbjtcblxuXHQvLyBJZiAncHJlZmVyLXJlZHVjZWQtbW90aW9uJyBpcyBlbmFibGVkLCB0aGUgJ3RyYW5zaXRpb24nIHdpbGwgYmUgc2V0IHRvICdub25lJy5cblx0Ly8gSWYgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsIHdlIGhhdmUgdG8gZW1pdCBhIHZhbHVlIGFuZCBjb21wbGV0ZSB0aGUgb2JzZXJ2YWJsZVxuXHQvLyBJbiB0aGlzIGNhc2Ugd2UgaGF2ZSB0byBjYWxsIHRoZSBlbmQgZnVuY3Rpb24sIGJ1dCBjYW4gZmluaXNoIGltbWVkaWF0ZWx5IGJ5IGVtaXR0aW5nIGEgdmFsdWUsXG5cdC8vIGNvbXBsZXRpbmcgdGhlIG9ic2VydmFibGUgYW5kIGV4ZWN1dGluZyBlbmQgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHkuXG5cdGlmICghb3B0aW9ucy5hbmltYXRpb24gfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkudHJhbnNpdGlvblByb3BlcnR5ID09PSAnbm9uZScpIHtcblx0XHR6b25lLnJ1bigoKSA9PiBlbmRGbigpKTtcblx0XHRyZXR1cm4gb2YodW5kZWZpbmVkKS5waXBlKHJ1bkluWm9uZSh6b25lKSk7XG5cdH1cblxuXHQvLyBTdGFydGluZyBhIG5ldyB0cmFuc2l0aW9uXG5cdGNvbnN0IHRyYW5zaXRpb24kID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblx0Y29uc3QgZmluaXNoVHJhbnNpdGlvbiQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRjb25zdCBzdG9wJCA9IHRyYW5zaXRpb24kLnBpcGUoZW5kV2l0aCh0cnVlKSk7XG5cdHJ1bm5pbmdUcmFuc2l0aW9ucy5zZXQoZWxlbWVudCwge1xuXHRcdHRyYW5zaXRpb24kLFxuXHRcdGNvbXBsZXRlOiAoKSA9PiB7XG5cdFx0XHRmaW5pc2hUcmFuc2l0aW9uJC5uZXh0KCk7XG5cdFx0XHRmaW5pc2hUcmFuc2l0aW9uJC5jb21wbGV0ZSgpO1xuXHRcdH0sXG5cdFx0Y29udGV4dCxcblx0fSk7XG5cblx0Y29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uTXMgPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25NcyhlbGVtZW50KTtcblxuXHQvLyAxLiBXZSBoYXZlIHRvIGJvdGggbGlzdGVuIGZvciB0aGUgJ3RyYW5zaXRpb25lbmQnIGV2ZW50IGFuZCBoYXZlIGEgJ2p1c3QtaW4tY2FzZScgdGltZXIsXG5cdC8vIGJlY2F1c2UgJ3RyYW5zaXRpb25lbmQnIGV2ZW50IG1pZ2h0IG5vdCBiZSBmaXJlZCBpbiBzb21lIGJyb3dzZXJzLCBpZiB0aGUgdHJhbnNpdGlvbmluZ1xuXHQvLyBlbGVtZW50IGJlY29tZXMgaW52aXNpYmxlIChleC4gd2hlbiBzY3JvbGxpbmcsIG1ha2luZyBicm93c2VyIHRhYiBpbmFjdGl2ZSwgZXRjLikuIFRoZSB0aW1lclxuXHQvLyBndWFyYW50ZWVzLCB0aGF0IHdlJ2xsIHJlbGVhc2UgdGhlIERPTSBlbGVtZW50IGFuZCBjb21wbGV0ZSAnbmdiUnVuVHJhbnNpdGlvbicuXG5cdC8vIDIuIFdlIG5lZWQgdG8gZmlsdGVyIHRyYW5zaXRpb24gZW5kIGV2ZW50cywgYmVjYXVzZSB0aGV5IG1pZ2h0IGJ1YmJsZSBmcm9tIHNob3J0ZXIgdHJhbnNpdGlvbnNcblx0Ly8gb24gaW5uZXIgRE9NIGVsZW1lbnRzLiBXZSdyZSBvbmx5IGludGVyZXN0ZWQgaW4gdGhlIHRyYW5zaXRpb24gb24gdGhlICdlbGVtZW50JyBpdHNlbGYuXG5cdHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdGNvbnN0IHRyYW5zaXRpb25FbmQkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJykucGlwZShcblx0XHRcdHRha2VVbnRpbChzdG9wJCksXG5cdFx0XHRmaWx0ZXIoKHsgdGFyZ2V0IH0pID0+IHRhcmdldCA9PT0gZWxlbWVudCksXG5cdFx0KTtcblx0XHRjb25zdCB0aW1lciQgPSB0aW1lcih0cmFuc2l0aW9uRHVyYXRpb25NcyArIHRyYW5zaXRpb25UaW1lckRlbGF5TXMpLnBpcGUodGFrZVVudGlsKHN0b3AkKSk7XG5cblx0XHRyYWNlKHRpbWVyJCwgdHJhbnNpdGlvbkVuZCQsIGZpbmlzaFRyYW5zaXRpb24kKVxuXHRcdFx0LnBpcGUodGFrZVVudGlsKHN0b3AkKSlcblx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRydW5uaW5nVHJhbnNpdGlvbnMuZGVsZXRlKGVsZW1lbnQpO1xuXHRcdFx0XHR6b25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdFx0ZW5kRm4oKTtcblx0XHRcdFx0XHR0cmFuc2l0aW9uJC5uZXh0KCk7XG5cdFx0XHRcdFx0dHJhbnNpdGlvbiQuY29tcGxldGUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0fSk7XG5cblx0cmV0dXJuIHRyYW5zaXRpb24kLmFzT2JzZXJ2YWJsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IG5nYkNvbXBsZXRlVHJhbnNpdGlvbiA9IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xuXHRydW5uaW5nVHJhbnNpdGlvbnMuZ2V0KGVsZW1lbnQpPy5jb21wbGV0ZSgpO1xufTtcbiJdfQ==