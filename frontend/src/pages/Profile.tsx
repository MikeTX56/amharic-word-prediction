import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { useForm } from '@/hooks/useForm';
import { validatePassword, validateConfirmPassword } from '@/utils/validators';
import { getInitials } from '@/utils/formatters';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.currentPassword) {
        errors.currentPassword = 'Current password is required';
      }

      const passwordError = validatePassword(values.newPassword);
      if (passwordError) {
        errors.newPassword = passwordError;
      }

      const confirmError = validateConfirmPassword(
        values.newPassword,
        values.confirmPassword
      );
      if (confirmError) {
        errors.confirmPassword = confirmError;
      }

      return errors;
    },
    onSubmit: async () => {
      try {
        // Simulate password change
        showNotification('success', 'Password changed successfully!');
        setIsEditingPassword(false);
        resetForm();
      } catch (error: any) {
        showNotification('error', error.message || 'Failed to change password');
      }
    },
  });

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">
                  {getInitials(user.username)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {user.username}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{user.email}</p>
              <Badge variant={user.role === 'admin' ? 'warning' : 'primary'}>
                {user.role.toUpperCase()}
              </Badge>
            </div>
          </Card>

          {/* Information Card */}
          <Card className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Member Since
                </label>
                <input
                  type="text"
                  value={new Date(user.createdAt).toLocaleDateString()}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </Card>

          {/* Change Password Card */}
          <Card className="md:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Change Password
              </h3>
              {!isEditingPassword && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingPassword(true)}
                >
                  Edit
                </Button>
              )}
            </div>

            {isEditingPassword ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  {touched.currentPassword && errors.currentPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  {touched.newPassword && errors.newPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="submit" variant="primary" isLoading={isSubmitting}>
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setIsEditingPassword(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Click Edit to change your password
              </p>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
