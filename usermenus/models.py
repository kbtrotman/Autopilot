from django.db import models
from django.contrib.auth.models import Group

# Create your models here.


class UserMenusModel(models.Model):
    group = models.ForeignKey(Group.group, on_delete=models.CASCADE)
    menu_name = models.CharField(max_length=50)
    menu_priority = models.IntegerField()
    menu_json = models.JSONField()  # Store the menu in JSON format
    updated_at = models.DateTimeField(auto_now=True)