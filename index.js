const usernameInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.getElementById("loginForm");

// username OR email
function isValidUsernameOrEmail(value) {
  return value && value.length >= 3;
}

// password rule
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

// live validation
usernameInput.addEventListener("input", () => {
  usernameInput.classList.toggle(
    "is-invalid",
    !isValidUsernameOrEmail(usernameInput.value.trim())
  );
});

passwordInput.addEventListener("input", () => {
  passwordInput.classList.toggle(
    "is-invalid",
    !passwordRegex.test(passwordInput.value)
  );
});

// submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  const validUser = isValidUsernameOrEmail(username);
  const validPass = passwordRegex.test(password);

  usernameInput.classList.toggle("is-invalid", !validUser);
  passwordInput.classList.toggle("is-invalid", !validPass);

  if (!validUser || !validPass) return;

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    localStorage.setItem("authToken", result.token);
    localStorage.setItem("employeeName", result.employee.name);
    localStorage.setItem("employeeUsername", result.employee.username);

    window.location.href = "WelcomeScreen.html";
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});

// password eye toggle
function togglePassword(icon) {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    passwordInput.type = "password";
    icon.classList.replace("bi-eye-slash", "bi-eye");
  }
}

async function submit() {
  await fetch("http://localhost:3000/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value })
  });
  alert("If email exists, reset link sent");
}
