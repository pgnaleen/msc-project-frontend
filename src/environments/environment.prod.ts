export const environment = {
    production: true,
    apiBaseUrl: 'http://localhost:8089/api/v1',  // mock API
    keycloak: {
        authUrl: 'http://localhost:8080/auth',
        realm: 'gutech',
        clientId: 'sis-admin-frontend'
    }
};
