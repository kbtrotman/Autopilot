from django.db import models
from django.contrib.auth.models import Group, PermissionsMixin


class GroupModel(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE)
    ap_permissions = models.CharField(max_length=100)
    desc = models.TextField(max_length=300)
    ldap_map = models.CharField(max_length=200)
    ad_map = models.CharField(max_length=200)


    def __str__(self):
        return self.group.name
    