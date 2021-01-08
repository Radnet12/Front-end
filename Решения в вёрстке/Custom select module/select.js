const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder || 'Название по умолчанию';

    const items = data.map(item => {
        let cls = '';
        if (item.id === selectedId) {
            text = item.value;
            cls='selected';
        }
        return `
            <li class="select__item ${cls}" data-type="item" data-value="${item.id}">${item.value}</li>
        `;
    });

    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${text}</span>
            <img src="./arrow-down.png" alt="">
        </div>
        <div class="select__dropdown" data-type="dropdown">
            <ul class="select__list">
                ${items.join('')}
            </ul>
        </div>
    `;
};
    
class Select {
    constructor(selector, options) {
        this.el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;

        this.#render();
        this.#setup();
    }

    open() {
        this.el.classList.add('open');
    }

    close() {
        this.el.classList.remove('open');
    }

    destroy() {
        this.el.removeEventListener('click', this.clickHandler);
        this.el.innerHTML = '';
    }

    clickHandler(event) {
        const {type} = event.target.dataset;

        if (type === 'input') {
            this.toggle();
        } else if (type === 'item') {
            const id = event.target.dataset.value;
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        }
    }

    get isOpen() {
        return this.el.classList.contains('open');
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    select(id) {
        this.selectedId = id;
        this.value.textContent = this.current.value;

        this.el.querySelectorAll('[data-type="item"]').forEach(item => item.classList.remove('selected'));
        this.el.querySelector(`[data-value="${id}"]`).classList.add('selected');
        this.options.onSelect ? this.options.onSelect(this.current) : null;
        
        this.close();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    #render() {
        const {placeholder, data} = this.options;
        this.el.classList.add('select');
        this.el.innerHTML = getTemplate(data, placeholder, this.selectedId);
    }

    #setup() {
        this.el.addEventListener('click', this.clickHandler.bind(this));
        this.value = this.el.querySelector('[data-type="value"]');
    }
}

const select = new Select('#select', {
    placeholder: 'Выбери пожалуйста авто',
    selectedId: '7',
    data: [
        {id: '1', value: 'Audi'},
        {id: '2', value: 'Ford'},
        {id: '3', value: 'Porshe'},
        {id: '4', value: 'Mercedes'},
        {id: '5', value: 'BMW'},
        {id: '6', value: 'Subaru'},
        {id: '7', value: 'Tesla'},
    ],
    onSelect(item) {
        console.log(item);
    }
});

window.s = select;