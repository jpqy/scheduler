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

  it("should delete an interview", () => {

    // Delete the first interview and click confirm
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.contains("Confirm").click();

    // See the "Deleting" status temporarily
    cy.contains("Deleting");
    cy.contains("Deleting").should("not.exist");

    // Expect to not find the student name anymore
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist")
  });
})