from django.conf import settings
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import WorkModel
from .serializers import WorkSerializer

class WorkViewSet(ModelViewSet):
    queryset = WorkModel.objects.all()
    serializer_class = WorkSerializer