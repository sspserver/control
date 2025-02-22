const authPath = '/auth';
const applicationsPath = '/applications';
const adUnitPath = '/adunit';
const rtbPath = '/rtb';

export const configPathRoutes = {
  signIn: `${authPath}/signin`,
  newUser: `${authPath}/register`,
  verifyRequest: `${authPath}/verify`,
  rtb: rtbPath,
  createRtb: `${rtbPath}/create`,
  applications: applicationsPath,
  crateApplications: `${applicationsPath}/create`,
  adUnit: adUnitPath,
  createAdUnit: `${adUnitPath}/create`,
  settings: '/settings',
};
