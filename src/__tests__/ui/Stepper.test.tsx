import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from '../../components/ui/Stepper';

const defaultSteps = [
  {
    title: 'Step 1',
    description: 'First step description',
  },
  {
    title: 'Step 2',
    description: 'Second step description',
  },
  {
    title: 'Step 3',
    description: 'Third step description',
  },
];

describe('Stepper', () => {
  it('renders stepper with steps', () => {
    render(<Stepper steps={defaultSteps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders step descriptions when showStepDescriptions is true', () => {
    render(<Stepper steps={defaultSteps} showStepDescriptions />);
    expect(screen.getByText('First step description')).toBeInTheDocument();
    expect(screen.getByText('Second step description')).toBeInTheDocument();
    expect(screen.getByText('Third step description')).toBeInTheDocument();
  });

  it('does not render step descriptions when showStepDescriptions is false', () => {
    render(<Stepper steps={defaultSteps} showStepDescriptions={false} />);
    expect(screen.queryByText('First step description')).not.toBeInTheDocument();
    expect(screen.queryByText('Second step description')).not.toBeInTheDocument();
    expect(screen.queryByText('Third step description')).not.toBeInTheDocument();
  });

  it('renders step numbers when showStepNumbers is true', () => {
    render(<Stepper steps={defaultSteps} showStepNumbers />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders custom icons when provided', () => {
    const stepsWithIcons = [
      { title: 'Step 1', icon: '🚀' },
      { title: 'Step 2', icon: '⭐' },
      { title: 'Step 3', icon: '🎉' },
    ];
    
    render(<Stepper steps={stepsWithIcons} />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('renders completed status correctly', () => {
    const stepsWithStatus = [
      { title: 'Step 1', status: 'completed' as const },
      { title: 'Step 2', status: 'active' as const },
      { title: 'Step 3', status: 'pending' as const },
    ];
    
    render(<Stepper steps={stepsWithStatus} />);
    const completedStep = screen.getByText('Step 1').closest('[role="button"]');
    expect(completedStep).toHaveClass('stepperStep--completed');
  });

  it('renders active status correctly', () => {
    const stepsWithStatus = [
      { title: 'Step 1', status: 'completed' as const },
      { title: 'Step 2', status: 'active' as const },
      { title: 'Step 3', status: 'pending' as const },
    ];
    
    render(<Stepper steps={stepsWithStatus} />);
    const activeStep = screen.getByText('Step 2').closest('[role="button"]');
    expect(activeStep).toHaveClass('stepperStep--active');
    expect(activeStep).toHaveAttribute('aria-current', 'step');
  });

  it('renders error status correctly', () => {
    const stepsWithStatus = [
      { title: 'Step 1', status: 'error' as const },
      { title: 'Step 2', status: 'pending' as const },
    ];
    
    render(<Stepper steps={stepsWithStatus} />);
    const errorStep = screen.getByText('Step 1').closest('[role="button"]');
    expect(errorStep).toHaveClass('stepperStep--error');
  });

  it('handles step click when clickable is true', () => {
    const handleStepClick = jest.fn();
    render(<Stepper steps={defaultSteps} clickable onStepClick={handleStepClick} />);
    
    const firstStep = screen.getByText('Step 1').closest('[role="button"]');
    fireEvent.click(firstStep!);
    
    expect(handleStepClick).toHaveBeenCalledWith(0);
  });

  it('does not handle step click when clickable is false', () => {
    const handleStepClick = jest.fn();
    render(<Stepper steps={defaultSteps} onStepClick={handleStepClick} />);
    
    const firstStep = screen.getByText('Step 1').closest('[role="button"]');
    fireEvent.click(firstStep!);
    
    expect(handleStepClick).not.toHaveBeenCalled();
  });

  it('does not handle step click when step is disabled', () => {
    const handleStepClick = jest.fn();
    const stepsWithDisabled = [
      { title: 'Step 1', disabled: true },
      { title: 'Step 2' },
    ];
    
    render(<Stepper steps={stepsWithDisabled} clickable onStepClick={handleStepClick} />);
    
    const disabledStep = screen.getByText('Step 1').closest('[role="button"]');
    fireEvent.click(disabledStep!);
    
    expect(handleStepClick).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Stepper steps={defaultSteps} size="sm" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--sm');

    rerender(<Stepper steps={defaultSteps} size="md" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--md');

    rerender(<Stepper steps={defaultSteps} size="lg" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Stepper steps={defaultSteps} variant="default" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--default');

    rerender(<Stepper steps={defaultSteps} variant="outlined" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--outlined');

    rerender(<Stepper steps={defaultSteps} variant="filled" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--filled');
  });

  it('applies correct orientation classes', () => {
    const { rerender } = render(<Stepper steps={defaultSteps} orientation="horizontal" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--horizontal');

    rerender(<Stepper steps={defaultSteps} orientation="vertical" />);
    expect(screen.getByRole('navigation')).toHaveClass('stepper--vertical');
  });

  it('renders with correct aria attributes', () => {
    render(<Stepper steps={defaultSteps} aria-label="Test stepper" />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Test stepper');
  });

  it('renders clickable steps with correct role', () => {
    render(<Stepper steps={defaultSteps} clickable />);
    const steps = screen.getAllByRole('button');
    expect(steps).toHaveLength(3);
  });

  it('renders non-clickable steps without button role', () => {
    render(<Stepper steps={defaultSteps} />);
    const steps = screen.queryAllByRole('button');
    expect(steps).toHaveLength(0);
  });

  it('renders disabled steps with correct aria attributes', () => {
    const stepsWithDisabled = [
      { title: 'Step 1', disabled: true },
      { title: 'Step 2' },
    ];
    
    render(<Stepper steps={stepsWithDisabled} clickable />);
    const disabledStep = screen.getByText('Step 1').closest('[role="button"]');
    expect(disabledStep).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders steps with correct aria-labels', () => {
    render(<Stepper steps={defaultSteps} />);
    const steps = screen.getAllByText(/Step \d/);
    
    steps.forEach((step, index) => {
      const stepElement = step.closest('[role="button"]');
      if (stepElement) {
        expect(stepElement).toHaveAttribute('aria-label', `Step ${index + 1}`);
      }
    });
  });

  it('renders completed steps with correct aria-label', () => {
    const stepsWithStatus = [
      { title: 'Step 1', status: 'completed' as const },
      { title: 'Step 2', status: 'active' as const },
    ];
    
    render(<Stepper steps={stepsWithStatus} />);
    const completedStep = screen.getByText('Step 1').closest('[role="button"]');
    expect(completedStep).toHaveAttribute('aria-label', 'Step 1 완료');
  });

  it('renders error steps with correct aria-label', () => {
    const stepsWithStatus = [
      { title: 'Step 1', status: 'error' as const },
    ];
    
    render(<Stepper steps={stepsWithStatus} />);
    const errorStep = screen.getByText('Step 1').closest('[role="button"]');
    expect(errorStep).toHaveAttribute('aria-label', 'Step 1 오류');
  });

  it('renders active steps with correct aria-label', () => {
    const stepsWithStatus = [
      { title: 'Step 1', status: 'active' as const },
    ];
    
    render(<Stepper steps={stepsWithStatus} />);
    const activeStep = screen.getByText('Step 1').closest('[role="button"]');
    expect(activeStep).toHaveAttribute('aria-label', 'Step 1 진행 중');
  });

  it('applies custom className', () => {
    render(<Stepper steps={defaultSteps} className="custom-stepper" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-stepper');
  });

  it('applies custom style', () => {
    render(<Stepper steps={defaultSteps} style={{ backgroundColor: 'red' }} />);
    const stepper = screen.getByRole('navigation');
    expect(stepper).toHaveStyle({ backgroundColor: 'red' });
  });

  it('handles keyboard navigation for clickable steps', () => {
    const handleStepClick = jest.fn();
    render(<Stepper steps={defaultSteps} clickable onStepClick={handleStepClick} />);
    
    const firstStep = screen.getByText('Step 1').closest('[role="button"]');
    fireEvent.keyDown(firstStep!, { key: 'Enter' });
    
    expect(handleStepClick).toHaveBeenCalledWith(0);
  });

  it('does not handle keyboard navigation for non-clickable steps', () => {
    const handleStepClick = jest.fn();
    render(<Stepper steps={defaultSteps} onStepClick={handleStepClick} />);
    
    const firstStep = screen.getByText('Step 1').closest('[role="button"]');
    if (firstStep) {
      fireEvent.keyDown(firstStep, { key: 'Enter' });
      expect(handleStepClick).not.toHaveBeenCalled();
    }
  });

  it('handles empty steps array', () => {
    render(<Stepper steps={[]} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('handles single step', () => {
    render(<Stepper steps={[{ title: 'Single Step' }]} />);
    expect(screen.getByText('Single Step')).toBeInTheDocument();
  });

  it('handles steps without descriptions', () => {
    const stepsWithoutDescriptions = [
      { title: 'Step 1' },
      { title: 'Step 2' },
    ];
    
    render(<Stepper steps={stepsWithoutDescriptions} showStepDescriptions />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });
}); 