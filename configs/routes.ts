const authPath = '/auth';
const applicationsPath = '/applications';

export const configPathRoutes = {
  signIn: `${authPath}/signin`,
  newUser: `${authPath}/register`,
  verifyRequest: `${authPath}/verify`,
  rtb: '/rtb',
  applications: applicationsPath,
  crateApplications: `${applicationsPath}/create`,
  adUnit: '/adunit',
  settings: '/settings',
};
