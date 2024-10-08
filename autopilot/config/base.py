"""
Django settings for DataAutopilot project.

Generated by 'django-admin startproject' using Django 5.0.8.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(PROJECT_DIR)
SITE_ID = 1

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/


# Application definition

INSTALLED_APPS = [
    'home',
    'tasks',
    'setup',
    'users',
    'groups',
    'scripts',
    'triggers',
    'schedules',
    #Django Requirements
    'mptt',
    'filer',
    'parler',
    'sekizai',
    'treebeard',
    'crispy_forms',
    'debug_toolbar',
    'easy_thumbnails',
    "crispy_bootstrap5",
    'webpack_boilerplate',
    "modelcluster",
    "taggit",
    'django_extensions',
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'whitenoise',
    'compressor',
    'corsheaders',
    "allauth.account",
    "allauth.headless",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.dummy",
    "allauth.mfa",
    "allauth.usersessions",
    'rest_framework',
    'rest_framework.authtoken',

    # Optional -- requires install using `django-allauth[socialaccount]`.
    # Enterprises shouldn;t use social providers, but if you have a burning
    # need, then uncomment this line and the  appropriate privider(s) below.
    # 'allauth.socialaccount',

    # ... include the providers you want to enable:
    # These are used in the enterprise sometimes:
    # 'allauth.socialaccount.providers.agave',
    # 'allauth.socialaccount.providers.amazon',
    # 'allauth.socialaccount.providers.amazon_cognito',
    # 'allauth.socialaccount.providers.github',
    # 'allauth.socialaccount.providers.gitlab',
    # 'allauth.socialaccount.providers.apple',
    # 'allauth.socialaccount.providers.asana',
    # 'allauth.socialaccount.providers.auth0',
    # 'allauth.socialaccount.providers.google',
    # 'allauth.socialaccount.providers.microsoft',
    # 'allauth.socialaccount.providers.authentiq',
    # 'allauth.socialaccount.providers.bitbucket_oauth2',
    # 'allauth.socialaccount.providers.okta',
    # 'allauth.socialaccount.providers.openid',
    # 'allauth.socialaccount.providers.openid_connect',
    # 'allauth.socialaccount.providers.salesforce',
    # 'allauth.socialaccount.providers.slack',
    # 'allauth.socialaccount.providers.zoom',
    # 'allauth.socialaccount.providers.yahoo',
    # 'allauth.socialaccount.providers.windowslive',

    # These...I'm not aware of any reason an enterprise would use them,
    # but I haven't seen everything in this world....
    # 'allauth.socialaccount.providers.baidu',
    # 'allauth.socialaccount.providers.basecamp',
    # 'allauth.socialaccount.providers.battlenet',
    # 'allauth.socialaccount.providers.bitly',
    # 'allauth.socialaccount.providers.box',
    # 'allauth.socialaccount.providers.cilogon',
    # 'allauth.socialaccount.providers.clever',
    # 'allauth.socialaccount.providers.coinbase',
    # 'allauth.socialaccount.providers.dataporten',
    # 'allauth.socialaccount.providers.daum',
    # 'allauth.socialaccount.providers.digitalocean',
    # 'allauth.socialaccount.providers.dingtalk',
    # 'allauth.socialaccount.providers.discord',
    # 'allauth.socialaccount.providers.disqus',
    # 'allauth.socialaccount.providers.douban',
    # 'allauth.socialaccount.providers.doximity',
    # 'allauth.socialaccount.providers.draugiem',
    # 'allauth.socialaccount.providers.drip',
    # 'allauth.socialaccount.providers.dropbox',
    # 'allauth.socialaccount.providers.dwolla',
    # 'allauth.socialaccount.providers.edmodo',
    # 'allauth.socialaccount.providers.edx',
    # 'allauth.socialaccount.providers.angellist',
    # 'allauth.socialaccount.providers.eventbrite',
    # 'allauth.socialaccount.providers.eveonline',
    # 'allauth.socialaccount.providers.evernote',
    # 'allauth.socialaccount.providers.exist',
    # 'allauth.socialaccount.providers.facebook',
    # 'allauth.socialaccount.providers.feedly',
    # 'allauth.socialaccount.providers.figma',
    # 'allauth.socialaccount.providers.fivehundredpx',
    # 'allauth.socialaccount.providers.flickr',
    # 'allauth.socialaccount.providers.foursquare',
    # 'allauth.socialaccount.providers.frontier',
    # 'allauth.socialaccount.providers.fxa',
    # 'allauth.socialaccount.providers.gitea',
    # 'allauth.socialaccount.providers.globus',
    # 'allauth.socialaccount.providers.gumroad',
    # 'allauth.socialaccount.providers.hubic',
    # 'allauth.socialaccount.providers.instagram',
    # 'allauth.socialaccount.providers.jupyterhub',
    # 'allauth.socialaccount.providers.kakao',
    # 'allauth.socialaccount.providers.lemonldap',
    # "allauth.socialaccount.providers.lichess",
    # 'allauth.socialaccount.providers.line',
    # 'allauth.socialaccount.providers.linkedin',
    # 'allauth.socialaccount.providers.linkedin_oauth2',
    # 'allauth.socialaccount.providers.mailchimp',
    # 'allauth.socialaccount.providers.mailru',
    # 'allauth.socialaccount.providers.mediawiki',
    # 'allauth.socialaccount.providers.meetup',
    # 'allauth.socialaccount.providers.miro',
    # 'allauth.socialaccount.providers.naver',
    # 'allauth.socialaccount.providers.nextcloud',
    # 'allauth.socialaccount.providers.notion',
    # 'allauth.socialaccount.providers.odnoklassniki',
    # 'allauth.socialaccount.providers.openstreetmap',
    # 'allauth.socialaccount.providers.orcid',
    # 'allauth.socialaccount.providers.patreon',
    # 'allauth.socialaccount.providers.paypal',
    # 'allauth.socialaccount.providers.persona',
    # 'allauth.socialaccount.providers.pinterest',
    # 'allauth.socialaccount.providers.pocket',
    # "allauth.socialaccount.providers.questrade",
    # 'allauth.socialaccount.providers.quickbooks',
    # 'allauth.socialaccount.providers.reddit',
    # 'allauth.socialaccount.providers.robinhood',
    # 'allauth.socialaccount.providers.sharefile',
    # 'allauth.socialaccount.providers.shopify',
    # 'allauth.socialaccount.providers.snapchat',
    # 'allauth.socialaccount.providers.soundcloud',
    # 'allauth.socialaccount.providers.spotify',
    # 'allauth.socialaccount.providers.stackexchange',
    # 'allauth.socialaccount.providers.steam',
    # 'allauth.socialaccount.providers.stocktwits',
    # 'allauth.socialaccount.providers.strava',
    # 'allauth.socialaccount.providers.stripe',
    # 'allauth.socialaccount.providers.telegram',
    # 'allauth.socialaccount.providers.trainingpeaks',
    # 'allauth.socialaccount.providers.trello',
    # 'allauth.socialaccount.providers.tumblr',
    # 'allauth.socialaccount.providers.twentythreeandme',
    # 'allauth.socialaccount.providers.twitch',
    # 'allauth.socialaccount.providers.twitter',
    # 'allauth.socialaccount.providers.twitter_oauth2',
    # 'allauth.socialaccount.providers.untappd',
    # 'allauth.socialaccount.providers.vimeo',
    # 'allauth.socialaccount.providers.vimeo_oauth2',
    # 'allauth.socialaccount.providers.vk',
    # 'allauth.socialaccount.providers.wahoo',
    # 'allauth.socialaccount.providers.weibo',
    # 'allauth.socialaccount.providers.weixin',
    # 'allauth.socialaccount.providers.xing',
    # 'allauth.socialaccount.providers.yandex',
    # 'allauth.socialaccount.providers.ynab',
    # 'allauth.socialaccount.providers.zoho',
    # 'allauth.socialaccount.providers.feishu',
    # "allauth.socialaccount.providers.atlassian",
]

#For the RESTful API and JavaScript frontend authentication

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',  # Use token authentication
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',  # Ensure users are authenticated
    ),
}



MIDDLEWARE = [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    # Add the account middleware:
    "allauth.account.middleware.AccountMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    # Custom
    'autopilot.middleware.DisableCSRFMiddlewareForAPIs',
    'django.middleware.csrf.CsrfViewMiddleware',
]

ROOT_URLCONF = "autopilot.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(PROJECT_DIR, "templates"),
            os.path.join(PROJECT_DIR, "home/templates"),
            os.path.join(PROJECT_DIR, "scripts/templates"),
            os.path.join(PROJECT_DIR, "autopilot/templates"),
            os.path.join(PROJECT_DIR, "autopilot/templates/users"),
            os.path.join(PROJECT_DIR, "autopilot/templates/allauth"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.debug',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.request',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = "autopilot.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'autopilot',
        'USER': 'autopilot',
        'PASSWORD': 'autopilot',
        'HOST': 'postgres',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
 #   {
 #       "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
 #   },
 #   {
 #       "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
 #   },
 #   {
 #       "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
 #   },
 #   {
 #       "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
 #   },
]

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by email
    'allauth.account.auth_backends.AuthenticationBackend',
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/
LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

COMPRESS_ROOT = os.path.join(BASE_DIR, 'static')

COMPRESS_ENABLED = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
    'compressor.finders.CompressorFinder',
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "autopilot/static"),
    os.path.join(BASE_DIR, "home"),
    os.path.join(BASE_DIR, "scripts"),
]

STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "static/"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "media/"

# Default storage settings, with the staticfiles storage updated.
# See https://docs.djangoproject.com/en/5.0/ref/settings/#std-setting-STORAGES
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    # ManifestStaticFilesStorage is recommended in production, to prevent
    # outdated JavaScript / CSS assets being served from cache
    # (e.g. after a Wagtail upgrade).
    # See https://docs.djangoproject.com/en/5.0/ref/contrib/staticfiles/#manifeststaticfilesstorage
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.ManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

ACCOUNT_AUTHENTICATION_METHOD = "username_email"
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = True
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 4
ACCOUNT_USERNAME_MIN_LENGTH = 6
ACCOUNT_USERNAME_BLACKLIST = ["admin", "god"]
ACCOUNT_LOGOUT_ON_GET = True
ACCOUNT_LOGIN_ON_PASSWORD_RESET = True
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_PRESERVE_USERNAME_CASING = False
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_LOGOUT_ON_PASSWORD_CHANGE = False
ACCOUNT_LOGIN_BY_CODE_ENABLED = True

CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"
CRISPY_TEMPLATE_PACK = "bootstrap5"


CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = ['*']

HEADLESS_ONLY = True
HEADLESS_FRONTEND_URLS = {
    "account_confirm_email": "/account/verify-email/{key}",
    "account_reset_password": "/account/password/reset",
    "account_reset_password_from_key": "/account/password/reset/key/{key}",
    "account_signup": "/account/signup",
    "socialaccount_login_error": "/account/provider/callback",
}

MFA_SUPPORTED_TYPES = ["totp", "recovery_codes", "webauthn"]
MFA_PASSKEY_LOGIN_ENABLED = True
MFA_PASSKEY_SIGNUP_ENABLED = True

ACCOUNT_EMAIL_VERIFICATION_BY_CODE_ENABLED = True
