"""
URL configuration for autopilot project.
"""
# urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks import views as task_view
from groups import views as group_view
from users import views as user_view
 
 
router = DefaultRouter()
router.register(r'tasks', task_view.TaskViewSet)
router.register(r'groups',group_view.GroupViewSet)
router.register(r'users', user_view.UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("_allauth/", include("allauth.headless.urls")),  # Keep your allauth URLs
    path('api/', include(router.urls)),
] 

