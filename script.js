// Form submission - Using Formspree
const FORM_ENDPOINT = 'https://formspree.io/f/xwpnenro';

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadForm");
  const thankYouMessage = document.getElementById("thankYouMessage");
  const submitButton = form.querySelector(".cta-button");
  const originalButtonText = submitButton.textContent;

  form.addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      timestamp: new Date().toISOString(),
      source: "TikTok Landing Page",
    };

    // Validate form
    if (!validateForm(data)) {
      return;
    }

    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {
      // Submit form
      await submitForm(data);

      // Show thank you message
      showThankYouMessage();

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      showErrorMessage();
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }

  function validateForm(data) {
    const errors = [];

    // Validate full name
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.push("Please enter your full name");
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address");
    }

    // Validate phone
    const phoneRegex = /^[\+]?[\s\-\(\)]?[0-9]{10,}$/;
    if (
      !data.phone ||
      !phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      errors.push("Please enter a valid phone number");
    }

    if (errors.length > 0) {
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
      return false;
    }

    return true;
  }

  async function submitForm(data) {
    // If using Formspree
    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      // Demo mode - just show success
      console.log("Form data to be submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { status: 'success', message: 'Form submitted successfully' };
    }

    // Submit to Formspree
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        source: data.source,
        timestamp: data.timestamp,
        message: `TikTok Ads - ${data.fullName} - ${data.email} - ${data.phone}`
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return { status: 'success', message: 'Form submitted successfully' };
  }

  function showThankYouMessage() {
    form.style.display = "none";
    thankYouMessage.style.display = "block";

    // Scroll to thank you message
    thankYouMessage.scrollIntoView({ behavior: "smooth" });

    // Add confetti effect (optional)
    if (typeof confetti !== "undefined") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }

  function showErrorMessage() {
    alert(
      "Sorry, there was an error submitting your form. Please try again or contact us directly."
    );
  }

  // Add smooth scrolling for any internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add form field animations
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });
  });
});
