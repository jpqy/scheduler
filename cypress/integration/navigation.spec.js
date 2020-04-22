describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=list]", "Tuesday")
      .click()
      
      // Checks for the "--selected" class to be assigned
      .should("have.class", "day-list__item--selected");
  });
});