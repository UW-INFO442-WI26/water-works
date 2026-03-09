import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './src/App';

test('renders header and navbar', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});