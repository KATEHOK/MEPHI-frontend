"use strict";
// npx tsc --watch
// console.log()
class User {
    constructor() {
        this.name = "Imposter";
        this.age = 69;
    }
    hello() {
        console.log(`Hi! my name is ${this.name}. And I am ${this.age} years old.`);
    }
}
function distance(p1ORx1, p2ORy1, x2, y2) {
    let res = 0;
    if (typeof p1ORx1 === "number" && typeof p2ORy1 === "number" &&
        x2 !== undefined && y2 !== undefined) {
        res = Math.sqrt((p1ORx1 - x2) ** 2 + (p2ORy1 - y2) ** 2);
    }
    else if (typeof p1ORx1 === 'object' && typeof p2ORy1 === 'object') {
        res = Math.sqrt((p1ORx1.x - p2ORy1.x) ** 2 + (p1ORx1.y - p2ORy1.y) ** 2);
    }
    return res;
}
// 5. С помощью TS написать класс, реализующий бинарное дерево.
// Предусмотреть методы поиска, вставки, удаления, изменения элемента
// и определения высоты дерева. Использовать настройки strict и noImplicitAny.
// Избегать утверждения типов (операторы as и non-null assertion).
class MyNode {
    constructor(value) {
        this.value = value;
    }
    cmp(other) {
        if (other instanceof MyNode) {
            if (typeof other.value == 'number' && typeof this.value == 'number') {
                return this.value - other.value;
            }
            // TO DO for custom type of T
        }
        else if (typeof other == 'number' && typeof this.value == 'number') {
            return this.value - other;
        }
        throw "Error: MyNode > cmp()";
    }
}
class MyBinaryTree {
    constructor(first) {
        if (first !== undefined)
            this.addNode(first);
    }
    addNode(valueOrNode) {
        let parent;
        let node;
        if (valueOrNode instanceof MyNode)
            node = valueOrNode;
        else
            node = new MyNode(valueOrNode);
        parent = this.findParent(node);
        if (this.root === undefined)
            this.root = node;
        else if (parent === undefined) {
            let d = this.root.cmp(node);
            if (d === 0)
                return false;
            else if (d < 0)
                node.left = this.root;
            else
                node.right = this.root;
            this.root = node;
        }
        else {
            let d = node.cmp(parent);
            if (d === 0)
                return false;
            else if (d < 0) {
                if (parent.left !== undefined) {
                    d = parent.left.cmp(node);
                    if (d < 0)
                        node.left = parent.left;
                    else
                        node.right = parent.left;
                }
                parent.left = node;
            }
            else {
                if (parent.right !== undefined) {
                    d = parent.right.cmp(node);
                    if (d < 0)
                        node.left = parent.right;
                    else
                        node.right = parent.right;
                }
                parent.right = node;
            }
        }
        return true;
    }
    findParent(child) {
        let parent = undefined;
        let curNode = this.root;
        while (curNode !== undefined) {
            let d = curNode.cmp(child);
            if (d === 0)
                break;
            parent = curNode;
            if (d < 0)
                curNode = curNode.right;
            else
                curNode = curNode.left;
        }
        return parent;
    }
    findNode(value) {
        let curNode = this.root;
        while (curNode !== undefined) {
            let d = curNode.cmp(value);
            if (d === 0)
                return curNode;
            if (d < 0)
                curNode = curNode.right;
            else
                curNode = curNode.left;
        }
        return undefined;
    }
    modifyNode(target, newValue) {
        if (!this.delNode(target))
            return false;
        if (!this.addNode(newValue))
            throw "Node was lost: MyBinaryTree > modifyNode()";
        return true;
    }
    delNode(target) {
        let parent;
        let node;
        let value;
        let d;
        if (target instanceof MyNode)
            value = target.value;
        else
            value = target;
        parent = this.findParent(value);
        // пустое дерево
        if (this.root === undefined)
            return false;
        // цель - корень дерева
        if (parent === undefined)
            node = this.root;
        else {
            d = parent.cmp(value);
            if (d > 0)
                node = parent.left;
            else
                node = parent.right;
            // отсутствует целевой элемент
            if (node === undefined || node.cmp(value) !== 0)
                return false;
        }
        // отсутствует левый потомок
        if (node.left === undefined) {
            if (parent === undefined)
                this.root = node.right;
            else {
                if (parent.left === node)
                    parent.left = node.right;
                else
                    parent.right = node.right;
            }
            return true;
        }
        // отсутсвует правый потомок
        if (node.right === undefined) {
            if (parent === undefined)
                this.root = node.left;
            else {
                if (parent.left === node)
                    parent.left = node.left;
                else
                    parent.right = node.left;
            }
            return true;
        }
        // есть оба потомка
        let replacer = this.findMaxNode(node.left);
        // заменитель - потомок целевого элемента
        if (node.left === replacer) {
            replacer.right = node.right;
            if (parent === undefined)
                this.root = replacer;
            else {
                if (node === parent.left)
                    parent.left = replacer;
                else
                    parent.right = replacer;
            }
            return true;
        }
        let parentOfReplacer = this.findParent(replacer.value);
        // такого быть не может, но чтобы TypeScript не ругался...
        if (parentOfReplacer === undefined)
            throw 'Whaaaaaat?';
        // чтобы не потерять левое поддерево заменителя
        parentOfReplacer.right = replacer.left;
        replacer.left = node.left;
        replacer.right = node.right;
        if (parent === undefined)
            this.root = replacer;
        else {
            if (node === parent.left)
                parent.left = replacer;
            else
                parent.right = replacer;
        }
        return true;
    }
    findMaxNode(root) {
        let cur = root;
        while (cur.right !== undefined)
            cur = cur.right;
        return cur;
    }
    findMinNode(root) {
        let cur = root;
        while (cur.left !== undefined)
            cur = cur.left;
        return cur;
    }
    height() {
        return this.heightOfSubtree(this.root);
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
    heightOfSubtree(root) {
        if (root === undefined)
            return 0;
        let height = 0;
        let queue = [root];
        while (queue.length > 0) {
            let len = queue.length;
            for (let i = 0; i < len; ++i) {
                let node = queue.shift();
                if (node === undefined)
                    throw 'Whaaaaaat?';
                if (node.left !== undefined)
                    queue.push(node.left);
                if (node.right !== undefined)
                    queue.push(node.right);
            }
            ++height;
        }
        return height;
    }
    printTree() {
        this.printSubtree(this.root);
    }
    // cringe - заменить, если буду где-то использовать
    printSubtree(root) {
        if (root === undefined)
            return;
        let res = '';
        let queue = [root];
        while (queue.length > 0) {
            let len = queue.length;
            for (let i = 0; i < len; ++i) {
                let node = queue.shift();
                if (node === undefined)
                    throw 'Whaaaaaat?';
                res += `${node.value}\t`;
                if (node.left !== undefined)
                    queue.push(node.left);
                if (node.right !== undefined)
                    queue.push(node.right);
            }
            res += '\n';
        }
        console.log(res);
    }
}
let num = 1;
let cnt = 5;
let values = [0,
    -2, 2,
    -3, -1, 1, 3,
];
let tree = new MyBinaryTree(0);
tree.printTree();
console.log('Only roor');
console.log('\n');
for (let i = 1; i < values.length; ++i) {
    tree.addNode(values[i]);
}
tree.printTree();
console.log('Added all');
console.log('\n');
if (!tree.addNode(0))
    console.warn("Node is already exist!");
console.log('Added 0');
console.log('\n');
console.log(tree.delNode(3));
tree.printTree();
console.log('Deleted 3');
console.log('\n');
console.log(tree.delNode(2));
tree.printTree();
console.log('Deleted 2');
console.log('\n');
console.log(tree.delNode(0));
tree.printTree();
console.log('Deleted 0');
console.log('\n');
console.log(tree.delNode(-3));
tree.printTree();
console.log('Deleted -3');
console.log('\n');
if (!tree.delNode(0))
    console.warn("Node is not exist!");
tree.printTree();
console.log('Deleted 0');
console.log('\n');
console.log('Height:', tree.height());
console.log('\n');
tree.modifyNode(-1, -3);
tree.printTree();
console.log('Modifyed -1 => -3');
console.log("----------");
// 6. Реализовать с использованием TypeScript паттерны Adapter, Strategy, Observer.
// Привести примеры использования собственных классов
class Car {
    who() {
        return 'Car';
    }
}
class CarToMegaCarAdapter {
    constructor(car) {
        this.car = car;
    }
    who() {
        return 'Mega' + this.car.who();
    }
}
console.log((new CarToMegaCarAdapter(new Car)).who());
console.log("----------");
class BigBangStrategy {
    bang(count) {
        let res = '';
        for (let i = 0; i < count; ++i)
            res += "BANG ";
        return res;
    }
}
class SmallBangStrategy {
    bang(count) {
        let res = '';
        for (let i = 0; i < count; ++i)
            res += "bang ";
        return res;
    }
}
class Bomb {
    constructor(bangStrategy) {
        this.bangStrategy = bangStrategy;
    }
    setBangStrategy(bangStrategy) {
        this.bangStrategy = bangStrategy;
    }
    bang(count) {
        console.log(this.bangStrategy.bang(count));
    }
}
let bomb = new Bomb(new BigBangStrategy);
bomb.bang(10);
bomb.setBangStrategy(new SmallBangStrategy);
bomb.bang(10);
console.log("----------");
class Boss {
    react(cooler) {
        if (cooler.filled)
            console.log("Lepota...");
        else
            console.log("Fill it b****es!!!");
    }
}
class Employee {
    react(cooler) {
        if (cooler.filled)
            console.log("I'm going to drink.");
        else
            console.log("Run!!!");
    }
}
class Cooler {
    constructor() {
        this.observers = [];
        this.filled = false;
    }
    attach(observer) {
        if (!this.observers.includes(observer))
            this.observers.push(observer);
    }
    detach(observer) {
        if (this.observers.includes(observer)) {
            let id = this.observers.indexOf(observer);
            this.observers.splice(id, 1);
        }
    }
    notify() {
        for (let observer of this.observers) {
            observer.react(this);
        }
    }
    fill() {
        this.filled = true;
        this.notify();
    }
    empty() {
        this.filled = false;
        this.notify();
    }
}
let cooler = new Cooler();
cooler.attach(new Employee());
cooler.attach(new Boss());
cooler.attach(new Employee());
cooler.fill();
console.log('\n');
cooler.empty();
console.log("----------");
