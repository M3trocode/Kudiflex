from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import UserProfile
from .utils import add_transaction

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')

        # Validate form data
        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        if len(password) < 8:
            messages.error(request, "Password must be at least 8 characters.")
            return redirect('signup')

        # Create the user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            messages.success(request, "Account created successfully.")
            return redirect('pin')
        except Exception as e:
            messages.error(request, f"Error: {str(e)}")
            return redirect('signup')

    return render(request, 'signup.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')

    return render(request, 'login.html')

@login_required
def set_pin(request):
    if request.method == "POST":
        try:
            # Parse the JSON data
            data = json.loads(request.body)
            pin = data.get("pin", "")

            # Validate the pin (should be exactly 4 digits)
            if len(pin) != 4 or not pin.isdigit():
                return JsonResponse({"message": "Invalid PIN format. Please enter a 4-digit PIN."}, status=400)

            # Save the PIN to the user's profile
            user_profile, created = UserProfile.objects.get_or_create(user=request.user)
            user_profile.pin = pin
            user_profile.save()

            return JsonResponse({"message": "Pin set successfully!"}, status=200)
        except Exception as e:
            print(f"Error setting pin: {e}")
            return JsonResponse({"message": "An error occurred while setting the PIN."}, status=500)

    return JsonResponse({"message": "Invalid request method."}, status=405)


# views.py
from django.shortcuts import render
from .models import UserProfile

def dashboard_view(request):
    profile = UserProfile.objects.get(user=request.user)
    return render(request, 'dashboard.html', {'wallet_balance': profile.wallet_balance})

# def deposit_view(request):
#     if request.method == 'POST':
#         amount = request.POST.get('amount')
#         # Update wallet balance here
#         profile = UserProfile.objects.get(user=request.user)
#         profile.wallet_balance += Decimal(amount)
#         profile.save()
#         # Record the transaction
#         add_transaction(request.user, 'deposit', amount)
#         return redirect('dashboard')

