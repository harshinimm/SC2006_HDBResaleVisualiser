from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Your custom fields here (if any)
    REQUIRED_FIELDS = ['email']  # List of required fields for creating a user

    def __str__(self):
        return self.username


class PasswordReset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=32, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiration_time = models.DateTimeField(default=timezone.now() + timedelta(hours=1))  # Token expires in 1 hour
    is_used = models.BooleanField(default=False)  # To mark if the token has been used
    
    def is_expired(self):
        return timezone.now() > self.expiration_time

    def __str__(self):
        return f"Password reset for {self.user.username} ({self.token})"