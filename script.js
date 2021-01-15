// Global variables and constants definition

const operations = {
    // describes the functions used by the keydown event listener
    "backspace": dlt,
    "escape": clr,
    "enter": displayEquals,
    "r": () => { return uniqueStr("*0.01"); },
    "z": changeSignal,
    "*": () => { return mathOperations("*"); },
    "-": () => { return mathOperations("-"); },
    "+": () => { return mathOperations("+"); },
    "/": () => { return mathOperations("/"); },
    ".": () => { return unique(".") }
};

var signalChanged = false;

function isNumeric(str) {
    // tests if str is only composed by digits
    return /\d/gi.test(str);
}

function numbers(id) {
    // appends numbers to the calculation area
    if (isNumeric(id)) document.querySelector("#calc").innerText += id;
}

addEventListener("keydown", function addNumericKeyBoardInput(evt) {
    // listens keyboard inputs
    if (isNumeric(evt.key)) document.querySelector("#calc").innerText += evt.key;
    if (operations.hasOwnProperty(evt.key.toLowerCase())) operations[evt.key.toLowerCase()]();
});

function mathOperations(op) {
    // appends math operators
    const possibleOp = ["+", "-", "*", "/"];
    const lastChar = document.querySelector("#calc")
        .innerText.charAt(document.querySelector("#calc")
            .innerText.length - 1);

    if (possibleOp.includes(op) && possibleOp.includes(lastChar) === false) {
        document.querySelector("#calc").innerText += op;
    }
}

function makeArr() {
    // returns an array composed only by numbers from calculation area
    return document.querySelector("#calc").innerText.split(/\+|\-|\*|\//g);
}
function unique(op) {
    // appends a char once. E.g. adds the decimal point only one time for one number
    const calcArr = makeArr();
    if (!calcArr[calcArr.length - 1].includes(op)) document.querySelector("#calc").innerText += op;
}

function uniqueStr(str) {
    // same as unique but with more complex strings
    const calcArea = document.querySelector("#calc").innerText
    if (calcArea.substr(calcArea.length - str.length, calcArea.length - 1) != str) {
        document.querySelector("#calc").innerText += str;
        displayEquals();
    }
}

function changeSignal() {
    // changes the signal from the current number
    const calcArr = makeArr().reverse();
    var calcArea = document.querySelector("#calc");

    if (calcArea.textContent.length > 0) {
        signalChanged === false
            ? (calcArea.textContent = calcArea.textContent.replace(calcArr[0], '-' + calcArr[0]),
                signalChanged = true)
            : (calcArea.textContent = calcArea.textContent.replace(/\-\d{1,}/, calcArr[0]),
                signalChanged = false)
    }
}

function displayEquals() {
    // displays the result
    document.querySelector("#results").innerText = Function(`'use strict'; return (${document.querySelector("#calc").innerText})`)();
}

function clr() {
    // clears the calculation area
    document.querySelector("#calc").innerText = "";
    document.querySelector("#results").innerText = 0;
}

function dlt() {
    // deletes last char
    var content = document.querySelector("#calc");
    content.innerText = content.innerText.substr(0, content.innerText.length - 1);
}

// var re1 = document.getElementById("output-value");
// var re2 = document.getElementById("history-value");
// var output = document.getElementById("lsoutput");
// var btnsave = document.getElementById("ins");
// var btn1 = document.getElementById("=");
// myStorage = window.localStorage;

// btn1.onclick = function()
// {
//   console.log(re1);
//   console.log(re2); 

//   myStorage.setItem('output',re1.innerText);
//   myStorage.setItem('value1',re2.innerText);
  
// }

// btnsave.onclick = function()
// {
//   var out = myStorage.getItem('output');
//   var out1 = myStorage.getItem('value1');
//   output.innerHTML += `Number1 : ${out1}<br>`;
//   output.innerHTML += `Output : ${out}<br>`;
 
// }

// var number = document.getElementsByClassName("btn");
// for(var i =0;i<number.length;i++){
// 	number[i].addEventListener('click',function(){
// 		var output=reverseNumberFormat(getOutput());
// 		if(output!=NaN){
// 			output=output+this.id;
// 			printOutput(output);
// 		}
// 	});
// }

// if(localStorage.getItem('data')!=null){
//                         var x=JSON.parse(JSON.stringify(localStorage.getItem('data')));
//                         document.getElementById("local").innerHTML = x;
//                         console.log('x', JSON.parse(x));
//                     }