from rest_framework import serializers
from . import models

  
class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WorkModel
        fields = '__all__'
    