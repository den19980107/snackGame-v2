let textarea = document.getElementById('textarea');
let start = document.getElementById("start");
let i = 0;
let gobal = [];
textarea.style.width = "300px";
textarea.style.height = "300px";
textarea.style.resize = "none";
start.onclick = function () {
    let text = textarea.value;

    let move = getIndicesOf("move()", text, true, "move");
    let turnLeft = getIndicesOf("turnLeft()", text, true, "tl");
    let turnRight = getIndicesOf("turnRight()", text, true, "tr");
    let loop = getIndicesOf("loop(", text, true, "loop");
    let loopTime = [];
    let runtime = "";
    let startBlock = getIndicesOf("{", text, true, "startBlock");
    let startBlockPointer = 0;
    let endBlock = getIndicesOf("}", text, true, "endBlock");
    let endBlockPointer = 0;

    for (let i = 0; i < loop.length; i++) {
        let point = 5;
        while (text[loop[i].index + point] != ')') {
            runtime += text[loop[i].index + point];
            point++;
        }
        let loopInfo = {
            runtime: "",
            start: "",
            end: ""
        };
        loopInfo.runtime = runtime;
        loopInfo.start = startBlock[startBlockPointer].index;
        loopInfo.end = endBlock[endBlockPointer].index;
        loopTime.push(loopInfo);
        endBlockPointer++;
        startBlockPointer++;
        runtime = "";
    }
    let demands = [];
    demands.push(...move);
    demands.push(...turnLeft);
    demands.push(...turnRight);
    demands = demands.sort((a, b) => a.index - b.index).map((demands, index, array) => demands)
    console.log(loopTime);
    console.log(JSON.stringify(demands));
    let array = []
    let array2 = []
    for (let lc = 0; lc < loopTime.length; lc++) {
        console.log("lc:", lc);

        for (let l = 0; l < loopTime[lc].runtime; l++) {
            console.log("l:", l);
            for (let d = 0; d < demands.length; d++) {
                if (demands[d].index < loopTime[lc].end && demands[d].index > loopTime[lc].start) {
                    //console.log(demands[d]);
                    console.log("d:", d);
                    array.push(demands[d]);
                }
            }
            console.log("array = ", JSON.stringify(array));
        }

    }
    console.log(array);
    for (let i = 0; i < array.length; i++) {
        gobal.push(array[i].command);
    }
    console.log("gobal", gobal);



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