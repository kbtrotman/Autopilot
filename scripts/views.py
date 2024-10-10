import os
from django.conf import settings
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import TaskModel
from .serializers import TaskSerializer

class ScriptViewSet(ModelViewSet):
    queryset = ScriptModel.objects.all()
    serializer_class = ScriptSerializer

    @action(detail=False, methods=['post'], url_path='api_upload', url_name='api_upload')
    def api_upload(self, request, *args, **kwargs):
        # Check if a file is included in the request
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the file
        uploaded_file = request.FILES['file']
        filename = uploaded_file.name

        # Define the custom path
        save_path = os.path.join(settings.BASE_DIR, 'static', 'scripts', 'bin', filename)

        # Ensure the directory exists
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        # Write the file to the directory
        with open(save_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        # Import the new file (which should be standard YAML)

        # Return a success response with the file URL
        file_url = f'/static/tasks/defs/{filename}'
        return Response({'status': 'success', 'file_url': file_url}, status=status.HTTP_201_CREATED)
