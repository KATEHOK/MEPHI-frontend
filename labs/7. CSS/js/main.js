/**
 * Оборачивает каждую букву текста класса-контейнера в <span> с классом (классы чередуются, теги внутри контейнера игнорируются)
 * @param {string} containerClassName имя класса-контейнера
 * @param  {...string} classNames массив имен классов для задания вставляемым <span> элементам
 */
function makeDifferentClasses(containerClassName, ...classNames) {
    let containerEl = document.querySelector("." + containerClassName);
    let txt = containerEl.innerHTML;
    let newTxt = '';
    let isInnerEl = false;
    let j = 0;
    for (let i = 0; i < txt.length; ++i) {
        if (isInnerEl) {
            newTxt += txt[i];
            if (txt[i] == '>') isInnerEl = false;
            continue;
        }
        if (txt[i] == '<') {
            newTxt += txt[i];
            isInnerEl = true;
            continue;
        }
        if (txt[i] == ' ') {
            newTxt += txt[i];
            continue;
        }
        newTxt += `<span class='${classNames[j++]}'>${txt[i]}</span>`;
        if (j >= classNames.length) j -= classNames.length;
    }
    containerEl.innerHTML = newTxt;
}

/**
 * Добавляет каждому дочернему элементу класса-контейнера все классы из массива
 * @param {string} containerClassName имя класса-контейнера
 * @param  {...string} classNames массив имен классов для задания дочерним элементам
 */
function addClassesToElsInContainer(containerClassName, ...classNames) {
    let targetEls = document.querySelector('.' + containerClassName).children;
    for (let i = 0; i < targetEls.length; ++i) {
        classNames.forEach(className => targetEls[i].classList.add(className));
    }
}

makeDifferentClasses("red-blue_txt", "red_txt", "blue_txt");
addClassesToElsInContainer("underlined_txt", "td_underline");