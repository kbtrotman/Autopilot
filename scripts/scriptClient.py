
from .models import ScriptModel
import json
import requests
    

def updateScriptEntries(save_path, os_path, filename):

    # Save script as a Script Database entry
    TaskModel.objects.get_or_create(
        s_name=filename,
        f_name=save_path,
        description="",
        type="",
        path=os_path,
        args="",
        s_output_json=t_output_json,
        defaults={'send': False}  # Set defaults as needed
    )
    print(f"Processed {method.upper()} {path} as task '{operation_name}'")

    s_name = models.CharField(max_length=25, name="s_name")
    f_name = models.CharField(max_length=150, name="f_name")
    s_args = models.CharField(max_length=100, name="args")
    path = models.CharField(max_length=150, name="path")
    product = models.CharField(max_length=100, name="type")
    desc = models.TextField(max_length=300, name="description")
    s_output_json = models.CharField(max_length=100, name="output")
    s_send_data = models.BooleanField(name="send")
    s_emails = models.EmailField(max_length=100, name="email")
