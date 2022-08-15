from os import error
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
from django.contrib.auth import login, logout, authenticate
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



@csrf_protect
def login_inicio(request):
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
            ctx={"saludo": "Bienvenido"}
            return redirect('/bienvenido/')
    ctx={"saludo": "Bienvenido Ingresa Usuario", "form": form } 
    return render( request,  'registro.html', ctx)


def csrf_failure(request, reason=""):
    print(request)
    doc_pantilla = open("E:/service worker/chatbot_django/Projecto1/Projecto1/template/defauld.html")
    templete_login=Template(doc_pantilla.read())
    ctx = {'mensaje': reason}
    ctx=Context(ctx )
    pantilla = templete_login.render(ctx)
    return HttpResponse(pantilla)


@login_required
def cerrar_login(request):
    logout(request)
    context = { 
            "nombre":"",
            "clave": "", 
        }
    return render(request, 'home.html', context)

@login_required
def bienvenido(request):
    context = { 
            "nombre":"",
            "clave": "", 
        }
    
    print(request.user.is_active)
    return render(request, 'salachat2.html', context)

def index(request):
    
    if request.user.is_active:
        return redirect('/bienvenido/', foo='bar')
    context = { 
            "nombre":"",
            "clave": "", 
        }
    return render(request, 'home.html', context)


@login_required
def chatbot(request):
    context = {}

    return render(request, 'salachat.html', context)

@login_required
def quiz(request):
    context = {}

    return render(request, 'salachat2.html', context)

def test_new(request):
    context = {}
    return render(request, 'nuevo_test.html', context)