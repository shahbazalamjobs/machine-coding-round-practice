import { useForm, useWatch } from "react-hook-form";

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm();

  const name = useWatch({
    control,
    name: "name"
  });

  const email = useWatch({
    control,
    name: "email"
  });

  const password = useWatch({
    control,
    name: "password"
  });

  const onSubmit = (data) => {
    console.log(data);
    alert("Form Submitted Successfully!");
    reset();
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-title">React Hook Form</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required"
            })}
          />
          {errors.name && (
            <p className="error">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <p className="error">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required"
              }
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit">
            Create Account
          </button>
        </form>

        <hr />

        <div className="preview">
          <h3>Live Preview</h3>

          <p>
            <strong>Name:</strong> {name || "-"}
          </p>

          <p>
            <strong>Email:</strong> {email || "-"}
          </p>

          <p>
            <strong>Password:</strong> {password || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;