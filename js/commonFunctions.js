function goBack() {
    window.history.back();
}

$('#backButton').click(function(){ goBack(); return false; });


/* Templating */

String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
}

const template = (container) => {
    const sampleRow = container.firstElementChild;
    const template = sampleRow.outerHTML;
    container.removeChild(sampleRow);
    const values = container.dataset.values.trim().split(/\s+/);
    const variable = container.dataset.variable;
    for (const value of values) {
        const row = document.createElement(sampleRow.tagName);
        container.appendChild(row);
        row.outerHTML = template.interpolate({ [variable]: value });
    }
};

window.addEventListener('load', () => {
    document.querySelectorAll('[data-variable][data-values]').forEach(template);
});


/**
 * Filters the children of container according to their data-name field
 * @param {Element} searchField input field to search in 
 * @param {Element} container element whose children will be filtered
 * @param {Element} noMatch element to display iff there are no matches
 */
const search = (searchField, container, noMatch) => {
    searchField.oninput = (event) => {
        const speed = 200;
        const query = searchField.value.trim().toLowerCase();
        const items = [ ...container.children ];
        let show = node => $(node).fadeIn(speed);
        let hide = node => $(node).fadeOut(speed);
        if (query !== '') {
            const allHidden = items.map(node => {
                const visible = node.dataset.name.toLowerCase().includes(query);
                if (visible) { show(node); } else { hide(node); }
                return visible;
            }).every(visible => !visible);

            if (allHidden) {
                $(noMatch).fadeIn(speed);
            } else {
                $(noMatch).fadeOut(speed);
            }

        } else {
            items.forEach(show);
            $(noMatch).fadeOut(speed);
        }
    };
    $(noMatch).hide();
};


/* Storage utilities */

const storageGet = (key) => {
    if (window.localStorage) {
        const item = window.localStorage.getItem(key);
        if (typeof item === 'undefined' || item === null) {
            return null;
        } else {
            let obj;
            try {
                obj = JSON.parse(item);
                return obj;
            } catch(e) {
                console.error(`Could not properly parse string "${item}" as JSON`);
                return null;
            }
        }
    }
    return null;
};

const storageSet = (key, value) => {
    if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

const showElement = (DOMElement, timeShowedInMs)  =>
{
    document.body.appendChild(DOMElement); 
    setTimeout(
        function(DOMElement){
             document.body.removeChild(DOMElement) 
            }, timeShowedInMs, DOMElement);
}

const TIME_MESSAGE_BOX_SHOWED_MS = 2000;
