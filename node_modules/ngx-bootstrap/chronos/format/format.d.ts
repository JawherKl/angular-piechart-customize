import { Locale } from '../locale/locale.class';
import { DateFormatterFn } from '../types';
export declare const formatFunctions: {
    [key: string]: (date: Date, locale: Locale, isUTC?: boolean, offset?: number) => string;
};
export declare const formatTokenFunctions: {
    [key: string]: DateFormatterFn;
};
export declare const formattingTokens: RegExp;
export declare function addFormatToken(token: string, padded: [string, number, boolean], ordinal: string, callback: DateFormatterFn): void;
export declare function makeFormatFunction(format: string): (date: Date, locale: Locale, isUTC?: boolean, offset?: number) => string;
