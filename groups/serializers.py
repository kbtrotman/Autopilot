# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import GroupModel

  
class GroupSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='group.id', read_only=True)
    group_name = serializers.CharField(source='group.name', read_only=True)  # Add the group name from the related Group model

    class Meta:
        model = GroupModel
        fields = ['id', 'group_name', 'ap_permissions', 'desc', 'ldap_map', 'ad_map']  # Specify the fields you want, including group_name



class GroupCreateSerializer(serializers.ModelSerializer):
    # Adding a field for the name to accept input
    name = serializers.CharField(write_only=True)  # Accepts the group name instead of a group ID

    # Add a field to show the name of the related Group
    group_name = serializers.CharField(source='group.name', read_only=True)
    
    class Meta:
        model = GroupModel
        fields = ['name', 'group_name', 'desc']  # Include group_name for display and name for input

    def create(self, validated_data):
        # Extract the name field for the Group
        group_name = validated_data.pop('name')

        # Create the related Group object using the provided name
        group = Group.objects.create(name=group_name)
        
        # Now create the GroupModel instance with the newly created group
        group_model = GroupModel.objects.create(group=group, **validated_data)
        return group_model

        