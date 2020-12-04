const selectBuild = () => {
    const selectWrapperAll = document.querySelectorAll('.select')
    selectWrapperAll.forEach(selectWrapper => {
        const select = selectWrapper.querySelector('select')
        const currentItem = select.options[select.selectedIndex].textContent
        let allItems = []
        for (let i = 0; i < select.length; i++) {
            allItems.push(select[i].textContent)
        }
        createSelect(selectWrapper, currentItem, allItems)
    })

    function createSelect(selectWrapper, currentItem, allItems) {
        // Create select header
        const selectHeader = document.createElement('div')
        selectHeader.className = 'select__header'

        // Create current item
        const selectCurrent = document.createElement('span')
        selectCurrent.className = 'select__current'
        selectCurrent.textContent = currentItem

        // Appending selectCurrent into selectHeader
        selectHeader.appendChild(selectCurrent)

        // Creating select body
        const selectBody = document.createElement('div')
        selectBody.className = 'select__body'

        // Creating other items
        const itemsArr = allItems.map(item => `<div class="select__item">${item}</div>`)

        // Appending all items into selectBody
        selectBody.innerHTML = itemsArr.join('')
        
        selectWrapper.appendChild(selectHeader)
        selectWrapper.appendChild(selectBody)
        select(selectWrapper)
    }
    
}

const select = selectWrapper => {
    const selectHeader = selectWrapper.querySelector('.select__header')
    const selectItem = selectWrapper.querySelectorAll('.select__item')

    // selectHeader.forEach(item => {
    selectHeader.addEventListener('click', selectToggle)
    // });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose(e) {
        let text = this.innerText,
            selectWrap = this.closest('.select'),
            select = selectWrap.querySelector('select'),
            items = selectWrap.querySelectorAll('.select__item'),
            currentText = selectWrap.querySelector('.select__current');
        currentText.innerText = text;
        selectWrap.classList.remove('is-active');
        items.forEach((item, i) => {
            if (e.target === item) {
                select.selectedIndex = i
            }
        })
    }
};
selectBuild()