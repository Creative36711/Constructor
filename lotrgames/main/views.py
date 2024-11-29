from django.http import HttpResponse, HttpResponseNotFound, Http404
from django.shortcuts import render, redirect, get_object_or_404

from .models import *

def index (request):
    posts = News.objects.all()
    cats = Category.objects.all()

    print(News.objects.filter(tags='Первая'))

    context = {
        'title': 'Главная страница',
        'cats': cats,
        'posts': posts,
        'cat_selected': 0,
    }
    return render(request, 'main/index.html', context=context)

def news (request):
    posts = News.objects.all()
    cats = Category.objects.all()

    context = {
        'title': 'Новости',
        'posts': posts,
        'cats': cats,
        'cat_selected': 0,
    }

    return render(request, 'main/news.html', context=context)

def show_category(request, cat_id):
    posts = News.objects.filter(cat_id=cat_id)
    cats = Category.objects.all()

    if len(posts) == 0:
        raise Http404()

    context = {
        'posts': posts,
        'cats': cats,
        'title': 'Главная страница',
        'cat_selected': cat_id,
    }

    return render(request, 'main/news.html', context=context)

def show_post(request, post_slug):
    post = get_object_or_404(News, slug=post_slug)
    cats = Category.objects.all()

    context = {
        'post': post,
        'cats': cats,
        'title': post.title,
        'cat_selected': post.cat,
    }

    return render(request, 'main/post.html', context=context)

def pageNotFound (request, exception):
    return HttpResponseNotFound('<h1>Страница не найдена</h1>')

