

def importNewAPIDef():
    create_swagger_clients()
    update_api_endpoints()
    

def update_api_endpoints():
    # Initialize the Bravado client with the API definition

    # Iterate over all available resources and their operations
    for resource_name, resource in client.swagger_spec.resources.items():
        for operation_name, operation in resource.operations.items():
            # Retrieve the API details
            path = operation.path_name
            method = operation.http_method.upper()
            description = operation.operation_id

            # Check if this API call already exists in the database
            api_endpoint, created = ApiEndpoint.objects.get_or_create(
                name=operation_name,
                defaults={'path': path, 'method': method, 'description': description}
            )

            if created:
                print(f"Added new endpoint: {method} {path}")
            else:
                print(f"Endpoint already exists: {method} {path}")



def create_swagger_clients():
    all_apis = load_apis_from_web()

    for api_entry in all_apis:

        client[api_entry['name']] = SwaggerClient.from_url(api_entry['openapi_path'])
