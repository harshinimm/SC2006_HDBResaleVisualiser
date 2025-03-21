from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from account.models import User 
from django.contrib.auth.hashers import make_password
from .models import PasswordReset
from myproject import settings
from .serializers import SignupSerializer, LoginSerializer, ForgotPasswordSerializer,ResetPasswordSerializer,UpdateUserSerializer
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.conf import settings
from .tokens import custom_token_generator
from datetime import timedelta
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response



class SignupAPIView(APIView):
    """Handles user signup by validating input and creating new users."""

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Signup successful!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    """Handles user login by authenticating the credentials."""

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            print(f"Attempting to authenticate: {username}")  # ✅ Debug log

            user = authenticate(username=username, password=password)

            if user is None:
                print(f"Authentication failed for user: {username}")  # ✅ Debug log
                return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

            if not user.is_active:
                print(f"User {username} is inactive.")  # ✅ Debug log
                return Response({"detail": "User account is inactive."}, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken.for_user(user)
            print(f"User {username} authenticated successfully!")  # ✅ Debug log
            access = refresh.access_token

            print(f"Generated Access Token: {str(access)}")  # ✅ Debug log
            print(f"Generated Refresh Token: {str(refresh)}")  # ✅ Debug log

            return Response({
                "access": str(refresh.access_token),  # Short-lived token
                "refresh": str(refresh),  # Long-lived token
                "detail": "Login successful!"
            }, status=status.HTTP_200_OK)

        print(f"Serializer errors: {serializer.errors}")  # ✅ Debug log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordAPIView(APIView):
    """Handles forgot password functionality (sending an email with reset instructions)."""

    def post(self, request):
        # Validate the email using serializer
        serializer = ForgotPasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            print(f"Attempting to reset password for email: {email}")

            # Generate a unique token for the user (assuming the user exists based on serializer validation)
            user = User.objects.get(email=email)
            token = custom_token_generator.make_token(user)
            reset_link = f"{settings.FRONTEND_URL}/reset-password/{token}"
            print(f"Sending reset email to: {email}")

            password_reset_entry = PasswordReset.objects.create(
                    user=user,
                    token=token,
                    expiration_time=timezone.now() + timedelta(hours=1)  # Set token expiration time
                )

            # Send an email to the user with instructions to reset the password
            send_mail(
                'Password Reset Request',
                f'Hello, to reset your password, please visit the following link: {reset_link}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            print("Email sent successfully!") 

            return Response({"detail": "Password reset instructions sent to your email."}, status=status.HTTP_200_OK)

        else:
            print(f"Serializer is invalid: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
class ResetPasswordAPIView(APIView):
    """Handles password reset functionality by validating the token and updating the password."""

    def post(self, request):
        print(f"Received request data: {request.data}")  # Debug print
        serializer = ResetPasswordSerializer(data=request.data)

        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']
            print(f"Validated data: token={token}, new_password={new_password}")  # Debug print

            try:
                # Check if the token is valid and get the associated user
                password_reset_entry = PasswordReset.objects.get(token=token)
                print(f"Password reset entry found for token: {token}")  # Debug print
                
                user = password_reset_entry.user
                print(f"Found user for token: {user.username}, email: {user.email}")  # Debug print

                # Update the user's password
                print(f"Updating password for user {user.username}")  # Debug print
                user.password = make_password(new_password)
                user.save()
                print(f"Password updated successfully for user {user.username}")  # Debug print

                # Optionally, delete the token after it's used
                password_reset_entry.delete()
                print(f"Token {token} deleted after use.")  # Debug print

                return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)

            except PasswordReset.DoesNotExist:
                print(f"Token {token} does not exist.")  # Debug print
                return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        print(f"Serializer errors: {serializer.errors}")  # Debug print
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RefreshTokenAPIView(TokenRefreshView):
    """Handles refreshing the access token using the refresh token."""
    def post(self, request):
        refresh_token = request.data.get("refresh")

        try:
            refresh = RefreshToken(refresh_token)
            return Response({
                "access": str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        except Exception:
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_401_UNAUTHORIZED)
        
        
class UserProfileAPIView(APIView):
    """Returns the currently authenticated user's profile information."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        response_data = {
            "username": user.username,
            "email": user.email,  # ✅ Check if this is returning correctly
            "first_name": user.first_name,
            "last_name": user.last_name,
            "date_joined": user.date_joined.strftime("%Y-%m-%d"),
        }
        print("User Profile API Response:", response_data)  # ✅ Debugging output
        return Response(response_data)
    
class UpdateUserProfileAPIView(APIView):
    """Handles user profile updates, requiring password confirmation."""
    permission_classes = [IsAuthenticated]

    def put(self, request):
        print(f"Received request to update profile: {request.data}")  # Debugging log
        serializer = UpdateUserSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            user = request.user
            serializer.update(user, serializer.validated_data)

            print(f"Profile updated: username={user.username}, email={user.email}")  # Debugging log
            return Response({"username": user.username, "email": user.email}, status=status.HTTP_200_OK)

        print(f"Profile update failed: {serializer.errors}")  # Debugging log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)