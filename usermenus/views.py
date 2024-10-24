from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import UserMenuSerializer, UserMenuCreateSerializer
from .models import UserMenusModel

class MenuViewSet(viewsets.ModelViewSet):
    queryset = UserMenusModel.objects.all()
    serializer_class = UserMenuSerializer

    # POST method for adding/updating a menu for a group
    @action(detail=False, methods=['post'], url_path='add/(?P<group_id>[^/.]+)', serializer_class=UserMenuCreateSerializer)
    def post(self, request, group_id):
        menu_json = request.data.get('menu_json')  # Menu data from request body

        # Update or create menu for the specified group
        user_menu, created = UserMenusModel.objects.update_or_create(
            group_id=group_id,  # Use the group_id directly from the URL
            defaults={'menu_json': menu_json}
        )

        return Response({'status': 'success', 'message': 'Menu saved successfully'})

    # GET method for retrieving a menu by group_id
    @action(detail=False, methods=['get'], url_path='get/(?P<group_id>[^/.]+)', serializer_class=UserMenuSerializer)
    def get(self, request, group_id):
        try:
            # Retrieve the menu for the specific group
            user_menu = UserMenusModel.objects.get(group_id=group_id)
            return Response({'menu_json': user_menu.menu_json})
        except UserMenusModel.DoesNotExist:
            return Response({'menu_json': None})

