/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import SignIn from './SignIn.js'

test('SignIn renders without crashing', () => {
	render(<SignIn />)
	//   console.log("POTATO: ", potato)
	// const
	expect(screen.getByRole('link', { name: 'signUpLink' })).toHaveAttribute(
		'href',
		'http://localhost:3000/SignUp'
	)
})

// test('Sign up link (on SignUp page) takes you to the sign up page', () => {
//   render(<SignIn />);
//   const signUpButton = screen.getByRole('signUpbutton',)
//   user.click(signUpButton)
//   expect(screen.getByRole("SignUp", { name: /choose an origin \(optional\)/i })
//         ).toBeVisible();
// })

// test('Sign in link (on SignIn page) takes you to sign in page', () => {

// })
