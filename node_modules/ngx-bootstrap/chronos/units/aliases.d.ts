import { DateObject, UnitOfTime } from '../types';
export type ExtendedUnitOfTime = UnitOfTime | 'date' | 'week' | 'isoWeek' | 'dayOfYear' | 'weekday' | 'isoWeekday' | 'second' | 'millisecond' | 'minute' | 'hour' | 'quarter' | 'weekYear' | 'isoWeekYear';
export declare function addUnitAlias(unit: ExtendedUnitOfTime, shorthand: string): void;
export declare function normalizeUnits(units: string | string[]): string;
export declare function normalizeObjectUnits(inputObject: Record<string, unknown>): DateObject;
