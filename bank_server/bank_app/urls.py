from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import test
from .views import UserViewSet, BankViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'banks', BankViewSet)

urlpatterns = [
    path("test", test, name="test"),
    path("", include(router.urls))
]
