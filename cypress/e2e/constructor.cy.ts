/// <reference types="cypress" />

const INGREDIENT_ITEM = '[data-testid="ingredient-item"]';
const MODAL = '[data-testid="modal"]';
const MODAL_OVERLAY = '[data-testid="modal-overlay"]';
const MODAL_CLOSE = '[data-testid="modal-close"]';
const ORDER_BUTTON = '[data-testid="order-button"]';
const ORDER_NUMBER = '[data-testid="order-number"]';

const BURGER_CONSTRUCTOR = '[data-testid="burger-constructor"]';
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

  it('should create order (with real UI login), open order modal and show correct order number', () => {
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('/');

    cy.get('a[href="/profile"]').click();

    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="password"]').type('mySuperSecret123');

    cy.get('button[type="submit"]').contains('Войти').click();

    cy.url().should('include', '/profile');

    cy.get('a[href="/"]').click();
    cy.get(INGREDIENT_ITEM).should('exist');

    cy.contains(INGREDIENT_ITEM, 'Краторная булка').within(() => {
      cy.get('button').contains('Добавить').click({ force: true });
    });
    cy.contains(INGREDIENT_ITEM, 'Говяжий метеорит').within(() => {
      cy.get('button').contains('Добавить').click({ force: true });
    });

    cy.get(BURGER_CONSTRUCTOR)
      .should('contain', 'Краторная булка')
      .and('contain', 'Говяжий метеорит');

    cy.log('Кликаем на "Оформить заказ"');

    cy.get(ORDER_BUTTON).should('be.visible').and('not.be.disabled').click();

    cy.log('Ждем создания заказа');

    cy.wait('@createOrder').then(() => {
      cy.fixture('order.json').then(({ order: { number } }) => {
        cy.get(ORDER_NUMBER).should('contain', number);
      });
    });
  });
});
