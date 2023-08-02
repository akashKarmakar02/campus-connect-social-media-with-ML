import datetime

import jwt
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from accounts.models import User
from accounts.serializers import UserSerializer
from accounts.permissions import IsAuthenticated


class RegisterAPI(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request: Request):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            data = serializer.data
            return Response(data)
        return Response("Some Error Occurred", status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    def post(self, request: Request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if not user:
            raise AuthenticationFailed("User not found")
        if not user.check_password(password):
            raise AuthenticationFailed("Wrong password")

        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7),
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(
            key='jwt',
            value=token,
            httponly=True,
            samesite='None',
            secure=True,
        )

        data = UserSerializer(user, context={ 'request': request }).data
        data['jwt'] = token
        data['exp'] = datetime.datetime.utcnow() + datetime.timedelta(days=7)

        response.data = data

        return response


class ProfileImageDownloadAPIView(APIView):

    def get(self, request: Request, user_id):
        try:
            user = User.objects.get(id=user_id)
            if user.profile_image:
                file_path = user.profile_image.path
                with open(file_path, 'rb') as file:
                    response = HttpResponse(file.read(), content_type='application/octet-stream')
                    response['Content-Disposition'] = 'attachment; filename=' + user.profile_image.name
                    return response
            else:
                return HttpResponseNotFound('Profile image not found')
        except User.DoesNotExist:
            return HttpResponseNotFound('User not found')


class UserDetailsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)
