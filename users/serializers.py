from rest_framework import serializers
from .models import UserModel
       
  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
        
    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user  
    
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'name', 'password', 'is_staff', 'is_admin', 'is_active', 
                  'is_superuser', 'is_tenant_admin', 'description', 'phone', 'location', 
                  'tenant', 'pri_grp', 'ad_grps', 'role', 'remote']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure the password is write-only
        }

    def create(self, validated_data):
        # Remove the password from validated data to set it properly
        password = validated_data.pop('password')
        user = UserModel(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user
