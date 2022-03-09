const defaultResult=0;
let currentResult = defaultResult;
let logEntries = [];

// function add(){
//     currentResult = currentResult + parseInt(userInput.value);
//     //currentResult = currentResult + +userInput.value;
//     outputResult(currentResult,'');
// }

function getUserNumberInput(){
    return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber){
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult,calcDescription);
}

function writeToLog(operationIdentifier, prevResult, operationNumber, newResult){
    const logEntry = {
        operation: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

// function add(){
//     const enteredNumber = getUserNumberInput();
//     const calcDescription = `${currentResult} + ${enteredNumber}`;

//     currentResult=currentResult+enteredNumber;
//     outputResult(currentResult,calcDescription);
// }

function add(){
    const enteredNumber = getUserNumberInput();
    const initialResult=currentResult;
    currentResult=currentResult+enteredNumber;
    createAndWriteOutput('+',initialResult,enteredNumber);
    writeToLog('ADD', initialResult, enteredNumber,currentResult);

    //logEntries = [enteredNumber];
    // logEntries.push(enteredNumber);
    // console.log(logEntries);

    // const logEntry = {
    //     operation: 'ADD',
    //     prevResult: initialResult,
    //     number: enteredNumber,
    //     result: currentResult
    // };

    // logEntries.push(logEntry);
    // console.log(logEntries);
}

function subtract(){
    const enteredNumber = getUserNumberInput();
    const initialResult=currentResult;
    currentResult=currentResult-enteredNumber;
    createAndWriteOutput('-',initialResult,enteredNumber);
    writeToLog('SUBTRACT', initialResult, enteredNumber,currentResult);
}

function multiply(){
    const enteredNumber = getUserNumberInput();
    const initialResult=currentResult;
    currentResult=currentResult*enteredNumber;
    createAndWriteOutput('*',initialResult,enteredNumber);
    writeToLog('MULTIPLY', initialResult, enteredNumber,currentResult);
}

function divide(){
    const enteredNumber = getUserNumberInput();
    const initialResult=currentResult;
    currentResult=currentResult/enteredNumber;
    createAndWriteOutput('/',initialResult,enteredNumber);
    writeToLog('DIVIDE', initialResult, enteredNumber,currentResult);
}

addBtn.addEventListener('click',add);
subtractBtn.addEventListener('click',subtract);
multiplyBtn.addEventListener('click',multiply);
divideBtn.addEventListener('click',divide);
