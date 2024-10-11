from rest_framework import serializers
from . import models

  
class FunctSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FunctModel
        fields = '__all__'
    