/* ===========================
   ELEMENT REFERENCES
   =========================== */

const body = document.body;
const themeButtons = document.querySelectorAll("[data-set-theme]");
const submitBtn = document.getElementById("submitBtn");
const questionInput = document.getElementById("questionInput");
const statusMsg = document.getElementById("statusMsg");

/* ===========================
   PAGE LOAD ANIMATION
   =========================== */

window.addEventListener("load", () => {
  body.style.opacity = "0";
  body.style.transition = "opacity 0.6s ease";
  requestAnimationFrame(() => {
    body.style.opacity = "1";
  });
});

/* ===========================
   THEME SWITCHING (ANIMATED)
   =========================== */

themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    themeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    body.style.transition = "background 0.5s ease, color 0.4s ease";
    body.setAttribute("data-theme", btn.dataset.setTheme);

    // optional persistence
    localStorage.setItem("theme", btn.dataset.setTheme);
  });
});

/* ===========================
   RESTORE SAVED THEME
   =========================== */

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  themeButtons.forEach(b => {
    b.classList.toggle("active", b.dataset.setTheme === savedTheme);
  });
}

/* ===========================
   SUBMIT QUESTION → API → DB
   =========================== */

submitBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();

  // Reset state
  statusMsg.textContent = "";
  statusMsg.className = "";

  if (!question) {
    statusMsg.textContent = "Please write a question first.";
    statusMsg.classList.add("error");
    shake(questionInput);
    return;
  }

  // Button loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const response = await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
     body: JSON.stringify({ question_text: question })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save");
    }

    // SUCCESS
    statusMsg.textContent = "Your question was saved ❤️";
    statusMsg.classList.add("success");
    questionInput.value = "";
    pulse(submitBtn);

  } catch (err) {
    console.error(err);
    statusMsg.textContent = "Server error. Please try again.";
    statusMsg.classList.add("error");
    shake(submitBtn);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Question";
  }
});

/* ===========================
   MICRO-ANIMATIONS
   =========================== */

function shake(element) {
  element.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(0)" }
    ],
    { duration: 300, easing: "ease-in-out" }
  );
}

function pulse(element) {
  element.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.05)" },
      { transform: "scale(1)" }
    ],
    { duration: 300, easing: "ease-out" }
  );
}
