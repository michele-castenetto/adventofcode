var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");



var terrain = input.map(function(row) {
    return row.split(""); 
});



var traverseTerrain = function(terrain, direction) {
    
    var x = 0;
    var y = 0;
    var travel = [];
    
    var terrainWidth = terrain[0].length;

    while(terrain[y]) {

        x = (x + direction.x) % terrainWidth; 
        y += direction.y; 

        if (!terrain[y]) {
            break;
        }

        var hitTree = terrain[y][x] === "#" ? 1 : 0;

        travel.push({
            x: x,
            y: y,
            hitTree: hitTree
        });

    }

    return travel;

};



/**
 * Part1
 */


// var travel = traverseTerrain(terrain, {
//     x: 3,
//     y: 1
// });

// var hitTreeNum = travel.reduce(function(acc, step) {
//     return acc + step.hitTree;
// }, 0);

// console.log(hitTreeNum);




/**
 * Part2
 */


var directions = [
    {
        x: 1,
        y: 1
    },
    {
        x: 3,
        y: 1
    },
    {
        x: 5,
        y: 1
    },
    {
        x: 7,
        y: 1
    },
    {
        x: 1,
        y: 2
    },
];


var hitTreeNum = directions.reduce(function(acc, direction) {
    var travel = traverseTerrain(terrain, direction);
    var hits = travel.reduce(function(acc, step) {
        return acc + step.hitTree;
    }, 0);
    return acc * hits;
}, 1);



console.log(hitTreeNum);

