import { Action } from '@ngrx/store';
import { BaseRouterStoreState } from './serializers/base';
import { SerializedRouterStateSnapshot } from './serializers/full_serializer';
export declare type RouterReducerState<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    state: T;
    navigationId: number;
};
export declare function routerReducer<RouterState extends BaseRouterStoreState = SerializedRouterStateSnapshot, Result = RouterReducerState<RouterState>>(state: Result | undefined, action: Action): Result;
