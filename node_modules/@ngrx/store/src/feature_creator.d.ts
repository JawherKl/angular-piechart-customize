import { ActionReducer, Selector } from './models';
import { FeatureSelector, NestedSelectors } from './feature_creator_models';
export interface FeatureConfig<FeatureName extends string, FeatureState> {
    name: FeatureName;
    reducer: ActionReducer<FeatureState>;
}
declare type Feature<AppState extends Record<string, any>, FeatureName extends keyof AppState & string, FeatureState extends AppState[FeatureName]> = FeatureConfig<FeatureName, FeatureState> & BaseSelectors<AppState, FeatureName, FeatureState>;
declare type FeatureWithExtraSelectors<FeatureName extends string, FeatureState, ExtraSelectors extends SelectorsDictionary> = string extends keyof ExtraSelectors ? Feature<Record<string, any>, FeatureName, FeatureState> : Omit<Feature<Record<string, any>, FeatureName, FeatureState>, keyof ExtraSelectors> & ExtraSelectors;
declare type BaseSelectors<AppState extends Record<string, any>, FeatureName extends keyof AppState & string, FeatureState extends AppState[FeatureName]> = FeatureSelector<AppState, FeatureName, FeatureState> & NestedSelectors<AppState, FeatureState>;
declare type SelectorsDictionary = Record<string, Selector<Record<string, any>, unknown> | ((...args: any[]) => Selector<Record<string, any>, unknown>)>;
declare type ExtraSelectorsFactory<FeatureName extends string, FeatureState, ExtraSelectors extends SelectorsDictionary> = (baseSelectors: BaseSelectors<Record<string, any>, FeatureName, FeatureState>) => ExtraSelectors;
declare type NotAllowedFeatureStateCheck<FeatureState> = FeatureState extends Required<FeatureState> ? unknown : 'optional properties are not allowed in the feature state';
/**
 * Creates a feature object with extra selectors.
 *
 * @param featureConfig An object that contains a feature name, a feature
 * reducer, and extra selectors factory.
 * @returns An object that contains a feature name, a feature reducer,
 * a feature selector, a selector for each feature state property, and
 * extra selectors.
 */
export declare function createFeature<FeatureName extends string, FeatureState, ExtraSelectors extends SelectorsDictionary>(featureConfig: FeatureConfig<FeatureName, FeatureState> & {
    extraSelectors: ExtraSelectorsFactory<FeatureName, FeatureState, ExtraSelectors>;
} & NotAllowedFeatureStateCheck<FeatureState>): FeatureWithExtraSelectors<FeatureName, FeatureState, ExtraSelectors>;
/**
 * Creates a feature object.
 *
 * @param featureConfig An object that contains a feature name and a feature
 * reducer.
 * @returns An object that contains a feature name, a feature reducer,
 * a feature selector, and a selector for each feature state property.
 */
export declare function createFeature<FeatureName extends string, FeatureState>(featureConfig: FeatureConfig<FeatureName, FeatureState> & NotAllowedFeatureStateCheck<FeatureState>): Feature<Record<string, any>, FeatureName, FeatureState>;
/**
 * @deprecated Use the `createFeature` signature without root state instead.
 * For more info see: https://github.com/ngrx/platform/issues/3737
 */
export declare function createFeature<AppState extends Record<string, any>, FeatureName extends keyof AppState & string = keyof AppState & string, FeatureState extends AppState[FeatureName] = AppState[FeatureName]>(featureConfig: FeatureConfig<FeatureName, FeatureState> & NotAllowedFeatureStateCheck<FeatureState>): Feature<AppState, FeatureName, FeatureState>;
export {};
