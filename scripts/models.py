from django.db import models


class ScriptModel(models.Model):
    s_name = models.CharField(max_length=25, name="sname")
    s_args = models.CharField(max_length=100, name="args")
    product = models.CharField(max_length=100, name="type")
    desc = models.TextField(max_length=300, name="description")
    s_output_json = models.CharField(max_length=100, name="output")
    s_send_data = models.BooleanField(name="send")
    s_emails = models.EmailField(max_length=100, name="email")


    def __str__(self):
        return self.s_name

    def get_absolute_url(self):
        return self.s_name

