"""Projecto1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from Projecto1.views import bienvenido, firebase, registar, saludo, accion, validar_registro, cerrar_login
from django.contrib import admin
from django.contrib.auth import login, logout
from django.urls import path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', accion),
    path('accion/', accion),
    path('accion/pantilla/', saludo),
    path('firebase/',firebase),
    path('registro/',registar),
    path('bienvenido/',bienvenido),
    path('logout/',cerrar_login),
    

]
