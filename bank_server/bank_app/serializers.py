from rest_framework import serializers
from .models import User, Bank


class UserSerializer(serializers.ModelSerializer):
    banks = serializers.PrimaryKeyRelatedField(queryset=Bank.objects.all(), many=True)

    class Meta:
        model = User
        fields = ['id', 'password', 'first_name', 'last_name', 'password', 'email', 'banks']

    def create(self, validated_data):
        banks = validated_data.pop('banks', [])
        user = User.objects.create(**validated_data)
        user.banks.set(banks)
        return user

    def update(self, instance, validated_data):
        banks = validated_data.pop('banks', [])
        instance = super().update(instance, validated_data)
        instance.banks.set(banks)
        return instance


class BankSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Bank
        fields = ['id', 'bank_name', 'routing_number', 'swift_bic', 'users']

    def create(self, validated_data):
        users = validated_data.pop('users', [])
        bank = Bank.objects.create(**validated_data)
        bank.users.set(users)
        return bank

    def update(self, instance, validated_data):
        users = validated_data.pop('users', [])
        instance = super().update(instance, validated_data)
        instance.users.set(users)
        return instance
