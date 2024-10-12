import time
import os
from django.conf import settings
from django.views.generic import View
from django.http import JsonResponse
from django_eventstream import send_event
from .apiClient import importNewAPIDef

class ImportSseView(View):
    def get(self, request, *args, **kwargs):
        # Simulate file processing with messages
        filename = "example.yaml"  # Replace with actual filename if needed
        file_path = os.path.join(settings.BASE_DIR, 'tasks', 'static', 'tasks', 'defs', filename)

        # Send initial message
        send_event('import', 'message', {'text': "Starting file processing..."})

        # Simulate task progress with updates
        time.sleep(1)
        send_event('import', 'message', {'text': "Reading file contents..."})

        try:
            importNewAPIDef(file_path, filename)
            send_event('import', 'message', {'text': "File processed successfully."})
            time.sleep(1)
            send_event('import', 'message', {'text': "Import complete."})
        except Exception as e:
            # Send error message
            send_event('import', 'message', {'text': f"Error: {str(e)}"})
        
        # Send a final success message
        return JsonResponse({'status': 'complete'})


