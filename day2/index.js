var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");

// console.log(input);

var records = input.map(function(row) {
    var rowParts = row.split(":"); 
    var parts = rowParts[0].split(" ");

    var nums = parts[0].split("-").map(function(p) {
        return parseInt(p);
    }).filter(function(p) {
        return !isNaN(p);
    });
    
    return {
        letter: parts[1], 
        min: nums[0],
        max: nums[1],
        password: rowParts[1].trim(),
    };

});

// console.log(records);


var checkPasswordRecord1 = function(record) {
    
    var occurence = record.password.split("").reduce(function(acc, letter) {
        return acc + (letter === record.letter ? 1 : 0);
    }, 0);
    
    return occurence >= record.min && occurence <= record.max;

};

// var validRecordsNum = records.reduce(function(acc, record) {
//     return acc + (checkPasswordRecord1(record) ? 1 : 0); 
// }, 0);

// console.log(validRecordsNum);




var checkPasswordRecord2 = function(record) {

    var letters = record.password.split("");

    var minCheck = letters[record.min-1] === record.letter ? 1 : 0;
    var maxCheck = letters[record.max-1] === record.letter ? 1 : 0;

    return (minCheck + maxCheck) % 2 === 1;
    
};





var validRecordsNum = records.reduce(function(acc, record) {
    return acc + (checkPasswordRecord2(record) ? 1 : 0); 
}, 0);

console.log(validRecordsNum);


