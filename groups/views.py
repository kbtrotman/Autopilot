# views.py
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import GroupModel
from .serializers import GroupSerializer, GroupCreateSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = GroupModel.objects.all()
    serializer_class = GroupSerializer

    # Custom action to handle group creation
    @action(detail=False, methods=['post'], url_path='add', serializer_class=GroupCreateSerializer)
    def create_group(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            group_model = serializer.save()  # Creates the group model entry with a new Group
            return Response({'status': 'success', 'group_id': group_model.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

