import json
import requests

class RestAPI:
    def __init__(self, name, openapi_path):
        self.name = name
        self.openapi_path = openapi_path

    def load_openapi(self):
        # Simulate loading OpenAPI definition (assuming JSON format)
        try:
            with open(self.openapi_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Error: OpenAPI file {self.openapi_path} not found.")
            return None

    def __repr__(self):
        return f"RestAPI(name={self.name}, openapi_path={self.openapi_path})"

# Function to load API definitions from an external JSON file (web link or local)
def load_apis_from_web(json_url):
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

# Example URL where the JSON file is hosted
json_url = "/static/tasks/api_defs.json"

# Load APIs dynamically from the web
api_list = load_apis_from_web(json_url)

# Check if APIs loaded successfully
if api_list:
    print("Loaded APIs:")
    for api in api_list:
        print(api)
else:
    print("No APIs loaded.")

# Example usage: Loading OpenAPI spec for each API
for api in api_list:
    print(f"Loading OpenAPI spec for: {api.name}")
    openapi_data = api.load_openapi()  # This would load the OpenAPI spec
    if openapi_data:
        print(f"Successfully loaded OpenAPI spec for {api.name}")
