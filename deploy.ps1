# Create a Backup of Changes on Branch (assumes changes are on main already... edit to make it deploy from branch and merge into main)
git add .
git commit -m "Pre Deploy"
git push

# Build (Ensures you are on main first)
git checkout main
ng build

# Make Temp Directory
mkdir ../temp-gh-pages

# Copy everything except Browser, then Copy everything inside of Browser, all into the Temp Directory
robocopy ./dist ../temp-gh-pages /E /XD browser
robocopy ./dist/browser ../temp-gh-pages /E

# Duplicate index.html and rename it to 404.html for GH Pages Angular Routing 404 Error Handling
Copy-Item -Path ../temp-gh-pages/index.html -Destination ../temp-gh-pages/404.html -Force

# Switch to GH Pages
git checkout gh-pages

# Delete everything except the following files
Get-ChildItem -Path . -Force | Where-Object { @('.angular', '.git', '.idea', 'dist', 'node_modules', '.gitignore') -notcontains $_.Name } | Remove-Item -Recurse -Force

# Commit the Empty Directory to force a refresh on the remote
git add .
git commit -m "Empty Directory"
git push

# Copy files from the Temp Directory into the Current Directory
robocopy ../temp-gh-pages . /E /COPY:DAT /R:0 /W:0

# Commit the Updated Site Files to GH Pages
git add .
git commit -m "Deploy"

# Delete the Temp Directory
if (Test-Path ../temp-gh-pages) { Remove-Item -Recurse -Force ../temp-gh-pages }

# Push Update and Switch back to Main
git push
git checkout main
