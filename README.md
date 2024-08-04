# Echo-Text 🔊📄

Echo-Text is a web application that allows users to store and retrieve text snippets via unique URLs. Users can write, copy, save, and clear text. The stored text is saved in a MongoDB database and is accessible via a QR code for easy sharing. Additionally, the text is automatically deleted after one hour to ensure privacy.

## Features

- **Unique URL Generation**: Each session generates a unique URL for storing text.
- **Text Operations**: Users can write, copy, save, and clear text.
- **QR Code Generation**: Generate a QR code for easy sharing of the unique URL.
- **Automatic Deletion**: Text data is automatically deleted from the database after one hour.
- **Manual Refresh**: Users can manually refresh the content to get the latest updates.
- **Toast Notifications**: Real-time feedback for save, copy, clear, and refresh actions.

![image](https://github.com/user-attachments/assets/5f6e2c85-cdbe-4f4c-adb4-f665e944ec67)


## Technologies Used

- **Frontend**: React.js, Material-UI, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Styling**: Material-UI
- **QR Code Generation**: qrcode
- **Notifications**: react-toastify

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/echo-text.git
    cd echo-text
    ```

2. **Backend Setup**:

    - Navigate to the `backend` directory:

      ```bash
      cd backend
      ```

    - Install backend dependencies:

      ```bash
      npm install
      ```

    - Create a `.env` file and add your MongoDB URI and PORT:

      ```plaintext
      MONGODB_URI=mongodb://localhost:27017/textecho
      PORT=5000
      ```

    - Start the backend server:

      ```bash
      npm start
      ```

3. **Frontend Setup**:

    - Navigate to the `frontend` directory:

      ```bash
      cd frontend
      ```

    - Install frontend dependencies:

      ```bash
      npm install
      ```

    - Start the frontend development server:

      ```bash
      npm start
      ```

4. **Open your browser** and go to `http://localhost:3000` to use the application.

## Project Structure

```plaintext
echo-text/
├── backend/
│   ├── config/
│   │   └── dbConfig.js
│   ├── models/
│   │   └── textModel.js
│   ├── routes/
│   │   └── textRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── TextEditor.js
    │   ├── App.js
    │   ├── index.js
    │   ├── axios.js
    │   └── package.json




###Usage
Access the Application: Open your browser and go to http://localhost:3000. You will be redirected to a unique URL.

Write Text: Use the text box to write or paste your text.

Save Text: Click the "Save" button to save the text to the database.

Copy Text: Click the "Copy" button to copy the text to the clipboard.

Clear Text: Click the "Clear" button to clear the text from both the frontend and the backend.

Refresh Content: Click the "Refresh" button to fetch the latest content from the backend.

QR Code: Scan the QR code to access the unique URL on another device.
