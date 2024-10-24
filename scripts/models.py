from django.db import models


class ScriptModel(models.Model):
    s_name = models.CharField(max_length=25, name="s_name")
    f_name = models.CharField(max_length=150, name="f_name")
    s_args = models.CharField(max_length=100, name="args")
    path = models.CharField(max_length=150, name="path")
    product = models.CharField(max_length=100, name="type")
    desc = models.TextField(max_length=300)
    s_output_json = models.CharField(max_length=100, name="output")
    s_send_data = models.BooleanField()
    s_emails = models.EmailField(max_length=100)


    def __str__(self):
        return self.s_name

    def get_absolute_url(self):
        return self.s_name

