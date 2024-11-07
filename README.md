

# College Evaluation System

The College Evaluation System allows students to submit feedback on course content, instructors, and more. This feedback system is designed to help institutions gather valuable insights to improve the educational experience.

## Features
- **User Authentication:** Allows students to register, log in, reset passwords, and log out.
- **Feedback Submission:** Students can submit evaluations for different aspects of their courses.
- **Evaluation History:** Students can view their previous evaluations each time they log in.

## Prerequisites
- **Node.js** and **npm** (Node Package Manager) should be installed on your system.
- **Visual Studio Code (VSCode)** as your code editor.

## Getting Started

### 1. Install Node.js and npm
1. **Download Node.js**:
   - Go to the [Node.js website](https://nodejs.org/).
   - Download the LTS (Long-Term Support) version for your operating system (Windows, macOS, or Linux).
2. **Install Node.js**:
   - Open the downloaded installer and follow the instructions.
   - During installation, make sure to check the box that says **"Install npm"** (npm comes bundled with Node.js).
3. **Verify Installation**:
   - Open your terminal or command prompt.
   - Run the following commands to ensure Node.js and npm were installed correctly:
     ```bash
     node -v
     npm -v
     ```
   - You should see version numbers for both commands.

### 2. Clone This Repository
To download the project, clone it from GitHub:

```bash
git clone https://github.com/Azzy2101/evaluation-system-html.git
cd evaluation-system-html
```

### 3. Install Dependencies
In the project directory, run the following command to install all necessary dependencies:

```bash
npm install
```

### 4. Set Up the Database
The evaluation system uses SQLite for the backend database. Ensure you have a file named `database.db` in the root directory. If not, you may need to create one and set up the necessary tables. For example, you can create tables for `users` and `evaluations` based on your needs.

Alternatively, you can use the following schema to create the tables:
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    course TEXT,
    instructor TEXT,
    course_content_rating INTEGER,
    lecturer_explanation_rating INTEGER,
    assignment_teaching_rating INTEGER,
    exam_teaching_rating INTEGER,
    overall_feedback TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 5. Configure VSCode for Development
1. **Open the Project in VSCode**:
   - Open Visual Studio Code.
   - Click on **File > Open Folder** and select the project folder.
2. **Run the Application**:
   - Open the terminal in VSCode (View > Terminal).
   - In the terminal, run the following command to start the server:
     ```bash
     node server.js
     ```
   - This will start the server on `http://localhost:3000` by default.

### 6. Running the System
1. Open your browser and go to `http://localhost:3000/index.html` to see the login page.
2. From here, you can:
   - Register as a new user.
   - Log in to your account.
   - Submit evaluations for different courses.
   - View your previous evaluations.

### 7. Project Structure
Here's an overview of the main project files:

- **`server.js`**: The main server file, containing route definitions for handling login, registration, evaluation submissions, etc.
- **`evaluation.html`**: The form for submitting course evaluations.
- **`index.html`**: The login page.
- **`register.html`**: The registration page.
- **`reset-password.html`**: The reset password page.
- **`style.css`**: Contains the styles for all HTML files.
- **`script.js`**: Contains JavaScript to handle front-end form submissions and interactions.

### 8. Troubleshooting

- **Cannot find module**: Ensure you have run `npm install` in the project directory to install all necessary dependencies.
- **Database Errors**: Verify that your `database.db` file exists and the tables have been created with the appropriate schema.


### 10. Contributing
Feel free to submit issues or pull requests if you would like to improve this project.

---

By following these steps, you should be able to run and explore the evaluation system locally on your machine.
