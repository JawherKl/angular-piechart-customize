import { Color } from '../utils/color-sets';
import { StringOrNumberOrDate } from '../models/chart-data.model';
import { ScaleType } from './types/scale-type.enum';
import { Gradient } from './types/gradient.interface';
export declare class ColorHelper {
    scale: any;
    scaleType: ScaleType;
    colorDomain: string[];
    domain: number[] | string[];
    customColors: any;
    constructor(scheme: string | Color, type: ScaleType, domain: number[] | string[], customColors?: any);
    generateColorScheme(scheme: string | Color, type: ScaleType, domain: number[] | string[]): any;
    getColor(value: StringOrNumberOrDate): string;
    getLinearGradientStops(value: number | string, start?: number | string): Gradient[];
}
