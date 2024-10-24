from django.contrib.auth.models import Group
from django.db import models

class UserMenusModel(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)  # Reference to Group model
    menu_name = models.CharField(max_length=50)
    menu_json = models.JSONField()  # Store the menu in JSON format
    updated_at = models.DateTimeField(auto_now=True)
