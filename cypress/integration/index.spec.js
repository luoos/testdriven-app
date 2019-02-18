describe('Index', () => {
  it('users should be able to view the "/" page', () => {
    cy
      .visit('/')
      .get('a').contains('Previous')
      .get('a').contains('Next')
  })
});