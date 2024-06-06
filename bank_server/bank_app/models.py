from django.db import models


class User(models.Model):
    # password shouldn't be stored like this, the field is just representational
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = "user"


class Bank(models.Model):
    bank_name = models.CharField(max_length=100)
    routing_number = models.CharField(max_length=9)
    swift_bic = models.CharField(max_length=11)
    users = models.ManyToManyField(User, related_name='banks')

    def __str__(self):
        return self.bank_name

    class Meta:
        db_table = "bank"