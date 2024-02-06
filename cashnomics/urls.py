
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("dashboard", views.dashboard, name='dashboard'),
    path("json_api", views.json_api, name='json_api'),
    path("json_api_add", views.json_api_add, name='json_api_add'),
    path("ranking", views.ranking, name="ranking"),
    path("add", views.add, name="add"),
    path("update/<int:financial_model_id>", views.update, name="update"),
    path('models/<int:financial_model_id>/', views.update_model_data, name='update_model_data'),
    path('intro', views.intro, name='intro'),
]