from django.db import models
from django.urls import reverse

class News(models.Model):
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    content = models.TextField(blank=True, verbose_name="Текст статьи")
    photo = models.ImageField(upload_to="photos/%Y/%m/%d/", verbose_name="Изображение")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Время изменения")
    is_published = models.BooleanField(default=True, verbose_name="Публикация")
    author = models.CharField(max_length=50, default="Creative", verbose_name="Автор")
    views = models.PositiveIntegerField(default=0, verbose_name="Просмотры")
    rating = models.FloatField(default=0, verbose_name="Рейтинг")
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name="Категория")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('post', kwargs={'post_slug': self.slug})

    class Meta:
        verbose_name = 'Новости'
        verbose_name_plural = 'Новости'
        ordering = ['-time_create', 'title']

class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True, verbose_name="Категория")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category', kwargs={'cat_slug': self.slug})

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['id']

class Maps(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название карты")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    version = models.CharField(max_length=10, verbose_name="Версия карты")
    description = models.TextField(blank=True, verbose_name="Описание карты в игре")
    content = models.TextField(blank=True, verbose_name="Описание карты на сайте")
    photo = models.ImageField(upload_to="photos/%Y/%m/%d/", verbose_name="Изображение")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Время обновления")
    is_published = models.BooleanField(default=False, verbose_name="Публикация")
    author = models.CharField(max_length=50, verbose_name="Автор")
    template = models.CharField(max_length=255, verbose_name="Шаблон карты", blank=True) # временно
    views = models.PositiveIntegerField(default=0, verbose_name="Просмотры")
    rating = models.FloatField(default=0, verbose_name="Рейтинг")
    downloads = models.PositiveIntegerField(default=0, verbose_name="Загрузки")
    mode = models.ForeignKey('Mode', on_delete=models.PROTECT, verbose_name="Режим игры")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('map', kwargs={'map_slug': self.slug})

    class Meta:
        verbose_name = 'Карта'
        verbose_name_plural = 'Карты'
        ordering = ['-time_update', 'title']

class Mode(models.Model):
    name = models.CharField(max_length=100, db_index=True, verbose_name="Режим игры")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('mode', kwargs={'mode_slug': self.slug})

    class Meta:
        verbose_name = 'Режим игры'
        verbose_name_plural = 'Режимы игры'
        ordering = ['id']

