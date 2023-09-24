import itertools
import random
from datetime import date, timedelta

from django.core.management.base import BaseCommand

from core.models import Record


class Command(BaseCommand):
    help = "Populate the Record model with random values for August 2023"

    def handle(self, *args, **kwargs):
        start_date = date(2023, 8, 1)
        end_date = date(2023, 8, 31)
        metrics = ["Google", "Facebook"]

        for single_date, metric in itertools.product(
            [start_date + timedelta(days=n) for n in range((end_date - start_date).days + 1)],
            metrics,
        ):
            value = round(random.uniform(50, 500), 2)
            Record.objects.create(date=single_date, value=value, metric=metric)

        self.stdout.write(self.style.SUCCESS("Records have been populated successfully."))
