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
    constructor(nombre, ataque, defensa, velocidad, suerte){
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        this.velocidad = velocidad;
        this.suerte = Math.floor(Math.random()*suerte);
        this.vida = 60;
    };

    hit(enemy){
        enemy.vida-=this.ataque - (enemy.defensa*enemy.suerte*this.velocidad);
    }
}

let player1 = new Fighter('Smith', 9, 4, 6, 5);
let player2 = new Fighter('Walker', 8, 5, 5, 6);
let player3 = new Fighter('Cumbert', 7, 6, 7, 8) ;
let player4 = new Fighter('Rosling', 8, 6, 6, 5);


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

/* FIGHT ACTION */
const fighting = () => {
    p1 = team1[0];
    p2 = team2[0];
    do{
        p1.hit(p2);
        p2.hit(p1);
        console.log(`${p1.nombre} tiene: ${p1.vida} de vida`);
        console.log(`${p2.nombre} tiene ${p2.vida} de vida`);
    } while (p1.vida >0 && p2.vida>0)
}

