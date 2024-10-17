from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TenantModel
from .serializers import TenantSerializer

# Create your views here.


class TenantViewSet(ModelViewSet):
    queryset = TenantModel.objects.all()
    serializer_class = TenantSerializer