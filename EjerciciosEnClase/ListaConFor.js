//Clase
/*
const data = [11,33,2,-1,110,99,8];

let odds = [];

for(let i=0; i<data.length; i++){
    const element = data[i];

    if(element % 2 !== 0){
        odds.push(element);
    }
}
function sort1(a,b){
    if(a < b){
        return 1;
    }
    if(a > b){
        return -1;
    }
    return 0;
}

function sort2(a,b){return b-a;}

odds.sort(sort2);

console.log(odds[1]);
*/



//Mio
let listaNumeros = [11,33,2,-1,110,99,8]

let listaImpares=listaNumeros.filter(checkEven);
let numerosOrdenados = listaImpares.sort((a, b) => b - a);

function checkEven(num) {
    return num%2!=0;
}

console.log(numerosOrdenados[1]);
