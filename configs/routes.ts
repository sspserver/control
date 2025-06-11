const authPath = '/auth';
const applicationsPath = '/applications';
const adUnitPath = '/adunit';
const rtbPath = '/rtb';

export const configPathRoutes = {
  signIn: `${authPath}/signin`,
  newUser: `${authPath}/register`,
  verifyRequest: `${authPath}/verify`,
  rtb: rtbPath,
  rtbCreate: `${rtbPath}/create`,
  rtbStatistics: `${rtbPath}/statistics`,
  applications: applicationsPath,
  createApplications: `${applicationsPath}/create`,
  adUnit: adUnitPath,
  createAdUnit: `${adUnitPath}/create`,
  settings: '/settings',
  trafficRouters: '/traffic-routers',
  trafficRouterCreate: '/traffic-routers/create',
  statistics: '/statistics',
  agreement: '/agreement',
};
