const express = require("express");
const app = express();
const PORT = 3000;
let CANT_NUMEROS=15;
let jugadores = [];
let cartones = [];
let contadorJugadores=0;
let cartonesResta = [];
let vecPelotas = [];
let contadorCartones = 0;
let cartonCopia;
let ganadores = 0;
let decenas = []

function crearCarton() {
        let contador1 = 0;
        let contador2 = 0;
        let arr = [
            [], 
            [], 
            [], 
            [], 
            [], 
            [], 
            [], 
            [], 
            [], 
            [] 
        ];
        
        for(let i = 0; i < arr.length; i++) {
            let min = (i * 10) + 1;
            let max = min + 9;
            let ok = Math.floor(Math.random() * (3 - 1)) + 1;
            if(ok==1 && contador1<5){
                contador1++;
                ok=2;
            }else if (ok==2 && contador2<5){
                contador2++;
                ok=1;
            }
                while(arr[i].length < ok) {
                    let num = Math.floor(Math.random() * (max - min)) + min;
                    if(!arr[i].includes(num)) {
                        arr[i].push(num);
                    }
                }
            arr[i].sort((a,b) => a - b);
        }
        return arr;
}

function crearCartonEditado() {
    let contador1 = 0;
    let contador2 = 0;
    let arr = [
        [], 
        [], 
        [], 
        [], 
        [], 
        [], 
        [], 
        [], 
        [], 
        [] 
    ];
    for(let i = 0; i<cant_numeros; i++){
    let posicion = Math.floor(Math.random() * (10 - 1)) + 1;
    let min = (posicion * 10) + 1;
    let max = min + 9;
    let ok = Math.floor(Math.random() * (3 - 1)) + 1;
    if(ok==1 && contador1<5){
        contador1++;
        ok=2;
    }else if (ok==2 && contador2<5){
        contador2++;
        ok=1;
    }
        while(arr[posicion].length < ok) {
            let num = Math.floor(Math.random() * (max - min)) + min;
            if(!arr[posicion].includes(num)) {
                arr[posicion].push(num);
            }
        }
        arr[posicion].sort((a,b) => a - b);
    }
    return arr;
}

const ObtenerBolilla = (vecPelotas)=>{
    let pelota = Math.floor(Math.random() * 99);

    while (vecPelotas[pelota] >= 1)
    {
        pelota = Math.floor(Math.random() * 99 );
    }
    vecPelotas[pelota] = vecPelotas[pelota] + 1;
    return pelota;
}
const Juego = () =>{
    let cartonVer;
    let numeroVer;
    let jugadorVer;
    let nombreVer;
    pelota = ObtenerBolilla(vecPelotas);
    for(let i = 0; i<contadorCartones; i++){
        jugadorVer=jugadores[i];
        if(jugadorVer==undefined){
            cartonVer = cartonesResta[i]
        }else{
            cartonVer = jugadores[i].cartonResta
        }
        let sacados = 0;
        for(let j = 0; j<10; j++){
            for(let k = 0; k<10; k++){
                numeroVer=cartonVer[j][k]
                if(numeroVer == pelota){
                    cartonesResta[i][j][k] = -1;
                }
                if(numeroVer == -1){
                    sacados++;
                }
            }
        }
        if(sacados === cant_numeros){
            nombreVer=jugadores[i];
            if(nombreVer.nombre==undefined){
                console.log(`Juego terminado, gano VACANTE`)
            }else{
                console.log(`Juego terminado, gano ${nombreVer.nombre}`)
            }
            ganadores++;
        }
    }
    if(ganadores === 0){
        console.log(`Salio la pelota ${pelota}`);
    }
}

const process_data = () => {

    let x = 100;

    return {
        resultado: x
    };
};

app.use(express.json());
	
app.post("/", function (req, res) {
	console.log(req.body)
    let limite = req.body.limite;
    res.send(process_data(req.body));
});

app.get("/mi_endpoint", function (req, res) {
    res.send("respuesta");
});

app.post("/numero_aleatorio",function(req,res){
    console.log(req.body);
    res.send([Math.floor(Math.random() * (req.body.numero-1))+1]);
});

app.post("/iniciar_juego",function(req,res){
    for(i=0; i<10; i++){
        decenas[i]=0;
    }
    console.log(req.body);
    cant_numeros = req.body.numeros;
    if((cant_numeros<1) || (cant_numeros>20)){
        res.send("No valido");
    }else{
        if(cant_numeros==15){
            for(let i=0;i<req.body.cartones;i++){
                carton = crearCarton();
                contadorCartones = contadorCartones + 1;
                cartones.push(carton);
                //cartonCopia = carton;
                cartonCopia = [...carton]
                cartonesResta.push(cartonCopia);
            }
            for(let i = 0; i<100; i++){
                vecPelotas[i] = 0;
            }
            res.send(cartones);
        }else{
            for(let i=0;i<req.body.cartones;i++){
                carton = crearCartonEditado();
                contadorCartones = contadorCartones + 1;
                cartones.push(carton);
                //cartonCopia = carton;
                cartonCopia = [...carton]
                cartonesResta.push(cartonCopia);
            }
            for(let i = 0; i<100; i++){
                vecPelotas[i] = 0;
            }
            res.send(cartones);
        }
    }
    
});

app.get("/obtener_carton",function(req,res){
    if(jugadores.length>=cartones.length){
        console.log("Existen mas jugadores que cartones, vuelva a iniciar el juego");
        res.send("Existen mas jugadores que cartones, vuelva a iniciar el juego");
    }else{
        let jugador={
            nombre:req.body.jugador,
            carton:cartones[contadorJugadores],
            cartonResta:cartonesResta[contadorJugadores]
        }
        contadorJugadores=contadorJugadores+1
        jugadores.push(jugador);
        console.log(`Jugador ${jugador.nombre}: ${jugador.carton}`)
        res.send(`Jugador ${jugador.nombre}: ${jugador.carton}`);
    }
});

app.get(`/cartones/:Nombre?`,function(req,res){
    const cartonesNombre = req.params.Nombre;
    let cartonElegido;
        if(cartonesNombre===undefined){
            console.log(cartones)
            res.send(cartones);
        }else{
            for(let i=0;i<jugadores.length;i++){
                if(cartonesNombre==jugadores[i].nombre){
                    cartonElegido=jugadores[i].carton;
                }
            }
            console.log(cartonElegido);
            res.send(cartonElegido);
        }
});

app.get(`/sacar_numero`, function(req, res){
    Juego();
    res.send("ok");  
});

app.get(`/juego_continuo`, function(req, res){
    while(ganadores==0){
        Juego();
    }
    res.send("ok");  
});

app.get(`/ver_cartonAlter`, function(req, res){
    console.log(cartonesResta);
    res.send("ok");
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});