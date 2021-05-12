// MOVEMENT FIGHTER
let x_pos=0;
let y_pos=0;

let velX=1;
let velY=1;
function movementX(x){
    let fighter = document.getElementById('fighter'); //obtengo posición del div con id fighter 
    fighter.style.left=x+'em'; //añado el sumatorio de la variable al style left de la posición del div con id 
}
function movementY(y){
    let fighter = document.getElementById('fighter');    
    fighter.style.top=y+'em';
}
let sizeY = 40;
let sizeX = 40;
function pusher (elEvento){
    let evento = window.event || elEvento; //almacena info de la tecla
    let stromboly = document.getElementById('scenario');
    stromboly.style.height = sizeY +'em';
    stromboly.style.width = sizeX +'em';

    switch(evento.keyCode){
        case 39: //DERECHA
            if (x_pos<sizeX-1){
                x_pos+=velX;
            }
            movementX(x_pos);
            break;
        case 37: //IZQUIERDA
            if (x_pos>0){
                x_pos-=velX;
            }
            movementX(x_pos);
            break;
        case 38: //ARRIBA
            if (y_pos>0){
                y_pos-=velY;
            }
            movementY(y_pos);
            break;
        case 40: //ABAJO
            if (y_pos<sizeY-1){
                y_pos+=velY;
            }
            movementY(y_pos);
            break;
    }
}
function systemOn(){
    document.onkeydown = pusher; //capta la pulsación de la tecla y llama a la función pusher
}
systemOn();

// CHANGE FASE
const changeFase = (destino) => {
    let arrFase = ["start","chooseF","fightScreen"];
    arrFase = arrFase.filter(val => !destino.includes(val));
    document.getElementById(destino).style.display = "flex";
    for(let _fase of arrFase){
        document.getElementById(_fase).style.display = "none";
    }
};

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
// const deleteTeamFighter = (ev) => {
//     console.log(ev)

// }

/* CONSTRUCTOR FIGHTERS */
class Fighter{
    constructor(id, nombre, ataque, defensa, velocidad, suerte){
        this.id = id;
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        this.velocidad = velocidad;
        this.suerte = (Math.round((Math.random()*suerte)*100)/100)+1;
        this.vida = 60;
    };

    hit(enemy){
        enemy.vida-=(this.ataque - (enemy.defensa/enemy.suerte));
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
    }
    document.getElementById(fighter).draggable = false;
};

/* ASIGNATION CHARACTER TO FIGHT SCENE */ 
let topF;
let bottomF;
let deadF;
const placeFighter = (index) => {
    topF = team1[index];
    bottomF = team2[index];

    document.getElementById('topFighter').innerHTML = `<img id="${topF.id}" src="img/${topF.nombre}.png" class="characterPic" alt="Player${topF.id}">`;
    document.getElementById('bottomFighter').innerHTML = `<img id="${bottomF.id}" src="img/${bottomF.nombre}.png" class="characterPic" alt="Player${bottomF.id}">`; 
}
const changeDeadFighterTop = (index, positionF) => {
    deadF = team1[index];
    document.getElementById(positionF).innerHTML = "";
    document.getElementById(positionF).innerHTML = `<img id="${deadF.id}" src="img/${deadF.nombre}.png" class="characterPic" alt="Player${deadF.id}">`;
}
const changeDeadFighterBottom = (index, positionF) => {
    dead = team2[index];
    document.getElementById(positionF).innerHTML = "";
    document.getElementById(positionF).innerHTML = `<img id="${dead.id}" src="img/${dead.nombre}.png" class="characterPic" alt="Player${dead.id}">`;
}


/* FIGHT ACTION */
let countTop=0;
let countBottom=0;
const fighting = () => {
    p1 = team1[countTop];
    p2 = team2[countBottom];

    p1.hit(p2);
    p2.hit(p1);
    console.log(`${p1.nombre} tiene: ${p1.vida} de vida`);
    console.log(`${p2.nombre} tiene ${p2.vida} de vida`);


    if (p1.vida<=0){
        if(countTop<1){
            console.log(`Este combate lo ha ganado ${p2.nombre}`);
            countTop+=1;
            changeDeadFighterTop(countTop, 'topFighter');
        } else {
            console.log(`Este combate lo ha ganado ${p2.nombre}`);
        }

    }
    if (p2.vida<=0){
        if(countBottom<1){
            console.log(`Este combate lo ha ganado ${p1.nombre}`);
            countBottom+=1;
            changeDeadFighterBottom(countBottom, 'bottomFighter');
        } else {
            console.log(`Este combate lo ha ganado ${p1.nombre}`);
        }
    }
    // if (p2.vida<=0 && countBottom ==1 || p1.vida<=0 && countTop ==1){
    //     changeFase('Results');
    // }
}

