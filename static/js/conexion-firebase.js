
class Conexion {
    constructor() {
        var firebaseConfig = {
            apiKey: "AIzaSyAa4MnDZMCgyHtn8u5I2xFpJQCtnPnLMo0",
            authDomain: "chatprueba-b6c18.firebaseapp.com",
            projectId: "chatprueba-b6c18",
            storageBucket: "chatprueba-b6c18.appspot.com",
            messagingSenderId: "844396539663",
            appId: "1:844396539663:web:6e198521fa14284888987a",
            measurementId: "G-RLRMMVLDCB"
        };
        firebase.initializeApp(firebaseConfig);
    }
    conversacion() {
        var db = firebase.firestore();
        var div_scroll="contenido-srollx"

        var pregunta = db.collection('BFQ').doc('0');
        var setWithMerge = pregunta.set({
            pregunta: "Hola, Para conocerte mas te hare unas preguntas.",
            opciones: {
                0: "Ok"
            },
            tipo: "seleccion"
        }
            , { merge: true });
        /*


        var pregunta = db.collection('BFQ').doc('1');
        var setWithMerge = pregunta.set({
            pregunta: "Lo que he realizado hasta ahora en mi vida lo hice de la mejor manera posible",
            opciones: {
                0: "Muy Malo", 1: "Malo", 3: "Regular", 4: "Bueno", 5: "Exelente"
            },
            tipo: "seleccion"
        }
            , { merge: true });

        var pregunta = db.collection('BFQ').doc('2');
        var setWithMerge = pregunta.set({
            pregunta: "Habitualmente muestro una actitud cordial, incluso con las personas que me provocan una cierta antipatía.",
            opciones: {
                0: "Muy Malo", 1: "Malo", 3: "Regular", 4: "Bueno", 5: "Exelente"
            },
            tipo: "seleccion"
        }
            , { merge: true });
        var pregunta = db.collection('BFQ').doc('3');
        var setWithMerge = pregunta.set({
            pregunta: "Considerando las circunstancias siempre me he comportado de modo totalmente desinteresado.",
            opciones: {
                0: "Muy Malo", 1: "Malo", 3: "Regular", 4: "Bueno", 5: "Exelente"
            },
            tipo: "seleccion"
        }
            , { merge: true });*/
    }
    async respuesta(numero) {
        var idpregunta= parseInt(numero);
        console.log("nonono", numero);
        var db = firebase.firestore();
        try {
            var docRef = await db.collection("BFQ").doc(idpregunta+"");   
        } catch (error) {
            console.error(error)
        }
        var query_w, opciones, pregunta, userHtml, botHtml;
        docRef.get().then((doc) => {

            if (doc.exists) {
                query_w = doc.data();
                if(query_w.tipo == "seleccion"){
                    document.getElementById("escribir_text").disabled = true;
                }else{
                    document.getElementById("escribir_text").disabled = false;
                }
                opciones = query_w.opciones
                pregunta = query_w.pregunta;
                botHtml =  this.escribir_mensaje_bot(pregunta);
                $("#chatbox").append($.parseHTML(botHtml));
                console.log(opciones);
                console.log(Object.keys(opciones));
                console.log(Object.values(opciones));
                opciones = Object.values(opciones);
                var valor=0;
                $("#ele_opciones").empty();
                var mensajeinicio="";// '<div class="input-group justify-content-center form-check-inline scrolling-wrapper">';
                if( query_w.conversacion =="test_personalidads" ){
                    mensajeinicio+='<label class="container " for="inicio">'+"Estoy en desacuerdo";
                    mensajeinicio+='</label>';
                }
                
                
                $("#escribir_text").val("");

                opciones.forEach(element => {
                    mensajeinicio += '<input type="radio" class="btn-check btn-ms"  onclick="mostar(value)" name="options" value="'+ opciones[valor] +'" id="'+idpregunta+'-'+valor+'" autocomplete="off">'
                    mensajeinicio+='<label class="btn btn-primary justify-content-around pulse " for="'+idpregunta+"-"+valor+'">'+opciones[valor];
                    
                    //<input type="radio" class="btn-check" name="options" value="' + valor + '" id="' + idpregunta + '" autocomplete="off" checked>';
                    mensajeinicio+='</label>';
                    console.log(mensajeinicio);
                    
                    valor += 1;
                });
                if( query_w.conversacion =="test_personalidads" ){
                    mensajeinicio+='<div class="input-group-append"><span class="input-group-text input-sm bg-info text-white" id="basic-addon2">Estoy de acuerdo</span></div>';
                }
                mensajeinicio+='</div>';

                userHtml = mensajeinicio;
                $("#ele_opciones").append(userHtml);
                var objDiv = document.getElementById("contenido-srollx");
                objDiv.scrollTop = objDiv.scrollHeight;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

   
      
    async escribir(n_pregunta, respuesta) {
        
        userHtml = this.escribir_mensaje_usuario(respuesta);
        $("#chatbox").append($.parseHTML(userHtml));
        $("#escribir_text").val("");
        var objDiv = document.getElementById("contenido-srollx");
        objDiv.scrollTop = objDiv.scrollHeight;
                
        console.log("numero de pregunta "+ n_pregunta);
        var db = firebase.firestore();
        
        try {
            var docRef = await db.collection("BFQ").doc(n_pregunta);    
        } catch (error) {
            console.error(error)
        }
        
        var query_w, opciones, pregunta, userHtml, data;
        docRef.get().then((doc) => {

            if (doc.exists) {
                console.log("Document data:", doc.data());
                query_w = doc.data();
                opciones = query_w.opciones;
                pregunta = query_w.pregunta;
                opciones = Object.values(opciones);
                data = respuesta;
                console.log(data);
                document.getElementById("userInput").scrollIntoView({
                    block: "start",
                    behavior: "smooth",
                });
                var objDiv = document.getElementById("contenido-srollx");
                objDiv.scrollTop = objDiv.scrollHeight;
                
                return "hecho";
            } else {
                return "ERROR";
            }

        });

    }
    escribir_mensaje_bot(contenido) {
        var mesajeinicio = '<div class="media media-chat">' + '<div class="media-body">';
        var mensagefinal = '</div>' + '</div><br>';
        var botHtml = '<p>' + contenido + "</p>";
        botHtml = mesajeinicio + botHtml + mensagefinal;
        return botHtml;
    }
    escribir_mensaje_usuario(contenido) {
        var mesajeinicio = '<div class="media media-chat media-chat-reverse">' + '<div class="media-body float-end">';
        var mensagefinal = '</div>' + '</div><br><br>';
        var userHtml = '<p>' + contenido + "</p>";
        var userHtml = mesajeinicio + userHtml + mensagefinal;
        return userHtml;
    }

}

/*if (document.body)
{
var ancho = (document.body.clientWidth);
var alto = (document.body.clientHeight);
}
else
{
var ancho = (window.innerWidth);
var alto = (window.innerHeight);
}
alert("El tamaño de la ventana actual: " + ancho + " de ancho "+alto+" de alto"); 
^*/
fb = new Conexion();
fb.conversacion();
fb.respuesta(0);

/*



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAa4MnDZMCgyHtn8u5I2xFpJQCtnPnLMo0",
    authDomain: "chatprueba-b6c18.firebaseapp.com",
    projectId: "chatprueba-b6c18",
    storageBucket: "chatprueba-b6c18.appspot.com",
    messagingSenderId: "844396539663",
    appId: "1:844396539663:web:6e198521fa14284888987a",
    measurementId: "G-RLRMMVLDCB"
};
firebase.initializeApp(firebaseConfig);
//firebase.analytics();



var usuarios_id = 1;
var article = {
    "nombre": "esto es nuevo"
};
//firebase.database().ref('usuarios/' + usuarios_id).set(article);
var db = firebase.firestore();

var pregunta = db.collection('BFQ').doc('1');
var setWithMerge = pregunta.set({
    pregunta: "Lo que he realizado hasta ahora en mi vida lo hice de la mejor manera posible",
    opciones: {
        0: "Muy Malo", 1: "Malo", 3: "Regular", 4: "Bueno", 5: "Exelente"
    },
    tipo: "seleccion"
}
    , { merge: true });

var pregunta = db.collection('BFQ').doc('2');
var setWithMerge = pregunta.set({
    pregunta: "Habitualmente muestro una actitud cordial, incluso con las personas que me provocan una cierta antipatía.",
    opciones: {
        0: "Muy Malo", 1: "Malo", 3: "Regular", 4: "Bueno", 5: "Exelente"
    },
    tipo: "seleccion"
}
    , { merge: true });
var pregunta = db.collection('BFQ').doc('3');
var setWithMerge = pregunta.set({
    pregunta: "Considerando las circunstancias siempre me he comportado de modo totalmente desinteresado.",
    opciones: {
        0: "Muy Malo", 1: "Malo", 3: "Regular", 4: "Bueno", 5: "Exelente"
    },
    tipo: "seleccion"
}
    , { merge: true });



var docRef = db.collection("BFQ").doc("1");
docRef.get().then((doc) => {
    if (doc.exists) {

        console.log("Document data:", doc.data());
        query_ = doc.data();
        opciones = query_.opciones
        pregunta = query_.pregunta;

        var mesajeinicio = '<div class="media media-chat">' + '<div class="media-body">';
        var mensagefinal = '</div>' + '</div><br><br><br>';
        var botHtml = '<p>' + pregunta + "</p>";
        botHtml = mesajeinicio + botHtml + mensagefinal;

        $("#chatbox").append($.parseHTML(botHtml));
        console.log(opciones);
        console.log(Object.keys(opciones));
        console.log(Object.values(opciones));
        opciones = Object.values(opciones);

        var rawText = $("#ele_opciones").val();

        var escribirText = $("#escribir_texto").val();


        opciones.forEach(element => {
            var mensajeinicio = '<label class="btn btn-info active"><input type="radio" name="options" id="option1" autocomplete="off" checked>';
            var mensajefinal = '</label>';
            console.log(element);
            userHtml = mensajeinicio + element + mensajefinal;
            $("#ele_opciones").append(userHtml);
        });
        document.getElementById("escribir_text").disabled = true;

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

*/