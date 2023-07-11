from rest_framework.permissions import BasePermission


class IsAuthenticated(BasePermission):
    message = "You must be authenticated and the owner of this resource."

    def has_permission(self, request, view):
        return request.user.is_authenticated
