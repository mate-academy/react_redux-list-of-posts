/// <reference types="cypress" />

describe('UserSelector', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not have users before they are loaded', () => {
    cy.getByDataCy('UserSelector').should('exist');
    cy.getByDataCy('UserSelector').should('not.have.text', 'Choose a user');
  });

  it('should load and display users', () => {
    cy.intercept('GET', '**/users', { fixture: 'users.json' }).as('getUsers');

    cy.wait('@getUsers');
    cy.getByDataCy('UserSelector').should('exist');
  });

  it('should filter posts by selected user', () => {
    cy.intercept('GET', '**/users', { fixture: 'users.json' }).as('getUsers');
    cy.intercept('GET', '**/posts?userId=*', { fixture: 'posts.json' }).as(
      'getPosts',
    );

    cy.wait('@getUsers');

    // Abre o dropdown
    cy.get('[data-cy="UserSelector"] .dropdown-trigger button').click();

    // Seleciona o primeiro usuário
    cy.get('[data-cy="UserOption"]').first().click();

    // Aguarda a requisição de posts
    cy.wait('@getPosts');

    // Verifica se os posts foram exibidos
    cy.get('[data-cy="PostsList"]').should('exist');
  });
});
