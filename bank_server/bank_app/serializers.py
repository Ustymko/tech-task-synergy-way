from rest_framework import serializers
from .models import User, Bank


class BankForUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'bank_name', 'routing_number', 'swift_bic']


class UserSerializer(serializers.ModelSerializer):
    banks = BankForUserSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'password', 'first_name', 'last_name', 'username', 'email', 'banks']

    def create(self, validated_data):
        banks = validated_data.pop('banks', [])
        user = User.objects.create(**validated_data)
        user.banks.set(banks)
        return user

    def update(self, instance, validated_data):
        users_data = validated_data.pop('banks', None)
        if users_data is not None:
            instance.users.set(users_data)
        return super().update(instance, validated_data)


class UserWritableSerializer(serializers.ModelSerializer):
    banks = serializers.PrimaryKeyRelatedField(many=True, queryset=Bank.objects.all())

    class Meta:
        model = User
        fields = ['id', 'password', 'first_name', 'last_name', 'username', 'email', 'banks']


class UserForBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'password', 'first_name', 'last_name', 'username', 'email']


class BankSerializer(serializers.ModelSerializer):
    users = UserForBankSerializer(many=True)

    def update(self, instance, validated_data):
        users_data = validated_data.pop('users', None)
        if users_data is not None:
            instance.users.set(users_data)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        users = validated_data.pop('users', [])
        bank = Bank.objects.create(**validated_data)
        bank.users.set(users)
        return bank

    class Meta:
        model = Bank
        fields = ['id', 'bank_name', 'routing_number', 'swift_bic', 'users']


class BankWritableSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Bank
        fields = ['id', 'bank_name', 'routing_number', 'swift_bic', 'users']
