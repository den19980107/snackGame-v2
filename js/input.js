let textarea = document.getElementById('textarea');
let start = document.getElementById("start");
let i = 0;
let gobal = [];
textarea.style.width = "300px";
textarea.style.height = "300px";
textarea.style.resize = "none";
let languageSeletor = document.getElementById('select-language');
languageSeletor.onchange = function () {
    switch (languageSeletor.value) {
        case "c":
            textarea.innerHTML = `//please use c to wirte this code
//functions:
//  move();
//  turnR();
//  turnL();
//=======start=======
include <stdio.h>
    int main() {
            
        return 0;
    }
            
`
            break;
        case "cpp":
            textarea.innerHTML = `//please use c++ to wirte this code
//functions:
//  move();
//  turnR();
//  turnL();
//=======start=======
#include <iostream>
using namespace std;
    int main() {

        return 0;
    }
`
            break;
        case "javascript":
            textarea.innerHTML = `//please use javascript to wirte this code
//functions:
//  move();
//  turnR();
//  turnL();
//=======start=======
`
            break;
        case "python3":
            textarea.innerHTML = `#please use python3 to wirte this code
#functions:
#  move()
#  turnR()
#  turnL()
#=======start=======
`
            break;
    }
}





start.onclick = function () {
    let text = textarea.value;
    // let move = getIndicesOf("move()", text, true, "move");
    // let turnLeft = getIndicesOf("turnLeft()", text, true, "tl");
    // let turnRight = getIndicesOf("turnRight()", text, true, "tr");
    // let loop = getIndicesOf("loop(", text, true, "loop");
    // let loopTime = [];
    // let runtime = "";
    // let startBlock = getIndicesOf("{", text, true, "startBlock");
    // let startBlockPointer = 0;
    // let endBlock = getIndicesOf("}", text, true, "endBlock");
    // let endBlockPointer = 0;


    //new


    let script = textarea.value;
    let selectLanguage = document.getElementById("select-language");

    var scriptText = insertOurCode(script, selectLanguage.value);


    var scriptData = {
        script: scriptText,
        language: selectLanguage.value
    }
    console.log(scriptData);

    var socket = io();
    socket.emit('script', scriptData);
    socket.on('answer', function (obj) {
        console.log(obj);
        //TODO 
        //here will get a array of what to do
        //execute that make snake move
        output = obj.statusCode.body.output.split(" ");
        gobal = output;
        console.log(gobal);

    })

    //new

    // for (let i = 0; i < loop.length; i++) {
    //     let point = 5;
    //     while (text[loop[i].index + point] != ')') {
    //         runtime += text[loop[i].index + point];
    //         point++;
    //     }
    //     let loopInfo = {
    //         runtime: "",
    //         start: "",
    //         end: ""
    //     };
    //     loopInfo.runtime = runtime;
    //     loopInfo.start = startBlock[startBlockPointer].index;
    //     loopInfo.end = endBlock[endBlockPointer].index;
    //     loopTime.push(loopInfo);
    //     endBlockPointer++;
    //     startBlockPointer++;
    //     runtime = "";
    // }
    // let demands = [];
    // demands.push(...move);
    // demands.push(...turnLeft);
    // demands.push(...turnRight);
    // demands = demands.sort((a, b) => a.index - b.index).map((demands, index, array) => demands)
    // console.log(loopTime);
    // console.log(JSON.stringify(demands));
    // let array = []
    // let array2 = []
    // for (let lc = 0; lc < loopTime.length; lc++) {
    //     console.log("lc:", lc);

    //     for (let l = 0; l < loopTime[lc].runtime; l++) {
    //         console.log("l:", l);
    //         for (let d = 0; d < demands.length; d++) {
    //             if (demands[d].index < loopTime[lc].end && demands[d].index > loopTime[lc].start) {
    //                 //console.log(demands[d]);
    //                 console.log("d:", d);
    //                 array.push(demands[d]);
    //             }
    //         }
    //         console.log("array = ", JSON.stringify(array));
    //     }

    // }
    // console.log(array);
    // for (let i = 0; i < array.length; i++) {
    //     gobal.push(array[i].command);
    // }
    // console.log("gobal", gobal);



}

function insertOurCode(script, language) {
    switch (language) {
        case "cpp":
            position = script.indexOf('int main()');
            console.log("position = " + position);

            var insertText = `
void move() {
    cout << "move ";
}
void turnR() {
    cout << "tr ";
}
void turnL() {
    cout << "tl ";
}
`
            script = [script.slice(0, position), insertText, script.slice(position)].join('');
            console.log(script);
            return (script);
            break;
        case "c":
            position = script.indexOf('int main()');
            console.log("position = " + position);

            var insertText = `
void move() {
    printf("move");
}
void turnR() {
    printf("tr");
}
void turnL() {
    printf("tl");
}
`
            script = [script.slice(0, position), insertText, script.slice(position)].join('');
            console.log(script);
            return (script);
            break;
        case "javascript":

            break;
        case "python3":
            var insertText = `
def move():
    print("move ", end = "")
def turnR():
    print("tr ", end = "")
def turnL():
    print("tl ", end = "")
`
            script = [script.slice(0, 0), insertText, script.slice(0)].join('');
            console.log(script);
            return (script);
            break;
    }
}


function readCommand() {
    if (i == gobal.length) {
        i = 0;
        gobal = [];
    }
    if (gobal.length > 0) {
        switch (gobal[i]) {
            case "move":
                snake.move();

                break;

            case "tr":
                snake.turnRight();
                break;

            case "tl":
                snake.turnLeft();
                break;
        }
        i++;
    }

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function getIndicesOf(searchStr, str, caseSensitive, command) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0,
        index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push({
            index: index,
            command: command
        });
        startIndex = index + searchStrLen;
    }
    return indices;
}



//為了讓textarea - script 按下tab的時候不會自己切去另一個textarea
textarea.onkeydown = function (e) {
    if (e.keyCode == 9) {
        insertAtCursor('    ');
        return false;
    }
}

function insertAtCursor(myValue) {
    myField = document.getElementById("textarea");
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) +
            myValue +
            myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}