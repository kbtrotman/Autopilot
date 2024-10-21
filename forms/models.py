from django.db import models
from django.utils import timezone


# Create your models here.

class FormModel(models.Model):    
    fname = models.CharField(max_length=25)
    owner = models.TextField(max_length=100)
    group = models.CharField(max_length=20)
    schema = models.JSONField()
    created_at = models.DateTimeField(default=timezone.now)
    
class VariableModel(models.Model):
    vname = models.CharField(max_length=20)
    type = models.CharField(max_length=10)
    initiator_type = models.CharField(max_length=10)
    initiator_id = models.BigIntegerField()
    value = models.TextField(max_length=350)
    
    
