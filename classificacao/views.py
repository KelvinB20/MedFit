from django.shortcuts import render, redirect
from .forms import PressaoForm
from .models import Pressao


def classificar_pressao(ps, pd):
    if ps < 120 and pd < 80:
        return "Pressão Normal"
    elif 120 <= ps < 130 and pd < 80:
        return "Pressão Elevada"
    elif (130 <= ps <= 139) or (80 <= pd <= 89):
        return "Hipertensão Estágio 1"
    elif ps >= 140 or pd >= 90:
        return "Hipertensão Estágio 2"
    elif ps >= 180 or pd >= 120:
        return "Crise Hipertensiva"
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

    labels = [registro.data_hora.strftime('%d/%m/%y %H:%M') for registro in registros]
    sistolica = [registro.pressao_sistolica for registro in registros]
    diastolica = [registro.pressao_diastolica for registro in registros]

    return render(request, '../templates/index.html', {
        'form': form,
        'registros': registros,
        'labels': labels,
        'sistolica': sistolica,
        'diastolica': diastolica,
    })
