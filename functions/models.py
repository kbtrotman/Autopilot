from django.db import models

class FunctModel(models.Model):
    name = models.CharField(max_length=100, name="hrname")
    desc = models.TextField(max_length=300, name="description")
    type = models.CharField(max_length=100, name="type")
    t_send_data = models.BooleanField(name="send")
    t_emails = models.EmailField(max_length=300, name="email")


    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return self.name

    
