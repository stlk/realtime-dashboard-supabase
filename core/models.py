from django.db import models


class Record(models.Model):
    date = models.DateField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    metric = models.CharField(max_length=255)
