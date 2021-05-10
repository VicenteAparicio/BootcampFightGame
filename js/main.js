
let x_pos=0;
let y_pos=0;

let velX=1;
let velY=1;
function movementX(x){
    let fighter =  document.getElementById('fighter'); //obtengo posición del div con id fighter 
    fighter.style.left=x+'em'; //añado el sumatorio de la variable al style left de la posición del div con id 
}
function movementY(y){
    let fighter =  document.getElementById('fighter');    
    fighter.style.top=y+'em';
}

function pusher (elEvento){
    let evento = window.event || elEvento; //almacena info de la tecla
    console.log(evento.keyCode) //verificación para mí del código de la tecla
    switch(evento.keyCode){
        case 39: //DERECHA
            if (x_pos>=0 && x_pos<20){
                x_pos+=velX;
            }
            movementX(x_pos);
            break;
        case 37: //IZQUIERDA
            if (x_pos>0 && x_pos<=20){
                x_pos-=velX;
            }
            movementX(x_pos);
            break;
        case 38: //ARRIBA
            if (y_pos>0 && y_pos<=10){
                y_pos-=velY;
            }
            movementY(y_pos);
            break;
        case 40: //ABAJO
            if (y_pos>=0 && y_pos<10){
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