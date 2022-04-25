const express = require("express");
const app = express();
const PORT = 3000;
let jugadores = [];
let cartones = [];
const CANT_NUMEROS = 4;
let vecPelotas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let cantCartones = cartones.length;


const crearCarton=()=>{
    let carton=[];
    let num;
        for(let i=0;i<CANT_NUMEROS;i++){
            num=Math.floor(Math.random() * 99);
            for(let j; j<CANT_NUMEROS; j++){
                while(num===carton[j]){
                    num=Math.floor(Math.random() * 99);
                }
            }
            carton[i] = num;
        }
    return carton;
}

const llenarBolillero=() =>{
    for(let i=0; i<100; i++){
        vecPelotas[i] = i;
    }
}

const ObtenerBolilla = (vecPelotas)=>{
    let pelota = Math.floor(Math.random() * 99);

    while (vecPelotas[pelota] >= 1)
    {
        pelota = Math.floor(Math.random() * 99 );
    }
    vecPelotas[pelota] ++;
    return pelota;
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
	// res.end();

    let limite = req.body.limite;
    res.send(process_data(req.body));
});

app.get("/mi_endpoint", function (req, res) {
    res.send(vecPelotas);
});

app.post("/numero_aleatorio",function(req,res){
    console.log(req.body);
    res.send([Math.floor(Math.random() * (req.body.numero-1))+1]);
});

app.post("/iniciar_juego",function(req,res){
    let carton = []
    console.log(`Se crearon ${req.body.cartones} cartones`);

    for(let i=0;i<req.body.cartones;i++){
        carton = crearCarton();
        cartones.push(carton);
    }
    res.send(cartones);
});

app.get("/obtener_carton",function(req,res){
    if(req.body.jugadores.length!=cartones.length){
        console.log("No hay misma cantidad de cartones que de jugadores, vuelva a intentar");
        res.send("No hay misma cantidad de cartones que de jugadores, vuelva a intentar");
    }else{
        jugadores = req.body.jugadores
        llenarBolillero();
        for(let i = 1; i<=jugadores.length; i++){
            console.log(`Jugador ${i}: ${req.body.jugadores[i-1]}`)
        }
        res.send("Gracias, comenzemos");
    }
});


app.get(`/cartones`,function(req,res){
    if(req.body.tablero>cartones.length){
        console.log("Carton no existente");
    }else{
        if(req.body.tablero===null){
            console.log(cartones)
            res.send(cartones);
        }else{
            console.log(cartones[req.body.tablero-1]);
            res.send(cartones[req.body.tablero-1]);
        }
    }
});

app.get(`/sacar_numero`, function(req, res){
    let cartones;
    pelota = ObtenerBolilla(vecPelotas);
    console.log(`Salio la pelota ${pelota}`);
    res.send("ok");
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});


