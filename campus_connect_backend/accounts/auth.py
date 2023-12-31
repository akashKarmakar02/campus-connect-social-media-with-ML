import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import User


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Get the Authorization header from the request
        auth_header = request.headers.get('Authorization')

        if auth_header is None:
            return None

        # Split the header value into scheme and token
        scheme, jwt_token = auth_header.split(' ')

        if scheme.lower() != 'bearer':
            # If the scheme is not 'Bearer', return None to indicate no authentication
            return None

        try:
            payload = jwt.decode(jwt_token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')

        user_id = payload['id']
        user = User.objects.filter(id=user_id).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        return user, None
