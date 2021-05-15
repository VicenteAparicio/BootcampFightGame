// MOVEMENT FIGHTER
const movementX = (x, fighters) => {
    let fighter1 = document.getElementById(fighters); //obtengo posición del div con id fighter 
    fighter1.style.left = x +'%'; //añado el sumatorio de la variable al style left de la posición del div con id 
};

let xPosR=66;
let xPosL=0;
let velX=33;

const movementAndAttack = (elEvento) => {
    let evento = window.event || elEvento; //almacena info de la tecla
    if (team2[1].life > 0 && team1[1].life > 0){
        switch(evento.keyCode){

            case 39: //DERECHA LEFT FLECHA DERECHA
                if (xPosR<59){
                    xPosR+=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosR, 'rightFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 37: //IZQUIERDA LEFT FLECHA IZQUIERDA
                if (xPosR>0){
                    xPosR-=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosR, 'rightFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 66: // DERECHA RIGHT
                if (xPosL<59){
                    xPosL+=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosL, 'leftFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 86: // IZQUIERDA RIGHT
                if (xPosL>0){
                    xPosL-=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosL, 'leftFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 68: // LIGHT LEFT ATTACK "D"
                fighting('leftAttack');
                break;

            case 80: // LIGHT RIGHT ATTACK "P"
                fighting('rightAttack'); 
                break;

            case 83: // LEFT DEFENSE "S"
                fighting('leftDefenseOn');
                break;

            case 79: // RIGHT DEFENSE "O"
                fighting('rightDefenseOn');
                break;
        }
    }
}

const stopAction = (elEvento2) => {
    let eventoDef = window.event || elEvento2; //almacena info de la tecla
    if (team2[1].life > 0 && team1[1].life > 0){
        switch(eventoDef.keyCode){
        //     case 39: //DERECHA LEFT FLECHA DERECHA
        //     if (xPosR<59){
        //         xPosR+=velX;
        //     }
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     movementX(xPosR, 'rightFighter');
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     break;

        // case 37: //IZQUIERDA LEFT FLECHA IZQUIERDA
        //     if (xPosR>0){
        //         xPosR-=velX;
        //     }
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     movementX(xPosR, 'rightFighter');
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     break;

        // case 66: // DERECHA RIGHT "B"
        //     if (xPosL<59){
        //         xPosL+=velX;
        //     }
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     movementX(xPosL, 'leftFighter');
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     break;

        // case 86: // IZQUIERDA RIGHT "V"
        //     if (xPosL>0){
        //         xPosL-=velX;
        //     }
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     movementX(xPosL, 'leftFighter');
        //     console.log(`Posición R ${xPosR} y l  ${xPosL}`)
        //     break;

        case 68: // LIGHT LEFT ATTACK "D"
            fighting('leftAttackFrameOff');
            break;

        case 80: // LIGHT RIGHT ATTACK "P"
            fighting('rightAttackFrameOff'); 
            break;
        
        case 83: // LEFT DEFENSE "S"
            fighting('leftDefenseOff');
            break;

        case 79: // RIGHT DEFENSE "O"
            fighting('rightDefenseOff');
            break;
        }
    }
}



function systemOn(){
    document.onkeydown = movementAndAttack; //capta la pulsación de la tecla y llama a la función pusher
    document.onkeyup = stopAction;
};
systemOn();


const changeFase = (destiny) => {
    let arrayFaseId = [];
    let arrayFase = document.getElementsByTagName('section');
    for (let i = 0; i <=arrayFase.length-1; i++){
        arrayFaseId.push(arrayFase[i].id);
    }
    arrayFaseFade = arrayFaseId.filter(val => !destiny.includes(val));
    setTimeout(() => {document.getElementById(destiny).style.display = "flex";}, 100);
    
    for(let _fase of arrayFaseFade){
        document.getElementById(_fase).style.display = "none";
    }
}

/* DRAG AND DROP FUNCTION */
let validate = 1;
const allowDrop = (ev) => {
    ev.preventDefault();
}

const drag = (ev) => {
    ev.dataTransfer.setData("id", ev.target.id); //STORE id from target fighter to 'id' key
}

const drop = (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(data));

    /* CALL TO CHOOSE FIGHTER FUNCTION WITH ID AND TEAM PARAMETER */ 
    let teamSelect = ev.path[1].id;
    console.log('Fighter ID '+ data)
    console.log('Which team you drop? '+ teamSelect)
    chooseFighter(data, teamSelect)

    /* PREVENT OVERLAP */
    ev.target.ondrop = "";
}

/* CONSTRUCTOR FIGHTERS */
class Fighter{
    constructor(id, colour, lordName, attack, defense, luck){
        this.id = id;
        this.colour = colour;
        this.lordName = lordName;
        this.attack = attack;
        this.defense = defense;
        this.luck = luck;
        this.life = 100;
    };

    hit(enemy){
        enemy.life-=Math.round(this.attack - (enemy.defense/((Math.random()*this.luck)+1)));
    }
}

let player1 = new Fighter(1, 'Grey', 'Luphius McNoland' , 9, 4, 5);
let player2 = new Fighter(2, 'Blue', 'Drogjard Burnlands', 8, 5, 6);
let player3 = new Fighter(3, 'Red', 'Thenirk Morrwalder', 7, 6, 4) ;
let player4 = new Fighter(4, 'Green', 'Jonmark Scarrow', 6, 7, 6);
let player5 = new Fighter(5, 'Yellow', 'Alisthoir J.Leffang', 7, 5, 5);
let player6 = new Fighter(6, 'Orange', 'Urrow Temphewar', 8, 3, 6);


let allPlayers = {
    '1' : player1,
    '2' : player2,
    '3' : player3,
    '4' : player4,
    '5' : player5,
    '6' : player6
};

/* ASIGNATION TEAMS */
let team1 = [];
let team2 = [];

const chooseFighter = (fighter, team) => { 
    if (team=='team1' && team1.length<2){
        team1.push(allPlayers[fighter]);
    } else if (team == 'team2' && team2.length<2) {
        team2.push(allPlayers[fighter]);
    }
    if (team1.length==2 && team2.length==2){
        console.log(`El team 1 son: ${team1[0].lordName} y ${team1[1].lordName}`);
        console.log(`El team 2 son: ${team2[0].lordName} y ${team2[1].lordName}`);
        allowFight();
    }
    document.getElementById(fighter).draggable = false;
};
const allowFight = () => {
    document.getElementById('fightButton').innerHTML = `<span onclick="changeFase('fightScreen'), placeFighter(0)">GO FIGHT</span>`;
}

/* ASIGNATION CHARACTER TO FIGHT SCENE */ 
let leftF;
let rightF;
let deadF;
const placeFighter = (index) => {
    leftF = team1[index];
    rightF = team2[index];

    document.getElementById('leftFighter').innerHTML = `<img id="${leftF.id}" src="assets/fighters/${leftF.colour}GuardGif.gif" class="characterPic" alt="Player${leftF.id}">`;
    document.getElementById('rightFighter').innerHTML = `<img id="${rightF.id}" src="assets/fighters/${rightF.colour}GuardGif.gif" class="characterPic" alt="Player${rightF.id}">`; 
}
const changeDeadFighterLeft = (index, positionF) => {
    deadF = team1[index];
    document.getElementById(positionF).innerHTML = "";
    document.getElementById(positionF).innerHTML = `<img id="${deadF.id}" src="assets/fighters/${deadF.colour}GuardGif.gif" class="characterPic" alt="Player${deadF.id}">`;
}
const changeDeadFighterRight = (index, positionF) => {
    dead = team2[index];
    document.getElementById(positionF).innerHTML = "";
    document.getElementById(positionF).innerHTML = `<img id="${dead.id}" src="assets/fighters/${dead.colour}GuardGif.gif" class="characterPic" alt="Player${dead.id}">`;
}
const attackFrameOn = (fighter, position) => {
    document.getElementById(position).innerHTML = `<img id="${fighter.id}" src="assets/fighters/${fighter.colour}Attack.png" class="characterPic" alt="Player${fighter.id}">`;
}
const attackFrameOff = (fighter, position) => {
    document.getElementById(position).innerHTML = `<img id="${fighter.id}" src="assets/fighters/${fighter.colour}GuardGif.gif" class="characterPic" alt="Player${fighter.id}">`;
}
const defenseFrameOn = (fighter, position) => {
    document.getElementById(position).innerHTML = `<img id="${fighter.id}" src="assets/fighters/${fighter.colour}DefGif.gif" class="characterPic" alt="Player${fighter.id}">`;
}
const defenseFrameOff = (fighter, position) => {
    document.getElementById(position).innerHTML = `<img id="${fighter.id}" src="assets/fighters/${fighter.colour}GuardGif.gif" class="characterPic" alt="Player${fighter.id}">`;
}



/* FIGHT ACTION */
let countLeft=0;
let countRight=0;
let defenseLeft=0;
let defenseRight=0;
const fighting = (action) => {
    p1 = team1[countLeft];
    p2 = team2[countRight];

    let fighterLeft = document.getElementById('leftFighter');
    let posXLeft;
    posXLeft = fighterLeft.style.left;

    let fighterRight = document.getElementById('rightFighter');
    let posXRight;
    posXRight = fighterRight.style.left;

    if (action == 'leftAttackFrameOff'){
        if (defenseLeft==0){
            attackFrameOff(p1, 'leftFighter');
        }
    }

    if (action == 'rightAttackFrameOff'){
        if (defenseRight==0){
            attackFrameOff(p2, 'rightFighter');
        }
    }

    if (action == 'leftDefenseOff'){
        defenseLeft=0;
        defenseFrameOff(p1, 'leftFighter');

    }
    if (action == 'rightDefenseOff'){
        defenseRight=0;
        defenseFrameOff(p2, 'rightFighter');
        
    }
    if (action == 'leftDefenseOn'){
        defenseLeft=1;
        console.log('Defense Left '+defenseLeft);
        defenseFrameOn(p1, 'leftFighter');
        
    }
    if (action == 'rightDefenseOn'){
        defenseRight=1;
        console.log('Defense Right ' +defenseRight);
        defenseFrameOn(p2, 'rightFighter');
        
    }

    if (action == 'leftAttack'){
        if (defenseLeft==0){
            attackFrameOn(p1, 'leftFighter');
            if (posXLeft=='66%' && posXRight=='0%' && defenseRight==0){
                p1.hit(p2);
                bar(p2, 'lifeBarRight');
            }    
        }
    }
    if (action == 'rightAttack'){
        if (defenseRight==0){
            attackFrameOn(p2, 'rightFighter');
            if (posXRight=='0%' && posXLeft=='66%' && defenseLeft==0){
                p2.hit(p1);
                bar(p1, 'lifeBarLeft');
            }
        }
    }
    


    console.log(`${p1.lordName} tiene: ${p1.life} de vida`);
    console.log(`${p2.lordName} tiene ${p2.life} de vida`);

    if (p1.life<=0){
        if(countLeft<1){
            console.log(`Este combate lo ha ganado ${p2.lordName}`);
            countLeft+=1;
            changeDeadFighterLeft(countLeft, 'leftFighter');
            document.getElementById('lifeBarLeft').style.width = '100%';
        } else {
            console.log(`Este combate lo ha ganado ${p2.lordName}`);
            console.log(`Victoria del Team 2!!`);
            setTimeout(() => {happy('TEAM 2');}, 2000);    
        }
    }
    if (p2.life<=0){
        if(countRight<1){
            console.log(`Este combate lo ha ganado ${p1.lordName}`);
            countRight+=1;
            changeDeadFighterRight(countRight, 'rightFighter');
            document.getElementById('lifeBarRight').style.width = '100%';
        } else {
            console.log(`Este combate lo ha ganado ${p1.lordName}`);
            console.log(`Victoria del Team 1!!`);
            setTimeout(() => {happy('TEAM 1');}, 2000);      
        }
    }
}

const bar = (damagedFighter, barFighter) =>{
    damagedFighter.life>0 ?
    document.getElementById(barFighter).style.width = damagedFighter.life +'%'
    : document.getElementById(barFighter).style.width = 0;
}

/* CONGRATULATIONS */
const happy = (winner) => {
    changeFase('victoryScreen');
    document.getElementById('winnerBox').innerHTML = `<p>HA GANADO EL ${winner}</p>`;
    setTimeout(() => {document.getElementById('reset').innerHTML = `<p onclick="reset()">PLAY AGAIN?</p>`;}, 2000);
}
/* PLAY AGAIN */
const reset = () => {
    window.location.reload();
}


