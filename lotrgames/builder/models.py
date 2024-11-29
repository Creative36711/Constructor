from django.db import models
from django.urls import reverse

class MapTemplates(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название карты")
    description = models.TextField(blank=True, verbose_name="Описание карты")
    author = models.CharField(max_length=50, verbose_name="Автор")
    modes = models.CharField(max_length=255, verbose_name="Режимы")
    players = models.IntegerField(verbose_name="Максимум игроков")
    file = models.FileField(upload_to='map_design/template', verbose_name="Шаблон карты")
    art = models.FileField(upload_to="map_design/art", verbose_name="Арт")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Шаблоны карт'
        verbose_name_plural = 'Шаблоны карт'
        ordering = ['-time_create', 'title']

class GameObjects(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название объекта")
    img = models.FileField(upload_to="objects/portrait", verbose_name="Портрет")
    side = models.CharField(max_length=50, verbose_name="Фракция")
    displayName = models.CharField(max_length=255, verbose_name="Отображаемое имя")
    buildCost = models.IntegerField(verbose_name="Стоимость")
    kindOf = models.TextField(blank=True, verbose_name="Разновидность")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Игровые объекты'
        verbose_name_plural = 'Игровые объекты'
        ordering = ['side']
