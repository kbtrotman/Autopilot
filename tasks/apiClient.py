from bravado.client import SwaggerClient
from .models import TaskModel
from .static.tasks.lib.debug_logging import send_log
import json
import requests
import yaml

def importNewAPIDef(file_path, filename):
    send_log("Importing YAML file: " + file_path)
    # Load API definition
    api_data = loadAPIFromFile(file_path)
    if apiDidLoad(api_data):
        # Create the Swagger client
        client = SwaggerClient.from_url('http://backend:8000/static/tasks/defs/' + filename)
        # Extract product name and description from the API spec
        product_name = api_data['name']
        description = api_data.get('description', '')
        # Update endpoints with the product metadata and client details
        update_api_endpoints(client, product_name, description, file_path)
    

def update_api_endpoints(client, product_name, description, file_path):
    # Iterate over all paths and operations in the client
    for path, path_item in client.swagger_spec.spec_dict['paths'].items():
        send_log("Importing YAML file element [" + path_item + "] from path [" + path + "].")
        for method, operation in path_item.items():
            send_log("Importing YAML file method [" + method + "] and operation [" + operation + "].")
            operation_name = operation['operationId']
            operation_desc = operation.get('summary', '')  # Description for each operation
            
            t_input_json = json.dumps(t_input) if t_input else '[]'
            t_output_json = json.dumps(t_output_json) if isinstance(t_output_json, dict) else 'unknown'

            # Collect input and output formats, assuming JSON is used
            t_input = operation.get('parameters', [])
            t_output_json = operation.get('responses', {}).get('200', {}).get('schema', {}).get('type', 'unknown')

            # Once we've parsed the OPenAPI def, we then
            # Save each API operation as a Task entry
            task, created = TaskModel.objects.update_or_create(
                sname=operation_name,
                type=product_name,
                defaults={
                    'hrname': operation_name,
                    'description': operation_desc,
                    'yaml_file': file_path,
                    'input': json.dumps(t_input),
                    'output': json.dumps(t_output_json),
                    'send': False  # Any other default values you may want to set
                }
            )
            send_log(f"{'Created' if created else 'Found'} task for operation '{operation_name}' on {method.upper()} {path}")


# Function to load API definitions from an external JSON file (web link or local)
# Function to load a single API definition from the YAML file
def loadAPIFromFile(file_path):
    try:
        with open(file_path, 'r') as f:
            api_data = yaml.safe_load(f)
            # Assuming the structure includes `info` and `title`
            return {
                'name': api_data['info']['title'],
                'description': api_data['info'].get('description', ''),
                'openapi_path': file_path  # Path to the YAML file
            }
    except Exception as e:
        print(f"Error loading API file: {e}")
        return {}


# Check if API data loaded successfully
def apiDidLoad(api_data):
    return bool(api_data)