# pipEnv

`pip install pipenv` - To install pipenv

`pip freeze` - To display the dependencies in the current environment

`pipenv shell` - Activates the virtual environment , and also creates a pip file that list all the dependacies.

`quit()` - Exit shell

`pipenv install nameofpackage` - To install something

`pipenv lock -r` - To check a list of packages

`pipenv uninstall package` - to uninstall

`pipenv install packageName --dev` - This install the package to be used during development only

`pipenv install -r ./requirements.txt` - Install from a requirements file.

`pipenv check` checks for security vulnerability 

`pipenv install` - installs any update with change in the pip file

`pipenv lock` - updates the lock file with the current packages used + their version

`pipenv install --ignore-pipfile` - Install the current version of packages to deployment server

`exit` - to exit out of the virtual environment

`which python` to check path of the python used

# virtualEnv

`pip install virtualenv `- This install the library

`virtualenv projectName` -  This creates create a virtual environment and a project folder to house the project files

To activate the virtual environment cd into the created folder and run

`Scripts\activate`  or

`source projectName/bin/activate`



`pip freeze --local > requirements.txt` -- imports all the dependecies names and version number into the requirement file.

`deactivate` - To get out of the virtual env -- May not work

`exit` - Deactivates the pipenv

`rm -rf projectName` - To delete the virtual environment

`virtualenv -p /usr/bin/python2.6 projectName  ` - This sets the version of python to be used

`pip install -r requirements.txt` - this installs the libraries in the requirements file.









