// Fast login using session
Cypress.Commands.add("login", (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: "POST",
        url: "/rest/user/login",
        body: { email: username, password: password },
      }).then((response) => {
        window.localStorage.setItem("token", response.body.authentication.token);
        window.sessionStorage.setItem("bid", response.body.authentication.bid);
        cy.setCookie("token", response.body.authentication.token);
        cy.setCookie("cookieconsent_status", "dismiss");
        cy.setCookie("welcomebanner_status", "dismiss");
      });
    },
    {
      validate() {
        cy.request("/whoami").its("status").should("eq", 200);
      },
    }
  );
});
