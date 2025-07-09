import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface FormField {
  value: any;
  error?: string;
  touched: boolean;
  isValid: boolean;
  isRequired: boolean;
  validation?: (value: any) => string | undefined;
}

export interface FormState {
  [formId: string]: {
    fields: Record<string, FormField>;
    isValid: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
    errors: Record<string, string>;
  };
}

export interface FormActions {
  // 폼 초기화
  initializeForm: (formId: string, fields: Record<string, Omit<FormField, 'touched' | 'isValid'>>) => void;
  
  // 필드 값 설정
  setFieldValue: (formId: string, fieldName: string, value: any) => void;
  
  // 필드 터치 상태 설정
  setFieldTouched: (formId: string, fieldName: string, touched: boolean) => void;
  
  // 필드 에러 설정
  setFieldError: (formId: string, fieldName: string, error?: string) => void;
  
  // 폼 제출 상태 설정
  setSubmitting: (formId: string, isSubmitting: boolean) => void;
  
  // 폼 검증
  validateForm: (formId: string) => boolean;
  validateField: (formId: string, fieldName: string) => boolean;
  
  // 폼 리셋
  resetForm: (formId: string) => void;
  resetField: (formId: string, fieldName: string) => void;
  
  // 폼 제거
  removeForm: (formId: string) => void;
  
  // 폼 상태 조회
  getFormState: (formId: string) => FormState[string] | undefined;
  getFieldValue: (formId: string, fieldName: string) => any;
  getFieldError: (formId: string, fieldName: string) => string | undefined;
  isFormValid: (formId: string) => boolean;
  isFormDirty: (formId: string) => boolean;
  isFormSubmitting: (formId: string) => boolean;
  
  // 전체 폼 상태
  getAllForms: () => FormState;
  clearAllForms: () => void;
}

export const useFormStore = create<FormState & FormActions>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      ...{} as FormState,
      
      initializeForm: (formId: string, fields: Record<string, Omit<FormField, 'touched' | 'isValid'>>) => set(
        (state) => {
          const formFields: Record<string, FormField> = {};
          let isValid = true;
          
          Object.entries(fields).forEach(([fieldName, field]) => {
            const validation = field.validation ? field.validation(field.value) : undefined;
            const isFieldValid = !validation && (!field.isRequired || field.value !== undefined && field.value !== '');
            
            formFields[fieldName] = {
              ...field,
              touched: false,
              isValid: isFieldValid,
              error: validation,
            };
            
            if (!isFieldValid) {
              isValid = false;
            }
          });
          
          return {
            [formId]: {
              fields: formFields,
              isValid,
              isDirty: false,
              isSubmitting: false,
              errors: {},
            },
          };
        },
        false,
        'form/initializeForm'
      ),
      
      setFieldValue: (formId: string, fieldName: string, value: any) => set(
        (state) => {
          const form = state[formId];
          if (!form) return state;
          
          const field = form.fields[fieldName];
          if (!field) return state;
          
          const validation = field.validation ? field.validation(value) : undefined;
          const isValid = !validation && (!field.isRequired || value !== undefined && value !== '');
          
          const updatedField = {
            ...field,
            value,
            error: validation,
            isValid,
            touched: true,
          };
          
          const updatedFields = {
            ...form.fields,
            [fieldName]: updatedField,
          };
          
          // 전체 폼 유효성 검사
          const formIsValid = Object.values(updatedFields).every(field => field.isValid);
          const isDirty = Object.values(updatedFields).some(field => field.touched);
          
          return {
            [formId]: {
              ...form,
              fields: updatedFields,
              isValid: formIsValid,
              isDirty,
            },
          };
        },
        false,
        'form/setFieldValue'
      ),
      
      setFieldTouched: (formId: string, fieldName: string, touched: boolean) => set(
        (state) => {
          const form = state[formId];
          if (!form) return state;
          
          const field = form.fields[fieldName];
          if (!field) return state;
          
          return {
            [formId]: {
              ...form,
              fields: {
                ...form.fields,
                [fieldName]: { ...field, touched },
              },
            },
          };
        },
        false,
        'form/setFieldTouched'
      ),
      
      setFieldError: (formId: string, fieldName: string, error?: string) => set(
        (state) => {
          const form = state[formId];
          if (!form) return state;
          
          const field = form.fields[fieldName];
          if (!field) return state;
          
          const isValid = !error && (!field.isRequired || field.value !== undefined && field.value !== '');
          
          return {
            [formId]: {
              ...form,
              fields: {
                ...form.fields,
                [fieldName]: { ...field, error, isValid },
              },
            },
          };
        },
        false,
        'form/setFieldError'
      ),
      
      setSubmitting: (formId: string, isSubmitting: boolean) => set(
        (state) => {
          const form = state[formId];
          if (!form) return state;
          
          return {
            [formId]: {
              ...form,
              isSubmitting,
            },
          };
        },
        false,
        'form/setSubmitting'
      ),
      
      validateForm: (formId: string) => {
        const state = get();
        const form = state[formId];
        if (!form) return false;
        
        let isValid = true;
        const updatedFields = { ...form.fields };
        
        Object.entries(updatedFields).forEach(([fieldName, field]) => {
          const validation = field.validation ? field.validation(field.value) : undefined;
          const isFieldValid = !validation && (!field.isRequired || field.value !== undefined && field.value !== '');
          
          updatedFields[fieldName] = {
            ...field,
            error: validation,
            isValid: isFieldValid,
            touched: true,
          };
          
          if (!isFieldValid) {
            isValid = false;
          }
        });
        
        set(
          {
            [formId]: {
              ...form,
              fields: updatedFields,
              isValid,
            },
          },
          false,
          'form/validateForm'
        );
        
        return isValid;
      },
      
      validateField: (formId: string, fieldName: string) => {
        const state = get();
        const form = state[formId];
        if (!form) return false;
        
        const field = form.fields[fieldName];
        if (!field) return false;
        
        const validation = field.validation ? field.validation(field.value) : undefined;
        const isValid = !validation && (!field.isRequired || field.value !== undefined && field.value !== '');
        
        set(
          {
            [formId]: {
              ...form,
              fields: {
                ...form.fields,
                [fieldName]: { ...field, error: validation, isValid, touched: true },
              },
            },
          },
          false,
          'form/validateField'
        );
        
        return isValid;
      },
      
      resetForm: (formId: string) => set(
        (state) => {
          const form = state[formId];
          if (!form) return state;
          
          const resetFields: Record<string, FormField> = {};
          Object.entries(form.fields).forEach(([fieldName, field]) => {
            resetFields[fieldName] = {
              ...field,
              value: undefined,
              error: undefined,
              touched: false,
              isValid: !field.isRequired,
            };
          });
          
          return {
            [formId]: {
              ...form,
              fields: resetFields,
              isValid: Object.values(resetFields).every(field => field.isValid),
              isDirty: false,
              isSubmitting: false,
            },
          };
        },
        false,
        'form/resetForm'
      ),
      
      resetField: (formId: string, fieldName: string) => set(
        (state) => {
          const form = state[formId];
          if (!form) return state;
          
          const field = form.fields[fieldName];
          if (!field) return state;
          
          const resetField = {
            ...field,
            value: undefined,
            error: undefined,
            touched: false,
            isValid: !field.isRequired,
          };
          
          return {
            [formId]: {
              ...form,
              fields: {
                ...form.fields,
                [fieldName]: resetField,
              },
            },
          };
        },
        false,
        'form/resetField'
      ),
      
      removeForm: (formId: string) => set(
        (state) => {
          const { [formId]: removed, ...remaining } = state;
          return remaining;
        },
        false,
        'form/removeForm'
      ),
      
      getFormState: (formId: string) => {
        const state = get();
        return state[formId];
      },
      
      getFieldValue: (formId: string, fieldName: string) => {
        const state = get();
        return state[formId]?.fields[fieldName]?.value;
      },
      
      getFieldError: (formId: string, fieldName: string) => {
        const state = get();
        return state[formId]?.fields[fieldName]?.error;
      },
      
      isFormValid: (formId: string) => {
        const state = get();
        return state[formId]?.isValid ?? false;
      },
      
      isFormDirty: (formId: string) => {
        const state = get();
        return state[formId]?.isDirty ?? false;
      },
      
      isFormSubmitting: (formId: string) => {
        const state = get();
        return state[formId]?.isSubmitting ?? false;
      },
      
      getAllForms: () => {
        const state = get();
        const { initializeForm, setFieldValue, setFieldTouched, setFieldError, setSubmitting, validateForm, validateField, resetForm, resetField, removeForm, getFormState, getFieldValue, getFieldError, isFormValid, isFormDirty, isFormSubmitting, getAllForms, clearAllForms, ...forms } = state;
        return forms;
      },
      
      clearAllForms: () => set(
        {},
        false,
        'form/clearAllForms'
      ),
    }),
    {
      name: 'form-store',
    }
  )
); 