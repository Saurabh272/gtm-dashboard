import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Register() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      window.dataLayer.push({
        event: 'registration',
        method: 'email',
      });
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      window.dataLayer.push({
        event: 'registrationError',
        errorMessage: error.message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input {...register('email')} placeholder="Email" className="input" />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('password')} type="password" placeholder="Password" className="input" />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
}