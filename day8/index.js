var fs = require("fs");


var content = fs.readFileSync("./input.txt", "utf8");

var input = content.split("\r\n");


// console.log(input);


var parseInput = function(input) {
    
    var recordset = input.map(function(line) {

        var parts = line.split(" ");
        return {
            action: parts[0],
            value: parseInt(parts[1]),
        };

    });
    recordset = recordset.filter(function(line) {
        return line.action.trim() !== "";
    });

    return recordset;

};

var code = parseInput(input);

// console.log(code);



var Machine = (function() {
    
    function Machine() {
        this.code = [];
        
        this.accumulator = 0;
        this.currentLine = 0;
        this.executedLines = {};
        this.logData = [];

        this.running = false;
        this.logActive = true;

    }

    Machine.prototype.loadCode = function(code) {
        this.code = code;
    };

    Machine.prototype.execLine = function(line) {
        if (!line) {
            return;
        }
        this.executedLines[this.currentLine] = 1;
        if (line.action === "jmp") {
            this.currentLine = this.currentLine + line.value;
        }
        if (line.action === "nop") {
            this.currentLine = this.currentLine + 1;
        }
        if (line.action === "acc") {
            this.accumulator = this.accumulator + line.value;
            this.currentLine = this.currentLine + 1;
        }
    };

    Machine.prototype.execCurrentLine = function() {
        var line = this.code[this.currentLine];
        if (this.logActive) {
            this.logData.push({
                accumulator: this.accumulator,
                currentLine: this.currentLine,
                line: line
            });
            // this.printStatus();
            // this.printLine(line);
        }
        this.execLine(line);
    };

    Machine.prototype.isAlredyExecutedLine = function(index) {
        return this.executedLines[index] !== undefined;
    };

    Machine.prototype.run = function() {
        if (!this.running) {
            return;
        }

        if (this.currentLine === this.code.length) {
            this.stop();
        }

        this.execCurrentLine();

        if (this.isAlredyExecutedLine(this.currentLine)) {
            this.stop();
        }

        this.run();
    };

    Machine.prototype.start = function() {
        this.running = true;
        this.run();
    };

    Machine.prototype.stop = function() {
        this.running = false;
    };

    Machine.prototype.printLine = function(line) {
        console.log("action: " + line.action + "; value: " + line.value);
    };

    Machine.prototype.printStatus = function() {
        console.log("current line: " + this.currentLine);
        console.log("accumulaltor : " + this.accumulator);
    };


    return Machine;

})();




/**
 * Part 1
 */


// var machine = new Machine();

// machine.loadCode(code);

// machine.start();

// // console.log(JSON.stringify(machine.logData));

// console.log(machine.logData[machine.logData.length-1]);




/**
 * Part 2
 */


var fixCode = function(code) {
    
    var results = [];

    code.forEach(function(line, index) {

        var actionChange = "";
        if (line.action === "nop") {
            actionChange = "jmp";
        }
        if (line.action === "jmp") {
            actionChange = "nop";
        }
        if (!actionChange) {
            return;
        }
    
        var codeToRun = code.slice();
        codeToRun[index] = {
            action: actionChange,
            value: code[index].value
        };
    
        var machine = new Machine();
    
        machine.loadCode(codeToRun);
    
        machine.start();
    
        var lastLog = machine.logData[machine.logData.length - 1];
    
        if (lastLog.currentLine === code.length) {
            results.push({
                index: index,
                lineFixed: codeToRun[index], 
                codeFixed: codeToRun,
                logData: machine.logData 
            });
        }
        
    });

    return results;

};


var results = fixCode(code);

console.log(results[0]);


