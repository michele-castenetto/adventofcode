var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");




var parseBinary = function(data, charOn) {
    var dataLength = data.length;
    return data.reduce(function(acc, c, index) {
        if (c === charOn) {
            var pow = dataLength -1 - index;
            acc += Math.pow(2, pow);
        }
        return acc;
    }, 0);
};

var parseInput = function() {

    return input.map(function(line) {
        var rowData = line.slice(0, 7).split("");
        var columnData = line.slice(7).split("");

        var row = parseBinary(rowData, "B");
            var column = parseBinary(columnData, "R");

        return {
            row: row,
            column: column,
            id: row * 8 + column,
        };
    }); 

};


var records = parseInput(input);



/**
 * Part 1
 */

// var ids = records.map(function(record) {
//     return record.id;
// });

// var maxId = Math.max.apply(null, ids);

// console.log(maxId);



/**
 * Part 2
 */


var recordIdMap = records.reduce(function(acc, record) {
    acc[record.id] = record;
    return acc;
}, {});


var searchEmpty = function(recordIdMap) {

    var empty = [];

    for (var i = 0; i < 128 * 8; i++) {
        if (!recordIdMap[i]) {
            empty.push(i);
        }
    }

    return empty;

};


var empty = searchEmpty(recordIdMap);


var targetIds = empty.filter(function(id) {
    return recordIdMap[id-1] && recordIdMap[id+1];
});

console.log(targetIds);


