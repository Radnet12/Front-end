const $leftLinks = document.querySelectorAll('.left-menu a'),
    $mapLinks = document.querySelectorAll('.map a'),
    $info = document.querySelector('.info');

const requestData = (id = 1) => {
    fetch('data.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $info.innerHTML = `
            <h2>${data[id - 1].district}</h2> 
            <p>${data[id - 1].info}</p>
        `;
        });
};

$leftLinks.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        let self = e.currentTarget;
        let selfClass = self.getAttribute('href');
        let color = self.dataset.color;
        let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
        let currentPolygon = currentElement.querySelectorAll('polygon');
        let currentPath = currentElement.querySelectorAll('path');

        if (currentPolygon) {
            currentPolygon.forEach(el => {
                el.style.cssText = `fill: ${color}; stroke-width: 2px;`;
            });
        }
        if (currentPath) {
            currentPath.forEach(el => {
                el.style.cssText = `fill: ${color}; stroke-width: 2px;`;
            });
        }
        self.classList.add('active');
    });
    el.addEventListener('mouseleave', (e) => {
        let self = e.currentTarget;
        let selfClass = self.getAttribute('href');
        let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
        let currentPolygon = currentElement.querySelectorAll('polygon');
        let currentPath = currentElement.querySelectorAll('path');

        if (currentPolygon) {
            currentPolygon.forEach(el => {
                el.style.cssText = ``;
            });
        }
        if (currentPath) {
            currentPath.forEach(el => {
                el.style.cssText = ``;
            });
        }
        self.classList.remove('active');
    });
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let selfColor = self.dataset.color;
        let selfAttr = self.getAttribute('href');
        let currentElement = document.querySelector(`.map a[href="${selfAttr}"]`);
        let currentPath = currentElement.querySelectorAll('path');
        let currentPolygon = currentElement.querySelectorAll('polygon');

        $mapLinks.forEach(mapLink => {
            mapLink.classList.add('hide');
        });
        currentElement.classList.remove('hide');

        currentPath.forEach(path => {
            path.addEventListener('mouseenter', () => {
                path.style.cssText = `fill: ${selfColor}; stroke-width: 2px;`;
            });
            path.addEventListener('mouseleave', () => {
                path.style.cssText = ``;
            });
        });
        currentPolygon.forEach(polygon => {
            polygon.addEventListener('mouseenter', () => {
                polygon.style.cssText = `fill: ${selfColor}; stroke-width: 2px;`;
            });
            polygon.addEventListener('mouseleave', () => {
                polygon.style.cssText = ``;
            });
        });

    });
});
$mapLinks.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        let self = e.currentTarget;
        let selfClass = self.getAttribute('href');
        let color = self.dataset.color;
        let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
        let currentPolygon = self.querySelectorAll('polygon');
        let currentPath = self.querySelectorAll('path');

        if (currentPolygon) {
            currentPolygon.forEach(el => {
                el.style.cssText = `fill: ${color}; stroke-width: 2px;`;
            });
        }
        if (currentPath) {
            currentPath.forEach(el => {
                el.style.cssText = `fill: ${color}; stroke-width: 2px;`;
            });
        }
        currentElement.classList.add('active');
    });
    el.addEventListener('mouseleave', (e) => {
        let self = e.currentTarget;
        let selfClass = self.getAttribute('href');
        let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
        let currentPolygon = self.querySelectorAll('polygon');
        let currentPath = self.querySelectorAll('path');

        if (currentPolygon) {
            currentPolygon.forEach(el => {
                el.style.cssText = ``;
            });
        }
        if (currentPath) {
            currentPath.forEach(el => {
                el.style.cssText = ``;
            });
        }
        currentElement.classList.remove('active');
    });
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let self = e.currentTarget;
        let selfClass = self.getAttribute('href');
        let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
        let id = parseInt(currentElement.dataset.id);
        requestData(id);
    });
});