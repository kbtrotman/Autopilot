"""
URL configuration for autopilot project.
"""
# urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks import views as task_view
from scripts import views as script_view
from groups import views as group_view
from users import views as user_view
from functions import views as func_view
from workflows import views as work_view
from debug_toolbar.toolbar import debug_toolbar_urls
 
 
router = DefaultRouter()
router.register(r'tasks', task_view.TaskViewSet)
router.register(r'scripts', script_view.ScriptViewSet)
router.register(r'groups',group_view.GroupViewSet)
router.register(r'users', user_view.UserViewSet)
router.register(r'functions', func_view.FunctViewSet)
router.register(r'workflows', work_view.WorkViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("_allauth/", include("allauth.headless.urls")),  # Keep your allauth URLs
    path('api/', include(router.urls)),
] + debug_toolbar_urls()

