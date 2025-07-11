import type { Meta, StoryObj } from '@storybook/react';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '폼 컨테이너 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button>Submit</Button>
      </>
    ),
  },
};

export const WithLabels: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="email">Email:</label>
          <Input id="email" placeholder="Enter your email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input id="password" placeholder="Enter your password" type="password" />
        </div>
        <Button>Login</Button>
      </div>
    ),
  },
};

export const ContactForm: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '300px' }}>
        <div>
          <label htmlFor="name">Name:</label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input id="email" placeholder="your.email@example.com" type="email" />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            placeholder="Your message"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <Button>Send Message</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '연락처 폼 예시입니다.',
      },
    },
  },
};

export const RegistrationForm: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
        <div>
          <label htmlFor="username">Username:</label>
          <Input id="username" placeholder="Choose a username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input id="email" placeholder="Enter your email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input id="password" placeholder="Create a password" type="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <Input id="confirmPassword" placeholder="Confirm your password" type="password" />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline">Cancel</Button>
          <Button>Register</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '회원가입 폼 예시입니다.',
      },
    },
  },
};

export const SearchForm: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Input placeholder="Search..." style={{ minWidth: '200px' }} />
        <Button size="sm">Search</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '검색 폼 예시입니다.',
      },
    },
  },
}; 