from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-20_uu*8p1zw3qwk6weis9$p@4@9=q_mtcv%g)fc=^7#9*9zm1-"

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["http://frontend", "https://frontend"]


INTERNAL_IPS = [
    # ...
    "127.0.0.1",
    # ...
]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


EMAIL_HOST = "mail"
EMAIL_PORT = 1025

DEFAULT_FROM_EMAIL = "apadmin@example_site.com"
DEFAULT_TO_EMAIL = "apadmin@example_site.com"



try:
    from .local import *
except ImportError:
    pass
