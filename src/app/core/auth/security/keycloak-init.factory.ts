import {KeycloakService} from 'keycloak-angular';
import {environment} from 'environments/environment';

export const initializeKeycloak = (keycloak: KeycloakService) => (): Promise<boolean> =>
    keycloak.init({
        config: {
            // url: '/auth',
            url: environment.keycloak.authUrl,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
        },
        bearerExcludedUrls: []
    });
