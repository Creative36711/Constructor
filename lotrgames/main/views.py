from django.http import HttpResponse, HttpResponseNotFound, Http404, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.contrib.auth import logout, login
import json

from .models import *
from .forms import *
from .utils import *

class MainHome(DataMixin, ListView):
    form_class = RegisterUserForm
    success_url = reverse_lazy('home')
    model = News
    template_name = 'main/index.html'
    context_object_name = "posts"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Главная страница")
        context['mapPopular_1'] = Maps.objects.filter(is_published=True).order_by('-downloads')[0]
        context['mapPopular_2'] = Maps.objects.filter(is_published=True).order_by('-downloads')[1]
        context['mapsPopular_1'] = Maps.objects.filter(is_published=True).order_by('-downloads')[2:5]
        context['mapsPopular_2'] = Maps.objects.filter(is_published=True).order_by('-downloads')[5:8]
        context['mapsUpdate_1'] = Maps.objects.filter(is_published=True).order_by('-time_update')[0:4]
        context['mapsUpdate_2'] = Maps.objects.filter(is_published=True).order_by('-time_update')[4:8]
        return dict(list(context.items()) + list(c_def.items()))

    def get_queryset(self):
        return News.objects.filter(is_published=True)

class NewsView(DataMixin, ListView):
    model = News
    template_name = 'main/news.html'
    context_object_name = "posts"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Новости")
        return dict(list(context.items()) + list(c_def.items()))

    def get_queryset(self):
        return News.objects.filter(is_published=True)

class NewsCategory(DataMixin, ListView):
    model = News
    template_name = 'main/news.html'
    context_object_name = "posts"
    allow_empty = False

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title=str(context['posts'][0].cat), cat_selected=context['posts'][0].cat_id)
        return dict(list(context.items()) + list(c_def.items()))

    def get_queryset(self):
        return News.objects.filter(cat__slug=self.kwargs['cat_slug'], is_published=True)

class ShowPost(DataMixin, DetailView):
    model = News
    template_name = 'main/post.html'
    slug_url_kwarg = 'post_slug'
    context_object_name = 'post'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title=context['post'])
        return dict(list(context.items()) + list(c_def.items()))

class MapsView(DataMixin, ListView):
    model = Maps
    template_name = 'main/maps.html'
    context_object_name = "maps"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Карты")
        return dict(list(context.items()) + list(c_def.items()))

    def get_queryset(self):
        return Maps.objects.filter(is_published=True)


class MapsCategory(DataMixin, ListView):
    model = Maps
    template_name = 'main/maps.html'
    context_object_name = "maps"
    allow_empty = False

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title=str(context['maps'][0].mode), cat_selected=context['maps'][0].mode_id)
        return dict(list(context.items()) + list(c_def.items()))

    def get_queryset(self):
        print(self.kwargs)
        return Maps.objects.filter(mode__slug=self.kwargs['mode_slug'], is_published=True)

class ShowMap(DataMixin, DetailView):
    model = Maps
    template_name = 'main/map.html'
    slug_url_kwarg = 'map_slug'
    context_object_name = 'map'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title=context['map'])
        return dict(list(context.items()) + list(c_def.items()))

class MapPublication (DataMixin, ListView):
    model = Maps
    template_name = 'main/map-publication.html'
    context_object_name = "maps"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Публикация карты")
        return dict(list(context.items()) + list(c_def.items()))

def pageNotFound (request, exception):
    return HttpResponseNotFound('<h1>Страница не найдена</h1>')


def ajaxNews(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'POST':
            data = json.load(request)
            post = data.get('post')
            row = News.objects.get(slug=post[0])
            row.views = post[2]
            row.save()
            return JsonResponse({'status': 'Todo added!'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')

def ajaxMaps(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'POST':
            data = json.load(request)
            post = data.get('post')
            row = Maps.objects.get(slug=post[0])
            if post[1] == "views":
                row.views = post[2]
            elif post[1] == "downloads":
                row.downloads = post[2]
            row.save()
            return JsonResponse({'status': 'Todo added!'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')

class RegisterUser(DataMixin, CreateView):
    form_class = RegisterUserForm
    template_name = 'main/register.html'
    success_url = reverse_lazy('home')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Регистрация")
        return dict(list(context.items()) + list(c_def.items()))

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('home')

class LoginUser(DataMixin, LoginView):
    form_class = LoginUserForm
    template_name = 'main/login.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Авторизация")
        return dict(list(context.items()) + list(c_def.items()))

    def get_success_url(self):
        return reverse_lazy('home')

def logout_user(request):
    logout(request)
    return redirect('home')



