import React, { useState, ReactNode } from 'react';
import styles from './Wizard.module.scss';

export interface WizardStep {
  /** 스텝 키 */
  key: string;
  /** 스텝 제목 */
  title: string;
  /** 스텝 설명 */
  description?: string;
  /** 스텝 내용 */
  content: ReactNode;
  /** 스텝 상태 */
  status?: 'active' | 'completed' | 'error' | 'disabled';
  /** 스텝 비활성화 여부 */
  disabled?: boolean;
  /** 스텝 유효성 검사 함수 */
  validate?: () => boolean | Promise<boolean>;
}

export interface WizardProps {
  /** 위저드 제목 */
  title?: string;
  /** 위저드 스텝들 */
  steps: WizardStep[];
  /** 현재 활성 스텝 */
  currentStep?: number;
  /** 위저드 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 위저드 테마 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** 위저드 레이아웃 */
  layout?: 'horizontal' | 'vertical' | 'compact';
  /** 애니메이션 활성화 여부 */
  animated?: boolean;
  /** 스텝 클릭 가능 여부 */
  stepClickable?: boolean;
  /** 다음 버튼 텍스트 */
  nextText?: string;
  /** 이전 버튼 텍스트 */
  prevText?: string;
  /** 완료 버튼 텍스트 */
  finishText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 스텝 변경 핸들러 */
  onStepChange?: (step: number) => void;
  /** 완료 핸들러 */
  onFinish?: () => void;
  /** 취소 핸들러 */
  onCancel?: () => void;
  /** 커스텀 클래스명 */
  className?: string;
}

export const Wizard = ({
  title = '위저드',
  steps,
  currentStep = 0,
  size = 'md',
  theme = 'default',
  layout = 'horizontal',
  animated = false,
  stepClickable = true,
  nextText = '다음',
  prevText = '이전',
  finishText = '완료',
  cancelText = '취소',
  onStepChange,
  onFinish,
  onCancel,
  className = ''
}: WizardProps) => {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [stepStatuses, setStepStatuses] = useState<Record<string, WizardStep['status']>>({});

  const handleStepClick = (stepIndex: number) => {
    if (!stepClickable || stepIndex === activeStep) return;
    
    const step = steps[stepIndex];
    if (step.disabled) return;
    
    // 이전 스텝으로는 자유롭게 이동 가능
    if (stepIndex < activeStep) {
      setActiveStep(stepIndex);
      onStepChange?.(stepIndex);
      return;
    }
    
    // 다음 스텝으로 이동하려면 현재 스텝이 완료되어야 함
    const currentStepData = steps[activeStep];
    if (currentStepData.validate) {
      const isValid = currentStepData.validate();
      if (isValid instanceof Promise) {
        isValid.then(valid => {
          if (valid) {
            setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
            setActiveStep(stepIndex);
            onStepChange?.(stepIndex);
          } else {
            setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'error' }));
          }
        });
      } else {
        if (isValid) {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
          setActiveStep(stepIndex);
          onStepChange?.(stepIndex);
        } else {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'error' }));
        }
      }
    } else {
      setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
      setActiveStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  const handleNext = async () => {
    if (activeStep >= steps.length - 1) return;
    
    const currentStepData = steps[activeStep];
    if (currentStepData.validate) {
      const isValid = currentStepData.validate();
      if (isValid instanceof Promise) {
        const valid = await isValid;
        if (valid) {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          onStepChange?.(nextStep);
        } else {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'error' }));
        }
      } else {
        if (isValid) {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          onStepChange?.(nextStep);
        } else {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'error' }));
        }
      }
    } else {
      setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handlePrev = () => {
    if (activeStep <= 0) return;
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    onStepChange?.(prevStep);
  };

  const handleFinish = () => {
    const currentStepData = steps[activeStep];
    if (currentStepData.validate) {
      const isValid = currentStepData.validate();
      if (isValid instanceof Promise) {
        isValid.then(valid => {
          if (valid) {
            setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
            onFinish?.();
          } else {
            setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'error' }));
          }
        });
      } else {
        if (isValid) {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
          onFinish?.();
        } else {
          setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'error' }));
        }
      }
    } else {
      setStepStatuses(prev => ({ ...prev, [currentStepData.key]: 'completed' }));
      onFinish?.();
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const getContainerClasses = () => {
    const classes = [
      styles.wizardContainer,
      styles[size],
      theme !== 'default' && styles[theme],
      layout !== 'horizontal' && styles[layout],
      className
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getStepClasses = (stepIndex: number) => {
    const step = steps[stepIndex];
    const status = stepStatuses[step.key] || step.status;
    
    const classes = [
      styles.wizardStep,
      stepIndex === activeStep && styles.active,
      stepIndex < activeStep && styles.completed,
      step.disabled && styles.disabled,
      status === 'error' && styles.error
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getContentClasses = () => {
    const classes = [
      styles.wizardContent,
      animated && styles.animated
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;
  const currentStepData = steps[activeStep];
  const isCurrentStepValid = !currentStepData.validate || currentStepData.validate();

  return (
    <div className={getContainerClasses()}>
      <div className={styles.wizardHeader}>
        <h2 className={styles.wizardTitle}>{title}</h2>
        <div className={styles.wizardProgress}>
          <span>단계 {activeStep + 1} / {steps.length}</span>
          <div className={styles.wizardStepIndicator}>
            {steps.map((_, index) => (
              <div
                key={index}
                className={`${styles.stepDot} ${
                  index === activeStep ? styles.active : 
                  index < activeStep ? styles.completed : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.wizardSteps}>
        {steps.map((step, index) => (
          <div
            key={step.key}
            className={getStepClasses(index)}
            onClick={() => handleStepClick(index)}
          >
            <div className={styles.stepNumber}>
              {index + 1}
            </div>
            <div className={styles.stepLabel}>
              {step.title}
            </div>
            {step.description && (
              <div className={styles.stepDescription}>
                {step.description}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className={getContentClasses()}>
        {currentStepData.content}
      </div>
      
      <div className={styles.wizardFooter}>
        <div className={styles.wizardInfo}>
          <span>단계 {activeStep + 1} / {steps.length}</span>
          <span>•</span>
          <span>{currentStepData.title}</span>
        </div>
        
        <div className={styles.wizardActions}>
          {onCancel && (
            <button
              className={styles.wizardButton}
              onClick={handleCancel}
            >
              {cancelText}
            </button>
          )}
          
          {!isFirstStep && (
            <button
              className={styles.wizardButton}
              onClick={handlePrev}
            >
              {prevText}
            </button>
          )}
          
          {!isLastStep ? (
            <button
              className={`${styles.wizardButton} ${styles.primary}`}
              onClick={handleNext}
              disabled={!isCurrentStepValid}
            >
              {nextText}
            </button>
          ) : (
            <button
              className={`${styles.wizardButton} ${styles.success}`}
              onClick={handleFinish}
              disabled={!isCurrentStepValid}
            >
              {finishText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wizard; 