from django import forms
from django.forms.forms import Form
from django.core.exceptions import ValidationError

from django.contrib.auth.models import User

from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import (
    authenticate, get_user_model, password_validation,
)

from firebase_admin import firestore


class Formulario(forms.Form):
   
    nick = forms.CharField(label='Ingresa Nick', max_length=100, widget=forms.TextInput(attrs={'autocomplete': 'off'}))
    clave = forms.CharField(label='Ingresa Contraseña', max_length=100, widget=forms.PasswordInput)
    def __init__(self, *args, **kwargs):
        super(Formulario, self).__init__(*args, **kwargs)
        # desde aquí, puedes definir luego de iniciar el formulario, si los campos son obligatorios
        self.fields['nick'].required = True # así no entrara al save(), si el campo no está lleno
        self.fields['clave'].required = True
    # usar el método clean() para otro tipo de validaciones
 
    def clean_clave(self):
        # extract the username and text field from the data
        try:
            passw = self.cleaned_data.get('clave')
            nick = self.cleaned_data.get('nick')
            
            # conditions to be met for the username length
            dbf = firestore.client()
            ref = dbf.collection(u'usuarios')
            doc = ref.document(u''+nick).get()            
            if doc.exists:
                doc = doc.to_dict()
                print (doc,str(doc['clave']), passw)
                if str(doc['clave'])!=str(passw):
                    raise forms.ValidationError('contraseña incorrecta')   
        # etc
        except KeyError:
        # return any errors if found
            print("----")
            return ValidationError('The password field was blank.')
        return passw

    def clean_nick(self):
        # extract the username and text field from the data
        try:
            nick = self.cleaned_data.get('nick')
            # conditions to be met for the username length
            dbf = firestore.client()
            ref = dbf.collection(u'usuarios')
            if not ref.document(u''+nick).get().exists:
                raise forms.ValidationError('Nick no valido')    
        # etc
        except KeyError:
        # return any errors if found
            print("----")
            return ValidationError('The password field was blank.')
        return nick



class Registro(forms.Form):
    w=forms.TextInput(attrs={'autocomplete': 'off'})
    nick = forms.CharField(label='Ingresa Nick', max_length=100,  help_text="Necesitamos un Nick para idenficarte, Como un apodo", widget=w )
    nombre = forms.CharField(label='Ingresa tu Nombre Completo', max_length=255, help_text="Esto es opcional", widget=w)
    edad  = forms.IntegerField(label='Ingersa tu edad', widget=w)
    CHOICES = (('Hombre', 'Hombre'),('Mujer', 'Mujer'), ('Sin_especificar', 'Prefiero no decirlo'))
    sexo = forms.ChoiceField(label='Selecciona tu sexo', choices=CHOICES, initial=CHOICES[2][0])
    correo = forms.CharField(label='Ingresa tu Correo Electronico', max_length=100, help_text="Esto es opcional", widget=w)
    clave = forms.CharField(label='Ingresa Contraseña', max_length=100, widget=forms.PasswordInput)
    clave_v = forms.CharField(label='Vuelve a Ingresa Contraseña', max_length=100, widget=forms.PasswordInput)
    def __init__(self, *args, **kwargs):
        super(Registro, self).__init__(*args, **kwargs)
        # desde aquí, puedes definir luego de iniciar el formulario, si los campos son obligatorios
        self.fields['nick'].required = True # así no entrara al save(), si el campo no está lleno
        self.fields['nombre'].required = False
        self.fields['edad'].required = False
        self.fields['correo'].required = False
        self.fields['clave'].required = True
        self.fields['clave_v'].required = True
    
    def clean_nick(self):
        try:
            dbf = firestore.client()
            nick = self.cleaned_data.get('nick')
            # Check if a date is not in the past.
            ref = dbf.collection(u'usuarios')
            if ref.document(u''+nick).get().exists:
                raise forms.ValidationError('Ya existe ese nick')
        except KeyError:
            return forms.ValidationError('The password field was blank.')
        return nick
    
    def clean_clave(self):
        clave1 = self.cleaned_data.get('clave')
        try:
            validate_password(clave1)
        except ValidationError as e:
            raise forms.ValidationError("contraseña comun o my corta")
        
        return clave1
    def clean(self):
        try:
            clave1 = self.cleaned_data.get('clave')
            clave2 = self.cleaned_data.get('clave_v')
            # Check if a date is not in the past.
            if clave1!=clave2 and clave1 !=None and clave2 !=None :
                raise forms.ValidationError('contraseñas son diferentes diferentes')
            
        except KeyError:
            return forms.ValidationError('The password field was blank.')
        return clave1
    
            