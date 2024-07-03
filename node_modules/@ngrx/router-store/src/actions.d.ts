import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RoutesRecognized } from '@angular/router';
import { BaseRouterStoreState } from './serializers/base';
import { SerializedRouterStateSnapshot } from './serializers/full_serializer';
/**
 * An action dispatched when a router navigation request is fired.
 */
export declare const ROUTER_REQUEST = "@ngrx/router-store/request";
/**
 * Payload of ROUTER_REQUEST
 */
export declare type RouterRequestPayload<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    routerState: T;
    event: NavigationStart;
};
/**
 * An action dispatched when a router navigation request is fired.
 */
export declare type RouterRequestAction<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    type: typeof ROUTER_REQUEST;
    payload: RouterRequestPayload<T>;
};
export declare const routerRequestAction: import("@ngrx/store").ActionCreator<"@ngrx/router-store/request", (props: {
    payload: RouterRequestPayload<SerializedRouterStateSnapshot>;
}) => {
    payload: RouterRequestPayload<SerializedRouterStateSnapshot>;
} & import("@ngrx/store/src/models").TypedAction<"@ngrx/router-store/request">>;
/**
 * An action dispatched when the router navigates.
 */
export declare const ROUTER_NAVIGATION = "@ngrx/router-store/navigation";
/**
 * Payload of ROUTER_NAVIGATION.
 */
export declare type RouterNavigationPayload<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    routerState: T;
    event: RoutesRecognized;
};
/**
 * An action dispatched when the router navigates.
 */
export declare type RouterNavigationAction<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    type: typeof ROUTER_NAVIGATION;
    payload: RouterNavigationPayload<T>;
};
export declare const routerNavigationAction: import("@ngrx/store").ActionCreator<"@ngrx/router-store/navigation", (props: {
    payload: RouterNavigationPayload<SerializedRouterStateSnapshot>;
}) => {
    payload: RouterNavigationPayload<SerializedRouterStateSnapshot>;
} & import("@ngrx/store/src/models").TypedAction<"@ngrx/router-store/navigation">>;
/**
 * An action dispatched when the router cancels navigation.
 */
export declare const ROUTER_CANCEL = "@ngrx/router-store/cancel";
/**
 * Payload of ROUTER_CANCEL.
 */
export declare type RouterCancelPayload<T, V extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    routerState: V;
    storeState: T;
    event: NavigationCancel;
};
/**
 * An action dispatched when the router cancels navigation.
 */
export declare type RouterCancelAction<T, V extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    type: typeof ROUTER_CANCEL;
    payload: RouterCancelPayload<T, V>;
};
export declare const routerCancelAction: import("@ngrx/store").ActionCreator<"@ngrx/router-store/cancel", (props: {
    payload: RouterCancelPayload<SerializedRouterStateSnapshot>;
}) => {
    payload: RouterCancelPayload<SerializedRouterStateSnapshot>;
} & import("@ngrx/store/src/models").TypedAction<"@ngrx/router-store/cancel">>;
/**
 * An action dispatched when the router errors.
 */
export declare const ROUTER_ERROR = "@ngrx/router-store/error";
/**
 * Payload of ROUTER_ERROR.
 */
export declare type RouterErrorPayload<T, V extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    routerState: V;
    storeState: T;
    event: NavigationError;
};
/**
 * An action dispatched when the router errors.
 */
export declare type RouterErrorAction<T, V extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    type: typeof ROUTER_ERROR;
    payload: RouterErrorPayload<T, V>;
};
export declare const routerErrorAction: import("@ngrx/store").ActionCreator<"@ngrx/router-store/error", (props: {
    payload: RouterErrorPayload<SerializedRouterStateSnapshot>;
}) => {
    payload: RouterErrorPayload<SerializedRouterStateSnapshot>;
} & import("@ngrx/store/src/models").TypedAction<"@ngrx/router-store/error">>;
/**
 * An action dispatched after navigation has ended and new route is active.
 */
export declare const ROUTER_NAVIGATED = "@ngrx/router-store/navigated";
/**
 * Payload of ROUTER_NAVIGATED.
 */
export declare type RouterNavigatedPayload<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    routerState: T;
    event: NavigationEnd;
};
/**
 * An action dispatched after navigation has ended and new route is active.
 */
export declare type RouterNavigatedAction<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
    type: typeof ROUTER_NAVIGATED;
    payload: RouterNavigatedPayload<T>;
};
export declare const routerNavigatedAction: import("@ngrx/store").ActionCreator<"@ngrx/router-store/navigated", (props: {
    payload: RouterNavigatedPayload<SerializedRouterStateSnapshot>;
}) => {
    payload: RouterNavigatedPayload<SerializedRouterStateSnapshot>;
} & import("@ngrx/store/src/models").TypedAction<"@ngrx/router-store/navigated">>;
/**
 * A union type of router actions.
 */
export declare type RouterAction<T, V extends BaseRouterStoreState = SerializedRouterStateSnapshot> = RouterRequestAction<V> | RouterNavigationAction<V> | RouterCancelAction<T, V> | RouterErrorAction<T, V> | RouterNavigatedAction<V>;
