from django.db import models
 
# model named Post
class Model_Login(models.Model):
    nombre = models.CharField(max_length=100)
    clave = models.CharField( max_length=100)