from django.db import models

class Pressao(models.Model):
    pressao_sistolica = models.FloatField()
    pressao_diastolica = models.FloatField()
    classificacao = models.CharField(max_length=50)
    data_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pressao_sistolica}/{self.pressao_diastolica} - {self.classificacao}"
