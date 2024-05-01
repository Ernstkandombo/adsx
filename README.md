# adsx

This repository houses a full-stack server application utilizing Next.js, Node.js, Express server, NextAuth, and TypeScript.

## Overview

The project is designed to function as an ad server, facilitating the management and serving of advertisements. It encompasses both client-side and server-side components to provide a comprehensive solution.

### Features

- **Next.js Frontend**: Utilizes Next.js for the client-side rendering, providing a fast and dynamic user experience.
- **Express Server Backend**: The backend is powered by Express.js, offering robust API endpoints and server-side logic.
- **NextAuth Authentication**: Implements NextAuth for authentication purposes, ensuring secure access to the application.
- **TypeScript**: The client-side code is written in TypeScript, promoting code reliability and maintainability.
- **MongoDB**: Requires MongoDB for data storage. Install MongoDB Community Edition from [MongoDB website](https://www.mongodb.com/try/download/community). Follow the instructions provided for your operating system.

## Prerequisites

Before running this application, ensure you have the following installed on your computer:

- **Node.js**: Install from [Node.js website](https://nodejs.org/).
- **MongoDB**: Install MongoDB Community Edition from [MongoDB website](https://www.mongodb.com/try/download/community). Follow the instructions provided for your operating system.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Ernstkandombo/adsx.git
   ```

2. Navigate to the project directory:

   ```bash
   cd adsx
   ```

3. Install dependencies for the client and server components:

   ```bash
   cd adxclient
   npm install
   cd ../adsxserver
   npm install
   ```

4. Run the client and server applications:

   ```bash
   # In one terminal tab
   cd adxclient
   npm run dev
   
   # In another terminal tab
   cd ../adsxserver
   npm run start
   ```

5. Access the application in your web browser at `http://localhost:3000`.

## Usage

Once the application is running, you can begin using the ad server to manage advertisements. Ensure you have appropriate permissions and authentication credentials if required.


## License

This project is licensed under the [MIT License](LICENSE), allowing for both personal and commercial use with proper attribution.
