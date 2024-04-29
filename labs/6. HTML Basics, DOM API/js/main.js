const tableEl = document.querySelector("table");
const tdEls = document.querySelectorAll("td");

tableEl.style = "width: 90vw;border-collapse: collapse;";
tdEls[0].colSpan = "2";
tdEls.forEach((tdEl) => { tdEl.style = "border: 1px solid black;" });

/**
    2. Защитите страницу из предыдущего задания с помощью DOM API, так
    чтобы на странице было невозможно ничего выделить и скопировать. И
    чтобы не работало контекстное меню по нажатию правой кнопки
    мыши.
 */
const htmlEl = document.querySelector("html");
htmlEl.addEventListener("contextmenu", e =>  e.preventDefault());
htmlEl.addEventListener("selectstart", e =>  e.preventDefault());
htmlEl.addEventListener("copy", e =>  e.preventDefault());