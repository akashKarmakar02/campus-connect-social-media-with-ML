from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import RegisterAPI, LoginAPI, ProfileImageDownloadAPIView, UserDetailsAPI


urlpatterns = [
    path('register/', RegisterAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('profile-image/<int:user_id>', ProfileImageDownloadAPIView.as_view(), name='profile-image-download'),
    path('user/', UserDetailsAPI.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
