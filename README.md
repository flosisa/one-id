<h1><b>OneID</b></h1>

# Installation
<code>mkdir projects</code> <br />
<code>cd projects/</code> <br />
<code>git clone https://dev.egov.uz/frontend/one-id.git</code>

<code>cd one-id/</code> <br />
<code>npm install</code>

# Before starting the engine!
<em>/webpack/dev.js</em>
- See (or modify) variables below to be aware of the current webpack-dev-server configurations: <br />
  HOST, PORT, API_HOST, API_PORT, DEF_BROWSER

# Start a project
- start in development mode <br />
<code>npm start</code>

# Build a project
1. To have fresh code every time <br />
<code>git pull</code> <br />

2. Select build environment by your needs
- Build in development mode <br />
Set in <em>.env</em> file: APP_ENV='dev' <br />
<code>npm run build</code>
- Build in production mode <br />
Set in <em>.env</em> file: APP_ENV='prod' <br />
<code>npm run build</code>

---
Authorship:
- Created by: Laziz Tashmukhamedov
