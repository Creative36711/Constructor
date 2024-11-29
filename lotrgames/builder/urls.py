from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='builder'),
    path('mapTemplates', mapTemplates, name='mapTemplates'),
    path('gameObjects', gameObjects, name='gameObjects')
]

