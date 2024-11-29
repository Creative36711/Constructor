from django.http import HttpResponse, HttpResponseNotFound, Http404, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from django.core import serializers

from .models import *

def index (request):
    context = {
        'title': 'Конструктор карт',
    }

    return render(request, 'builder/index.html', context=context)

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def mapTemplates(request):
    templates = serializers.serialize('json', MapTemplates.objects.all())
    if is_ajax(request=request):
        message = templates
    else:
        message = "Ошибка запроса"
    return HttpResponse(message, content_type='application/json')

def gameObjects(request):
    faction = request.GET.get('faction', '')
    templates = serializers.serialize('json', GameObjects.objects.filter(side=faction))
    if is_ajax(request=request):
        message = templates
    else:
        message = "Ошибка запроса"
    return HttpResponse(message, content_type='application/json')





