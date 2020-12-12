var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");


/**
 * Part1
 */


var findTwoNumbers = function(nums) {
    
    nums = nums.sort(function(n1, n2) {
        return n1 - n2;
    });
    
    nums = nums.map(function(n) {
        return parseInt(n);
    });
    
    nums = nums.filter(function(n) {
        return !isNaN(n);
    });
    
    var result = [];
    
    var n1, n2;
    for (var i1 = 0; i1 < nums.length - 1; i1++) {
        n1 = nums[i1];
        for (var i2 = i1 + 1; i2 < nums.length; i2++) {
            n2 = nums[i2];
            
            if (n1 + n2 === 2020) {
                result.push({
                    n1: n1,
                    n2: n2,
                });
            }
            
        }
        
    }

    return result;

};

// var solutions = findTwoNumbers(input);

// console.log("SOLUTIONS:");
// console.log(solutions);

// solutions.forEach(function(solution) {
//     console.log(solution.n1 * solution.n2);
// });




/**
 * Part2
 */


var findThreeNumbers = function(nums) {
    
    nums = nums.sort(function(n1, n2) {
        return n1 - n2;
    });
    
    nums = nums.map(function(n) {
        return parseInt(n);
    });
    
    nums = nums.filter(function(n) {
        return !isNaN(n);
    });
    
    var result = [];
    
    var n1, n2, n3;
    for (var i1 = 0; i1 < nums.length - 2; i1++) {
        n1 = nums[i1];
        for (var i2 = i1 + 1; i2 < nums.length - 1; i2++) {
            n2 = nums[i2];
            
            for (var i3 = i2 + 1; i3 < nums.length; i3++) {
                n3 = nums[i3];
                
                if (n1 + n2 + n3 === 2020) {
                    result.push({
                        n1: n1,
                        n2: n2,
                        n3: n3,
                    });
                }
                
            }
            
        }
        
    }

    return result;

};


var solutions = findThreeNumbers(input);

console.log("SOLUTIONS:");
console.log(solutions);


solutions.forEach(function(solution) {
    console.log(solution.n1 * solution.n2 * solution.n3);
});






