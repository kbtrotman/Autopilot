# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token  # Add this if you're using token authentication

@csrf_exempt  # Disable CSRF protection, as you're using token-based authentication
@api_view(['POST'])  # Use the POST method
def custom_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate user
    user = authenticate(username=email, password=password)
    
    if user is not None:
        # If authentication is successful, return a token
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Login successful',
            'token': token.key  # Return the token for the client to store
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
