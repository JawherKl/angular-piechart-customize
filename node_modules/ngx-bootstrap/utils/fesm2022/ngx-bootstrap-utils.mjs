import { isDevMode } from '@angular/core';

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
class Trigger {
    constructor(open, close) {
        this.open = open;
        this.close = close || open;
    }
    isManual() {
        return this.open === 'manual' || this.close === 'manual';
    }
}

const DEFAULT_ALIASES = {
    hover: ['mouseover', 'mouseout'],
    focus: ['focusin', 'focusout']
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    const parsedTriggers = trimmedTriggers
        .split(/\s+/)
        .map((trigger) => trigger.split(':'))
        .map((triggerPair) => {
        const alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    const manualTriggers = parsedTriggers.filter((triggerPair) => triggerPair.isManual());
    if (manualTriggers.length > 1) {
        throw new Error('Triggers parse error: only one manual trigger is allowed');
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw new Error('Triggers parse error: manual trigger can\'t be mixed with other triggers');
    }
    return parsedTriggers;
}
function listenToTriggers(renderer, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
target, triggers, showFn, hideFn, toggleFn) {
    const parsedTriggers = parseTriggers(triggers);
    const listeners = [];
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    parsedTriggers.forEach((trigger) => {
        if (trigger.open === trigger.close) {
            listeners.push(renderer.listen(target, trigger.open, toggleFn));
            return;
        }
        listeners.push(renderer.listen(target, trigger.open, showFn));
        if (trigger.close) {
            listeners.push(renderer.listen(target, trigger.close, hideFn));
        }
    });
    return () => {
        listeners.forEach((unsubscribeFn) => unsubscribeFn());
    };
}
function listenToTriggersV2(renderer, options) {
    const parsedTriggers = parseTriggers(options.triggers);
    const target = options.target;
    // do nothing
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    // all listeners
    const listeners = [];
    // lazy listeners registration
    const _registerHide = [];
    const registerHide = () => {
        // add hide listeners to unregister array
        _registerHide.forEach((fn) => listeners.push(fn()));
        // register hide events only once
        _registerHide.length = 0;
    };
    // register open\close\toggle listeners
    parsedTriggers.forEach((trigger) => {
        const useToggle = trigger.open === trigger.close;
        const showFn = useToggle ? options.toggle : options.show;
        if (!useToggle && trigger.close && options.hide) {
            const triggerClose = trigger.close;
            const optionsHide = options.hide;
            const _hide = () => renderer.listen(target, triggerClose, optionsHide);
            _registerHide.push(_hide);
        }
        if (showFn) {
            listeners.push(renderer.listen(target, trigger.open, () => showFn(registerHide)));
        }
    });
    return () => {
        listeners.forEach((unsubscribeFn) => unsubscribeFn());
    };
}
function registerOutsideClick(renderer, options) {
    if (!options.outsideClick) {
        return Function.prototype;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return renderer.listen('document', 'click', (event) => {
        if (options.target && options.target.contains(event.target)) {
            return;
        }
        if (options.targets &&
            options.targets.some(target => target.contains(event.target))) {
            return;
        }
        if (options.hide) {
            options.hide();
        }
    });
}
function registerEscClick(renderer, options) {
    if (!options.outsideEsc) {
        return Function.prototype;
    }
    return renderer.listen('document', 'keyup.esc', (event) => {
        if (options.target && options.target.contains(event.target)) {
            return;
        }
        if (options.targets &&
            options.targets.some(target => target.contains(event.target))) {
            return;
        }
        if (options.hide) {
            options.hide();
        }
    });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = (typeof window !== 'undefined' && window) || {};
const document = win.document;
const location = win.location;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gc = win.gc ? () => win.gc() : () => null;
const performance = win.performance ? win.performance : null;
const Event = win.Event;
const MouseEvent = win.MouseEvent;
const KeyboardEvent = win.KeyboardEvent;
const EventTarget = win.EventTarget;
const History = win.History;
const Location = win.Location;
const EventListener = win.EventListener;

var BsVerions;
(function (BsVerions) {
    BsVerions["isBs4"] = "bs4";
    BsVerions["isBs5"] = "bs5";
})(BsVerions || (BsVerions = {}));
let guessedVersion;
function _guessBsVersion() {
    const spanEl = win.document.createElement('span');
    spanEl.innerText = 'testing bs version';
    spanEl.classList.add('d-none');
    spanEl.classList.add('pl-1');
    win.document.head.appendChild(spanEl);
    const checkPadding = win.getComputedStyle(spanEl).paddingLeft;
    if (checkPadding && parseFloat(checkPadding)) {
        win.document.head.removeChild(spanEl);
        return 'bs4';
    }
    win.document.head.removeChild(spanEl);
    return 'bs5';
}
function setTheme(theme) {
    guessedVersion = theme;
}
function isBs4() {
    if (guessedVersion)
        return guessedVersion === 'bs4';
    guessedVersion = _guessBsVersion();
    return guessedVersion === 'bs4';
}
function isBs5() {
    if (guessedVersion)
        return guessedVersion === 'bs5';
    guessedVersion = _guessBsVersion();
    return guessedVersion === 'bs5';
}
function getBsVer() {
    return {
        isBs4: isBs4(),
        isBs5: isBs5()
    };
}
function currentBsVersion() {
    const bsVer = getBsVer();
    const resVersion = Object.keys(bsVer).find(key => bsVer[key]);
    return BsVerions[resVersion];
}

class LinkedList {
    constructor() {
        this.length = 0;
        this.asArray = [];
        // Array methods overriding END
    }
    get(position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            return void 0;
        }
        let current = this.head;
        for (let index = 0; index < position; index++) {
            current = current?.next;
        }
        return current?.value;
    }
    add(value, position = this.length) {
        if (position < 0 || position > this.length) {
            throw new Error('Position is out of the list');
        }
        const node = {
            value,
            next: undefined,
            previous: undefined
        };
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
            this.current = node;
        }
        else {
            if (position === 0 && this.head) {
                // first node
                node.next = this.head;
                this.head.previous = node;
                this.head = node;
            }
            else if (position === this.length && this.tail) {
                // last node
                this.tail.next = node;
                node.previous = this.tail;
                this.tail = node;
            }
            else {
                // node in middle
                const currentPreviousNode = this.getNode(position - 1);
                const currentNextNode = currentPreviousNode?.next;
                if (currentPreviousNode && currentNextNode) {
                    currentPreviousNode.next = node;
                    currentNextNode.previous = node;
                    node.previous = currentPreviousNode;
                    node.next = currentNextNode;
                }
            }
        }
        this.length++;
        this.createInternalArrayRepresentation();
    }
    remove(position = 0) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        if (position === 0 && this.head) {
            // first node
            this.head = this.head.next;
            if (this.head) {
                // there is no second node
                this.head.previous = undefined;
            }
            else {
                // there is no second node
                this.tail = undefined;
            }
        }
        else if (position === this.length - 1 && this.tail?.previous) {
            // last node
            this.tail = this.tail.previous;
            this.tail.next = undefined;
        }
        else {
            // middle node
            const removedNode = this.getNode(position);
            if (removedNode?.next && removedNode.previous) {
                removedNode.next.previous = removedNode.previous;
                removedNode.previous.next = removedNode.next;
            }
        }
        this.length--;
        this.createInternalArrayRepresentation();
    }
    set(position, value) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        const node = this.getNode(position);
        if (node) {
            node.value = value;
            this.createInternalArrayRepresentation();
        }
    }
    toArray() {
        return this.asArray;
    }
    findAll(fn) {
        let current = this.head;
        const result = [];
        if (!current) {
            return result;
        }
        for (let index = 0; index < this.length; index++) {
            if (!current) {
                return result;
            }
            if (fn(current.value, index)) {
                result.push({ index, value: current.value });
            }
            current = current.next;
        }
        return result;
    }
    // Array methods overriding start
    push(...args) {
        args.forEach((arg) => {
            this.add(arg);
        });
        return this.length;
    }
    pop() {
        if (this.length === 0) {
            return undefined;
        }
        const last = this.tail;
        this.remove(this.length - 1);
        return last?.value;
    }
    unshift(...args) {
        args.reverse();
        args.forEach((arg) => {
            this.add(arg, 0);
        });
        return this.length;
    }
    shift() {
        if (this.length === 0) {
            return undefined;
        }
        const lastItem = this.head?.value;
        this.remove();
        return lastItem;
    }
    forEach(fn) {
        let current = this.head;
        for (let index = 0; index < this.length; index++) {
            if (!current) {
                return;
            }
            fn(current.value, index);
            current = current.next;
        }
    }
    indexOf(value) {
        let current = this.head;
        let position = -1;
        for (let index = 0; index < this.length; index++) {
            if (!current) {
                return position;
            }
            if (current.value === value) {
                position = index;
                break;
            }
            current = current.next;
        }
        return position;
    }
    some(fn) {
        let current = this.head;
        let result = false;
        while (current && !result) {
            if (fn(current.value)) {
                result = true;
                break;
            }
            current = current.next;
        }
        return result;
    }
    every(fn) {
        let current = this.head;
        let result = true;
        while (current && result) {
            if (!fn(current.value)) {
                result = false;
            }
            current = current.next;
        }
        return result;
    }
    toString() {
        return '[Linked List]';
    }
    find(fn) {
        let current = this.head;
        for (let index = 0; index < this.length; index++) {
            if (!current) {
                return;
            }
            if (fn(current.value, index)) {
                return current.value;
            }
            current = current.next;
        }
    }
    findIndex(fn) {
        let current = this.head;
        for (let index = 0; index < this.length; index++) {
            if (!current) {
                return -1;
            }
            if (fn(current.value, index)) {
                return index;
            }
            current = current.next;
        }
        return -1;
    }
    getNode(position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        let current = this.head;
        for (let index = 0; index < position; index++) {
            current = current?.next;
        }
        return current;
    }
    createInternalArrayRepresentation() {
        const outArray = [];
        let current = this.head;
        while (current) {
            outArray.push(current.value);
            current = current.next;
        }
        this.asArray = outArray;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OnChange() {
    const sufix = 'Change';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function OnChangeHandler(target, propertyKey) {
        const _key = ` __${propertyKey}Value`;
        Object.defineProperty(target, propertyKey, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            get() {
                return this[_key];
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(value) {
                const prevValue = this[_key];
                this[_key] = value;
                if (prevValue !== value && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(value);
                }
            }
        });
    };
}

class Utils {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static reflow(element) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((bs) => bs)(element.offsetHeight);
    }
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getStyles(elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        let view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = win;
        }
        return view.getComputedStyle(elem);
    }
    static stackOverflowConfig() {
        const bsVer = currentBsVersion();
        return {
            crossorigin: "anonymous",
            integrity: bsVer === 'bs5' ? 'sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65' : 'sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2',
            cdnLink: bsVer === 'bs5' ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' : 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
        };
    }
}

const _messagesHash = {};
const _hideMsg = typeof console === 'undefined' || !('warn' in console);
function warnOnce(msg) {
    if (!isDevMode() || _hideMsg || msg in _messagesHash) {
        return;
    }
    _messagesHash[msg] = true;
    console.warn(msg);
}

/**
 * Generated bundle index. Do not edit.
 */

export { BsVerions, LinkedList, OnChange, Trigger, Utils, currentBsVersion, document, getBsVer, listenToTriggers, listenToTriggersV2, parseTriggers, registerEscClick, registerOutsideClick, setTheme, warnOnce, win as window };
//# sourceMappingURL=ngx-bootstrap-utils.mjs.map
