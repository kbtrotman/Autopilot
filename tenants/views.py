# views.py
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from .models import TenantModel
from rest_framework.response import Response
from rest_framework import status
from .serializers import TenantSerializer, TenantCreateSerializer

# Create your views here.


class TenantViewSet(ModelViewSet):
    queryset = TenantModel.objects.all()
    serializer_class = TenantSerializer
    
    
    @action(detail=False, methods=['post'], url_path='add', serializer_class=TenantCreateSerializer)
    def post(self, request, *args, **kwargs):
        # Deserialize the incoming JSON data using the serializer
        serializer = TenantCreateSerializer(data=request.data)
        
        # Validate the incoming data
        if serializer.is_valid():
            # Save the valid data, creating a new TenantModel instance
            tenant = serializer.save()
            # Return a success response with the created data
            return Response({'status': 'success', 'tenant_id': tenant.id}, status=status.HTTP_201_CREATED)
        
        # If the data is invalid, return an error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
