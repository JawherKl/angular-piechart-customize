import { ScaleType } from './types/scale-type.enum';
/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 */
export declare function getUniqueXDomainValues(results: any[]): any[];
/**
 * Get the scaleType of enumerable of values.
 * @returns  'time', 'linear' or 'ordinal'
 */
export declare function getScaleType(values: any[], checkDateType?: boolean): ScaleType;
export declare function getXDomainArray(values: Array<string | number | Date>, xScaleMin?: number, xScaleMax?: number): {
    domain: any[];
    xSet: any[];
    scaleType: string;
};
