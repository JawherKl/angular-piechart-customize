import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseRouterStoreState, RouterStateSerializer } from './base';
export interface MinimalActivatedRouteSnapshot {
    routeConfig: ActivatedRouteSnapshot['routeConfig'];
    url: ActivatedRouteSnapshot['url'];
    params: ActivatedRouteSnapshot['params'];
    queryParams: ActivatedRouteSnapshot['queryParams'];
    fragment: ActivatedRouteSnapshot['fragment'];
    data: ActivatedRouteSnapshot['data'];
    outlet: ActivatedRouteSnapshot['outlet'];
    title: ActivatedRouteSnapshot['title'];
    firstChild?: MinimalActivatedRouteSnapshot;
    children: MinimalActivatedRouteSnapshot[];
}
export interface MinimalRouterStateSnapshot extends BaseRouterStoreState {
    root: MinimalActivatedRouteSnapshot;
    url: string;
}
export declare class MinimalRouterStateSerializer implements RouterStateSerializer<MinimalRouterStateSnapshot> {
    serialize(routerState: RouterStateSnapshot): MinimalRouterStateSnapshot;
    private serializeRoute;
}
