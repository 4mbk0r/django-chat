from django.db import models
 
# model named Post
class Model_Login(models.Model):
    nombre = models.CharField(max_length=100)
    clave = models.CharField( max_length=100)
class Index(models.Model):
    titulo = models.CharField(max_length=100)
    nombre = models.TextField(max_length=200)