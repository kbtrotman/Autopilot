from django.db import models

# Create your models here.


class ServerModel(models.Model):
    sname = models.CharField(max_length=25)
    ip = models.CharField(max_length=20)
    description = models.TextField(max_length=150)
    term_ip = models.CharField(max_length=20)
    o_s = models.CharField(max_length=50)
    serial = models.CharField(max_length=75)
    hw_vendor = models.CharField(max_length=75)
    hw_type = models.TextField(max_length=100)
    cpu_count = models.IntegerField()
    memory = models.IntegerField()
    datacenter = models.CharField(max_length=150)
    dc_row = models.CharField(max_length=30)
    dc_rack = models.CharField(max_length=30)
    dc_u_num = models.CharField(max_length=30)
    virtual = models.BooleanField()
    
    
class ApplianceModel(models.Model):    
    aname = models.CharField(max_length=25)
    type = models.TextField(max_length=100)
    pri_ip = models.CharField(max_length=20)
    sec_ip = models.CharField(max_length=20)
    term_ip = models.CharField(max_length=20)
    serial = models.CharField(max_length=75)
    hw_vendor = models.CharField(max_length=75)
    hw_type = models.TextField(max_length=100)
    datacenter = models.CharField(max_length=150)
    dc_row = models.CharField(max_length=30)
    dc_rack = models.CharField(max_length=30)
    dc_u_num = models.CharField(max_length=30)
    virtual = models.BooleanField()

  
class NetworkModel(models.Model):
    subnet = models.CharField(max_length=25)
    vlan_id = models.TextField(max_length=100)
    public = models.CharField(max_length=20)
    firwalled = models.CharField(max_length=20)
    proxy = models.CharField(max_length=20)


class CloudModel(models.Model):
    vendor = models.CharField(max_length=25)
    login = models.CharField(max_length=25)
    password = models.CharField(max_length=25)
    terraform = models.BooleanField()
    api_only = models.BooleanField()