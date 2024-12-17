from django.urls import path

from .views import *

urlpatterns = [
    path('', MainHome.as_view(), name='home'),
    path('news/', NewsView.as_view(), name='news'),
    path('news/<slug:post_slug>/', ShowPost.as_view(), name='post'),
    path('category/<slug:cat_slug>/', NewsCategory.as_view(), name='category'),
    path('maps/', MapsView.as_view(), name='maps'),
    path('maps/<slug:map_slug>/', ShowMap.as_view(), name='map'),
    path('mode/<slug:mode_slug>/', MapsCategory.as_view(), name='mode'),
    path('map-publication/', MapPublication.as_view(), name='map-publication'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('logout/', logout_user, name='logout'),
    path('ajaxNews', ajaxNews, name='ajaxNews'),
    path('ajaxMaps', ajaxMaps, name='ajaxMaps'),
]