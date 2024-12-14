from django.shortcuts import render, redirect
from django.utils.timezone import localtime
from .forms import PressaoForm
from .models import Pressao


def classificar_pressao(ps, pd):
    if ps < 130 and 80 <= pd <= 89:
        return "Pressão Normal"
    elif 130 <= ps <= 139 and 90 <= pd <= 99:
        return "Normal Limitrofe"
    elif (140 <= ps <= 159) or (100 <= pd <= 109):
        return "Hipertensão leve (estágio 1)"
    elif 160 <= ps <= 179 or (110 <= pd <= 119):
        return "Hipertensão moderada (estágio 2)"
    elif ps >= 180 or pd >= 120:
        return "Hipertensão Grave (estágio 3)"
    else:
        return "Indeterminado"


def index(request):
    if request.method == 'POST':
        form = PressaoForm(request.POST)
        if form.is_valid():
            pressao = form.save(commit=False)
            pressao.classificacao = classificar_pressao(pressao.pressao_sistolica, pressao.pressao_diastolica)
            pressao.save()
            return redirect('index')
    else:
        form = PressaoForm()

    registros = Pressao.objects.all().order_by('data_hora')

    labels = [localtime(registro.data_hora).strftime('%d/%m/%y %H:%M') for registro in registros]
    sistolica = [registro.pressao_sistolica for registro in registros]
    diastolica = [registro.pressao_diastolica for registro in registros]

    return render(request, '../templates/index.html', {
        'form': form,
        'registros': registros,
        'labels': labels,
        'sistolica': sistolica,
        'diastolica': diastolica,
    })
