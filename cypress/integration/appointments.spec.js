describe("Appointments", () => {
  // Reset the test db, visit root, and wait for load
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/")
      .contains("Monday");
  });

  it("should book an interview", () => {

    // Fill out a new interview form and click save
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    // Expect to see the new appointment card with inputted names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {

    // Edit the first interview and click save
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear().type("New Student");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    // Expect to see the new appointment card with new name
    cy.contains(".appointment__card--show", "New Student")
      .contains(".appointment__card--show", "Tori Malcolm");
  });
})