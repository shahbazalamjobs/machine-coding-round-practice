
import { useState } from 'react'

function SignupForm() {

  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [ errors, setErrors ] = useState({});

  const validate = () => {
    let newErrors = {};

    if(formData.name.trim() === '') {
      newErrors.name = 'Name is required'
    }

    if(formData.email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if(!(/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(formData.email)) {
      newErrors.email = 'Valid email is required'
    }

    if(formData.password.trim() === '') {
      newErrors.password = 'Password is required'
    } else if(formData.password.length < 6) {
      newErrors.password = 'Minimm 6 characters are required'
    }

    if(formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Confrim password is required'
    } else if(formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is not matching password'
    }

    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = validate();

    setErrors(validateErrors);

    if(Object.keys(validateErrors).length === 0) {
      console.log('Form Submitted', formData);

      alert("Form submitted successfully");

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      setErrors({});
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => (
      {...prev, [name]: value}
    ));
  }

  return (
    <div className='container'>
      <h1>Sign Up Form</h1>

      <form className='form' onSubmit={handleSubmit}>
        
        <div className="form-group">
          <input 
            type="text" 
            name='name'
            placeholder='Enter Name...'
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && <span className='error'>{errors.name}</span> }
        </div>
        
        <div className="form-group">
          <input 
            type="email" 
            name='email'
            placeholder='Enter Email...'
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && <span className='error'>{errors.email}</span> }
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            name='password'
            placeholder='Enter Password...'
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && <span className='error'>{errors.password}</span> }
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            name='confirmPassword'
            placeholder='Enter Confirm Password...'
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span> }
        </div>

        <button type='submit'> Sign Up </button>
      </form>
    </div>
  )
}

export default SignupForm;