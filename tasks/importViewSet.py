import time
import os
from django.conf import settings
from django.views.generic import View
from django.http import JsonResponse
from django_eventstream import send_event
from .apiClient import importNewAPIDef
from django.core.cache import cache

class ImportSseView(View):
    def get(self, request, *args, **kwargs):
        # Check if there’s an uploaded file
        filename = cache.get('uploaded_filename')
        if not filename:
            send_event('import', 'message', {'text': "No file to process."})
            return JsonResponse({'status': 'error', 'message': 'No file found'}, status=400)

        file_path = os.path.join(settings.BASE_DIR, 'tasks', 'static', 'tasks', 'defs', filename)

        # Start file processing and send progress updates
        send_event('import', 'message', {'text': "Starting file processing...\n"})
        time.sleep(1)  # Simulate time for starting

        send_event('import', 'message', {'text': "Reading file contents...\n"})
        time.sleep(1)  # Simulate reading time

        try:
            # Process the file
            importNewAPIDef(file_path, filename)
            send_event('import', 'message', {'text': "File processed successfully.\n"})
            time.sleep(1)  # Simulate processing time
            send_event('import', 'message', {'text': "Import complete.\n"})
        except Exception as e:
            send_event('import', 'message', {'text': f"Error: {str(e)}"})
        
        # Send a final success message
        return JsonResponse({'status': 'complete'})



