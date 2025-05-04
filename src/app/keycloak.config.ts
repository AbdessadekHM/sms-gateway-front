import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService,
} from 'keycloak-angular';

const localhostCondition =
  createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(http:\/\/localhost:9000)(\/.*)?$/i,
  });

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      realm: 'myrealme',
      url: 'http://localhost:9000',
      clientId: 'ecom-bdcc-first',
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
      window.location.origin + '/silent-check-sso.html',
      redirectUri: window.location.origin + '/',
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000,
      }),
    ],
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition],
      },
    ],
  });
