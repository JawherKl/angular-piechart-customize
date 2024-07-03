import { ScaleType } from '../common/types/scale-type.enum';
export interface Color {
    name: string;
    selectable: boolean;
    group: ScaleType;
    domain: string[];
}
export declare const colorSets: Color[];
