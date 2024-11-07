document.addEventListener('DOMContentLoaded', function () {
    // Login Form
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    // Registration Form
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');

    // Evaluation Form
    const evaluationForm = document.getElementById('evaluation-form');
    const evaluationMessage = document.getElementById('feedback-message');
    const evaluationList = document.getElementById('evaluation-list');

    // Load past evaluations
    function loadEvaluations() {
        fetch('/evaluations')
            .then(response => response.json())
            .then(data => {
                evaluationList.innerHTML = '';
                if (data.success && data.evaluations.length > 0) {
                    data.evaluations.forEach(evaluation => {
                        const li = document.createElement('li');
                        li.textContent = `${evaluation.course} - ${evaluation.instructor} (Rating: ${evaluation.rating}) - ${evaluation.feedback}`;
                        evaluationList.appendChild(li);
                    });
                } else {
                    evaluationList.innerHTML = '<li>No evaluations found.</li>';
                }
            });
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);

            fetch('/login', {
                method: 'POST',
                body: new URLSearchParams(formData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to evaluation page
                    window.location.href = 'evaluation.html';
                } else {
                    loginMessage.textContent = data.message;
                }
            });
        });
    }

    // Registration Form Submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);

            fetch('/register', {
                method: 'POST',
                body: new URLSearchParams(formData),
            })
            .then(response => response.json())
            .then(data => {
                registerMessage.textContent = data.message; // Show success or error message
                if (data.success) {
                    registerForm.reset(); // Reset the form after successful registration
                }
            });
        });
    }

    // Evaluation Form Submission
    if (evaluationForm) {
        evaluationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(evaluationForm);

            fetch('/evaluation', {
                method: 'POST',
                body: new URLSearchParams(formData),
            })
            .then(response => response.json())
            .then(data => {
                evaluationMessage.textContent = data.message;
                if (data.success) {
                    evaluationForm.reset(); // Reset form after submission
                    loadEvaluations(); // Reload evaluations
                }
            });
        });

        // Load evaluations on page load
        loadEvaluations();
    }
});
