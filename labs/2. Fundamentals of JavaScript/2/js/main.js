function sortArray() {
    // проверку
    let arr = prompt("Enter nums via space").split(' ').map(Number).sort((a, b) => { return a - b });
    console.dir(arr);
    alert(arr);
}

function getRemainder() {
    let arr = prompt("Enter nums via space").split(' ').map((el) => Number(el) % 5);
    console.dir(arr);
    alert(arr);
}

function getMedian(...args) {
    let sorted = args.sort((a, b) => { return a - b });
    

}





// sortArray();
// getRemainder();
