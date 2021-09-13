import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  editing: boolean;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});
  let valid = true;

  // Needs to extend unknown so we can add a generic to an arrow function
  const handleChange = (key: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleTextareaChange = (key: keyof T, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  const isEditing = (): boolean => {
    return options?.editing || false;
  }

  const resetData = () => {
    if (!data) {
      return;
    }
  
    Object.keys(data).forEach(function(key) {
      setData({
        ...data,
        [key]: '',
      });
    });
  };

  return {
    valid,
    data,
    handleChange,
    handleTextareaChange,
    handleSubmit,
    resetData,
    isEditing,
    errors,
  };
};
