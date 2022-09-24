# Git and GitHub

We work in the console

To check the version of git, run

```powershell
git --version
```

If git is installed, we need to config username and email, so as to sign off on all the changes made to the git repositories,

To config name, run

```powershell
git config --global user.name "Kevin Mutinda"

git config --global user.email "kevin.mutinda.ck@gmail.com"
```

To make a git repository, first we have to cd into the project that we want to work in

```powershell
cd
```

To initialize git inside the directory, run

```powershell
git init 
```

To check in the status,  of the repository, run

```powershell
git status
```

This shows if there are any changes to file in our project, if any the need to commit(accept) the changes to the repository.

To add any changes to files into our repository,

```powershell
git add .
```

The above adds, all files into our repository, to add only one file , say README.md

```powershell
git add README.md
```

To add only particular, file formats e.g all html to the staging area

```powershell
git add .html
```

If the files have been added, check status again `git status`  

Now to finally accept the changes to files, we have to commit and also write notes on why we committed ,

From staging area to repository

```powershell
git commit -m "Created our first Readme"
```

TO remove a file from the staging area, `git rm --cached <file>.`

Here the words in quotes are the comments,

To check our commits, we have to check our logs, run

```powershell
git log
```

This redirects us to a logs page, to exit from the log,  press `Esc`  `:wq` 

To check on changes made to particular  files, e.g on the README.md 

```powershell
git diff README.md
```

It redirects to a page, that displays all the lines that have been added to the file, to exit  press `Esc` `:wq`   

To prevent a file from been added to the repository, we create a `.gitignore` file and inside it we place the name of the file that we want to exclude

To create the file 

```powershell
touch .gitignore
```





### Branching

Once you have a working version of the project, it is advisable to create a copy(branch) of the files to work on them in case of any changes and then merge the copy back to the original. The copy is referred to as the side branch and the original `master` branch.

To create a side branch, named `develop` 

```powershell
git branch develop
```

To check on the number of branches,

```powershell
git branch
```

To switch to a branch, we run `git checkout` and then name of branch `develop` 

```powershell
git checkout develop
```

If you make changes on the README.md, check `git status` to if the changes have been registered,

Note, We can `git add .` and `git commit` with a single command

```powershell
git commit -am "added something new"
```

To go back into the master

```powershell
git checkout master
```

To create a new, branch and to get into it, the branch name is `feature` 

```powershell
git checkout -b feature/new-feature
```

The new branch created is based on the branch that we are in while creating the branch, i.e if we are in the `master` branch the new branch will contain a copy of the master branch, but if we are in the `developer` branch the new branch will be a copy of the developer branch.





 #### Merge Branches

To merge a branch e,g the feature branch to the developer branch

```powershell
git merge feature/new-feature
```

Here git creates a commit called, merge commit, to check it `git log`

To check details of a commit, copy the first 7 characters, of the commit in the log 

```powershell
git show 6ea139a
```



## Push into GitHub

To push our local repository to gitHub we use `git push` 

`git pull` used to pull repository from a remote repository(gitHub) 

To copy a remote repository into our folder we use `git clone` 

To list remote repositories `git remote`

To push the repository, in gitHub, sign to an account and follow the procedures to create a new repository.

Before we push data to remote repository, we first have to define default branch

```powershell
git branch -M master
```

While creating the repository it gives you a link to add to the console, so as to link the local repository to the remote one.

```powershell
git remote add origin https://github.com/Kevin-ck1/Vue-Practise-Shopping-Cart.git
```

to check if its linked

```powershell
git remote
```

Now to push the local to the remote

```powershell
git push -u origin master
```

This brings a pop up window, that asks for gitHub user name and password,

Now reload the gitHub page to view the documents.

When changes have been added to the local file, and we need to save the changes to the remote repository

```powershell
git push
```

To clone a folder, we cd into the directory that we want to place the cloned files, 

```powershell
git clone <paste link from gitHub here>
```

To pull in changes from different from the remote to our local we do

```powershell
git pull
```

 Delete file in the repository

```powershell
git rm --cached nameOfFileTODelete
```

not if you remove `--cached` it deletes the local file

to delete a folder directory

```pow
git rm -r --cached nameofFOlderToDelete
```





