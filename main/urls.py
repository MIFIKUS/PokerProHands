from django.urls import path
from . import views

urlpatterns = [
    path('all_deals/', views.all_deals),
]
