from django.db import models


class GroupModel(models.Model):
    g_name = models.CharField(max_length=25, name="sname")
    permissions = models.CharField(max_length=100, name="hrname")
    desc = models.TextField(max_length=300, name="description")
    ldap_map = models.CharField(max_length=100, name="type")
    ad_map = models.CharField(max_length=100, name="input")
    admin = models.BooleanField(name="send")
    creator = models.BooleanField(name="email")


    def __str__(self):
        return self.t_name

    def get_absolute_url(self):
        return self.t_name
