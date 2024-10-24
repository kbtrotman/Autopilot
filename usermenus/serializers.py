from rest_framework import serializers
from .models import UserMenusModel

  
class UserMenuSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)  # Add group name field

    class Meta:
        model = UserMenusModel
        fields = ['group', 'menu_name', 'menu_priority', 'menu_json', 'updated_at']



class UserMenuCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMenusModel
        fields = ['group', 'menu_name', 'menu_priority', 'menu_json', 'updated_at'] # Specify the fields needed for creating a Tenant

    def create(self, validated_data):
        # Create the TenantModel object from validated data
        return UserMenusModel.objects.create(**validated_data)    