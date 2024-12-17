from django.db.models import Count

from .models import *

class DataMixin:
    paginate_by = 10
    def get_user_context(self, **kwargs):
        context = kwargs
        cats = Category.objects.annotate(Count('news'))
        modes = Mode.objects.annotate(Count('maps'))
        latestNews = News.objects.filter(is_published=True).order_by('-time_create')[:2]

        if self.request.user.is_authenticated:
            context['authenticated'] = True


        context['cats'] = cats
        context['modes'] = modes
        context['latestNews'] = latestNews
        if 'cat_selected' not in context:
            context['cat_selected'] = 0
        return context