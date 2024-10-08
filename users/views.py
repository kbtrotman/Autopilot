from django.shortcuts import render
from rest_framework import viewsets
from .models import UserModel
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
