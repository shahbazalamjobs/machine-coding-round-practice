import { useState } from "react";
import { useForm } from "react-hook-form";

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm();

  const nextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(["firstName", "lastName"]);
    }

    if (step === 2) {
      isValid = await trigger(["email", "phone"]);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log(data);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        <h2>Step {step} of 3</h2>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div>
              <label>First Name</label>
              <input
                {...register("firstName", {
                  required: "First name is required"
                })}
              />
              {errors.firstName && (
                <p>{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label>Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last name is required"
                })}
              />
              {errors.lastName && (
                <p>{errors.lastName.message}</p>
              )}
            </div>

            <div className="button-group">
              <button
                type="button"
                onClick={nextStep}
                className="next-btn"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div>
              <label>Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email"
                  }
                })}
              />
              {errors.email && (
                <p>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label>Phone</label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 digits"
                  }
                })}
              />
              {errors.phone && (
                <p>{errors.phone.message}</p>
              )}
            </div>

            <div className="button-group">
              <button type="button" onClick={prevStep}>
                Previous
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="next-btn"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <div>
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  }
                })}
              />
              {errors.password && (
                <p>{errors.password.message}</p>
              )}
            </div>

            <div>
              <label>Role</label>
              <select
                {...register("role", {
                  required: "Please select a role"
                })}
              >
                <option value="">Select Role</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full Stack">Full Stack</option>
              </select>

              {errors.role && (
                <p>{errors.role.message}</p>
              )}
            </div>

            <div className="button-group">
              <button type="button" onClick={prevStep}>
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

export default MultiStepForm;