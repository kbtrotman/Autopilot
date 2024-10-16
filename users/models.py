from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
   

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        # Superusers should have both is_staff and is_admin set to True
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
    
    
class UserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.TextField(max_length=50)
    is_staff = models.BooleanField(default=False)  # Access to Django admin
    is_admin = models.BooleanField(default=False)  # Access to App-specific management
    is_active = models.BooleanField(default=True)  # Needed by Django
    is_superuser = models.BooleanField(default=False)  # Already provided by PermissionsMixin
    is_tenant_admin = models.BooleanField(default=False) # Obvious, but enough admins???
    desc = models.TextField(max_length=100, name="description")
    phone = models.CharField(max_length=13, name="phone")
    location = models.CharField(max_length=30, name="location")
    tenant = models.IntegerField(default='0')
    pri_group = models.CharField(max_length=100, name="pri_grp")
    ad_groups = models.CharField(max_length=100, name="ad_grps")
    role = models.CharField(max_length=100, name="role")
    remote = models.BooleanField(default=False)
    dashboard = models.CharField(max_length=25, name="dashboard")
    favorites = models.CharField(max_length=100)


    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    @property
    def user_is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
  
    @property
    def user_is_admin(self):
        "Is the user a member of staff?"
        return self.is_admin
    
    @property
    def User_is_tenant_admin(self):
        "Is the user a member of staff?"
        # Tennt Level Only
        return self.is_tenant_admin  
