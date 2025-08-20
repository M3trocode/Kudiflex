from django.urls import path
from .views import signup_view, login_view,set_pin,dashboard_view

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('set_pin', set_pin, name='set_pin'),
    path('dashboard/', dashboard_view, name='dashboard'),
    # path('deposit/', deposit_view, name='deposit'),
]
