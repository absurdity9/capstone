
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("dashboard", views.dashboard, name='dashboard'),
    path("json_api", views.json_api, name='json_api'),
    path("ranking", views.ranking, name="ranking")
]