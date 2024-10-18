from rest_framework import serializers
from .models import TenantModel

  
class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantModel
        fields = '__all__'


class TenantCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantModel
        fields = ['name', 'owner', 'description']  # Specify the fields needed for creating a Tenant

    def create(self, validated_data):
        # Create the TenantModel object from validated data
        return TenantModel.objects.create(**validated_data)    