from rest_framework import serializers
from . import models
       
  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserModel
        fields = '__all__'
        
    def create(self, validated_data):
        user = models.UserModel.objects.create_user(**validated_data)
        return user  
    
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)