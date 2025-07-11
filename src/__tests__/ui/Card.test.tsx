import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  CardImage, 
  CardTitle, 
  CardSubtitle, 
  CardActions 
} from '../../components/ui/Card';

describe('Card', () => {
  it('renders card with children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <Card variant="default">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('card--default');

    rerender(
      <Card variant="elevated">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('card--elevated');

    rerender(
      <Card variant="outlined">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('card--outlined');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Card size="sm">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('card--sm');

    rerender(
      <Card size="md">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('card--md');

    rerender(
      <Card size="lg">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('card--lg');
  });

  it('applies clickable class when onClick is provided', () => {
    render(
      <Card onClick={() => {}}>
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('cardClickable');
  });

  it('applies disabled class when disabled is true', () => {
    render(
      <Card disabled>
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('cardDisabled');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        <div>Card content</div>
      </Card>
    );
    
    fireEvent.click(screen.getByText('Card content').closest('.card')!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick} disabled>
        <div>Card content</div>
      </Card>
    );
    
    fireEvent.click(screen.getByText('Card content').closest('.card')!);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-class">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content').closest('.card')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    render(
      <Card style={{ backgroundColor: 'red' }}>
        <div>Card content</div>
      </Card>
    );
    const card = screen.getByText('Card content').closest('.card');
    expect(card).toHaveStyle({ backgroundColor: 'red' });
  });
});

describe('CardHeader', () => {
  it('renders header with children', () => {
    render(
      <Card>
        <CardHeader>
          <div>Header content</div>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card>
        <CardHeader className="custom-header">
          <div>Header content</div>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('Header content').closest('.cardHeader')).toHaveClass('custom-header');
  });
});

describe('CardBody', () => {
  it('renders body with children', () => {
    render(
      <Card>
        <CardBody>
          <div>Body content</div>
        </CardBody>
      </Card>
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card>
        <CardBody className="custom-body">
          <div>Body content</div>
        </CardBody>
      </Card>
    );
    expect(screen.getByText('Body content').closest('.cardBody')).toHaveClass('custom-body');
  });
});

describe('CardFooter', () => {
  it('renders footer with children', () => {
    render(
      <Card>
        <CardFooter>
          <div>Footer content</div>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card>
        <CardFooter className="custom-footer">
          <div>Footer content</div>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer content').closest('.cardFooter')).toHaveClass('custom-footer');
  });
});

describe('CardImage', () => {
  it('renders image with correct attributes', () => {
    render(
      <Card>
        <CardImage src="test.jpg" alt="Test image" />
      </Card>
    );
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
  });

  it('applies custom height', () => {
    render(
      <Card>
        <CardImage src="test.jpg" alt="Test image" height={200} />
      </Card>
    );
    const image = screen.getByAltText('Test image');
    expect(image).toHaveStyle({ height: '200px' });
  });

  it('applies custom className', () => {
    render(
      <Card>
        <CardImage src="test.jpg" alt="Test image" className="custom-image" />
      </Card>
    );
    expect(screen.getByAltText('Test image').closest('.cardImage')).toHaveClass('custom-image');
  });
});

describe('CardTitle', () => {
  it('renders title with default h3 tag', () => {
    render(
      <Card>
        <CardTitle>Test Title</CardTitle>
      </Card>
    );
    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('cardTitle');
  });

  it('renders title with custom tag', () => {
    render(
      <Card>
        <CardTitle as="h1">Test Title</CardTitle>
      </Card>
    );
    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H1');
  });

  it('applies custom className', () => {
    render(
      <Card>
        <CardTitle className="custom-title">Test Title</CardTitle>
      </Card>
    );
    expect(screen.getByText('Test Title')).toHaveClass('custom-title');
  });
});

describe('CardSubtitle', () => {
  it('renders subtitle with children', () => {
    render(
      <Card>
        <CardSubtitle>Test Subtitle</CardSubtitle>
      </Card>
    );
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card>
        <CardSubtitle className="custom-subtitle">Test Subtitle</CardSubtitle>
      </Card>
    );
    expect(screen.getByText('Test Subtitle')).toHaveClass('custom-subtitle');
  });
});

describe('CardActions', () => {
  it('renders actions with children', () => {
    render(
      <Card>
        <CardActions>
          <button>Action 1</button>
          <button>Action 2</button>
        </CardActions>
      </Card>
    );
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  it('applies correct alignment classes', () => {
    const { rerender } = render(
      <Card>
        <CardActions align="start">
          <button>Action</button>
        </CardActions>
      </Card>
    );
    expect(screen.getByText('Action').closest('.cardActions')).toHaveClass('cardActions--start');

    rerender(
      <Card>
        <CardActions align="center">
          <button>Action</button>
        </CardActions>
      </Card>
    );
    expect(screen.getByText('Action').closest('.cardActions')).toHaveClass('cardActions--center');

    rerender(
      <Card>
        <CardActions align="end">
          <button>Action</button>
        </CardActions>
      </Card>
    );
    expect(screen.getByText('Action').closest('.cardActions')).toHaveClass('cardActions--end');

    rerender(
      <Card>
        <CardActions align="space-between">
          <button>Action</button>
        </CardActions>
      </Card>
    );
    expect(screen.getByText('Action').closest('.cardActions')).toHaveClass('cardActions--space-between');
  });

  it('applies custom className', () => {
    render(
      <Card>
        <CardActions className="custom-actions">
          <button>Action</button>
        </CardActions>
      </Card>
    );
    expect(screen.getByText('Action').closest('.cardActions')).toHaveClass('custom-actions');
  });
});

describe('Card Composition', () => {
  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardSubtitle>Subtitle</CardSubtitle>
        </CardHeader>
        <CardBody>
          <p>Body content</p>
        </CardBody>
        <CardFooter>
          <CardActions>
            <button>Cancel</button>
            <button>Confirm</button>
          </CardActions>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
}); 