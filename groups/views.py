from django.shortcuts import render
from rest_framework import viewsets
from .models import GroupModel
from .serializers import GroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = GroupModel.objects.all()
    serializer_class = GroupSerializer
    
