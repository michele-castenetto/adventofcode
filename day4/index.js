var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");


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

    records = records.map(function(record) {
        var fields = record.split(" ");
        var result = {};
        fields.forEach(function(field) {
            var parts = field.trim().split(":");
            var key = parts[0].trim();
            var value = parts[1].trim();
            result[key] = value;
        });
        return result;
    });

    return records;

};

var records = parseInput(input);


/**
 * Part1
 */


var validateRecordKeys = function(record) {
  
    keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

    var isValid = keys.reduce(function(acc, key) {
        return acc && record[key] !== undefined;
    }, true);

    return isValid;
};


// var numValid = records.reduce(function(acc, record) {
//     return acc + (validateRecordKeys(record) ? 1 : 0);
// }, 0);

// console.log(numValid);


/**
 * Part2
 */


var validateRecord = (function() {
    
    var _validateYear = function(value, min, max) {
        var year = parseInt(value);
        if ( isNaN(year) ) {
            return false;
        }
        return year >= min && year <= max;
    };
    var _checks = [
        {
            key: "byr",
            validation: function(value) { 
                return _validateYear(value, 1920, 2002); 
            }
        },
        {
            key: "iyr",
            validation: function(value) { 
                return _validateYear(value, 2010, 2020); 
            }
        },
        {
            key: "eyr",
            validation: function(value) { 
                return _validateYear(value, 2020, 2030); 
            }
        },
        {
            key: "hgt",
            validation: function(value) { 
                var regExp = /^(?<height>\d+)(?<unit>cm|in)$/;
                var groups = (value.match(regExp) || {}).groups || {};
                var height = groups.height;
                var unit = groups.unit;
                if (unit === "cm") {
                    return height >= 150 && height <= 193;
                } else if(unit === "in") {
                    return height >= 59 && height <= 76;
                } else {
                    return false;
                }
            }
        },
        {
            key: "hcl",
            validation: function(value) { 
                return /^#[0-9A-F]{6}$/i.test(value);
            }
        },
        {
            key: "ecl",
            validation: function(value) { 
                return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(value) !== -1;
            }
        },
        {
            key: "pid",
            validation: function(value) { 
                return /^[0-9]{9}$/.test(value);
            }
        }

    ];

    return function(record) {
        return _checks.reduce(function(acc, check) {
            return acc && check.validation(record[check.key]);
        }, true);
    };

})();



var numValid = records.reduce(function(acc, record) {
    return acc + (validateRecord(record) ? 1 : 0);
}, 0);


console.log(numValid);
