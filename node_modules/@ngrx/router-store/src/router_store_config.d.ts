import { InjectionToken } from '@angular/core';
import { Selector } from '@ngrx/store';
import { RouterReducerState } from './reducer';
import { BaseRouterStoreState, RouterStateSerializer } from './serializers/base';
import { SerializedRouterStateSnapshot } from './serializers/full_serializer';
export declare type StateKeyOrSelector<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = string | Selector<any, RouterReducerState<T>>;
export declare enum NavigationActionTiming {
    PreActivation = 1,
    PostActivation = 2
}
export declare const DEFAULT_ROUTER_FEATURENAME = "router";
export declare const _ROUTER_CONFIG: InjectionToken<unknown>;
export declare const ROUTER_CONFIG: InjectionToken<unknown>;
/**
 * Minimal = Serializes the router event with MinimalRouterStateSerializer
 * Full = Serializes the router event with FullRouterStateSerializer
 */
export declare const enum RouterState {
    Full = 0,
    Minimal = 1
}
export declare function _createRouterConfig(config: StoreRouterConfig): StoreRouterConfig;
export interface StoreRouterConfig<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> {
    stateKey?: StateKeyOrSelector<T>;
    serializer?: new (...args: any[]) => RouterStateSerializer;
    /**
     * By default, ROUTER_NAVIGATION is dispatched before guards and resolvers run.
     * Therefore, the action could run too soon, for example
     * there may be a navigation cancel due to a guard saying the navigation is not allowed.
     * To run ROUTER_NAVIGATION after guards and resolvers,
     * set this property to NavigationActionTiming.PostActivation.
     */
    navigationActionTiming?: NavigationActionTiming;
    /**
     * Decides which router serializer should be used, if there is none provided, and the metadata on the dispatched @ngrx/router-store action payload.
     * Set to `Minimal` to use the `MinimalRouterStateSerializer` and to set a minimal router event with the navigation id and url as payload.
     * Set to `Full` to use the `FullRouterStateSerializer` and to set the angular router events as payload.
     */
    routerState?: RouterState;
}
