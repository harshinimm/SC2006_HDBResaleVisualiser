from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import timezone

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk) + str(timestamp) + user.is_active
    
class CustomTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk) + str(timestamp)

# Use the custom token generator instead of the default one
custom_token_generator = CustomTokenGenerator()
account_activation_token = AccountActivationTokenGenerator()