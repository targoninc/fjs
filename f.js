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

    class(className) {
        return this.classes(className);
    }

    classes() {
        this._node.classList.add(...arguments);
        return this;
    }

    attribute(key, value) {
        return this.attributes(key, value);
    }

    attributes() {
        if (arguments.length % 2 === 0) {
            for (let i = 0; i < arguments.length; i += 2) {
                TypeHelper.assertString(arguments[i], 'attributes/key');
                this._node.setAttribute(arguments[i], arguments[i + 1]);
            }
        } else {
            throw new Error('Invalid number of arguments for attributes. Must be even. (key, value, key, value, ...)');
        }
        return this;
    }

    id(id) {
        this._node.id = id;
        return this;
    }

    text(text) {
        this._node.innerText = text;
        return this;
    }

    html(html) {
        this._node.innerHTML = html;
        return this;
    }

    children() {
        this._node.append(...arguments);
        return this;
    }

    child() {
        return this.children(...arguments);
    }

    role(role) {
        this._node.role = role;
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
        this._node.src = src;
        return this;
    }

    alt(alt) {
        this._node.alt = alt;
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
                if (arguments[i].constructor !== String) {
                    throw new Error('Invalid key type for styles. Must be a string.');
                }
                this._node.style[arguments[i]] = arguments[i + 1];
            }
        } else {
            throw new Error('Invalid number of arguments for styles. Must be even. (key, value, key, value, ...)');
        }
        return this;
    }

    type(type) {
        this._node.type = type;
        return this;
    }

    name(name) {
        this._node.name = name;
        return this;
    }

    value(value) {
        this._node.value = value;
        return this;
    }

    placeholder(placeholder) {
        this._node.placeholder = placeholder;
        return this;
    }

    for(forId) {
        this._node.for = forId;
        return this;
    }

    checked(checked) {
        this._node.checked = checked;
        return this;
    }

    disabled(disabled) {
        this._node.disabled = disabled;
        return this;
    }

    selected(selected) {
        this._node.selected = selected;
        return this;
    }

    href(href) {
        this._node.href = href;
        return this;
    }

    target(target) {
        this._node.target = target;
        return this;
    }

    rel(rel) {
        this._node.rel = rel;
        return this;
    }

    required(required) {
        this._node.required = required;
        return this;
    }

    multiple(multiple) {
        this._node.multiple = multiple;
        return this;
    }

    accept(accept) {
        this._node.accept = accept;
        return this;
    }

    acceptCharset(acceptCharset) {
        this._node.acceptCharset = acceptCharset;
        return this;
    }

    action(action) {
        this._node.action = action;
        return this;
    }

    autocomplete(autocomplete) {
        this._node.autocomplete = autocomplete;
        return this;
    }

    enctype(enctype) {
        this._node.enctype = enctype;
        return this;
    }

    method(method) {
        this._node.method = method;
        return this;
    }

    novalidate(novalidate) {
        this._node.novalidate = novalidate;
        return this;
    }
}