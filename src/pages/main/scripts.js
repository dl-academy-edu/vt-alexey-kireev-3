var products = [
    { productId: 1, productName: 'Товар 1', categoryId: 1, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg"},
    { productId: 2, productName: 'Товар 2', categoryId: 2, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 3, productName: 'Товар 3', categoryId: 3, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 4, productName: 'Товар 4', categoryId: 4, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 5, productName: 'Товар 5', categoryId: 5, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 6, productName: 'Товар 6', categoryId: 1, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 7, productName: 'Товар 7', categoryId: 2, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 8, productName: 'Товар 8', categoryId: 3, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 9, productName: 'Товар 9', categoryId: 4, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 10, productName: 'Товар 10', categoryId: 5, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 11, productName: 'Товар 11', categoryId: 1, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 12, productName: 'Товар 12', categoryId: 2, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 13, productName: 'Товар 13', categoryId: 3, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 14, productName: 'Товар 14', categoryId: 4, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 15, productName: 'Товар 15', categoryId: 5, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 16, productName: 'Товар 16', categoryId: 1, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 17, productName: 'Товар 17', categoryId: 2, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 18, productName: 'Товар 18', categoryId: 3, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 19, productName: 'Товар 19', categoryId: 4, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 20, productName: 'Товар 20', categoryId: 5, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 21, productName: 'Товар 21', categoryId: 1, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 22, productName: 'Товар 22', categoryId: 2, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 23, productName: 'Товар 23', categoryId: 3, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 24, productName: 'Товар 24', categoryId: 4, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" },
    { productId: 25, productName: 'Товар 25', categoryId: 5, img : "http://rrstatic.retailrocket.net/test_task/tovar.jpg" }
  ];
  var categories = [
    { categoryId: 1, categoryName: 'Футболки' },
    { categoryId: 2, categoryName: 'Майки' },
    { categoryId: 3, categoryName: 'Носки' },
    { categoryId: 4, categoryName: 'Джинсы' },
    { categoryId: 5, categoryName: 'Брюки' },
  ];
   document.addEventListener("DOMContentLoaded", function () {
    const on = (parent, event, selector, handler) => parent.addEventListener(event, ({ target }) => {
      if (target = target.closest(selector)) handler(target)
    })
    const data = {};
    const render = (id) => {
      
      let headerLi = [];
      categories.forEach(({ categoryId, categoryName }) => headerLi +=
        `<li class="${id == categoryId ? 'active' : ''} "data-id="${categoryId}">${categoryName}`);
      document.querySelector(".header").innerHTML = headerLi;
      if (!data[id]) data[id] = 4;
      
      let contentLi = []; 
      for (const { productName, categoryId, img } of products)
        if (id == 0 || categoryId == id) contentLi.push(`<li><img src="${img}" alt="img"> ${productName}`); 

      document.querySelector(".content").innerHTML = contentLi.join('');
    }
    render(1);
    const ClickHandler = el => render(el.dataset.id, el.classList.contains("up"));
    on(document, "click", "[data-id]", ClickHandler);
  }); 