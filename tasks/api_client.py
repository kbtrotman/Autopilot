from tasks import api_list


client = SwaggerClient.from_url(rubrik)
pet = client.pet.getPetById(petId=42).response().result