describe('Home page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/signIn')
	})
	it('signs in', () => {
		cy.get('[data-cy="username-input"]').type('admin@localhost.com')
		cy.get('[data-cy="password-input"]').type('secret')
		cy.get('[data-cy="submit-button"]').click()
	})
})
