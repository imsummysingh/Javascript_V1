//game logic

const startGameBtn = document.getElementById('start-game-btn');

const ROCK='ROCK';
const PAPER='PAPER';
const SCISSORS='SCISSORS';
const DEFAULT_USER_CHOICE=ROCK;
const RESULT_DRAW='DRAW';
const RESULT_PLAYER_WINS='PLAYER_WINS';
const RESULT_COMPUTER_WINS='COMPUTER_WINS';

let gameIsRunnung = false;

const getPlayerChoice = ()=>{
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`,'').toUpperCase();
    if(selection!==ROCK && selection!==PAPER && selection!==SCISSORS){
        alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!!!`);
        return DEFAULT_USER_CHOICE;
    }
    return selection;
};

const getComputerChoice = ()=>{
    const randomValue = Math.random();
    if(randomValue<0.34){
        return ROCK;
    }else if(randomValue<0.67){
        return PAPER;
    }else{
        return SCISSORS;
    }
};

const getWinner=(cChoice, pChoice)=>{
    if(cChoice===pChoice){
        return RESULT_DRAW;
    }else if(cChoice===ROCK && pChoice===PAPER || cChoice===PAPER && pChoice===SCISSORS || cChoice===SCISSORS && pChoice===ROCK){
        return RESULT_PLAYER_WINS;
    }else{
        return RESULT_COMPUTER_WINS;
    }
};


startGameBtn.addEventListener('click',function(){
    if(gameIsRunnung){
        return;
    }
    gameIsRunnung=true;
    console.log('Game is starting...');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice);
    let message = `You picked: ${playerChoice} & computer picked: ${computerChoice}, therefore you `;
    if(winner===RESULT_DRAW){
        message=message + 'had a DRAW!!!';
    }else if(winner===RESULT_PLAYER_WINS){
        message=message + 'WON!!!';
    }else{
        message=message + 'LOST!!!';
    }
    alert(message);
    gameIsRunnung=false;
});






//using function as declaration
// function startGame(){
//     console.log('Game starts here!');
// }

//startGame();    //direct execution

//startGameBtn.addEventListener('click',startGame);   //indirect execution


// const person ={
//     greet: function greet(){
//         console.log('It is a method through object');
//     }
// }

// person.greet();


//using function as expression
// const start = function startGame(){
//     console.log('Using function as expression');
// }


//anonymous function-1
// const start = function(){
//     console.log('Using function as expression');
// };

// startGameBtn.addEventListener('click',start);

//Anonymous function-2
// startGameBtn.addEventListener('click',function(){
//     console.log('Anonymous function by direct calling from event listener');
// });





//ARROW FUNCTION -1 
// const getWinner=(cChoice, pChoice)=>{
    
//     return cChoice===pChoice?RESULT_DRAW : 
//            (cChoice===ROCK && pChoice===PAPER || cChoice===PAPER && pChoice===SCISSORS || cChoice===SCISSORS && pChoice===ROCK) ? RESULT_PLAYER_WINS : RESULT_COMPUTER_WINS;

// };

//ARROW FUNCTION -2 ------------can omit curly braces and return statement
// const getWinner=(cChoice, pChoice)=>cChoice===pChoice?RESULT_DRAW : 
//            (cChoice===ROCK && pChoice===PAPER || cChoice===PAPER && pChoice===SCISSORS || cChoice===SCISSORS && pChoice===ROCK) ? RESULT_PLAYER_WINS : RESULT_COMPUTER_WINS;

/*
    const add = (a,b)=>a+b;

    cont add = function(a,b){
        return a+b;
    }
*/



//Rest Parameter or Rest Operator---don't know how many argument we want to pass

//1. we can pass normal arguments
// const sumUp=(a,b,c,d)=>{
    
// }

// sumUp(1,2,3,4,5,6,7);


//2. We can pass argument as an array
// const sumUp=(numbers)=>{
//     let sum=0;
//     for(const num of numbers){
//         sum+=num;
//     }
//     return sum;
// }

// console.log(sumUp([1,2,3,4,5,6,7,8,9]));


//3. Rest
// const sumUp=(a,b,...numbers)=>{
//     let sum=0;
//     for(const num of numbers){
//         sum+=num;
//     }
//     return sum;
// }
    
// console.log(sumUp(1,2,3,4,5,6,7,8,9));
// console.log(sumUp(1,2,3,4,5,6,7,8,9,10,11,1,2,1,211,231,234));
// console.log(sumUp(1,2));


//4. For normal function, a different way with 'Arguments' and not with '...'
// const sumUp=function(){
//     let sum=0;
//     for(const num of arguments){
//         sum+=num;
//     }
//     return sum;
// }
    
// console.log(sumUp(1,2,3,4,5,6,7,8,9));
// console.log(sumUp(1,2,3,4,5,6,7,8,9,10,11,1,2,1,211,231,234));
// console.log(sumUp(1,2));    





/*callback function */

// const sumUp = (resultHandler,...numbers)=>{
//     let sum=0;
//     for(const num of numbers){
//         sum+=num;
//     }
//     resultHandler(sum,'The result after adding all number is');
// }

// const subUp = (resultHandler,...numbers)=>{
//     let sum=0;
//     for(const num of numbers){
//         sum-=num;
//     }
//     resultHandler(sum);
// }

// sumUp(showResult,1,2,3,4,5,6,7,8,9);
// subUp(showResult,1,2,3,4,5,6,7,8,9);


//bind()

const combine = (resultHandler,operation,...numbers)=>{
    let sum=0;
    for(const num of numbers){
        if(operation==='ADD'){
            sum+=num;
        }else{
            sum-=num;
        }        
    }
    // resultHandler(sum,operation==='ADD'?'The sum of all number is: ':'The sub of all number is: ');
    resultHandler(sum);
}


const showResult = (messageText, result)=>{
    alert(messageText+' '+result);
};

combine(showResult.bind(this,'The result after adding all number is: '),'ADD',1,2,3,4,5,6,7,8,9);
combine(showResult.call(),'ADD',1,2,3,4,5,6,7,8,9);
combine(showResult.bind(this,'The result after adding all number is: '),'ADD',1,2,3,4,5,6,7,8,9);
combine(showResult.bind(this,'The result after subtracting all number is: '),'SUB',1,2,3,4,5,6,7,8,9);