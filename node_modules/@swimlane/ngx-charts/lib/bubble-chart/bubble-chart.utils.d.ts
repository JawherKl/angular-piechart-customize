import { ScaleLinear, ScalePoint, ScaleTime } from 'd3-scale';
import { ScaleType } from '../common/types/scale-type.enum';
export declare function getDomain(values: any[], scaleType: ScaleType, autoScale: boolean, minVal?: number, maxVal?: number): number[];
export declare function getScale(domain: number[], range: number[], scaleType: ScaleType, roundDomains: boolean): ScaleTime<number, number> | ScaleLinear<number, number> | ScalePoint<string>;
