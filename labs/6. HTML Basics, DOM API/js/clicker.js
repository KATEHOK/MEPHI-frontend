let clck_btn = document.querySelector("#clck_btn");
let clck_txt = document.querySelector("#clck_txt");
let clck_stat = document.querySelector("#clck_stat");

/**
    3. Реализуйте кликер, представляющий собой страницу с кнопкой и
    счетчиком. При нажатии на кнопку пусть счетчик увеличивается на 1.
    Сделайте так, чтобы счетчик не сбрасывался при перезагрузке браузера.
    4. Найдите в интернете информацию о работе с временем в браузере и
    добавьте для кликера из предыдущего задания метку, отображающую
    среднее количество кликов в секунду.
 */
clck_txt.innerHTML = +sessionStorage.getItem("click");
processClckStat(clck_stat);

clck_btn.addEventListener("click", (e) => {
    processClckTxt(clck_txt);
    processClckStat(clck_stat);
});

/**
 * Увеличивает счетчик кликов и обновляет его отображение на странице
 */
function processClckTxt(clck_txt) {
    let click = +sessionStorage.getItem("click");
    ++click;
    sessionStorage.setItem("click", click);
    clck_txt.innerHTML = click;
}

/**
 * Пересчитывает скорость кликов и обновляет ее отображение на странице
 */
function processClckStat(clck_stat) {
    let time = +sessionStorage.getItem("start_time");
    if (time == 0) {
        time = (new Date()).getTime();
        sessionStorage.setItem("start_time", time);
    }
    
    let now = (new Date()).getTime();
    if (now - time == 0) now += 1000;

    clck_stat.innerHTML = +sessionStorage.getItem("click") / ((now - time) / 1000);
}