function printReverse(array){
    var arr2 = new Array();
    var temp = 0;
    while(array.length >= 1) {
        temp = array.pop();
        console.log(temp);
        arr2.push(temp);
    }
    return arr2;
}

// console.log(printReverse([1,2,3,4]));


function isUniform(array) {
    var check = array[0];
    counter = 0;
    for (var i = 1; i < array.length; i++) {
        if (array[i] !== check) {
            return false;;
        }
    }
    return true;
}

isUniform([1,1,1,1,1])



function sumArray(array) {
    var sum = 0;
    array.forEach(x => sum += x);
    return sum;
}

// console.log(sumArray([1,2,3,4]));

function max(array){
    highestNum = 0;
    array.forEach(function(x) {
        if (x > highestNum) {
            highestNum = x;
        }
        // return highestNum;
    });
    return highestNum;
}

console.log(max([1,2,3,4,5]));