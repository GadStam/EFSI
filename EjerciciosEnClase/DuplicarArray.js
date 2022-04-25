const data = [2,3,5,12,54,5,-1,0,23,66,7];
let arrayDoble = data.concat(data);
let arrayFinal = []

for(let i= 0; i<arrayDoble.length; i++){
    if(arrayDoble[i]>=0){
        let obj={
            original: arrayDoble[i],
            mod: parseFloat(Math.sqrt(arrayDoble[i]).toFixed(2))
        }
        arrayFinal.push(obj);
    }
}

console.log(arrayFinal);