from accounts.models import User
from base.models import BaseModel
from django.db import models


class Post(BaseModel):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True, null=True)


class Comment(BaseModel):
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    comment = models.CharField(max_length=255)
