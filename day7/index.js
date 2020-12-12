var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");


var parseInput = function(input) {

    input = input.map(function(line) {
        line = line.slice(0, -1); 
        line = line.replace(/ bags?/g, "");
        return line;
    });
    input = input.filter(function(line) {
        return line.trim() !== "";
    });


    return input.map(function(line) {
        var parts = line.split("contain");

        var contains = parts[1].split(",").map(function(item) {
            item = item.trim();
            var number = parseInt(item.substring(0, 1));
            var bag = item.substring(1).trim()
            if (isNaN(number)) {
                return {
                    number: 0,
                    bag: ""
                };
            }
            return {
                number: number,
                bag: bag
            };
        });

        return {
            bag: parts[0].trim(),
            contains: contains
        };

    });

};

var recordset = parseInput(input);


// console.log(JSON.stringify(recordset, null, "  "));



var findDirectContainers = function(recordset, bagTarget) {

    var containers = [];
    recordset.forEach(function(record) {
        record.contains.forEach(function(item) {
            if(item.bag === bagTarget) {
                containers.push(record.bag);
            }
        });
    });
    return containers;

};


var findContainersRecursive = function(recordset, bagTarget, containersList) {
    
    var containers = findDirectContainers(recordset, bagTarget);
    containers.forEach(function(b) {
        if (containersList.indexOf(b) === -1) {
            containersList.push(b);
        }
    });

    containers.forEach(function(bagContainer) {
        findContainersRecursive(recordset, bagContainer, containersList);
    });

};

var findContainers = function(recordset, bagTarget) {
    var containersList = [];
    findContainersRecursive(recordset, bagTarget, containersList);
    return containersList;
};


/**
 * Part 1
 */

// var containers = findContainers(recordset, "shiny gold");

// console.log(containers.length);




/**
 * Part 2
 */


var getDirectContent = function(recordset, bagTarget) {
    
    var targetList = recordset.filter(function(record) {
        return record.bag === bagTarget;
    });

    var targetRecord = null;
    if (targetList.length) {
        targetRecord = targetList[0];
    }

    if (!targetRecord) {
        return [];
    }

    return targetRecord.contains;

};


var getContentRecursive = function(recordset, bagTarget, bagNumber, contentList) {
    
    var content = getDirectContent(recordset, bagTarget);
    content = content.map(function(item) {
        var itemCopy = Object.assign({}, item);
        itemCopy.number = itemCopy.number * bagNumber;
        contentList.push(itemCopy);
        return itemCopy;
    });

    content.forEach(function(item) {
        getContentRecursive(recordset, item.bag, item.number, contentList);
    });

};


var getContent = function(recordset, bagTarget, bagNumber) {
    bagNumber = bagNumber || 1;
    var contentList = [];
    getContentRecursive(recordset, bagTarget, bagNumber, contentList);
    return contentList;
};


var content = getContent(recordset, "shiny gold");

console.log(content);

var number = content.reduce(function(acc, item) {
    return acc + item.number;
}, 0);

console.log(number);

