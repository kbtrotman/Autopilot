from bravado.client import SwaggerClient
from .models import TaskModel
import json
import requests
import yaml

def importNewAPIDef(file_path):
    # Load API definition
    api_data = loadAPIFromFile(file_path)
    if apiDidLoad(api_data):
        # Create the Swagger client
        client = SwaggerClient.from_url(api_data['openapi_path'])
        # Extract product name and description from the API spec
        product_name = api_data['name']
        description = api_data.get('description', '')
        # Update endpoints with the product metadata and client details
        update_api_endpoints(client, product_name, description, file_path)
    

def update_api_endpoints(client, product_name, description, file_path):
    # Iterate over all paths and operations in the client
    for path, path_item in client.swagger_spec.spec_dict['paths'].items():
        for method, operation in path_item.items():
            operation_name = operation['operationId']
            operation_desc = operation.get('summary', '')  # Description for each operation
            
            # Collect input and output formats, assuming JSON is used
            t_input = operation.get('parameters', [])
            t_output_json = operation.get('responses', {}).get('200', {}).get('schema', {}).get('type', 'unknown')

            # Save each API operation as a Task entry
            TaskModel.objects.get_or_create(
                sname=operation_name,
                hrname=operation_name,
                desc=operation_desc,
                product=product_name,
                yaml_file=file_path,
                t_input=t_input,
                t_output_json=t_output_json,
                defaults={'send': False}  # Set defaults as needed
            )
            print(f"Processed {method.upper()} {path} as task '{operation_name}'")


def create_single_swagger_client(api_entry):
    # Initialize and return a single Swagger client
    return SwaggerClient.from_url(api_entry.openapi_path)


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