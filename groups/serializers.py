from rest_framework import serializers
from . import models

  
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GroupModel
        fields = '__all__'
    