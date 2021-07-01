export const burger = (burgerSelector, navSelector, listSelector, linkSelector) => {
    const burger = document.querySelector(burgerSelector),
          body = document.body,
          nav = document.querySelector(navSelector),
          wrapper = document.querySelector(".wrapper"),
          list = document.querySelector(listSelector);


    burger.addEventListener("click", (e) => {
        if (e.currentTarget) {
            burger.classList.toggle(`${burgerSelector.substring(1, burgerSelector.length)}--active`)
            nav.classList.toggle(`${navSelector.substring(1, navSelector.length)}--active`)
            body.classList.toggle("lock");
        }
    });
    wrapper.addEventListener("click", (e) => {
        if (e.target && e.target === wrapper) {
            burger.classList.remove(`${burgerSelector.substring(1, burgerSelector.length)}--active`);
            nav.classList.remove(`${navSelector.substring(1, navSelector.length)}--active`);
            body.classList.remove("lock");
        }
    });
    list.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains(linkSelector)) {
            burger.classList.remove(`${burgerSelector.substring(1, burgerSelector.length)}--active`);
            nav.classList.remove(`${navSelector.substring(1, navSelector.length)}--active`);
            body.classList.remove("lock");
        }
    });
};