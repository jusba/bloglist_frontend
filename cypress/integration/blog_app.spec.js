describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { name: 'testaaja', username: 'kayttaja', password: 'salasana' }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')


  })

  it('Login from is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('kayttaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('testaaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('väärä')
      cy.get('#password').type('eioikee')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })
  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('kayttaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('otsikko')
      cy.get('#author').type('tekjija')
      cy.get('#url').type('osoite')
      cy.get('#submit-button').click()
    })

    it('A blog can be created', function () {

      cy.contains('cancel').click()
      cy.contains('otsikko tekjija')
      cy.contains('show').click()
      cy.contains('osoite')



    })
    it('A blog can be liked and removed', function () {
      cy.contains('show').click()
      cy.contains('Like').click()
      cy.contains('1')
      cy.contains('Like').click()
      cy.contains('2')
      cy.contains('Like').click()
      cy.contains('3')
      cy.contains('otsikko tekjija')
      cy.contains('remove').click()
      cy.contains('otsikko tekjija').should('not.exist')

    })

    it('wrong user cant remove', function () {
      const user = { name: 'testaaja2', username: 'kayttaja2', password: 'salasana2' }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.contains('logout').click()
      cy.get('#username').type('kayttaja2')
      cy.get('#password').type('salasana2')
      cy.get('#login-button').click()
      cy.contains('show').click()
      cy.contains('remove').should('not.exist')

    })
    it('Likes are in right order', function () {
      // jostain taivaan syistä johtuen tämä feilaa aina joskus
      cy.get('#title').type('otsikko2')
      cy.get('#author').type('tekjija2')
      cy.get('#url').type('osoite2')
      cy.get('#submit-button').click()
      // jostain syystä childien nappaus ei onnistu ilman sivun päivitystä
      cy.visit('http://localhost:3000')
      cy.get(':nth-child(4) > :nth-child(1) > button').click()
      cy.get(':nth-child(1) > :nth-child(3) > button').click()
      cy.get(':nth-child(4) > :nth-child(2) > button').click()
      cy.get(':nth-child(2) > :nth-child(3) > button').click()
      cy.get(':nth-child(2) > :nth-child(3) > button').click()
      // jostain syystä childien nappaus ei onnistu ilman sivun päivitystä
      cy.visit('http://localhost:3000')
      cy.get(':nth-child(1) > :nth-child(1) > :nth-child(4) > :nth-child(1)').contains('otsikko tekjija')
      cy.get(':nth-child(4) > :nth-child(2)').contains('otsikko2 tekjija2')
      cy.get(':nth-child(4) > :nth-child(1) > button').click()
      cy.get(':nth-child(4) > :nth-child(2) > button').click()
      cy.get(':nth-child(4) > :nth-child(1) > :nth-child(3)').contains('1').should('not.exist')






    })

  })

})
