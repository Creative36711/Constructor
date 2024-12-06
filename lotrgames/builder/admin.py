from django.contrib import admin

from .models import *

class MapTemplatesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'time_create', 'img')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'author')
    list_filter = ('time_create',)

class GameObjectsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'displayName', 'side', 'img')
    list_display_links = ('id', 'name')
    search_fields = ('name', 'displayName')
    list_filter = ('side',)


admin.site.register(MapTemplates, MapTemplatesAdmin)
admin.site.register(GameObjects, GameObjectsAdmin)
