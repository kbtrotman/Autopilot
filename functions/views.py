from django.conf import settings
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import FunctModel
from .serializers import FunctSerializer

class FunctViewSet(ModelViewSet):
    queryset = FunctModel.objects.all()
    serializer_class = FunctSerializer