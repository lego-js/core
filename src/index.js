const old$ = window.$;
const oldLegoCore = window.legoCore;

function Collection(items) {
    this.length = 0;
    for (var i = 0, l = items.length; i < l; i++) {
        this[this.length++] = items[i];
    }
}

const $ = function Collect(items, context = document) {    
    if (typeof items === 'string') {
        items = context.querySelectorAll(items);
    }
    else if (!items) {
        items = [];
    }
    else if (items.nodeType) {
        items = [items];
    }

    return new Collection(items);
}

$.Collection = Collection;
$.noConflict = function noConflict(includeLegoCore) {
    if (window.$ === $) {
        window.$ = old$;
    }
    if (includeLegoCore && window.legoCore === $) {
        window.legoCore = oldLegoCore;
    }
};

$.fn = Collection.prototype = Object.create(Array.prototype);
$.fn.constructor = Collection;


// extras

$.fn.eq = function eq(start, length = 1) {
    return $(this.slice(start, start + length));
};
$.fn.get = function get(index) {
    if (typeof index === 'undefined') {
        return this.map(n => n);
    }
    return this[index];
};
$.fn.prop = function prop(prop, val) {
    if (typeof val === 'undefined') {
        return this.get(0).prop;
    }
    this.forEach(node => { node.prop = val; });
    return this;
};
$.fn.attr = function attr(attr, val) {
    if (typeof val === 'undefined') {
        return this.get(0).getAttribute(attr);
    }
    this.forEach(node => node.setAttribute(attr, val));
    return this;
};
$.fn.removeAttr = function removeAttr(attr) {
    this.forEach(node => node.removeAttribute(attr));
    return this;
};


// export globals

export default $;

window.legoCore = $;
if (typeof window.$ === 'undefined') {
    window.$ = $;
}


// bind data

(function($){
    if (!$) return;

    $.data = data;

    $.fn.data = function (key, value) {
        if (typeof value === 'undefined' && typeof key === 'string') {
            return data(this.get(0), key);
        }
        this.forEach(node => {
            data(node, key, value);
        });
        return this;
    }
}(window.legoCore));


// bind state

(function($){
    if (!$) return;

    $.state = state;

    $.fn.state = function (className, test) {
        if (typeof test === 'undefined') {
            return this.some(node => node.classList.contains(className));
        }
        if (typeof test === 'function') {
            this.forEach(node => {
                node.classList[!!test(node) ? 'add' : 'remove'](className);
            });
        }
        else {
            this.forEach(node => {
                node.classList[!!test ? 'add' : 'remove'](className);
            });
        }
        return this;
    };
}(window.legoCore));


// bind toggle

(function($){
    if (!$) return;

    $.toggle = toggle;
}(window.legoCore));
