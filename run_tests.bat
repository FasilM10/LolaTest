@echo off

@REM REM Install dependencies
@REM npm install 

@REM REM Set up environment variables
@REM set testDataFile=testData.json

REM Run Cypress tests
npx cypress run 

REM Check the test result
@REM IF %errorlevel% EQU 0 (
@REM     echo Tests passed successfully
@REM ) ELSE (
@REM     echo Tests failed
@REM )

REM Provide the test output
@REM type "output directory"

exit /b