import json
import requests

# Static URL where the JSON file is hosted
json_url = "http://frontend/tasks/defs/api_defs.json"

# Function to load API definitions from an external JSON file (web link or local)
def load_apis_from_web():
    try:
        response = requests.get(json_url)
        response.raise_for_status()  # Check for HTTP errors
        api_data = response.json()  # Parse the JSON response
    except requests.exceptions.RequestException as e:
        print(f"Error fetching API list: {e}")
        return []

    # Convert JSON entries into RestAPI objects
    apis = []
    for api_entry in api_data.get("apis", []):
        api = RestAPI(name=api_entry['name'], openapi_path=api_entry['openapi_path'])
        apis.append(api)

    return apis




# Check if APIs loaded successfully
def api_did_load(api_list):
    if api_list:
        return True
    else:
        return False
    

# Save the JSON data back into the list file when new APIs added
def save_apis_to_web(json_packet):
    response = requests.post(json_url, json=json_packet)

