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
    numero: "1",
    pregunta: "Lo que he realizado hasta ahora en mi vida lo hice de la mejor manera posible",
    opciones: {
        0: "1", 1: "2", 3: "3", 4: "4", 5: "5"
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
