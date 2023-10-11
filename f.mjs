export class FJS {
    static create(tag = 'div') {
        return new DomNode(tag);
    }
}

export class TypeHelper {
    static assertString(value, valueName = 'value') {
        const result = value.constructor === String;
        if (!result) {
            console.log('TypeHelper.isString: value is not a string for ' + valueName + ': ', value);
        }
        return result;
    }

    static assertFunction(value, valueName = 'value') {
        const result = value.constructor === Function;
        if (!result) {
            console.log('TypeHelper.isFunction: value is not a function for ' + valueName + ': ', value);
        }
        return result;
    }
}

export class FjsObservable {
    _callbacks = [];
    _value;

    constructor(initialValue, updateCallback = () => {
    }) {
        this._value = initialValue;
        this._callbacks.push(updateCallback);
    }

    unsubscribeAll() {
        this._callbacks = [];
    }

    get onUpdate() {
        return this._callbacks;
    }

    set onUpdate(callback) {
        this._callbacks.push(callback);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this._callbacks.forEach(callback => callback(value));
    }
}

export class DomNode {
    _node;

    constructor(tag) {
        this._node = document.createElement(tag);
    }

    build() {
        if (!(this._node instanceof HTMLElement)) {
            throw new Error('Invalid node type. Must be an HTMLElement or a subclass.');
        }
        return this._node;
    }

    wrapProperty(property, value) {
        if (value && value.constructor === FjsObservable) {
            this._node[property] = value.value;
            value.onUpdate = (newValue) => {
                this._node[property] = newValue;
            };
        } else {
            this._node[property] = value;
        }
    }

    class(className) {
        return this.classes(className);
    }

    classes() {
        const classes = [...arguments];
        for (let cls of classes) {
            if (cls && cls.constructor === FjsObservable) {
                let previousValue = cls.value;
                this._node.classList.add(previousValue);
                cls.onUpdate = (newValue) => {
                    this._node.classList.remove(previousValue);
                    this._node.classList.add(newValue);
                    previousValue = newValue;
                };
            } else {
                this._node.classList.add(cls);
            }
        }
        return this;
    }

    attribute(key, value) {
        return this.attributes(key, value);
    }

    attributes() {
        if (arguments.length % 2 === 0) {
            for (let i = 0; i < arguments.length; i += 2) {
                const key = arguments[i];
                const value = arguments[i + 1];
                TypeHelper.assertString(key, 'attributes/key');
                if (value && value.constructor === FjsObservable) {
                    this._node.setAttribute(key, value.value);
                    value.onUpdate = (newValue) => {
                        this._node.setAttribute(key, newValue);
                    };
                } else {
                    this._node.setAttribute(key, value);
                }
            }
        } else {
            throw new Error('Invalid number of arguments for attributes. Must be even. (key, value, key, value, ...)');
        }
        return this;
    }

    id(id) {
        this.wrapProperty('id', id);
        return this;
    }

    text(text) {
        this.wrapProperty('innerText', text);
        return this;
    }

    title(title) {
        this.wrapProperty('title', title);
        return this;
    }

    html(html) {
        this.wrapProperty('innerHTML', html);
        return this;
    }

    children() {
        for (let node of arguments) {
            if (node instanceof HTMLElement) {
                this._node.appendChild(node);
            } else if (node instanceof DomNode) {
                this._node.appendChild(node.build());
                console.warn('Called .build() for you. You should call .build() yourself to avoid this warning.');
            } else if (node && node.constructor === FjsObservable) {
                let childNode = node.value;
                this._node.appendChild(childNode);
                node.onUpdate = (newValue) => {
                    this._node.replaceChild(newValue, childNode);
                    childNode = newValue;
                };
            } else {
                if (node) {
                    console.warn('Invalid node type. Must be an HTMLElement or a subclass.', node);
                }
            }
        }
        return this;
    }

    child() {
        return this.children(...arguments);
    }

    role(role) {
        this.wrapProperty('role', role);
        return this;
    }

    prefixedAttribute(prefix, key, value) {
        return this.attributes(`${prefix}-${key}`, value);
    }

    aria(key, value) {
        return this.prefixedAttribute('aria', key, value);
    }

    data(key, value) {
        return this.prefixedAttribute('data', key, value);
    }

    onclick(callback) {
        this._node.onclick = callback;
        return this;
    }

    onauxclick(callback) {
        this._node.onauxclick = callback;
        return this;
    }

    ondblclick(callback) {
        this._node.ondblclick = callback;
        return this;
    }

    onchange(callback) {
        this._node.onchange = callback;
        return this;
    }

    oninput(callback) {
        this._node.oninput = callback;
        return this;
    }

    onkeydown(callback) {
        this._node.onkeydown = callback;
        return this;
    }

    onkeyup(callback) {
        this._node.onkeyup = callback;
        return this;
    }

    onmousedown(callback) {
        this._node.onmousedown = callback;
        return this;
    }

    onmouseup(callback) {
        this._node.onmouseup = callback;
        return this;
    }

    onmouseover(callback) {
        this._node.onmouseover = callback;
        return this;
    }

    onmouseout(callback) {
        this._node.onmouseout = callback;
        return this;
    }

    onmousemove(callback) {
        this._node.onmousemove = callback;
        return this;
    }

    onmouseenter(callback) {
        this._node.onmouseenter = callback;
        return this;
    }

    onmouseleave(callback) {
        this._node.onmouseleave = callback;
        return this;
    }

    oncontextmenu(callback) {
        this._node.oncontextmenu = callback;
        return this;
    }

    onwheel(callback) {
        this._node.onwheel = callback;
        return this;
    }

    ondrag(callback) {
        this._node.ondrag = callback;
        return this;
    }

    ondragend(callback) {
        this._node.ondragend = callback;
        return this;
    }

    ondragenter(callback) {
        this._node.ondragenter = callback;
        return this;
    }

    ondragstart(callback) {
        this._node.ondragstart = callback;
        return this;
    }

    ondragleave(callback) {
        this._node.ondragleave = callback;
        return this;
    }

    ondragover(callback) {
        this._node.ondragover = callback;
        return this;
    }

    ondrop(callback) {
        this._node.ondrop = callback;
        return this;
    }

    onscroll(callback) {
        this._node.onscroll = callback;
        return this;
    }

    onfocus(callback) {
        this._node.onfocus = callback;
        return this;
    }

    onblur(callback) {
        this._node.onblur = callback;
        return this;
    }

    onfocusin(callback) {
        this._node.onfocusin = callback;
        return this;
    }

    onfocusout(callback) {
        this._node.onfocusout = callback;
        return this;
    }

    onresize(callback) {
        this._node.onresize = callback;
        return this;
    }

    onselect(callback) {
        this._node.onselect = callback;
        return this;
    }

    onsubmit(callback) {
        this._node.onsubmit = callback;
        return this;
    }

    onreset(callback) {
        this._node.onreset = callback;
        return this;
    }

    onabort(callback) {
        this._node.onabort = callback;
        return this;
    }

    onerror(callback) {
        this._node.onerror = callback;
        return this;
    }

    oncanplay(callback) {
        this._node.oncanplay = callback;
        return this;
    }

    oncanplaythrough(callback) {
        this._node.oncanplaythrough = callback;
        return this;
    }

    ondurationchange(callback) {
        this._node.ondurationchange = callback;
        return this;
    }

    onemptied(callback) {
        this._node.onemptied = callback;
        return this;
    }

    onended(callback) {
        this._node.onended = callback;
        return this;
    }

    onloadeddata(callback) {
        this._node.onloadeddata = callback;
        return this;
    }

    onloadedmetadata(callback) {
        this._node.onloadedmetadata = callback;
        return this;
    }

    onloadstart(callback) {
        this._node.onloadstart = callback;
        return this;
    }

    onpause(callback) {
        this._node.onpause = callback;
        return this;
    }

    onplay(callback) {
        this._node.onplay = callback;
        return this;
    }

    onplaying(callback) {
        this._node.onplaying = callback;
        return this;
    }

    onprogress(callback) {
        this._node.onprogress = callback;
        return this;
    }

    onratechange(callback) {
        this._node.onratechange = callback;
        return this;
    }

    onseeked(callback) {
        this._node.onseeked = callback;
        return this;
    }

    onseeking(callback) {
        this._node.onseeking = callback;
        return this;
    }

    onstalled(callback) {
        this._node.onstalled = callback;
        return this;
    }

    onsuspend(callback) {
        this._node.onsuspend = callback;
        return this;
    }

    ontimeupdate(callback) {
        this._node.ontimeupdate = callback;
        return this;
    }

    onvolumechange(callback) {
        this._node.onvolumechange = callback;
        return this;
    }

    onwaiting(callback) {
        this._node.onwaiting = callback;
        return this;
    }

    oncopy(callback) {
        this._node.oncopy = callback;
        return this;
    }

    oncut(callback) {
        this._node.oncut = callback;
        return this;
    }

    onpaste(callback) {
        this._node.onpaste = callback;
        return this;
    }

    onanimationstart(callback) {
        this._node.onanimationstart = callback;
        return this;
    }

    onanimationend(callback) {
        this._node.onanimationend = callback;
        return this;
    }

    onanimationiteration(callback) {
        this._node.onanimationiteration = callback;
        return this;
    }

    ontransitionend(callback) {
        this._node.ontransitionend = callback;
        return this;
    }

    src(src) {
        this.wrapProperty('src', src);
        return this;
    }

    alt(alt) {
        this.wrapProperty('alt', alt);
        return this;
    }

    css(css) {
        this._node.style.cssText = css;
        return this;
    }

    style(key, value) {
        return this.styles(key, value);
    }

    styles() {
        if (arguments.length % 2 === 0) {
            for (let i = 0; i < arguments.length; i += 2) {
                const key = arguments[i];
                const value = arguments[i + 1];
                if (key.constructor !== String) {
                    throw new Error('Invalid key type for styles. Must be a string.');
                }
                if (value && value.constructor === FjsObservable) {
                    this._node.style[key] = value.value;
                    value.onUpdate = (newValue) => {
                        this._node.style[key] = newValue;
                    };
                } else {
                    this._node.style[key] = value;
                }
            }
        } else {
            throw new Error('Invalid number of arguments for styles. Must be even. (key, value, key, value, ...)');
        }
        return this;
    }

    width(width) {
        this.wrapProperty('width', width);
        return this;
    }

    height(height) {
        this.wrapProperty('height', height);
        return this;
    }

    type(type) {
        this.wrapProperty('type', type);
        return this;
    }

    name(name) {
        this.wrapProperty('name', name);
        return this;
    }

    value(value) {
        this.wrapProperty('value', value);
        return this;
    }

    placeholder(placeholder) {
        this.wrapProperty('placeholder', placeholder);
        return this;
    }

    for(forId) {
        this.wrapProperty('for', forId);
        return this;
    }

    checked(checked) {
        this.wrapProperty('checked', checked);
        return this;
    }

    disabled(disabled) {
        this.wrapProperty('disabled', disabled);
        return this;
    }

    selected(selected) {
        this.wrapProperty('selected', selected);
        return this;
    }

    href(href) {
        this.wrapProperty('href', href);
        return this;
    }

    target(target) {
        this.wrapProperty('target', target);
        return this;
    }

    rel(rel) {
        this.wrapProperty('rel', rel);
        return this;
    }

    required(required) {
        this.wrapProperty('required', required);
        return this;
    }

    multiple(multiple) {
        this.wrapProperty('multiple', multiple);
        return this;
    }

    accept(accept) {
        this.wrapProperty('accept', accept);
        return this;
    }

    acceptCharset(acceptCharset) {
        this.wrapProperty('acceptCharset', acceptCharset);
        return this;
    }

    action(action) {
        this.wrapProperty('action', action);
        return this;
    }

    autocomplete(autocomplete) {
        this.wrapProperty('autocomplete', autocomplete);
        return this;
    }

    enctype(enctype) {
        this.wrapProperty('enctype', enctype);
        return this;
    }

    method(method) {
        this.wrapProperty('method', method);
        return this;
    }

    novalidate(novalidate) {
        this.wrapProperty('novalidate', novalidate);
        return this;
    }
}