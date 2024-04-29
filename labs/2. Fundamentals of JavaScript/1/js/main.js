function defineMonth(num) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    num--;
    

    if (num < 0 || num >= months.length) return "Incorrect number of month!";
    else return months[num];
}

function showMonth() {
    let num = prompt("Enter number from 1 to 12");

    num = parseInt(num);


    typeof(num) == "number"

    alert(defineMonth(num));
}

function getSimpleNums(n) {
    nums = [];
    
    for (let i = 1; i <= n; ++i) {
        if (i < 4) nums.push(i);
        else {
            let flag = true, x = i;
            while (flag) {
                // console.log(`Checking ${x}`);

                if (x % 2 == 0 || x % 3 == 0) {
                    x++;
                    continue;
                }

                let j;
                for (j = 3; j < nums.length; ++j) if (x % nums[j] == 0) break;

                if (j < nums.length || x % nums[nums.length - 1] == 0) {
                    x++;
                    continue;
                }

                flag = false;
            }
            nums.push(x);
        }
    }

    return nums;
}

function showSimpleNums() {
    let n = prompt("Entter N");
    
    alert(getSimpleNums(n).join(" "));
}

let Counter = {
    count: 0,
    add (value) { this.count += value },
    sub: sub
};

function sub (value) { this.count -= value }

function changeDelimiter() {
    let inputStr = prompt("Enter words via ','");
    let arr = inputStr.split(',');
    alert(arr.join('.'));
}

function checkPalindrome() {
    let inputStr = prompt("Enter something");
    // array reverse
    for (let i = 0; i < inputStr.length / 2; ++i) {
        if (inputStr[i] != inputStr[inputStr.length - 1 - i]) {
            alert("Нет!");
            return;
        }
    }
    alert("Да!");
}

showMonth();
showSimpleNums();
console.dir(Counter);
changeDelimiter();
checkPalindrome();