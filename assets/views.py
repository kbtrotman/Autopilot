# views.py
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from . import models
from rest_framework.response import Response
from rest_framework import status
from .serializers import ServerSerializer, ServerCreateSerializer, ApplianceSerializer, ApplianceCreateSerializer, NetworkSerializer, NetworkCreateSerializer, CloudSerializer, CloudCreateSerializer

# Create your views here.


class ServerViewSet(ModelViewSet):
    queryset = models.ServerModel.objects.all()
    serializer_class = ServerSerializer

    @action(detail=False, methods=['post'], url_path='add', serializer_class=ServerCreateSerializer)
    def post(self, request, *args, **kwargs):
        # Deserialize the incoming JSON data using the serializer
        serializer = ServerCreateSerializer(data=request.data)
        
        # Validate the incoming data
        if serializer.is_valid():
            # Save the valid data, creating a new TenantModel instance
            server = serializer.save()
            # Return a success response with the created data
            return Response({'status': 'success', 'server_id': server.id}, status=status.HTTP_201_CREATED)
        
        # If the data is invalid, return an error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ApplianceViewSet(ModelViewSet):
    queryset = models.ApplianceModel.objects.all()
    serializer_class = ApplianceSerializer

    @action(detail=False, methods=['post'], url_path='add', serializer_class=ApplianceCreateSerializer)
    def post(self, request, *args, **kwargs):
        # Deserialize the incoming JSON data using the serializer
        serializer = ApplianceCreateSerializer(data=request.data)
        
        # Validate the incoming data
        if serializer.is_valid():
            # Save the valid data, creating a new TenantModel instance
            appliance = serializer.save()
            # Return a success response with the created data
            return Response({'status': 'success', 'appliance_id': appliance.id}, status=status.HTTP_201_CREATED)
        
        # If the data is invalid, return an error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class NetworkViewSet(ModelViewSet):
    queryset = models.NetworkModel.objects.all()
    serializer_class = NetworkSerializer

    @action(detail=False, methods=['post'], url_path='add', serializer_class=NetworkCreateSerializer)
    def post(self, request, *args, **kwargs):
        # Deserialize the incoming JSON data using the serializer
        serializer = NetworkCreateSerializer(data=request.data)
        
        # Validate the incoming data
        if serializer.is_valid():
            # Save the valid data, creating a new TenantModel instance
            network = serializer.save()
            # Return a success response with the created data
            return Response({'status': 'success', 'network_id': network.id}, status=status.HTTP_201_CREATED)
        
        # If the data is invalid, return an error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class CloudViewSet(ModelViewSet):
    queryset = models.CloudModel.objects.all()
    serializer_class = CloudSerializer
     

    @action(detail=False, methods=['post'], url_path='add', serializer_class=CloudCreateSerializer)
    def post(self, request, *args, **kwargs):
        # Deserialize the incoming JSON data using the serializer
        serializer = CloudCreateSerializer(data=request.data)
        
        # Validate the incoming data
        if serializer.is_valid():
            # Save the valid data, creating a new TenantModel instance
            cloud = serializer.save()
            # Return a success response with the created data
            return Response({'status': 'success', 'cloud_id': cloud.id}, status=status.HTTP_201_CREATED)
        
        # If the data is invalid, return an error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
