from django.db.models import QuerySet
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.response import Response

from post.models import Post
from post.serializers import PostSerializer


class PersonalPostsAPI(APIView):
    def get(self, request: Request):
        user = request.user
        posts: QuerySet = user.posts

        serialized = PostSerializer(posts.all(), many=True)
        print(serialized.data)

        return Response(serialized.data)


class SuggestedPostsAPI(APIView):
    def get(self, request: Request):
        user = request.user
        posts = Post.objects.all()

        serialized_posts = PostSerializer(posts, many=True)

        return Response(serialized_posts.data)
