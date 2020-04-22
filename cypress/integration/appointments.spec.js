describe("Appointments", () => {
  // Reset the test db, visit root, and wait for load
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/")
      .contains("Monday");
  });

  it("should book an interview", () => {

    // Fill out a new interview form and click save
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
      .get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save")
      .click();

    // Expect to see the new appointment card with inputted names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .contains(".appointment__card--show", "Sylvia Palmer");
  });
})