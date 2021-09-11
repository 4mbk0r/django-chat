
class Conexion {
    base_dato; user; numero_id; db;
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
        this.base_dato = "";
        this.numero_id = 1;
        this.db = firebase.firestore();

    }
    async conversacion(base) {
        this.base_dato = base;
        var usuario = $("#usuario").val();
        var db = firebase.firestore();
        try {
            var docRef = await db.collection("usuario_resp").doc(usuario);
        } catch (error) {
            console.error(error)
        }
        var query_w;
        docRef.get().then((doc) => {
            if (doc.exists) {
                query_w = doc.data();
                if(typeof( query_w.base_actual)!= "undefined" ){
                    this.set_base_id(query_w.base_actual, query_w.numero);
                    this.respuesta("");
                }
               
            } else {
                // doc.data() will be undefined in this case
                console.log("_-----_");
                this.base_dato = base;
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });        
    }
    set_base_id(base, id){
        this.base_dato=base;
        this.numero_id=id;
    }
    set_base(name_base) {
        this.base_dato = name_base;
        this.numero_id = 0;
    };
    async respuesta(numero) {
        var usuario = $("#usuario").val();
        var idpregunta = this.numero_id;
        var db = firebase.firestore();
        try {
            var docRef = await db.collection(this.base_dato + "").doc(idpregunta + "");
        } catch (error) {
            console.error(error)
        }
        var query_w, opciones, pregunta, userHtml, botHtml, nombre_base;
        docRef.get().then((doc) => {

            if (doc.exists) {
                query_w = doc.data();
                if (query_w.tipo == "seleccion") {
                    document.getElementById("escribir_text").disabled = true;
                } else {
                    document.getElementById("escribir_text").disabled = false;
                }
                opciones = query_w.opciones;
                pregunta = query_w.pregunta;

                try {
                    nombre_base = query_w.end;
                    console.log(nombre_base);
                    if (typeof (nombre_base) != "undefined") {
                        this.set_base(nombre_base);
                    }
                }
                catch (error) {
                    console.log(error);
                }
                botHtml = this.escribir_mensaje_bot(pregunta.replace("user", usuario));
                $("#chatbox").empty();
                $("#chatbox").append($.parseHTML(botHtml));
                opciones = Object.values(opciones);
                var valor = 0;
                $("#ele_opciones").empty();
                var mensajeinicio = "";// '<div class="input-group justify-content-center form-check-inline scrolling-wrapper">';
                $("#escribir_text").val("");
                opciones.forEach(element => {
                    mensajeinicio += '<input type="radio" class="btn-check btn-ms"  onclick="mostar(value)" name="options" value="' + opciones[valor] + '" id="' + idpregunta + '-' + valor + '" autocomplete="off">'
                    mensajeinicio += '<label class="btn btn-primary justify-content-around pulse " for="' + idpregunta + "-" + valor + '">' + opciones[valor];

                    //<input type="radio" class="btn-check" name="options" value="' + valor + '" id="' + idpregunta + '" autocomplete="off" checked>';
                    mensajeinicio += '</label>';
                    console.log(mensajeinicio);

                    valor += 1;
                });
                mensajeinicio += '</div>';

                userHtml = mensajeinicio;
                $("#ele_opciones").append(userHtml);
                var objDiv = document.getElementById("contenido-srollx");
                objDiv.scrollTop = objDiv.scrollHeight;
                this.numero_id++;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }



    async escribir(n_pregunta, respuesta) {

        var userHtml = this.escribir_mensaje_usuario(respuesta);
        $("#chatbox").append($.parseHTML(userHtml));
        $("#escribir_text").val("");
        var objDiv = document.getElementById("contenido-srollx");
        console.log("_______.:::::::______________")
        objDiv.scrollTop = objDiv.scrollHeight;
        if (this.base_dato == "BFQ") {
            console.log("____"+this.base_dato);
            var usuario = $("#usuario").val();
            var booking = { some: "data" };
            var db = firebase.firestore();
            var userRef = db.collection("usuario_resp").doc(usuario);
            userRef.get().then((doc) => {
                if (doc.exists) {
                    userRef.collection('respuesta').doc((this.numero_id-1)+"").set({
                        respuesta: respuesta
                      })
                    userRef.update({"numero":this.numero_id})
                } else {
                    db.collection("usuario_resp").doc(usuario).set({
                        base_actual: "BFQ",
                        numero: "0",
                        respuesta: {}, 
                    });
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
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
        userHtml = mesajeinicio + userHtml + mensagefinal;
        return userHtml;
    }

}
fb = new Conexion();
fb.conversacion("saludo");
fb.respuesta(1);

