# cj-app
React SPA

IMPORTANT NOTES (In case Backend Service API Integration is required):

    1. The backend endpoint host url can be accessed using "process.env.REACT_APP_API_URL" property. An example is shown in index.js.
    2. PLEASE USE THIS PROPERTY ("process.env.REACT_APP_API_URL") WHEN YOU ARE TRYING TO CALL A BACKEND API. ALSO DON'T CHANGE THIS PROPERTY ELSE THE APP WILL NOT BUILD PROPERLY AND YOUR SUBMISSION WILL NOT BE SCORED. 
    3. In order to start the server in your local system, please run one of the below commands based on your Operating system:
        - Windows (cmd.exe): set "REACT_APP_API_URL=<endpoint URL>" && npm start
        - Windows (Powershell): ($env:REACT_APP_API_URL = "<endpoint URL>") -and (npm start)
        - Linux, macOS (bash): REACT_APP_API_URL=<endpoint URL> npm start


PROJECT BUILD STEPS (Make sure that your project is getting built successfully):

    Pre-requisites:
    1. Install http-server module (https://www.npmjs.com/package/http-server).
    2. Install node and npm

    Steps:
    1. Go to the project root directory.
    2. Run the following commands in the terminal/command line to build the app:
            - npm install
            - npm run build
    3. Please make sure that your project is built successfully.
