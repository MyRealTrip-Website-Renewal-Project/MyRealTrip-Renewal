import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '오버레이와 함께 표시되는 모달 다이얼로그 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '모달 표시 여부',
    },
    ariaLabel: {
      control: 'text',
      description: '접근성을 위한 라벨',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Modal</button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '20px', minWidth: '300px' }}>
            <h2>Modal Title</h2>
            <p>This is the modal content. You can put any content here.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithCustomContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Custom Modal</button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '20px', minWidth: '400px' }}>
            <h2>Custom Modal</h2>
            <p>This modal has custom content and styling.</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)}>Confirm</button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Form Modal</button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '20px', minWidth: '400px' }}>
            <h2>Contact Form</h2>
            <form onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="message">Message:</label>
                <textarea id="message" style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '100px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '폼이 포함된 모달 예시입니다.',
      },
    },
  },
};

export const WithAriaLabel: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Accessible Modal</button>
        <Modal 
          open={open} 
          onClose={() => setOpen(false)}
          ariaLabel="Confirmation dialog"
        >
          <div style={{ padding: '20px', minWidth: '300px' }}>
            <h2>Confirm Action</h2>
            <p>Are you sure you want to proceed with this action?</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)}>Confirm</button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '접근성을 위한 aria-label이 설정된 모달입니다.',
      },
    },
  },
}; 