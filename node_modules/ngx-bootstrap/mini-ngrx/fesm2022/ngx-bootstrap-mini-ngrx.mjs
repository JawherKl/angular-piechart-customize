import { BehaviorSubject, queueScheduler, Observable } from 'rxjs';
import { observeOn, scan, map, distinctUntilChanged } from 'rxjs/operators';

class MiniState extends BehaviorSubject {
    constructor(_initialState, actionsDispatcher$, reducer) {
        super(_initialState);
        const actionInQueue$ = actionsDispatcher$.pipe(observeOn(queueScheduler));
        const state$ = actionInQueue$.pipe(scan((state, action) => {
            if (!action) {
                return state;
            }
            return reducer(state, action);
        }, _initialState));
        state$.subscribe((value) => this.next(value));
    }
}

/**
 * @copyright ngrx
 */
class MiniStore extends Observable {
    constructor(_dispatcher, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _reducer, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state$) {
        super();
        this._dispatcher = _dispatcher;
        this._reducer = _reducer;
        this.source = state$;
    }
    select(pathOrMapFn) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mapped$ = this.source?.pipe(map(pathOrMapFn)) || new Observable().pipe(map(pathOrMapFn));
        return mapped$.pipe(distinctUntilChanged());
    }
    lift(operator) {
        const store = new MiniStore(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    }
    dispatch(action) {
        this._dispatcher.next(action);
    }
    next(action) {
        this._dispatcher.next(action);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(err) {
        this._dispatcher.error(err);
    }
    complete() {
        /*noop*/
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { MiniState, MiniStore };
//# sourceMappingURL=ngx-bootstrap-mini-ngrx.mjs.map
