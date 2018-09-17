function isEven (x) {
    if (x % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

// console.log(isEven(4));

function factorial (x) {
    let i = 1;
    let fact = x;
    while (x - i >= 1) {
        fact *= (x-i);
        i++;
    }
    return fact;
}

// console.log(factorial(5));


function kebabToSnake (word) {
    let str = '';
    for (let i = 0; i < word.length; i++) {
        if ( word.charAt(i) === '-') {
            str += '_';
        } else {
            str += word.charAt(i);
        }
    }
    return str;
}

// console.log(kebabToSnake('five-to-one'));

function kebabToSnake2 (word) {
    let str = word.replace(/-/g , "_");
    return str;
}

console.log(kebabToSnake2('testing-one-two-three'));