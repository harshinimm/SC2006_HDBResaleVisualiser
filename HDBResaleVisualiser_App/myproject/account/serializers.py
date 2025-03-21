from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from .models import PasswordReset
from .validators import validate_password

class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate(self, data):
        # Check if the password and confirm_password match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        # Call the validate_password function to check the password
        validate_password(data['password'], data['email'], data['username'])

        # Check if the username or email already exists
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "Username already exists."})
        
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Email already exists."})

        return data

    def create(self, validated_data):
        # Remove confirm_password before saving to prevent it from being stored
        validated_data.pop('confirm_password')
        validated_data['password'] = make_password(validated_data['password'])  # Hash password
        return User.objects.create(**validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class UpdateUserSerializer(serializers.Serializer):
    """Serializer for updating username and email with password verification."""
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Ensure username & email are unique and password is correct."""
        user = self.context["request"].user  # Get the logged-in user

        # ✅ Verify password before allowing updates
        if not user.check_password(data["password"]):
            print(f"Password verification failed for user: {user.username}")
            raise serializers.ValidationError({"password": "Incorrect password."})

        # ✅ Ensure email is unique (if changed)
        if "email" in data and User.objects.filter(email=data["email"]).exclude(id=user.id).exists():
            print(f"Email {data['email']} is already in use.")
            raise serializers.ValidationError({"email": "This email is already in use."})

        # ✅ Ensure username is unique (if changed)
        if "username" in data and User.objects.filter(username=data["username"]).exclude(id=user.id).exists():
            print(f"Username {data['username']} is already taken.")
            raise serializers.ValidationError({"username": "This username is already taken."})

        return data

    def update(self, instance, validated_data):
        """Update user details after validation."""
        print(f"Updating user profile for: {instance.username}")

        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        print(f"Profile updated successfully for user: {instance.username}")
        return instance


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # You can add custom validation logic here, such as checking if the email exists in the database
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email not found.")
        return value

class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()  # This will be the reset token sent to the user's email
    new_password = serializers.CharField(min_length=8)  # The new password to be set for the user
    confirm_new_password = serializers.CharField(min_length=8)  # Confirm the new password

    def validate_token(self, value):
        print(f"Validating token: {value}")  # Debug print
        try:
            reset_entry = PasswordReset.objects.get(token=value)
            print(f"Token found: {reset_entry.token}, created at: {reset_entry.created_at}")  # Debug print
            
            if reset_entry.is_expired():  # Assuming you have a method to check expiration
                print(f"Token {value} has expired.")  # Debug print
                raise serializers.ValidationError("Token has expired.")
        except PasswordReset.DoesNotExist:
            print(f"Token {value} not found in the database.")  # Debug print
            raise serializers.ValidationError("Invalid token.")
        
        print(f"Token {value} is valid.")  # Debug print
        return value

    def validate(self, data):
        print(f"Validating passwords: new_password={data['new_password']}, confirm_new_password={data['confirm_new_password']}")  # Debug print
        
        if data['new_password'] != data['confirm_new_password']:
            print("Passwords do not match.")  # Debug print
            raise serializers.ValidationError({"new_password": "Passwords do not match."})

        # Call the validate_password function to check the password
        validate_password(data['new_password'], None, None)  # Assuming email is available in the request

        print("Passwords match and are valid.")  # Debug print
        return data

    def validate_new_password(self, value):
        print(f"Validating new password: {value}")  # Debug print
        # Just call the validate_password function for validation
        validate_password(value, None, None)
        print("New password is valid.")  # Debug print
        return value
    