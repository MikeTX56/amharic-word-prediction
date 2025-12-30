import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { useForm } from '@/hooks/useForm';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateConfirmPassword,
  getPasswordStrength,
} from '@/utils/validators';
import { ROUTES } from '@/utils/constants';
import Button from '../common/Button';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';

export const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      const emailError = validateEmail(values.email);
      if (emailError) errors.email = emailError;

      const usernameError = validateUsername(values.username);
      if (usernameError) errors.username = usernameError;

      const passwordError = validatePassword(values.password);
      if (passwordError) errors.password = passwordError;

      const confirmPasswordError = validateConfirmPassword(
        values.password,
        values.confirmPassword
      );
      if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

      return errors;
    },
    onSubmit: async (values) => {
      if (!acceptTerms) {
        showNotification('error', 'Please accept the terms and conditions');
        return;
      }

      try {
        await register({
          email: values.email,
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
          acceptTerms,
        });
        showNotification('success', 'Registration successful!');
        navigate(ROUTES.DASHBOARD);
      } catch (error: any) {
        showNotification('error', error.message || 'Registration failed');
      }
    },
  });

  const passwordStrength = getPasswordStrength(values.password);

  return (
    <Card className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="your@email.com"
          />
          {touched.email && errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="username"
          />
          {touched.username && errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
          />
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
          {values.password && (
            <div className="mt-2">
              <ProgressBar
                value={passwordStrength.percentage}
                color={
                  passwordStrength.strength === 'weak'
                    ? 'danger'
                    : passwordStrength.strength === 'medium'
                    ? 'warning'
                    : 'success'
                }
                size="sm"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Password strength: {passwordStrength.strength}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Terms and Conditions
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
        >
          Create Account
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Card>
  );
};

export default RegisterForm;
