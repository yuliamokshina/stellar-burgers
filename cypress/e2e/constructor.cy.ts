/// <reference types="cypress" />

const INGREDIENT_ITEM = '[data-testid="ingredient-item"]';
const MODAL = '[data-testid="modal"]';
const MODAL_OVERLAY = '[data-testid="modal-overlay"]';
const MODAL_CLOSE = '[data-testid="modal-close"]';
const BURGER_CONSTRUCTOR = '[data-testid="burger-constructor"]';
const ORDER_BUTTON = '[data-testid="order-button"]';
const ORDER_NUMBER = '[data-testid="order-number"]';

describe('Burger Constructor flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.visit('/');

    cy.wait('@ingredients');
  });

  it('should open ingredient modal and close by overlay click', () => {
    cy.get(INGREDIENT_ITEM).first().click();

    cy.get(MODAL).should('exist');

    cy.get(MODAL_OVERLAY).click({ force: true });
    cy.get(MODAL).should('not.exist');
  });

  it('should open ingredient modal and close by close-button click', () => {
    cy.get(INGREDIENT_ITEM).first().click();
    cy.get(MODAL).should('exist');

    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL).should('not.exist');
  });

  it('should create order (with login mock), open order modal and show correct order number', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem('refreshToken', 'fakeRefresh');
    cy.setCookie('accessToken', 'Bearer fakeAccessToken');

    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.get(INGREDIENT_ITEM).contains('Краторная булка').trigger('dragstart');
    cy.get(BURGER_CONSTRUCTOR).trigger('drop');

    cy.get(INGREDIENT_ITEM).contains('Говяжий метеорит').trigger('dragstart');
    cy.get(BURGER_CONSTRUCTOR).trigger('drop');

    cy.get(ORDER_BUTTON).click();

    cy.wait('@createOrder').then((interception) => {
      cy.fixture('order.json').then(({ order: { number } }) => {
        cy.get(ORDER_NUMBER).should('contain', number);
      });
    });
  });
});
