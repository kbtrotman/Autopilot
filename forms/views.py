from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from . import models
from rest_framework.response import Response
from rest_framework import status
from .serializers import FormSerializer, VariableSerializer
from rest_framework.decorators import api_view


# Create your views here.


class FormViewSet(ModelViewSet):
    queryset = models.FormModel.objects.all()
    serializer_class = FormSerializer
     
    @api_view(['POST'])
    def submit_form_schema(request):
        schema = request.data.get('schema')
        form = models.FormModel.objects.create(schema=schema)
        return Response({'status': 'success', 'id': form.id})


class VariableViewSet(ModelViewSet):
    queryset = models.VariableModel.objects.all()
    serializer_class = VariableSerializer
       
