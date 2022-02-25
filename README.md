<!-- PROJECT LOGO -->
<p align="center">
    <img src="https://checkiflegal.in/assets/logo-light.png" alt="Logo"  >
</p>
Check if Legal is a online legal paper verification platform, where you are allowed to select from expert and verified lawyers based on your city.
<br />
<br />
This repo contains back-end source code.<br/>
For front-end repository <a href="https://github.com/pesto-students/check-if-legal-fe-n13-delta-3">click here</a>.

<!-- TABLE OF CONTENTS -->
<br/>

# Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Technology Stack](#technology-stack)
4. [Authors](#authors)
5. [License](#license)

<br/>

# Demo

[Live Demo](https://api.checkiflegal.in/)

<br/>

Please Note:

-   We recommend using this app in latest browser with javascript support.
-   Try demo credentials if you not comfortable with Google SignIn OAuth.
-   Payment Gateway is in test mode, so use <code>4111 1111 1111</code> as card no to continue.

<br/>
Test Credentials:

-   For Admin
    -   Username: admin
    -   Password: admin
-   For User/Lawyer
    -   Click on "Try as Demo" button
        <br/>

# Installation

1. Clone the repo
    ```sh
    git clone https://github.com/pesto-students/check-if-legal-be-n13-delta-3.git
    ```
2. Set environment variables

NODE_ENV=<br />
SERVER_PORT=<br />
SERVER_NAME=<br />
DATABASE_URL = postgresql://user:password@host:port/database<br />
JWT_SECRET=<br />
GOOGLE_AUTH_CLIENT_ID=<br />
RAZORPAY_ID_KEY=<br />
RAZORPAY_SECRET_KEY=<br />
FILE_ENCRYPT_SECRET=<br />
DEMO_USER_ID=<br />
DEMO_LAWYER_ID=<br />

3. Install NPM packages
    ```sh
    npm install
    ```
4. Run
    ```sh
    npm run dev
    ```
5. Open http://localhost:3000 to view it in the browser

6. Run Test cases
    ```sh
    npm test
    ```
    <br/>

# Technology Stack

We tried to use a completely modern tech stack while testing out some new technologies that we had never used before. This resulted in a fast, performant, and easily-extensible web app that should be fairly future-proof for the coming next several years. We used:

-   [Node JS](https://reactjs.org/)
-   [Express JS](https://expressjs.com)
-   [TypeScript](https://www.typescriptlang.org/)
-   [PostgreSQL](https://www.postgresql.org/) (RDBMS)
-   [Prisma](https://www.prisma.io/) (ORM)
-   [Mocha](https://mochajs.org/) (Testing)

<br/>

# Authors

-   [Kunal Gosrani](https://github.com/kunalgosrani)
-   [Sai Tharun](https://github.com/saitharunsai)

<br/>

# Mentor

-   [Rachit Srivastava](https://github.com/rachit1994)

<br/>

# License

[MIT](https://opensource.org/licenses/MIT)
