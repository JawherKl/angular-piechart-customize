import { ViewDimensions } from './types/view-dimension.interface';
import { StringOrNumberOrDate } from '../models/chart-data.model';
export interface GridItem {
    data: GridData;
    height: number;
    width: number;
    x: number;
    y: number;
}
export interface GridData {
    extra?: any;
    label: string;
    name: StringOrNumberOrDate;
    percent: number;
    total: number;
    value: number;
}
export declare function gridSize(dims: ViewDimensions, len: number, minWidth: number): [number, number];
export declare function gridLayout(dims: ViewDimensions, data: GridData[], minWidth: number, designatedTotal: number): GridItem[];
