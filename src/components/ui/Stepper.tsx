import React from 'react';
import styles from '@/styles/ui/Stepper.module.scss';

export interface StepperStep {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'pending' | 'active' | 'completed' | 'error';
  disabled?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  showStepNumbers?: boolean;
  showStepDescriptions?: boolean;
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep = 0,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  showStepNumbers = true,
  showStepDescriptions = true,
  clickable = false,
  onStepClick,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const handleStepClick = (stepIndex: number, step: StepperStep) => {
    if (clickable && onStepClick && !step.disabled) {
      onStepClick(stepIndex);
    }
  };

  const getStepStatus = (stepIndex: number, step: StepperStep): string => {
    if (step.status) return step.status;
    if (stepIndex < activeStep) return 'completed';
    if (stepIndex === activeStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (stepIndex: number, step: StepperStep, status: string) => {
    if (step.icon) {
      return step.icon;
    }

    if (status === 'completed') {
      return '✓';
    }

    if (status === 'error') {
      return '✕';
    }

    if (showStepNumbers) {
      return stepIndex + 1;
    }

    return '●';
  };

  const getStepLabel = (stepIndex: number, step: StepperStep, status: string) => {
    const baseLabel = step.title;
    
    if (status === 'completed') {
      return `${baseLabel} 완료`;
    }
    
    if (status === 'error') {
      return `${baseLabel} 오류`;
    }
    
    if (status === 'active') {
      return `${baseLabel} 진행 중`;
    }
    
    return baseLabel;
  };

  const stepperClasses = [
    styles.stepper,
    styles[`stepper--${orientation}`],
    styles[`stepper--${size}`],
    styles[`stepper--${variant}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={stepperClasses}
      style={style}
      role="navigation"
      aria-label={ariaLabel || '단계별 진행'}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index, step);
        const isLast = index === steps.length - 1;
        
        const stepClasses = [
          styles.stepperStep,
          styles[`stepperStep--${status}`],
          styles[`stepperStep--${size}`],
          styles[`stepperStep--${variant}`],
          clickable && !step.disabled && styles.stepperStepClickable,
          step.disabled && styles.stepperStepDisabled,
        ].filter(Boolean).join(' ');

        const stepIconClasses = [
          styles.stepperIcon,
          styles[`stepperIcon--${status}`],
          styles[`stepperIcon--${size}`],
          styles[`stepperIcon--${variant}`],
        ].filter(Boolean).join(' ');

        const stepContentClasses = [
          styles.stepperContent,
          styles[`