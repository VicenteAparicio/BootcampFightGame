// MOVEMENT FIGHTER
let xPos=66;
let xPosB=0;
// let y_pos=0;

let velX=33;
// let velY=1;
function movementX(x, fighters){
    let fighter1 = document.getElementById(fighters); //obtengo posición del div con id fighter 
    fighter1.style.left = x +'%'; //añado el sumatorio de la variable al style left de la posición del div con id 
};
// function movementY(y){
//     let fighter = document.getElementById('fighter');    
//     fighter.style.top=y+'em';
// }

// let sizeX = 100;
// let sizeY = 40;

function pusher (elEvento){
    let evento = window.event || elEvento; //almacena info de la tecla
    // let stromboly = document.getElementById('topScene');
    // stromboly.style.width = sizeX +'%';
    // stromboly.style.height = sizeY +'em';

    switch(evento.keyCode){
        // case 13:
        //     changeFase('chooseF');
        //     break;
        case 39: //DERECHA LEFT FLECHA DERECHA
            if (xPos<59){
                xPos+=velX;
            }
            movementX(xPos, 'rightFighter');
            break;
        case 37: //IZQUIERDA LEFT FLECHA IZQUIERDA
            if (xPos>0){
                xPos-=velX;
            }
            movementX(xPos, 'rightFighter');
            break;
        case 66: //DERECHA RIGHT
            if (xPosB<59){
                xPosB+=velX;
            }
            movementX(xPosB, 'leftFighter');
            break;
        case 86: //IZQUEIRDA RIGHT
            if (xPosB>0){
                xPosB-=velX;
            }
            movementX(xPosB, 'leftFighter');
            break;
        case 68:
            if (team2[1].vida > 0){
                fighting('rightAttack');
            }
            break;
        case 80:
            if (team1[1].vida > 0){
                fighting('leftAttack'); 
            }
            break;
    }
};

const validationPush = () => {
    let validateScreen = document.getElementById('fightScreen');
    return validateScreen;
}

function systemOn(){
    document.onkeydown = pusher; //capta la pulsación de la tecla y llama a la función pusher
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
    ev.target.ondrop="";
}

/* CONSTRUCTOR FIGHTERS */
class Fighter{
    constructor(id, nombre, ataque, defensa, velocidad, suerte){
        this.id = id;
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        this.velocidad = velocidad;
        this.suerte = suerte;
        this.vida = 60;
    };

    hit(enemy){
        enemy.vida-=Math.round(this.ataque - (enemy.defensa/((Math.random()*this.suerte)+1)));
    }
}

let player1 = new Fighter(1, 'Blue', 9, 4, 6, 5);
let player2 = new Fighter(2, 'Darksaid', 8, 5, 5, 6);
let player3 = new Fighter(3, 'Foxel', 7, 6, 7, 8) ;
let player4 = new Fighter(4, 'Page', 6, 6, 6, 5);


let allPlayers = {
    '1' : player1,
    '2' : player2,
    '3' : player3,
    '4' : player4
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
        console.log(`El team 1 son: ${team1[0].nombre} y ${team1[1].nombre}`);
        console.log(`El team 2 son: ${team2[0].nombre} y ${team2[1].nombre}`);
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

    document.getElementById('leftFighter').innerHTML = `<img id="${leftF.id}" src="img/${leftF.nombre}.png" class="characterPic" alt="Player${leftF.id}">`;
    document.getElementById('bottomFighter').innerHTML = `<img id="${rightF.id}" src="img/${rightF.nombre}.png" class="characterPic" alt="Player${rightF.id}">`; 
}
const changeDeadFighterLeft = (index, positionF) => {
    deadF = team1[index];
    document.getElementById(positionF).innerHTML = "";
    document.getElementById(positionF).innerHTML = `<img id="${deadF.id}" src="img/${deadF.nombre}.png" class="characterPic" alt="Player${deadF.id}">`;
}
const changeDeadFighterRight = (index, positionF) => {
    dead = team2[index];
    document.getElementById(positionF).innerHTML = "";
    document.getElementById(positionF).innerHTML = `<img id="${dead.id}" src="img/${dead.nombre}.png" class="characterPic" alt="Player${dead.id}">`;
}

/* FIGHT ACTION */
let countLeft=0;
let countRight=0;
const fighting = (action) => {
    p1 = team1[countLeft];
    p2 = team2[countRight];

    let fighterLeft = document.getElementById('leftFighter');
    let posXLeft = 0;
    posXLeft = fighterLeft.style.left;

    let fighterRight = document.getElementById('rightFighter');
    let posXRight = 0;
    posXRight = fighterRight.style.left;

    if (action == 'leftAttack'){
        if (posXLeft=='66%'){
            p1.hit(p2);
            bar(p2, 'lifeBarLeft')
        }
    }
    if (action == 'rightAttack'){
        if (posXTop==posXBot){
            p2.hit(p1);
            bar(p1, 'lifeBarRight')
        }
    }

    console.log(`${p1.nombre} tiene: ${p1.vida} de vida`);
    console.log(`${p2.nombre} tiene ${p2.vida} de vida`);

    if (p1.vida<=0){
        if(countLeft<1){
            console.log(`Este combate lo ha ganado ${p2.nombre}`);
            countLeft+=1;
            changeDeadFighterLeft(countLeft, 'leftFighter');
            document.getElementById('lifeBarLeft').style.width = '100%';
        } else {
            console.log(`Este combate lo ha ganado ${p2.nombre}`);
            console.log(`Victoria del Team 2!!`);
            setTimeout(() => {happy('TEAM 2');}, 3000);    
        }
    }
    if (p2.vida<=0){
        if(countRight<1){
            console.log(`Este combate lo ha ganado ${p1.nombre}`);
            countRight+=1;
            changeDeadFighterRight(countLeft, 'rightFighter');
            document.getElementById('lifeBarRight').style.width = '100%';
        } else {
            console.log(`Este combate lo ha ganado ${p1.nombre}`);
            console.log(`Victoria del Team 1!!`);
            setTimeout(() => {happy('TEAM 1');}, 3000);      
        }
    }
}

const bar = (damagedFighter, barFighter) =>{
    damagedFighter.vida>0 ?
    document.getElementById(barFighter).style.width = damagedFighter.vida+'em'
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


