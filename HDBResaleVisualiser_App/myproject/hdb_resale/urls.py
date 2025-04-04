from django.urls import path
from . import views

urlpatterns = [
    path('towns/', views.get_towns, name='get_towns'),
    path('years/', views.get_years, name='get_years'),
    path('resale_analysis/', views.resale_analysis, name='resale_analysis'),
    path("resale_comparison/", views.resale_comparison),
    path('comparison_graph/', views.comparison_graph, name='comparison_graph'),
]