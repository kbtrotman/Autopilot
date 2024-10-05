from rest_framework import serializers
from . import models

  
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskModel
        fields = '__all__'
    