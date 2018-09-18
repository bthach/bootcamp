function average(array) {
    var sum = 0;
    for (i = 0; i < array.length; i++) {
        sum += array[i];
    }

    var avg = Math.round(sum/array.length);
    return avg;
}

console.log(average([90,98,89,100,100,86,94]));
console.log(average([40,65,77,82,80,54,73,63,95,49]));