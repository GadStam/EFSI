const numeros = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
const palos = ["Diamante","Trebol","Pica","Corazon"];
let barajaPar=[];

for(let i=0; i<numeros.length; i++){
    let num = numeros[i];
        for(let j = 0; j<palos.length; j++){
            let pal = palos[j];
        if(num%2===0){
            if((pal==="Trebol")||(pal==="Pica")){
                let carta= {
                    numero: num,
                    palo: pal
                }
                barajaPar.push(carta);
            }
        }
    }
}




console.log(barajaPar, `Hay ` + baraja.length + ` cartas pares en una baraja de poker`);
