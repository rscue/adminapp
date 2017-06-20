// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  Auth0Domain: 'rscue.auth0.com',
  Auth0ClientId: '8SCulXqxR40QSXzCUfx64OvRyRS8gQtV',
  ApiUrl: 'https://rscue-api.azurewebsites.net/',
  Auth0Audience: 'https://api.rscue.center/'
};
