from django.db import models

class WorkModel(models.Model):
    name = models.CharField(max_length=100, name="hrname")
    desc = models.TextField(max_length=300, name="description")
    type = models.CharField(max_length=100, name="type")
    send_data = models.BooleanField(name="send")
    emails = models.EmailField(max_length=300, name="email")


