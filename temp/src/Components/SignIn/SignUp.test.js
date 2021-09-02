import { ClickAwayListener } from '@material-ui/core';
import { render, screen } from '@testing-library/react';
import SignUp from './SignUp.js';

test('SignUp renders without crashing', () => {
    render(<SignUp/>);
  expect(screen.getByRole('link', {name:'AccountAlready'})).toHaveAttribute('href', 'http://localhost:3000/SignIn');
  });
  