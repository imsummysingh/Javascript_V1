const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE=17;
const MONSTER_ATTACK_VALUE=14;
const HEAL_VALUE=20;

const MODE_ATTACK = 'ATTACK'; //MODE_ATTACK=0
const MODE_STRONG_ATTACK='STRONG_ATTACK'; //MODE_STRONG_ATTACK=1
const LOG_EVENT_PLAYER_ATTACK='PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK='PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';

const enteredValue = prompt('Maximum life for You & Monster.','100');

//let chosenMaxLife = 100;
let chosenMaxLife = parseInt(enteredValue);
let battleLog=[];

if(isNaN(chosenMaxLife) || chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealth=chosenMaxLife;
let currentPlayerHealth=chosenMaxLife;
let hasBonusLife=true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth){
    let logEntry={
        event:ev,
        value:val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    switch(ev){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target='MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry={
                        event:ev,
                        value:val,
                        target:'MONSTER',
                        finalMonsterHealth: monsterHealth,
                        finalPlayerHealth: playerHealth
                    };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry={
                        event:ev,
                        value:val,
                        target:'PLAYER',
                        finalMonsterHealth: monsterHealth,
                        finalPlayerHealth: playerHealth
                    };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry={
                        event:ev,
                        value:val,
                        target:'PLAYER',
                        finalMonsterHealth: monsterHealth,
                        finalPlayerHealth: playerHealth
                    };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry={
                        event:ev,
                        value:val,
                        finalMonsterHealth: monsterHealth,
                        finalPlayerHealth: playerHealth
                    };
            break;
        default:
            logEntry={};
        

    }

    // if(ev===LOG_EVENT_PLAYER_ATTACK){
    //     logEntry.target='MONSTER';
    // }else if(ev===LOG_EVENT_PLAYER_STRONG_ATTACK){
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         target:'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }else if(ev===LOG_EVENT_MONSTER_ATTACK){
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         target:'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }else if(ev===LOG_EVENT_PLAYER_HEAL){
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         target:'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }else if(ev===LOG_EVENT_GAME_OVER){
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    battleLog.push(logEntry);
}

function reset(){
    currentMonsterHealth=chosenMaxLife;
    currentPlayerHealth=chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    const initialPlayerHealth=currentPlayerHealth;
    const playerDamage=dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth-=playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if(currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealth=initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Bonus life used');
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You Won!');
        //reset();
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
    }else if(currentPlayerHealth <=0 && currentMonsterHealth > 0){
        alert('You Lost!');
        //reset();
        writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert('You have a Draw!');
        //reset();
        writeToLog(LOG_EVENT_GAME_OVER, 'GAME DRAW', currentMonsterHealth, currentPlayerHealth);
    }

    if(currentMonsterHealth<=0||currentPlayerHealth<=0){
        reset();
    }
}

function attackMonster(mode){
    // let maxDamage;
    // let logEvent;
    // if(mode===MODE_ATTACK){
    //     maxDamage=ATTACK_VALUE;
    //     logEvent=LOG_EVENT_PLAYER_ATTACK;
    // }else if(mode===MODE_STRONG_ATTACK){
    //     maxDamage=STRONG_ATTACK_VALUE;
    //     logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }

    const maxDamage = mode === MODE_ATTACK? ATTACK_VALUE:STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK? LOG_EVENT_PLAYER_ATTACK:LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth-=damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth>=chosenMaxLife-HEAL_VALUE){
        alert("You can't heal more than your initial health.");
        healValue=chosenMaxLife-currentPlayerHealth;
    }else{
        healValue=HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth+=HEAL_VALUE;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler(){

    //for loop

    // for(let i=0;i<3;i++){
    //     console.log('-----------------');
    // }
    // for(let i=10;i>0;i--){
    //     console.log(i);
    // }

    //for of loop
    // const arr = [1,2,3,4,5,6,7,8,9];
    // for(const i of arr){
    //     console.log(i);
    // }


    //for in loop
    // forLog={
    //     id:86,
    //     name:"summy",
    //     job:"IT",
    //     age:25
    // }

    // for(const k in forLog){
    //     console.log(k); //id, name, job,age
    //     //console.log(forLog[k]);   //86,summy,IT,25
    // }


    console.log(battleLog);
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);