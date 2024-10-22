from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from.serializers import UserMenuSerializer, UserMenuCreateSerializer
from .models import UserMenusModel

# Create your views here.


class GroupViewSet(viewsets.ModelViewSet):
    queryset = UserMenusModel.objects.all()
    serializer_class = UserMenuSerializer

    @api_view(['POST'])
    def save_user_menu(request):
        group = request.group
        menu_json = request.data.get('menu_json')
        
        user_menu, created = UserMenusModel.objects.update_or_create(
            group=group, 
            defaults={'menu_json': menu_json}
        )
        
        return Response({'status': 'success'})


    @api_view(['GET'])
    def get_user_menu(request):
        user = request.user
        try:
            user_menu = UserMenusModel.objects.get(user=user)
            return Response({'menu_json': user_menu.menu_json})
        except UserMenusModel.DoesNotExist:
            return Response({'menu_json': None})