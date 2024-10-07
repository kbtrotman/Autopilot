from django.utils.deprecation import MiddlewareMixin

class DisableCSRFMiddlewareForAPIs(MiddlewareMixin):
    def process_request(self, request):
        # Disable CSRF checks for API endpoints only
        # CSRF is a b**ch, which is why I use tokens.
        # No sessions means I don't need that crap.
        if request.path.startswith(('/_allauth/', '/api/')):
            # Change this path as needed
            setattr(request, '_dont_enforce_csrf_checks', True)
