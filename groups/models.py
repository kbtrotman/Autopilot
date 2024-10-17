from django.db import models
from django.contrib.auth.models import Group, PermissionsMixin


class GroupModel(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE)
    ap_permissions = models.CharField(max_length=100, name="hrname")
    desc = models.TextField(max_length=300, name="description")
    ldap_map = models.CharField(max_length=200, name="type")
    ad_map = models.CharField(max_length=200, name="input")


    def __str__(self):
        return self.group.name
    