import React from 'react';
import { usePrediction } from '@/hooks/usePrediction';
import { useForm } from '@/hooks/useForm';
import { validateRequired } from '@/utils/validators';
import Button from '../common/Button';
import Card from '../common/Card';

export const PredictionForm: React.FC = () => {
  const { createPrediction, isLoading } = usePrediction();

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
      text: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      
      const textError = validateRequired(values.text, 'Text');
      if (textError) {
        errors.text = textError;
      } else if (values.text.length < 3) {
        errors.text = 'Text must be at least 3 characters';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      await createPrediction({ text: values.text });
      resetForm();
    },
  });

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Enter Amharic Text
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Text for Prediction
          </label>
          <textarea
            id="text"
            name="text"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Type your Amharic text here..."
            disabled={isSubmitting || isLoading}
          />
          {touched.text && errors.text && (
            <p className="text-red-600 text-sm mt-1">{errors.text}</p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter at least 3 characters to get predictions
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting || isLoading}
        >
          Get Predictions
        </Button>
      </form>
    </Card>
  );
};

export default PredictionForm;
