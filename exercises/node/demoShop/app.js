var faker = require('faker');

console.log("=====================");
console.log("WELCOME TO THIS SHOP!");
console.log("=====================");


for (i = 0; i < 10; i++) {
    console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
}

