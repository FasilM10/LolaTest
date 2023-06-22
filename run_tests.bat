@echo off

@REM Verify if Node.js and npm are installed
node -v >nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js is already installed.
) else (
    REM Installed Node.js and npm from URI installer
    echo Install Node.js and npm...
    REM Replace <URL_TO_NODE_INSTALLER/path to msi file>
    powershell -Command "Invoke-WebRequest -Uri '<URL_TO_NODE_INSTALLER/path to msi file>' -OutFile 'node-installer.msi"
    msiexec /i node-installer.msi /qn
    del node-installer.msi
)
REM Set Node.js and npm in path variable
echo Setting Node.js and npm in system path variables
setx path "%PATH%;%APPDATA%\npm"

@REM check if cypress is installed
REM installing cypress and testing-library...
npm install cypress @testing-library/cypress --save-dev


pause
REM Run Cypress tests
npx cypress run 