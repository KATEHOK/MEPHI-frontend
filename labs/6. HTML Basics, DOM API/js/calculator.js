/**
    5. Реализуйте калькулятор, с которым можно было бы взаимодействовать
    в браузере. На вашей странице должно присутствовать 1 поле с
    выводом результата и 16 кнопок: “1”, “2”, “3”, “4”, “5”, “6”, “7”, “8”,
    “9”, “0”, “+”, “-”, “*”, “/”, “=”, “C” для взаимодействия с калькулятором.
    (Парсинг выражений делать не нужно - калькулятор должен
    поддерживать одно действие за раз)
*/
class Calculator {
    #allowedBtns = [
        "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "0",
        "+", "-", "*", "/", "=", "C"
    ];
    #btns;
    #output;
    #firstNum = "";
    #secondNum = "";
    #operator = "";
    #result = "";
    
    constructor() {
        this.#btns = document.querySelectorAll("button");
        this.#output = document.querySelector("#output");
        this.#addBtnsEventListeners();
    }

    /**
     * Обновляет html-объект вывода
     */
    #updateOutput() {
        let res = "";
        if (this.#firstNum != "") {
            res += this.#firstNum;

            if (this.#operator != "") {
                res += ' ' + this.#operator;

                if (this.#secondNum != "") {
                    res += ' ' + this.#secondNum;
                    if (this.#result != "") res += ' = ' + this.#result;
                }
            }
        }
        this.#output.innerHTML = res;
    }

    /**
     * Вычисляет выражение и записывает его в this.#result
     */
    #calculate() {
        let firstNum = +this.#firstNum;
        let secondNum = +this.#secondNum;
        let operator = this.#operator;
        if (!isNaN(firstNum) && !isNaN(secondNum) && this.#allowedBtns.includes(operator)) {
            switch (operator) {
                case "+":
                    this.#result = String(firstNum + secondNum);
                    break;
                case "-":
                    this.#result = String(firstNum - secondNum);
                    break;
                case "*":
                    this.#result = String(firstNum * secondNum);
                    break;
                case "/":
                    if (secondNum == 0) alert("You can NOT divide by zero!");
                    else this.#result = String(firstNum / secondNum);
                    break;
                default:
                    console.error(`Unexpected operator in this.#calculate(): ${operator}`);
            }
        }
        else console.error(`Unexpected params in this.#calculate(): fn = ${first_num}; sn = ${second_num}; op = ${operator}`);
    }

    /**
     * Устанавливает для this.#firstNum, this.#secondNum, this.#operator, this.#result значения по умолчанию (пустые строки)
     */
    #setDefaults() {
        this.#firstNum = "";
        this.#secondNum = "";
        this.#operator = "";
        this.#result = "";
    }

    /**
     * Добавляет кнопкам обработчики клика
     */
    #addBtnsEventListeners() {
        this.#btns.forEach( (btn) => {
            if (this.#allowedBtns.includes(btn.innerText)) {
                btn.addEventListener("click", (e) => {
                    let value = e.target.innerText

                    if (isNaN(+value)) {
                        if (value == "C") {
                            this.#setDefaults();
                            this.#updateOutput();
                            this.#output.innerHTML = "0";
                        }
                        else if (value == "=") {
                            if (this.#firstNum == "" || this.#secondNum == "" || this.#operator == "") {
                                alert("Firstly enter numbers and operator!");
                                return;
                            }
                            this.#calculate();
                            this.#updateOutput();
                        }
                        else {
                            if (this.#firstNum == "") {
                                if (value == "-") {
                                    this.#firstNum += value;
                                    this.#updateOutput();
                                }
                                else alert("Firstly enter number!");
                            }
                            else {
                                if (this.#result != "") {
                                    let tmp = this.#result;
                                    this.#setDefaults();
                                    this.#firstNum = tmp;
                                }
                                if (this.#operator == "") {
                                    this.#operator = value;
                                    this.#updateOutput();
                                }
                                else alert("You can use only one operator!");
                            }
                        }
                    }
                    else {
                        if (this.#result != "") this.#setDefaults();
                        if (this.#operator == "") this.#firstNum += value;
                        else this.#secondNum += value;
                        this.#updateOutput();
                    }
                    console.log(this.#firstNum, this.#operator, this.#secondNum); 
                })
            }
            else {
                console.error(`Unexpected button: ${btn.outerHTML}`);
                btn.outerHTML = "";
                console.log("Unexpected button was deleted");
            }
        });
    }
}

let calc = new Calculator();