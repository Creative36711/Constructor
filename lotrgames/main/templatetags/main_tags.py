from django import template
from main.models import *

register = template.Library()

@register.inclusion_tag('main/sidebar.html')
def show_sidebar():
    return