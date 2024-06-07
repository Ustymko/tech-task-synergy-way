from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import User, Bank
from .serializers import BankSerializer, UserSerializer, BankWritableSerializer


class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return BankWritableSerializer
        return BankSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.users.exists():
            return Response(
                {"error": "Cannot delete bank with assigned users."},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def test(request):
    return HttpResponse("Hello World")

