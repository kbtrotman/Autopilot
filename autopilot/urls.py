# urls.py
from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from tasks import views as task_view
from tasks.importViewSet import ImportSseView  # Import our custom log view
from scripts import views as script_view
from groups import views as group_view
from users import views as user_view
from functions import views as func_view
from workflows import views as work_view
from tenants import views as tenant_view
from assets import views as asset_view
from forms import views as form_view
from usermenus import views as usermenu_view
from debug_toolbar.toolbar import debug_toolbar_urls
import django_eventstream

# Initialize the DRF router
router = DefaultRouter()
router.register(r'tasks', task_view.TaskViewSet)
router.register(r'scripts', script_view.ScriptViewSet)
router.register(r'groups', group_view.GroupViewSet)
router.register(r'users', user_view.UserViewSet)
router.register(r'functions', func_view.FunctViewSet)
router.register(r'workflows', work_view.WorkViewSet)
router.register(r'tenants', tenant_view.TenantViewSet)
router.register(r'servers', asset_view.ServerViewSet)
router.register(r'appliances', asset_view.ApplianceViewSet)
router.register(r'networks', asset_view.NetworkViewSet)
router.register(r'clouds', asset_view.CloudViewSet)
router.register(r'forms', form_view.FormViewSet)
router.register(r'variables', form_view.VariableViewSet)
router.register(r'usermenus', usermenu_view.MenuViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("_allauth/", include("allauth.headless.urls")),
    path('api/', include(router.urls)),  # REST API endpoints

    # Add the ImportSseView endpoint for file import and streaming
    path('api/import/', ImportSseView.as_view(), name='import_events'),

    # Include django-eventstream path for channel registration
    path('api/events/', include(django_eventstream.urls), {'channels': ['import']}),
    
] + debug_toolbar_urls()







