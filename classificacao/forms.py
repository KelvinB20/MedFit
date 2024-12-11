from django import forms
from .models import Pressao

class PressaoForm(forms.ModelForm):
    class Meta:
        model = Pressao
        fields = ['pressao_sistolica', 'pressao_diastolica']
