from django.db import models

# Create your models here.


class TenantModel(models.Model):
    name = models.CharField(max_length=30)
    owner = models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    