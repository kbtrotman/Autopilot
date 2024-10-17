from rest_framework import serializers
from . import models

  
class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TenantModel
        fields = '__all__'
    