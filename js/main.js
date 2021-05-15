
// MOVEMENT - ATTACKS - COOLDOWNS
const movementX = (x, fighters) => {
    let fighter1 = document.getElementById(fighters); //obtengo posición del div con id fighter 
    fighter1.style.left = x +'%'; //añado el sumatorio de la variable al style left de la posición del div con id 
};

let xPosR=66;
let xPosL=0;
let velX=33;
let cdHeavyL=0;
let cdHeavyR=0;
let cdLightL=0;
let cdLightR=0;
const cdHeavyLeft = () => {
    setTimeout(() => {cdHeavyL=0}, 2000);
}
const cdHeavyRight = () => {
    setTimeout(() => {cdHeavyR=0}, 2000);
}
const cdLightLeft = () => {
    setTimeout(() => {cdLightL=0}, 800);
}
const cdLightRight = () => {
    setTimeout(() => {cdLightR=0}, 800);
}

const movementAndAttack = (elEvento) => {
    let evento = window.event || elEvento; //almacena info de la tecla
    if (team2[1].life > 0 && team1[1].life > 0){
        switch(evento.keyCode){

            case 39: // RIGHT FIGHTER MOVE RIGHT RIGHT ARROW
                if (xPosR<59){
                    xPosR+=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosR, 'rightFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 37: // RIGHT FIGHTER MOVE LEFT LEFT ARROW
                if (xPosR>0){
                    xPosR-=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosR, 'rightFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 66: // LEFT FIGHTER MOVE RIGHT B
                if (xPosL<59){
                    xPosL+=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosL, 'leftFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 86: // LEFT FIGHTER MOVE LEFT V
                if (xPosL>0){
                    xPosL-=velX;
                }
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                movementX(xPosL, 'leftFighter');
                console.log(`Posición R ${xPosR} y l  ${xPosL}`)
                break;

            case 65: // HEAVY LEFT ATTACK "A"
                if(cdHeavyL==0){
                    if (xPosL<65){
                        xPosL+=velX;
                        movementX(xPosL, 'leftFighter');
                        fighting('heavyLeftAttack');
                        cdHeavyL=1;
                        cdHeavyLeft(); 
                    }
                }
                break;

            case 73: // HEAVY RIGHT ATTACK "I"
                if(cdHeavyR==0){
                    if (xPosR>32){
                        xPosR-=velX;
                        movementX(xPosR, 'rightFighter');
                        fighting('heavyRightAttack');
                        cdHeavyR=1;
                        cdHeavyRight(); 
                    }
                }
                break;

            case 68: // LIGHT LEFT ATTACK "D"
                if(cdLightL==0){
                    fighting('leftAttack');
                    cdLightL=1;
                    cdLightLeft();
                }
                break;

            case 80: // LIGHT RIGHT ATTACK "P"
                if(cdLightR==0){
                    fighting('rightAttack'); 
                    cdLightR=1;
                    cdLightRight();
                }
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
        case 65: // HEAVY LEFT ATTACK "A"
            fighting('leftAttackFrameOff');
            break;

        case 73: // HEAVY RIGHT ATTACK "I"
            fighting('rightAttackFrameOff');
            break;

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
    let dataId = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(dataId));

    /* CALL TO CHOOSE FIGHTER FUNCTION WITH ID AND TEAM PARAMETER */ 
    let teamSelect = ev.path[1].id;
    console.log('Fighter ID '+ dataId)
    console.log('Which team you drop? '+ teamSelect)
    chooseFighter(dataId, teamSelect)

    /* PREVENT OVERLAP */
    ev.target.ondrop = "";
}

/* CONSTRUCTOR FIGHTERS */
class Fighter{
    constructor(id, colour, lordName, damage, defense, luck){
        this.id = id;
        this.colour = colour;
        this.lordName = lordName;
        this.damage = damage;
        this.defense = defense;
        this.luck = luck;
        this.life = 100;
    };

    hit(enemy){
        enemy.life-=Math.round(this.damage - (enemy.defense/((Math.random()*this.luck)+1)));
    }
    specialHit(enemy){
        enemy.life-=((this.damage*2)-enemy.defense/((Math.random()*this.luck)+1));
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
/* FILL FIGHTERS TO SELECTION AREA */
const fillFighters = () => {
    for (let i = 1; i<7; i++){
        let fighterInfo = allPlayers[i];
        document.getElementById('characterBoxPics').innerHTML +=
            `<div class="cBoxPic"><img id="${fighterInfo.id}" class="characterPic" dragabble="true" ondragstart="drag(event)" src="assets/fighters/${fighterInfo.colour}IdleGif.gif" alt="Player${fighterInfo.id}">`;
    }
}
/* FILL INFORMATION FIGHTERS */
let showHideCount=0;
const showHideInfo = () => {
    if (showHideCount==0){
        showHideCount=1;
        for (let i = 1; i<7; i++){
            let fighterInfo = allPlayers[i];
            document.getElementById('infoContainer').innerHTML += 
                `<div class="infoFighter">
                    <div id="namek" name="lordName" class="attributesF"><p class="titlesInfo">Name:</p><span class="attributesInfo">${fighterInfo.lordName}</span></div>
                    <div name="damage" class="attributesF"><p class="titlesInfo">Damage:</p><span class="attributesInfo">${fighterInfo.damage}</span></div>
                    <div name="defense" class="attributesF"><p class="titlesInfo">Defense:</p><span class="attributesInfo">${fighterInfo.defense}</span></div>
                    <div name="luck" class="attributesF"><p class="titlesInfo">Luck:</p><span class="attributesInfo">${fighterInfo.luck}</span></div>
                    <div name="life" class="attributesF"><p class="titlesInfo">Life:</p><span class="attributesInfo">${fighterInfo.life}</span></div>
                    <div name="colour" class="attributesF"><p class="titlesInfo">Colour:</p><span class="attributesInfo">${fighterInfo.colour}</span></div>
                </div>`;
        }
    } else {
        showHideCount=0;
        document.getElementById('infoContainer').innerHTML = '';
    }
}

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
    document.getElementById('fightButton').innerHTML = `<span onclick="changeFase('fightScreen'), changeImage(team1[0], 'leftFighter', 'GuardGif.gif'), changeImage(team2[0], 'rightFighter', 'GuardGif.gif'), stopVFX('intro'), playVFX('fightTheme')">GO FIGHT</span>`;
}

/* ASIGNATION IMAGE CHARACTERS ON FIGHT SCENE */ 
const changeImage = (fighter, position, action) => {
    document.getElementById(position).innerHTML = `<img id="${fighter.id}" src="assets/fighters/${fighter.colour}${action}" class="characterPic" alt="Player${fighter.id}">`;

    if (position=='leftFighter'){
        document.getElementById("leftFighterData").innerHTML = `
            <div class="nameTitle">${fighter.lordName}</div>
            <div class="keys">
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/left.png"></img>
                    <span class="letterKeys">V<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/right.png"></img>
                    <span class="letterKeys">B<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/light.png"></img>
                    <span class="letterKeys">D<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/heavy.png"></img>
                    <span class="letterKeys">A<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/block.png"></img>
                    <span class="letterKeys">S<span>
                </div>
            </div>`;
    }
    if (position=='rightFighter'){
        document.getElementById("rightFighterData").innerHTML = `
            <div class="nameTitle">${fighter.lordName}</div>
            <div class="keys">
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/left.png"></img>
                    <span class="letterKeys">Left<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/right.png"></img>
                    <span class="letterKeys">Right<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/light.png"></img>
                    <span class="letterKeys">P<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/heavy.png"></img>
                    <span class="letterKeys">I<span>
                </div>
                <div class="boxKeys">
                    <img class="imgKeys" src="assets/img/block.png"></img>
                    <span class="letterKeys">O<span>
                </div>
            </div>`;
    }

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
            changeImage(p1, 'leftFighter', 'GuardGif.gif');
        }
    }

    if (action == 'rightAttackFrameOff'){
        if (defenseRight==0){
            changeImage(p2, 'rightFighter', 'GuardGif.gif');
        }
    }

    if (action == 'leftDefenseOff'){
        defenseLeft=0;
        changeImage(p1, 'leftFighter', 'GuardGif.gif');

    }
    if (action == 'rightDefenseOff'){
        defenseRight=0;
        changeImage(p2, 'rightFighter', 'GuardGif.gif');
        
    }
    if (action == 'leftDefenseOn'){
        defenseLeft=1;
        console.log('Defense Left '+defenseLeft);
        changeImage(p1, 'leftFighter', 'DefGif.gif');
        
    }
    if (action == 'rightDefenseOn'){
        defenseRight=1;
        console.log('Defense Right ' +defenseRight);
        changeImage(p2, 'rightFighter', 'DefGif.gif');
        
    }

    if (action == 'leftAttack'){
        if (defenseLeft==0){
            changeImage(p1, 'leftFighter', 'Attack.png');
            if (posXLeft=='66%' && posXRight=='0%'){
                if (defenseRight==0){
                    playVFX('bloodyHit')
                    p1.hit(p2);
                    bar(p2, 'lifeBarRight');
                } else if (defenseRight==1){
                    playVFX('blockedHit');
                }
            } else {
                playVFX('airHit');
            } 
        }   
    }
    
    if (action == 'rightAttack'){
        if (defenseRight==0){
            changeImage(p2, 'rightFighter', 'Attack.png');
            if (posXRight=='0%' && posXLeft=='66%'){
                if (defenseLeft==0){
                    playVFX('bloodyHit')
                    p2.hit(p1);
                    bar(p1, 'lifeBarLeft');
                } else if (defenseLeft==1){
                    playVFX('blockedHit');
                }
            } else {
                playVFX('airHit');
            }
        }
    }
    if (action == 'heavyLeftAttack'){
        posXLeft = fighterLeft.style.left;
        if (defenseLeft==0){
            changeImage(p1, 'leftFighter', 'Attack.png');
            if (posXLeft=='66%' && posXRight=='0%'){
                if(defenseRight==0){
                    playVFX('bloodyHit')
                    p1.specialHit(p2);
                    bar(p2, 'lifeBarRight');
                } else if (defenseRight==1){
                    playVFX('blockedHit');
                }
            } else {
                playVFX('airHit');
            } 
        }  
    }
    
    if (action == 'heavyRightAttack'){
        posXRight = fighterRight.style.left;
        if (defenseRight==0){
            changeImage(p2, 'rightFighter', 'Attack.png');
            if (posXRight=='0%' && posXLeft=='66%'){
                if (defenseLeft==0){
                    playVFX('bloodyHit')
                    p2.specialHit(p1);
                    bar(p1, 'lifeBarLeft');
                } else if (defenseLeft==1){
                    playVFX('blockedHit');
                }
            } else {
                playVFX('airHit');
            }
        }
    }
    
    console.log(`${p1.lordName} tiene: ${p1.life} de vida`);
    console.log(`${p2.lordName} tiene ${p2.life} de vida`);

    if (p1.life<=0){
        if(countLeft<1){
            console.log(`Este combate lo ha ganado ${p2.lordName}`);
            countLeft+=1;
            p1=team1[countLeft];
            changeImage(p1, 'leftFighter', 'GuardGif.gif');
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
            p2=team2[countRight];
            changeImage(p2, 'rightFighter', 'GuardGif.gif');
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

/* AUDIO */
const playVFX = (vfxRef) => {
    document.getElementById(vfxRef).play();
}

let soundCount=0;
const pauseVFX = (vfxRef) => {
    if (soundCount == 0){
        soundCount=1;
        document.getElementById(vfxRef).pause();
    } else {
        soundCount=0;
        document.getElementById(vfxRef).play();
    }
    
}

const stopVFX = (vfxRef) => {
    document.getElementById(vfxRef).src="";

}