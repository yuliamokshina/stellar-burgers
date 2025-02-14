/// <reference types="cypress" />

describe('Burger Constructor flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.visit('/');

    cy.wait('@ingredients');
  });

  it('should open ingredient modal and close by overlay click', () => {
    cy.get('[data-testid="ingredient-item"]').first().click();

    // Проверяем, что модалка открылась
    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should open ingredient modal and close by close-button click', () => {
    cy.get('[data-testid="ingredient-item"]').first().click();
    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order (with login mock), open order modal and show correct order number', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem('refreshToken', 'fakeRefresh');
    cy.setCookie('accessToken', 'Bearer fakeAccessToken');

    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.get('[data-testid="ingredient-item"]')
      .contains('Краторная булка')
      .trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get('[data-testid="ingredient-item"]')
      .contains('Говяжий метеорит')
      .trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');

    cy.get('[data-testid="order-button"]').click();
  });
});
