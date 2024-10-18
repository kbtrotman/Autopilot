from rest_framework import serializers
from . import models

  
class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ServerModel
        fields = '__all__'

    
class ApplianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ApplianceModel
        fields = '__all__'

       
class NetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NetworkModel
        fields = '__all__'

      
class CloudSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CloudModel
        fields = '__all__'
        
        
class ServerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ServerModel
        fields = ['sname', 'ip', 'description', 'term_ip', 'o_s', 'serial', 'hw_vendor', 'hw_type', 'cpu_count', 
                  'memory', 'datacenter', 'dc_row', 'dc_rack', 'dc_u_num', 'virtual' ]  
        # Specify the fields needed for creating a Server

    def create(self, validated_data):
        # Create the TenantModel object from validated data
        return models.ServerModel.objects.create(**validated_data)
    
    
class ApplianceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ApplianceModel
        fields = ['aname', 'pri_ip', 'type', 'sec_ip', 'term_ip', 'serial', 'hw_vendor', 'hw_type', 
                  'datacenter', 'dc_row', 'dc_rack', 'dc_u_num', 'virtual']
        # Specify the fields needed for creating an Appliance
        
    def create(self, validated_data):
        # Create the TenantModel object from validated data
        return models.TenantModel.objects.create(**validated_data) 


class NetworkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NetworkModel
        fields = ['subnet', 'vlan_id', 'public', 'firwalled', 'proxy' ]  
        # Specify the fields needed for creating a Network

    def create(self, validated_data):
        # Create the TenantModel object from validated data
        return models.NetworkModel.objects.create(**validated_data) 
    

class CloudCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CloudModel
        fields = ['vendor', 'login', 'password', 'terraform', 'api_only']  
        # Specify the fields needed for creating a Cloud Instance
        
    def create(self, validated_data):
        # Create the TenantModel object from validated data
        return models.CloudModel.objects.create(**validated_data) 