from django.shortcuts import render
from . import templates
from django import forms
from django.urls import reverse
from django.http import HttpResponseRedirect


#Creating variables for the project

tasks = ["foo", "bar", "baz"]

# Creating Form class
class NewTaskForm(forms.Form):
    task = forms.CharField(label = "New Task")
    priority = forms.IntegerField(label ="Priority", min_value=1, max_value=10)

# Create your views here.

def index (request):
    return render(request, "tasks/index.html", {
        "tasks" : tasks,
    })

def add (request):
    if request.method == "POST":
        form = NewTaskForm(request.POST) 
        if form.is_valid():
            task = form.cleaned_data['task']
            tasks.append(task)
            return HttpResponseRedirect(reverse("tasks:index"))

        #print(form['task'])
    return render (request, "tasks/add.html",{
        "form": NewTaskForm(),
    })

