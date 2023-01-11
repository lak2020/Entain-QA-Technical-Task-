describe("Countdown Timer", () => {
  it("test", () => {
    cy.visit("");
    cy.get(".item")
      .children("p")
      .each(($el) => {
        cy.get($el).should("be.visible");
      });
  });
});
