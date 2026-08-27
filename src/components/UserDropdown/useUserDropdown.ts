import { configPathRoutes } from '@configs/routes';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function useUserDropdown() {
  const { push } = useRouter();
  const { data } = useSession();
  const user = data?.user;
  const account = data?.account;
  const email = user?.email;
  const accountDescription = account?.description;
  const accountTitle = account?.name;
  const avatarInitial = email?.charAt(0).toUpperCase();
  const clickSignOutButtonHandler = () => signOut({ callbackUrl: '/', redirect: true });
  const clickUserSettingsButtonHandler = () => push(configPathRoutes.settings);

  return {
    username: email,
    accountTitle,
    avatarInitial,
    accountDescription,
    clickSignOutButtonHandler,
    clickUserSettingsButtonHandler,
  };
}

export default useUserDropdown;
