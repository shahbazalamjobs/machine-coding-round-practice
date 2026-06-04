import { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First Name is required";
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last Name is required";
      }
    }

    if (step === 2) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Invalid Email";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone Number is required";
      } else if (formData.phone.length < 10) {
        newErrors.phone = "Phone Number must be 10 digits";
      }
    }

    if (step === 3) {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep()) {
      console.log(formData);

      alert("Form Submitted Successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });

      setErrors({});
      setStep(1);
    }
  };

  return (
    <div className="container">
      <h1>Multi Step Form</h1>

      <div className="progress">
        <div
          className={`progress-step ${
            step >= 1 ? "active" : ""
          }`}
        >
          1
        </div>

        <div
          className={`progress-step ${
            step >= 2 ? "active" : ""
          }`}
        >
          2
        </div>

        <div
          className={`progress-step ${
            step >= 3 ? "active" : ""
          }`}
        >
          3
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h2>Personal Information</h2>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="error">{errors.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="error">{errors.lastName}</p>
            )}

            <button type="button" onClick={handleNext}>
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Contact Information</h2>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="error">{errors.email}</p>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="error">{errors.phone}</p>
            )}

            <div className="button-group">
              <button type="button" onClick={handlePrev}>
                Previous
              </button>

              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Account Setup</h2>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error">{errors.password}</p>
            )}

            <div className="button-group">
              <button type="button" onClick={handlePrev}>
                Previous
              </button>

              <button type="submit">
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default App;