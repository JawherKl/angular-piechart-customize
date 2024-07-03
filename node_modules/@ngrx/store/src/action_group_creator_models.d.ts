import { ActionCreator, ActionCreatorProps, Creator, FunctionWithParametersType, NotAllowedCheck, TypedAction } from './models';
declare type Join<Str extends string, Separator extends string = ' '> = Str extends `${infer First}${Separator}${infer Rest}` ? Join<`${First}${Rest}`, Separator> : Str;
declare type Trim<Str extends string> = Str extends ` ${infer S}` ? Trim<S> : Str extends `${infer S} ` ? Trim<S> : Str;
declare type TitleCase<Str extends string> = Str extends `${infer First} ${infer Rest}` ? `${Capitalize<First>} ${TitleCase<Rest>}` : Capitalize<Str>;
declare type ForbiddenCharactersStr = '/ \\ | < > [ ] { } ( ) . , ! ? # % ^ & * + - ~ \' " `';
declare type ForbiddenCharacters<Str extends string = ForbiddenCharactersStr> = Str extends `${infer First} ${infer Rest}` ? First | ForbiddenCharacters<Rest> : Str extends '' ? never : Str;
declare type ForbiddenCharactersCheck<Str extends string, Name extends string> = Str extends `${infer _}${ForbiddenCharacters}${infer _}` ? `${Name} cannot contain the following characters: ${ForbiddenCharactersStr}` : unknown;
declare type EmptyStringCheck<Str extends string, Name extends string> = Trim<Str> extends '' ? `${Name} cannot be an empty string or contain only spaces` : unknown;
declare type StringLiteralCheck<Str extends string, Name extends string> = string extends Str ? `${Name} must be a string literal type` : unknown;
declare type UniqueEventNameCheck<EventNames extends string, EventName extends string> = ActionName<EventName> extends ActionName<Exclude<EventNames, EventName>> ? `${ActionName<EventName>} action is already defined` : unknown;
declare type NotAllowedEventPropsCheck<PropsCreator extends ActionCreatorProps<unknown> | Creator> = PropsCreator extends ActionCreatorProps<infer Props> ? Props extends void ? unknown : NotAllowedCheck<Props & object> : PropsCreator extends Creator<any, infer Result> ? NotAllowedCheck<Result> : unknown;
declare type EventCreator<PropsCreator extends ActionCreatorProps<unknown> | Creator, Type extends string> = PropsCreator extends ActionCreatorProps<infer Props> ? void extends Props ? ActionCreator<Type, () => TypedAction<Type>> : ActionCreator<Type, (props: Props & NotAllowedCheck<Props & object>) => Props & TypedAction<Type>> : PropsCreator extends Creator<infer Props, infer Result> ? FunctionWithParametersType<Props, Result & NotAllowedCheck<Result> & TypedAction<Type>> & TypedAction<Type> : never;
export declare type ActionName<EventName extends string> = Uncapitalize<Join<TitleCase<Lowercase<Trim<EventName>>>>>;
export interface ActionGroupConfig<Source extends string, Events extends Record<string, ActionCreatorProps<unknown> | Creator>> {
    source: Source & StringLiteralCheck<Source, 'source'>;
    events: {
        [EventName in keyof Events]: Events[EventName] & EmptyStringCheck<EventName & string, 'event name'> & StringLiteralCheck<EventName & string, 'event name'> & ForbiddenCharactersCheck<EventName & string, 'event name'> & UniqueEventNameCheck<keyof Events & string, EventName & string> & NotAllowedEventPropsCheck<Events[EventName]>;
    };
}
export declare type ActionGroup<Source extends string, Events extends Record<string, ActionCreatorProps<unknown> | Creator>> = {
    [EventName in keyof Events as ActionName<EventName & string>]: EventCreator<Events[EventName], `[${Source}] ${EventName & string}`>;
};
export {};
