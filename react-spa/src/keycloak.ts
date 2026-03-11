import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "https://jsdays-bootcamp-keycloak.react.schule",
  realm: "bookstore",
  clientId: "bookstore-spa",
});
