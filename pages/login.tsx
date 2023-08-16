import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
const logIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Inside log in",email,password)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        Email: email,
        Password: password,
      });
      console.log(result)
      if(result.ok) {
        router.push('/')
      }
      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-start justify-start h-screen">
      <form className="w-full max-w-md space-y-4 md:space-y-6 p-10 bg-white rounded-lg shadow-md">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-field"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="button-primary"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default logIn;
