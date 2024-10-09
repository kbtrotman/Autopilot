from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import TaskModel
from .serializers import TaskSerializer


class ScriptViewSet(viewsets.ModelViewSet):
    queryset = ScriptModel.objects.all()
    serializer_class = ScriptSerializer
