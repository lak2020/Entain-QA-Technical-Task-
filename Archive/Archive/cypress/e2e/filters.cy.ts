import { RACING_CATEGORIES } from "../config/constants";

describe("Category Filters", () => {
  it("One Filter should be checked at least", () => {
    cy.visit("");
    cy.get('[data-testid="category-filter-checkbox"]').each(($el, index) => {
      if (index < 2) {
        cy.get($el).click().should("not.be.checked");
      }
      if (index == 2) {
        cy.get($el).click().should("be.checked");
      }
    });
  });

  let actualArr = [];
  it("Get Harness races names", () => {
    cy.visit("");
    cy.get('[data-testid="category-filter-checkbox"]').each(($el, index) => {
      if (index < 2) {
        cy.get($el).click().should("not.be.checked");
      }
    });
    cy.get(".race-name p").each(($el) => {
      actualArr.push($el.text());
      cy.get($el).should("be.visible").should("not.be.empty");
    });
  });

  it("Assert Harness races names", () => {
    expect(actualArr.length).to.equal(5);
  });
});
