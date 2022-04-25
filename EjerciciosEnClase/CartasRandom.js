const numeros = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
const palos = ["Diamante","Trebol","Pica","Corazon"];
let barajaEntera = [];

for(let i=0; i<numeros.length; i++){
    num = numeros[i];
    for(let j = 0; j<palos.length; j++){
        pal = palos[j];
            let carta = {
                numero: num,
                palo: pal
            }
            barajaEntera.push(carta);
    }
}


barajaEntera.splice(6);

console.log(barajaEntera);


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}