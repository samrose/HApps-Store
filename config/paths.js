'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Use base dir for node_modules and stuff, but
// point to the app subdir for actual code
const appSubdirectory = 'ui-src'

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const baseDirectory = fs.realpathSync(process.cwd());
const appDirectory = path.join(baseDirectory, appSubdirectory);
const resolveBase = relativePath => path.resolve(baseDirectory, relativePath);
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build-HApps'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appPackageJson: resolveBase('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveBase('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.ts'),
  appNodeModules: resolveBase('node_modules'),
  appTsConfig: resolveBase('tsconfig.json'),
  appTsProdConfig: resolveBase('tsconfig.json'),
  appTsLint: resolveBase('tslint.json'),
  publicUrl: getPublicUrl(resolveBase('package.json')),
  servedPath: getServedPath(resolveBase('package.json')),
};
