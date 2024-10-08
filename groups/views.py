from django.shortcuts import render
from rest_framework import viewsets
from .models import GroupModel
from rest_framework.permissions import IsAuthenticated
from .serializers import GroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = GroupModel.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]
