from django.db import models
import add_new_api_def() from tasks.apiClient

class TaskModel(models.Model):
    t_name = models.CharField(max_length=25, name="sname")
    name = models.CharField(max_length=100, name="hrname")
    desc = models.TextField(max_length=300, name="description")
    product = models.CharField(max_length=100, name="type")
    yaml_file = models.CharField(max_length=200, name="hrname")
    t_input = models.CharField(max_length=100, name="input")
    t_output_json = models.CharField(max_length=100, name="output")
    t_send_data = models.BooleanField(name="send")
    t_emails = models.EmailField(max_length=100, name="email")


    def __str__(self):
        return self.t_name

    def get_absolute_url(self):
        return self.t_name
    
    def load_existing_apis():
        return self.t_name
    
    def import_new_api():
        add_new_api_def()
    