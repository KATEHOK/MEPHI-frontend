/**
    1. Создайте класс User с полями name, age и методом hello(). Этот
    метод должен выводить в консоль “Hi! My name is <name>.
    And I am <age> years old.” (вместо <name> и <age>
    должны выводиться name и age пользователя).
    3. Добавьте к классу User поле tel, которое должно содержать телефон.
    Реализуйте его с помощью геттера и сеттера и защищенного поля.
    Сделайте так, чтобы записывать в поле tel можно было только
    корректные телефоны вида “+7xxxxxxxxxx”
    4. Поле age также реализуйте с помощью геттера и сеттера и приватного
    поля. Сделайте так, чтобы age могло содержать только целые числа от
    1 до 100.
 */
class User {

    _age = "";
    _name = "";
    _tel = "";

    _isTelValid(inputStr) { 
        return typeof(input) == "string" && /^\+7\d{10}$/.test(inputStr)
    }

    _isAgeValid(age) {
        return typeof(input) == "number" &&
            input % 1 == 0 && input >= 1 && input <= 100
    }

    hello() {
        let msg = `Hi! My name is ${this._name}. And I am ${this._age} years old.`;
        // alert(msg);
        return msg;
    }

    get tel() { return this._tel }
    set tel(input) { if (this._isTelValid(input)) this._tel = input }

    get age() { return this._age }
    set age(input) { if (this._isAgeValid(input)) this._age = input }
}

/**
    2. Создайте такой же класс, как в предыдущем пункте, только используйте
    синтаксис функций (если вы изначально использовали синтаксис
    функций, то используйте в этом задании синтаксис class).
 */
function User_f() {
    this._age = "";
    this._name = "";
    this.hello = function () {
        let msg = `Hi! My name is ${this._name}. And I am ${this._age} years old.`;
        // alert(msg);
        return msg;
    }
}

/**
    5. Реализуйте класс Student, который наследуется от User.
    Переопределите метод hello(), так чтобы он выводил “Hi! My
    name is <name>. I am <age> years old. And I am a
    student!”. Добавьте классу Student поле knowledge (с
    начальным значением 0) и метод learn(). При вызове метода
    learn() свойство knowledge должно увеличиваться на 1. Сделайте
    так, чтобы изменить knowledge из внешнего кода было невозможно
    (кроме как через вызов learn()).
 */
class Student extends User {

    #knowledge = 0;
    
    hello() {
        let msg = `Hi! My name is ${this._name}. I am ${this._age} years old. And I am a student!`;
        // alert(msg);
        return msg;
    }

    learn() {
        ++this.#knowledge;
    }

}

/**
    6. Сделайте так, чтобы при вызове метода reverse() для всех массивов
    происходило дублирование массива, а не перестановка в обратном
    порядке.
    То есть [1,2,3,4,5].reverse() должен возвращать [1,2,3,4,5,1,2,3,4,5]
 */
Array.prototype.reverse = function () {
    let len = this.length;
    for (let i = 0; i < len; ++i) {
        this.push(this[i]);
    }
}

// let arr = [ 1, 2, 3, 4 ];
// console.log(arr);
// arr.reverse();
// console.log(arr);