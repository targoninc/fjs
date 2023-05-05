export class FactoryJS {
    static create(tag = 'div') {
        return new DomNode(tag);
    }
}

export class DomNode {
    /**
     * The node that is being wrapped.
     * @type {HTMLElement}
     * @private
     */
    _node;

    constructor(tag) {
        this._node = document.createElement(tag);
    }

    build() {
        return this._node;
    }

    classes() {
        this._node.classList.add(...arguments);
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
}