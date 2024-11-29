from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='home'),
    path('news/', news, name='news'),
    path('news/<slug:post_slug>/', show_post, name='post'),
    path('category/<int:cat_id>/', show_category, name='category'),
]