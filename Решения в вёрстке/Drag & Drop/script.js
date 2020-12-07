// ------------------------- Кастомный курсор
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX - 10}px`;
    cursor.style.top = `${e.pageY - 10}px`;
});
document.addEventListener('click', (e) => {
    cursor.classList.add('expand');
    setTimeout(() => {
        cursor.classList.remove('expand');
    }, 500);
});



// --------------------------------- Drag and Drop

// Создаём счетчик
let counter = 0;
let currentDrag;

// Обработчки событий для добавления новых элементов по клику на блок с плюсиком
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-item')) {
        const newItem = createItem();
        const zone = e.target.closest('.drop-zone');

        zone.insertBefore(newItem, zone.lastElementChild);
    }
});

// Событие "dragstart", создаётся при старте перетаскивания элемента
document.addEventListener('dragstart', (e) => {
    // В event попадает элемент, который сейчас перетаскивается
    
    // Скрываем стили для курсора
    cursor.classList.add('hide');

    // Скрываем элемент, который сейчас перетаскиваем, setTimeout нужен для того, чтобы элемент не пропал(особенность DnD)
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);

    // Записываем в переменную родителя элемента, которая соответствует зоне перетаскивания
    const zone = e.target.closest('.drop-zone');
    
    // Проверяем существует ли переменная
    if (zone) {
        // Записываем инфу про текущую зону и перетаскиваемый элемент
        currentDrag = {
            startZone: zone,
            node: e.target
        };
        // Данная строка нужна для Firefox(без неё не работает)
        e.dataTransfer.setData('text/html', 'dragstart');
    }
});
// Событие "dragend", создаётся в конце перетаскивания элемента
document.addEventListener('dragend', (e) => {
    // Показываем элемент, который скрили при перетаскивании
    e.target.classList.remove('hide');
    // Показываем курсор
    cursor.classList.remove('hide');
});
// Событие "dragenter", создаётся когда перетаскиваемый элемент заходит на зону для drop
document.addEventListener('dragenter', (e) => {
    // Записываем зону для броска
    const zone = e.target.closest('.drop-zone');
    
    // проверяем зашёл ли элемент, который сейчас перетаскиваем в зону для броска, если да, то показуем, что здесь можно бросить элемент
    if (e.target.classList.contains('drop-zone')) {
        zone.classList.add('entered');
    }
});
// Событие "dragleave", создаётся когда перетаскиваемый элемент выходит из зоны для drop
document.addEventListener('dragleave', (e) => {
    // Записываем зону для броска
    const zone = e.target.closest('.drop-zone');

    // проверяем вышел ли элемент, который сейчас перетаскиваем из зоны для броска, если да, то убираем стили для зоны
    if (e.target.classList.contains('drop-zone')) {
        zone.classList.remove('entered');
    }
});
// Событие "dragover", показует над каким элементом сейчас находится перетаскиваемый элемент
document.addEventListener('dragover', (e) => {
    // Записываем зону для броска
    const zone = e.target.closest('.drop-zone');

    // Если зона существует, то отменяем стандартное поведение браузера
    if (zone) {
        e.preventDefault();
    }
});
// Событие "drop", создаеться когда элемент отпущен
document.addEventListener('drop', (e) => {
    e.preventDefault();

    // Записываем зону для броска
    const zone = e.target.closest('.drop-zone');

    // Убираем стили
    zone.classList.remove('entered');
    // проверяем существует ли обьект с данными, который создались при событие dragstart
    if (currentDrag) {
        // проверяем существует ли зона и не совпадает ли она с той зоной, откуда мы этот элемент начали перетаскивать
        if (zone && currentDrag.startZone !== zone) {
            // проверяем над чем находится наш элемент, если над другим элементом, то вставляем после этого элемента в ином случае в конец
            if (e.target.classList.contains('item')) {
                // 
                zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
            } else {
                zone.insertBefore(currentDrag.node, zone.lastElementChild);
            }
        // данное условие служит для сортировки элементов внутри одной зоны
        // проверяем совпадает ли зона где бросили с зоной откуда начали перетаскивать элемент
        } else if (currentDrag.startZone == zone) {
            // если перетаскиваемый элемент находится над другим элементом, то ставим его после
            if (e.target.classList.contains('item')) {
                zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
            }
        }
        // обнуляем обьект с данным про этот элемент и его зону
        currentDrag = null;
    // если в зону дропаеться не наш элемент, а картинка, то делаем следующее
    } else {
        // записываем в переменную обьект dataTransfer
        const dt = e.dataTransfer;
        // проверяем есть ли какие-то файлы в этом обьекте
        if (dt.files && dt.files.length) {
            // создаем формдату
            const fd = new FormData();
            // перебираем файлы которые мы скинули
            for (const file of dt.files) {
                // добавляем файл в формдату
                fd.append('files', file);
                // создаем читалку для файлов
                const reader = new FileReader();
                // читаем формат файла
                reader.readAsDataURL(file);
                // дожидаемся загрузки файла
                reader.addEventListener('load', () => {
                    // добавляем его на страницу вызывая функцию, где элементы создаются
                    const item = createItem(reader.result);
                    // вставляем его последним элементом в зону куда дропнули
                    zone.insertBefore(item, zone.lastElementChild);
                });
            }
            //  загружаем файлы на сервер
            fetch('/foo', {
                method: 'POST',
                body: fd
            });
        }
    }
});
// функция создания элементов
function createItem(img) {
    const newDiv = document.createElement('div');

    counter++;

    if (img) {
        newDiv.style.background = `url(${background})`;
        newDiv.style.backgroundSize = `cover`;
    } else {
        newDiv.textContent = counter;
    }
    newDiv.classList.add('item');
    newDiv.draggable = true;

    return newDiv;
}