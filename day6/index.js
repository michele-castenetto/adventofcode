var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");


// console.log(input);


var parseInput = function(input) {

    var records = [];

    var record = "";
    for (var i = 0; i < input.length; i++) {
        var row = input[i];

        if (row.trim() === "") {
            records.push(record.trim());
            record = "";
            continue;
        }

        record += row.trim() + " ";

    }
    records.push(record.trim());


    records = records.filter(function(record) {
        return record !== "";
    });

    // records = records.map(function(record) {
    //     var fields = record.split(" ");
    //     var result = {};
    //     fields.forEach(function(field) {
    //         var parts = field.trim().split(":");
    //         var key = parts[0].trim();
    //         var value = parts[1].trim();
    //         result[key] = value;
    //     });
    //     return result;
    // });

    return records;

};

var records = parseInput(input);

// console.log(records);


var countUniqueLetters = function(record) {
    var alreadyCounted = {};
    return record.split("").reduce(function(acc, letter) {
        if(letter.trim() === "") {
            return acc;
        }
        if (alreadyCounted[letter]) {
            return acc;
        }
        alreadyCounted[letter] = 1;
        return acc + 1;


    }, 0);
};



/**
 * Part 1
 */

// var totalCount = records.reduce(function(acc, record) {
//     return acc + countUniqueLetters(record);
// }, 0);

// console.log(totalCount);


/**
 * Part 2
 */

var countCommonLetters = function(record) {

    var lettersCountMap = {};

    record.split(" ").forEach(function(letters) {
        letters.split("").forEach(function(letter) {
            if (lettersCountMap[letter] === undefined) {
                lettersCountMap[letter] = 0;
            }
            lettersCountMap[letter] += 1;
        });
    });

    var n = record.split(" ").length;
    
    
    return Object.keys(lettersCountMap).reduce(function(acc, key) {
        if (lettersCountMap[key] === n) {
            acc += 1
        }
        return acc;
    }, 0);

};


var totalCount = records.reduce(function(acc, record) {
    return acc + countCommonLetters(record);
}, 0);

console.log(totalCount);