from rest_framework import serializers
from . import models

  
class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FormModel
        fields = '__all__'

    
class VariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.VariableModel
        fields = '__all__'
