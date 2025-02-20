const authPath = '/auth';
const applicationsPath = '/applications';
const adUnitPath = '/adunit';

export const configPathRoutes = {
  signIn: `${authPath}/signin`,
  newUser: `${authPath}/register`,
  verifyRequest: `${authPath}/verify`,
  rtb: '/rtb',
  applications: applicationsPath,
  crateApplications: `${applicationsPath}/create`,
  adUnit: adUnitPath,
  createAdUnit: `${adUnitPath}/create`,
  settings: '/settings',
};
