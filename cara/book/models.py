from django.db import models

# Create your models here.
class Book(models.Model):
    titulo = models.CharField(max_length=100)
    nombre = models.TextField(max_length=200)