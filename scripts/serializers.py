from rest_framework import serializers
from . import models

  
class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ScriptModel
        fields = '__all__'