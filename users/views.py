# views.py
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import UserModel
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserCreateSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'], url_path='add', serializer_class=UserCreateSerializer)
    def create_user(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Creates the user
            return Response({'status': 'success', 'user_id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
