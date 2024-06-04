from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    image_uri = models.TextField(default="")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = "user"


class Bank(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    central_office_location = models.CharField(max_length=255)
    swift_code = models.CharField(max_length=11)
    users = models.ManyToManyField(User, related_name='banks')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "bank"