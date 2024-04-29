// npx tsc --watch
// console.log()

// 2. Создайте класс User с полями name, age и методом hello(). Этот метод
// должен выводить в консоль “Hi! My name is <name>. And I am <age>
// years old.” (вместо <name> и <age> должны выводиться name и age
// пользователя). С помощью интерфейсов TS типизируйте данный класс
// (То есть создайте отдельный тип для экземпляров этого класса).

interface UserInterface {
    name: string
    age: number
    hello(): void
}

class User {
    name: string
    age: number

    constructor() {
        this.name = "Imposter"
        this.age = 69
    }

    hello() {
        console.log(`Hi! my name is ${this.name}. And I am ${this.age} years old.`)
    }
}

// 3. Типируйте класс из предыдущего задания с помощью псевдонимов типов.

type UserType = {
    name: string
    age: number
    hello(): void
}

// type New = number

// interface NewInt extends New

// declare function foo<T>(a: T): T;
// class A {}
// let a = foo(A)

// 4. Реализуйте с помощью TS перегруженную функцию distance,
// определяющую расстояние между двумя точками. Сделайте так, чтобы
// функцию можно было вызывать двумя способами:
// distance(x1, y1, x2, y2)- с передачей координат двух точек
// distance(p1, p2)- с передачей точек (причем каждая точка - это
// объект с полями x и y, например, {x:10, y:20}).
// Все типы (в том числе объектов точек) должны быть явно указаны
// (запрещено использовать any в явной или неявной форме).

interface Point {
    x: number
    y: number
}

function distance(p1: Point, p2: Point): number
function distance(x1: number, y1: number, x2: number, y2: number): number
function distance(p1ORx1: number | Point, p2ORy1: number | Point, x2?: number, y2?: number): number {

    let res: number = 0

    if (typeof p1ORx1 === "number" && typeof p2ORy1 === "number" &&
        x2 !== undefined && y2 !== undefined) {
        res = Math.sqrt((p1ORx1 - x2) ** 2 + (p2ORy1 - y2) ** 2)
    }
    else if (typeof p1ORx1 === 'object' && typeof p2ORy1 === 'object') {
        res = Math.sqrt((p1ORx1.x - p2ORy1.x) ** 2 + (p1ORx1.y - p2ORy1.y) ** 2)
    }

    return res
}

// 5. С помощью TS написать класс, реализующий бинарное дерево.
// Предусмотреть методы поиска, вставки, удаления, изменения элемента
// и определения высоты дерева. Использовать настройки strict и noImplicitAny.
// Избегать утверждения типов (операторы as и non-null assertion).

class MyNode<T = number> {
    left: MyNode<T> | undefined
    right: MyNode<T> | undefined
    value: T

    constructor (value: T) {
        this.value = value
    }

    cmp(other: T): number
    cmp(other: MyNode<T>): number
    cmp(other: T | MyNode<T>): number 
    cmp(other: T | MyNode<T>) {
        if (other instanceof MyNode) {
            if (typeof other.value == 'number' && typeof this.value == 'number') {
                return this.value - other.value
            }
            // TO DO for custom type of T
        }
        else if (typeof other == 'number' && typeof this.value == 'number') {
            return this.value - other
        }
        
        throw "Error: MyNode > cmp()"
    }
}

class MyBinaryTree<T = number> {
    root: MyNode<T> | undefined

    constructor ()
    constructor (value: T)
    constructor (node: MyNode<T>)
    constructor (first?: T | MyNode<T>) {
        if (first !== undefined) this.addNode(first)
    }

    addNode(node: MyNode<T>): boolean
    addNode(value: T): boolean
    addNode(valueOrNode: T | MyNode<T>): boolean
    addNode(valueOrNode: T | MyNode<T>) {
        let parent: MyNode<T> | undefined
        let node: MyNode<T>

        if (valueOrNode instanceof MyNode) node = valueOrNode
        else node = new MyNode<T>(valueOrNode)

        parent = this.findParent(node)

        if (this.root === undefined) this.root = node

        else if (parent === undefined) {
            let d = this.root.cmp(node)

            if (d === 0) return false
            else if (d < 0) node.left = this.root
            else node.right = this.root

            this.root = node
        }

        else {
            let d = node.cmp(parent)

            if (d === 0) return false

            else if (d < 0) {
                if (parent.left !== undefined) {
                    d = parent.left.cmp(node)

                    if (d < 0) node.left = parent.left
                    else node.right = parent.left
                }

                parent.left = node
            }

            else {
                if (parent.right !== undefined) {
                    d = parent.right.cmp(node)

                    if (d < 0) node.left = parent.right
                    else node.right = parent.right
                }

                parent.right = node
            }
        }
        return true
    }

    findParent(node: MyNode<T>): MyNode<T> | undefined
    findParent(value: T): MyNode<T> | undefined
    findParent(child: T | MyNode<T>): MyNode<T> | undefined
    findParent(child: T | MyNode<T>) {
        let parent: MyNode<T> | undefined = undefined
        let curNode = this.root

        while (curNode !== undefined) {
            let d = curNode.cmp(child)

            if (d === 0) break

            parent = curNode

            if (d < 0) curNode = curNode.right
            else curNode = curNode.left
        }

        return parent
    }

    findNode(value: T): MyNode<T> | undefined {
        let curNode = this.root

        while (curNode !== undefined) {
            let d = curNode.cmp(value)

            if (d === 0) return curNode

            if (d < 0) curNode = curNode.right
            else curNode = curNode.left
        }

        return undefined
    }

    modifyNode(target: T, newValue: T): boolean
    modifyNode(target: MyNode<T>, newValue: T): boolean
    modifyNode(target: T | MyNode<T>, newValue: T) {
        if (!this.delNode(target)) return false
        if (!this.addNode(newValue)) throw "Node was lost: MyBinaryTree > modifyNode()"
        return true
    }

    delNode(target: T): boolean
    delNode(target: MyNode<T>): boolean
    delNode(target: T | MyNode<T>): boolean
    delNode(target: T | MyNode<T>) {
        let parent: MyNode<T> | undefined
        let node: MyNode<T> | undefined
        let value: T
        let d: number

        if (target instanceof MyNode) value = target.value
        else value = target

        parent = this.findParent(value)

        // пустое дерево
        if (this.root === undefined) return false

        // цель - корень дерева
        if (parent === undefined) node = this.root

        else {
            d = parent.cmp(value)
            if (d > 0) node = parent.left
            else node = parent.right

            // отсутствует целевой элемент
            if (node === undefined || node.cmp(value) !== 0) return false
        }

        // отсутствует левый потомок
        if (node.left === undefined) {
            if (parent === undefined) this.root = node.right

            else {
                if (parent.left === node) parent.left = node.right
                else parent.right = node.right
            }
            return true
        }

        // отсутсвует правый потомок
        if (node.right === undefined) {
            if (parent === undefined) this.root = node.left

            else {
                if (parent.left === node) parent.left = node.left
                else parent.right = node.left
            }
            return true
        }

        // есть оба потомка

        let replacer = this.findMaxNode(node.left)

        // заменитель - потомок целевого элемента
        if (node.left === replacer) {
            replacer.right = node.right
            
            if (parent === undefined) this.root = replacer

            else {
                if (node === parent.left) parent.left = replacer
                else parent.right = replacer
            }
            return true
        }

        let parentOfReplacer = this.findParent(replacer.value)

        // такого быть не может, но чтобы TypeScript не ругался...
        if (parentOfReplacer === undefined) throw 'Whaaaaaat?'

        // чтобы не потерять левое поддерево заменителя
        parentOfReplacer.right = replacer.left

        replacer.left = node.left
        replacer.right = node.right

        if (parent === undefined) this.root = replacer
        
        else {
            if (node === parent.left) parent.left = replacer
            else parent.right = replacer
        }
        return true
    }

    findMaxNode(root: MyNode<T>): MyNode<T> {
        let cur = root
        while (cur.right !== undefined) cur = cur.right
        return cur
    }

    findMinNode(root: MyNode<T>): MyNode<T> {
        let cur = root
        while (cur.left !== undefined) cur = cur.left
        return cur
    }

    height(): number {
        return this.heightOfSubtree(this.root)
    }

    // функция рекурсивная - будут проблемы со стэком вызова функций на больших деревьях
    // heightOfSubtree(root: MyNode<T> | undefined): number {
    //     if (root === undefined) return 0

    //     let leftHeight = this.heightOfSubtree(root.left)
    //     let rightHeight = this.heightOfSubtree(root.right)
    //     let height = 1

    //     if (leftHeight > rightHeight) height += leftHeight
    //     else height += rightHeight

    //     return height
    // }

    // функция итерационная - могут быть проблемы с памятью на больших деревьях
    heightOfSubtree(root: MyNode<T> | undefined): number {
        if (root === undefined) return 0

        let height = 0
        let queue: MyNode<T>[] = [ root ]

        while (queue.length > 0) {
            let len = queue.length

            for (let i = 0; i < len; ++i) {
                let node = queue.shift()

                if (node === undefined) throw 'Whaaaaaat?'

                if (node.left !== undefined) queue.push(node.left)
                if (node.right !== undefined) queue.push(node.right)
            }

            ++height
        }

        return height
    }

    printTree(): void {
        this.printSubtree(this.root)
    }

    // cringe - заменить, если буду где-то использовать
    printSubtree(root: MyNode<T> | undefined): void {
        if (root === undefined) return

        let res = ''
        let queue: MyNode<T>[] = [ root ]

        while (queue.length > 0) {
            let len = queue.length

            for (let i = 0; i < len; ++i) {
                let node = queue.shift()

                if (node === undefined) throw 'Whaaaaaat?'

                res += `${node.value}\t`

                if (node.left !== undefined) queue.push(node.left)
                if (node.right !== undefined) queue.push(node.right)
            }

            res += '\n'
        }
        console.log(res)
    }
}

let num = 1
let cnt = 5
let values = [ 0,
        -2,         2,
    -3,     -1,    1,   3,  
]
let tree = new MyBinaryTree(0)

tree.printTree()
console.log('Only roor')
console.log('\n')

for (let i = 1; i < values.length; ++i) {
    tree.addNode(values[i])
}
tree.printTree()
console.log('Added all')
console.log('\n')

if (!tree.addNode(0)) console.warn("Node is already exist!")
console.log('Added 0')
console.log('\n')

console.log(tree.delNode(3))
tree.printTree()
console.log('Deleted 3')
console.log('\n')

console.log(tree.delNode(2))
tree.printTree()
console.log('Deleted 2')
console.log('\n')

console.log(tree.delNode(0))
tree.printTree()
console.log('Deleted 0')
console.log('\n')

console.log(tree.delNode(-3))
tree.printTree()
console.log('Deleted -3')
console.log('\n')

if (!tree.delNode(0)) console.warn("Node is not exist!")
tree.printTree()
console.log('Deleted 0')
console.log('\n')

console.log('Height:', tree.height())
console.log('\n')

tree.modifyNode(-1, -3)
tree.printTree()
console.log('Modifyed -1 => -3')
console.log("----------")




// 6. Реализовать с использованием TypeScript паттерны Adapter, Strategy, Observer.
// Привести примеры использования собственных классов

class Car {
    who(): string {
        return 'Car'
    }
}
class CarToMegaCarAdapter {
    car: Car
    constructor(car: Car) {
        this.car = car
    }
    who(): string {
        return 'Mega' + this.car.who()
    }
}
console.log((new CarToMegaCarAdapter(new Car)).who())
console.log("----------")



interface BangStrategy {
    bang(count: number): string
}
class BigBangStrategy {
    bang(count: number): string {
        let res = ''
        for (let i = 0; i < count; ++i) res += "BANG "
        return res
    }
}
class SmallBangStrategy {
    bang(count: number): string {
        let res = ''
        for (let i = 0; i < count; ++i) res += "bang "
        return res
    }
}
class Bomb {
    private bangStrategy: BangStrategy
    constructor(bangStrategy: BangStrategy) {
        this.bangStrategy = bangStrategy
    }
    setBangStrategy(bangStrategy: BangStrategy) {
        this.bangStrategy = bangStrategy
    }
    bang(count: number) {
        console.log(this.bangStrategy.bang(count))
    }
}
let bomb = new Bomb(new BigBangStrategy)
bomb.bang(10)
bomb.setBangStrategy(new SmallBangStrategy)
bomb.bang(10)
console.log("----------")





interface Observer {
    react(cooler: Cooler): void
}
class Boss implements Observer {
    react(cooler: Cooler): void {
        if (cooler.filled) console.log("Lepota...")
        else console.log("Fill it b****es!!!")
    }
}
class Employee implements Observer {
    react(cooler: Cooler): void {
        if (cooler.filled) console.log("I'm going to drink.")
        else console.log("Run!!!")
    }
}
class Cooler {
    observers: Observer[]
    filled: boolean
    constructor() {
        this.observers = []
        this.filled = false
    }
    attach(observer: Observer) {
        if (!this.observers.includes(observer)) this.observers.push(observer)
    }
    detach(observer: Observer) {
        if (this.observers.includes(observer)) {
            let id = this.observers.indexOf(observer)
            this.observers.splice(id, 1)
        }
    }
    notify() {
        for (let observer of this.observers) {
            observer.react(this)
        }
    }
    fill() {
        this.filled = true
        this.notify()
    }
    empty() {
        this.filled = false
        this.notify()
    }
}
let cooler = new Cooler()
cooler.attach(new Employee())
cooler.attach(new Boss())
cooler.attach(new Employee())
cooler.fill()
console.log('\n')
cooler.empty()
console.log("----------")
