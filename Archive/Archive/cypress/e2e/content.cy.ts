import { RACING_CATEGORIES } from "../config/constants";

describe("Page Content", () => {
  it("Should correctly display page title", () => {
    cy.visit("");

    cy.get("[data-testid=page-title]")
      .contains("Next To Go Races")
      .and("be.visible");
  });

  it("Should have all filters checked by default", () => {
    cy.get("[data-testid=category-filters]").within(() => {
      RACING_CATEGORIES.forEach((category) => {
        cy.get(`[data-testid=category-filter-${category.categoryId}]`).within(
          () => {
            cy.get("[data-testid=category-filter-label]")
              .contains(category.name)
              .and("be.visible");
            cy.get("[data-testid=category-filter-checkbox]").should(
              "be.checked"
            );
          }
        );
      });
    });
  });
  //
  it("Should correctly display five races", () => {
    cy.get(".race-name p").then(($list) => {
      expect($list.length).to.equal(5);
    });
  });

  //
  it("The five races should be visible and have values", () => {
    cy.get(".race-name p").each(($el) => {
      cy.get($el).should("be.visible").should("not.be.empty");
    });
  });

  //
  it("The five race numbers should be visible and have values", () => {
    cy.get(".race-number").each(($el, index) => {
      cy.get($el).should("be.visible").should("not.be.empty");

      cy.get(
        ":nth-child(1) > :nth-child(3) > :nth-child(" +
          (index + 1) +
          ") > :nth-child(2)"
      ).each(($el) => {
        cy.get($el).should("be.visible").should("not.be.empty");
      });
    });
  });

  //
  it("Test App load API", () => {
    cy.request("GET", "http://localhost:3000/", {}).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("body");
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
    });
  });

  //
  it("Test WS URL", () => {
    cy.request("GET", "ws://localhost:3000/ws", {}).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("body");
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
    });
  });
});
