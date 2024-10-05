from django.db import models


class UserModel(models.Model):
    u_name = models.CharField(max_length=25, name="uname")
    email = models.EmailField(max_length=100, name="email")
    desc = models.TextField(max_length=100, name="description")
    phone = models.CharField(max_length=13, name="phone")
    location = models.CharField(max_length=30, name="location")
    pri_group = models.CharField(max_length=100, name="pri_grp")
    ad_groups = models.CharField(max_length=100, name="ad_grps")
    role = models.CharField(max_length=100, name="role")
    remote = models.BooleanField(name="remote")
    dashboard = models.CharField(max_length=25, name="dashboard")


    def __str__(self):
        return self.u_name

    def get_absolute_url(self):
        return self.u_name
