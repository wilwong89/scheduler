describe("Navigation", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.get("li")
      .contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  it("should navigate to Monday", () => {
    cy.get("li")
      .contains("[data-testid=day]", "Monday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  const testName = "cypress test";
  it("should book an appointment", () => {
    cy.wait(1000);
    let emptyAppointment = cy
      .get("main > img[data-testid=add-button]:visible")
      .last();

    emptyAppointment.click();
    emptyAppointment.get("input").type(testName);

    cy.get("[alt='Sylvia Palmer']").click();

    cy.get("button")
      .contains("Save")
      .click();

    cy.contains(".appointment__card--show", testName);
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an appointment", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    cy.get(".button--danger").should("be.visible");
    cy.get(".button--danger")
      .contains("Confirm")
      .click();
  });
});
