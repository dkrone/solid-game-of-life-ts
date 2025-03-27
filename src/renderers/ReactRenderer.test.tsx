import { render, screen } from '@testing-library/react';
import AppReact from './AppReact';

test('renders learn react link', () => {
  render(<AppReact />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
