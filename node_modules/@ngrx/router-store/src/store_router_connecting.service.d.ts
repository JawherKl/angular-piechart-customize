import { ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { RuntimeChecks, Store } from '@ngrx/store';
import { StoreRouterConfig } from './router_store_config';
import { SerializedRouterStateSnapshot } from './serializers/full_serializer';
import { RouterStateSerializer } from './serializers/base';
import * as i0 from "@angular/core";
/**
 * Shared router initialization logic used alongside both the StoreRouterConnectingModule and the provideRouterStore
 * function
 */
export declare class StoreRouterConnectingService {
    private store;
    private router;
    private serializer;
    private errorHandler;
    private readonly config;
    private readonly activeRuntimeChecks;
    private lastEvent;
    private routerState;
    private storeState;
    private trigger;
    private readonly stateKey;
    constructor(store: Store<any>, router: Router, serializer: RouterStateSerializer<SerializedRouterStateSnapshot>, errorHandler: ErrorHandler, config: StoreRouterConfig, activeRuntimeChecks: RuntimeChecks);
    private setUpStoreStateListener;
    private navigateIfNeeded;
    private setUpRouterEventsListener;
    private dispatchRouterRequest;
    private dispatchRouterNavigation;
    private dispatchRouterCancel;
    private dispatchRouterError;
    private dispatchRouterNavigated;
    private dispatchRouterAction;
    private reset;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreRouterConnectingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StoreRouterConnectingService>;
}
