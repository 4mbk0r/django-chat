from django import forms
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Template,Context, context
from django.shortcuts  import redirect, render
#@csrf_protect
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator 
from django.contrib.auth.decorators import login_required   
#importar formulario
from Projecto1.forms import Formulario,Registro
from django.contrib.auth import login, logout
from django.contrib.auth.models import User

import firebase_admin
 
# Definimos las credenciales que nos permitirán usar Firebase Admin SDK 
from firebase_admin import credentials
 
# Importo el Servicio Firebase Realtime Database 
from firebase_admin import db
from firebase_admin import firestore


cred = credentials.Certificate('./chatprueba-b6c18-firebase-adminsdk-u82ob-19a9ace74c.json')
firebase_admin.initialize_app(cred,{
	    'databaseURL': 'https://chatprueba-b6c18-default-rtdb.firebaseio.com'

	}) 
dbf = firestore.client()


def saludo(request):
    form = Formulario()
    ctx={"saludo": "Bienvenido Ingresa Usuario", "form": form } 
    return render( request, 'login.html', ctx)

from django.contrib.auth import authenticate


@csrf_protect
def accion(request):
    if request.user.is_active:
        return redirect('/bienvenido/', foo='bar')
    form = Formulario()
    if request.method=="POST":
        form = Formulario(data=request.POST)
        if form.is_valid():
            user = authenticate(username=request.POST.get("nick"), password=request.POST.get("clave"))
            login(request,user)
            return redirect('/bienvenido/', foo='bar')
        else:
            print(form.errors)
    ctx={"saludo": "Bienvenido Ingresa Usuario", "form": form } 
    return render(request, 'login.html', ctx)


def registar(request):
    
    if request.user.is_active:
        return redirect('/bienvenido/', foo='bar')
    
    form = Registro()
    if request.method=="POST":
        form = Registro(data=request.POST)
        if form.is_valid() :
            data = {
                u'nombre': u''+request.POST.get("nombre"),
                u'edad': u''+request.POST.get("edad"),
                u'sexo': u''+request.POST.get("sexo"),
                u'edad': u''+request.POST.get("correo"),
                u'clave': u''+request.POST.get("clave"),
                }
            dbf.collection(u'usuarios').document(u''+request.POST.get("nick")).set(data)
            user = user = User.objects.create_user(username=request.POST.get("nick"), email=request.POST.get("correo"),password=request.POST.get("clave") )
            user.save()
            login(request,user)
            request.session[request.POST.get("nick")]
            ctx={"saludo": "Bienvenido"}
            return redirect('/bienvenido/')
    ctx={"saludo": "Bienvenido Ingresa Usuario", "form": form } 
    return render( request,  'registro.html', ctx)


def validar_firebase_nick(nick):
    ref = dbf.collection(u'usuarios')
    docs = ref.stream()
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')        
    return ref.document(u''+nick).get().exists

@csrf_protect
def validar_registro(request):
    pass
    


def csrf_failure(request, reason=""):
    print(request)
    doc_pantilla = open("E:/service worker/chatbot_django/Projecto1/Projecto1/template/defauld.html")
    templete_login=Template(doc_pantilla.read())
    ctx = {'mensaje': reason}
    ctx=Context(ctx )
    pantilla = templete_login.render(ctx)
    return HttpResponse(pantilla)


 
# Importo Firebase Admin SDK 

def firebase(request):

    ref = dbf.collection(u'BFQ') 
    for doc in ref.stream():
        print(ref.document('0').get().exists)
	# Llamo los datos que se encuentran en la tabla 'postres' 
    print ( ref.where(u'id', u'==', 1).get())

    context = { 
            "nombre":"",
            "clave": "", 
        }

    return render(request, 'defauld.html', context)

def cerrar_login(request):
    logout(request)
    return HttpResponse('SECION CERRADA')

@login_required
def bienvenido(request):
    context = { 
            "nombre":"",
            "clave": "", 
        }
    
    print(request.user.is_active)
    return render(request, 'def.html', context)