# File Sharing App

This is a simple file sharing app built with Express.js, Multer, Nodemailer, and MongoDB. It allows users to upload files, generates a download link, and sends the download link via email using Nodemailer.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible remotely
- SMTP server credentials (if using Nodemailer to send emails)

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd file-sharing-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Configure environment variables:**

    Create a `.env` file in the root directory and set the following environment variables:

    ```dotenv
    PORT=3000
    MONGODB_URI=<your_mongodb_uri>
    SMTP_HOST=<your_smtp_host>
    SMTP_PORT=<your_smtp_port>
    SMTP_USER=<your_smtp_user>
    SMTP_PASS=<your_smtp_password>
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

6. **Access the application in your browser at [http://localhost:3000](http://localhost:3000).**

## Usage

1. **Upload File:**
    - Navigate to the upload page.
    - Select a file to upload.
    - Click on the upload button.

2. **Share File:**
    - After uploading, a download link will be generated.
    - You can copy this link and share it with others.
    - Optionally, you can enter an email address to send the download link via email.

3. **Download File:**
    - Click on the download link to download the file.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

