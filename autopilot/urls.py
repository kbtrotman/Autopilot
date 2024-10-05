"""
URL configuration for autopilot project.
"""
from django.contrib import admin
from django.urls import path, include
from debug_toolbar.toolbar import debug_toolbar_urls
from rest_framework.routers import DefaultRouter
from tasks import views as task_view

router = DefaultRouter()
router.register(r'tasks', task_view.TaskViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("_allauth/", include("allauth.headless.urls")),
    path('api/', include(router.urls)),
    path('tasks/', include(router.urls)),
] + debug_toolbar_urls()
