import os
import json
import requests
from .models import ScriptModel

    

def updateScriptEntries(save_path, os_path, filename, arguments, product, description, notify, email):

    base_name = os.path.splitext(filename)[0]

    # Save script as a Script Database entry
    created = ScriptModel.objects.update_or_create(
        s_name=base_name,
        type=product,
        defaults={
            'f_name': filename,
            'args': arguments,
            'path': os_path,
            'desc': description,
            'output': "",
            's_send_data': notify,
            's_emails': email,
        }
    )
    print(f"Processed {base_name} from entry '{save_path}'")
