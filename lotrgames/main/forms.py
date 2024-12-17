from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User

from .models import *

# class AddMapForm(forms.ModelForm):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields['mode'].empty_label = "Режим не выбран"
#
#     class Meta:
#         model = Maps
#         fields = ['title', 'slug', 'version', 'content', 'photo', 'is_published', 'mode']
#         widgets = {
#             'title': forms.TextInput(attrs={'class': 'form-input'}),
#             'content': forms.Textarea(attrs={'cols': 60, 'rows': 10})
#         }

class RegisterUserForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'input-value', 'placeholder': 'Никнейм'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'input-value', 'placeholder': 'Email'}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'input-value', 'placeholder': 'Пароль'}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'input-value', 'placeholder': 'Подтвердите пароль'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginUserForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'input-value', 'placeholder': 'Никнейм'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'input-value', 'placeholder': 'Пароль'}))