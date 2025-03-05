'use client';

import useUserDropdown from '@components/UserDropdown/useUserDropdown';
import Button from '@tailus-ui/Button';
import DropdownMenu from '@tailus-ui/Dropdown';
import { Caption, Title } from '@tailus-ui/typography';
import { HelpCircle, LogOut, MessageCircleQuestion, Settings } from 'lucide-react';
import { AdminAvatar } from './AdminAvatar';

function UserDropdown() {
  const {
    username,
    accountTitle,
    accountLogoURI,
    avatarInitial,
    accountDescription,
    clickSignOutButtonHandler,
    clickUserSettingsButtonHandler,
  } = useUserDropdown();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-[--avatar-radius] hover:ring ring-[--ui-soft-bg] data-[state=open]:ring">
        <AdminAvatar
          size="xs"
          src={accountLogoURI}
          initial={avatarInitial}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content mixed side="bottom" align="end" sideOffset={6} className="z-50 backdrop-blur-sm dark:[--caption-text-color:theme(colors.gray.400)]">
          <div className="grid gap-3 [grid-template-columns:auto_1fr] p-3">
            <AdminAvatar
              size="xs"
              src={accountLogoURI}
              initial={avatarInitial}
            />
            <div>
              <Title className="text-sm" as="span" weight="medium">{accountTitle}</Title>
              <Caption>{username}</Caption>
              <div className="mt-4 grid grid-cols-2 gap-3" data-rounded="large">
                <Button.Root className="bg-gray-50" variant="outlined" size="xs" intent="gray" onClick={clickUserSettingsButtonHandler}>
                  <Button.Icon size="xs" type="leading">
                    <Settings />
                  </Button.Icon>
                  <Button.Label>Manage</Button.Label>
                </Button.Root>
                <Button.Root className="bg-gray-50" variant="outlined" size="xs" intent="gray" onClick={clickSignOutButtonHandler}>
                  <Button.Icon size="xs" type="leading">
                    <LogOut />
                  </Button.Icon>
                  <Button.Label>Sign Out</Button.Label>
                </Button.Root>
              </div>
            </div>
          </div>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <DropdownMenu.Icon>
              <HelpCircle />
            </DropdownMenu.Icon>
            Help
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <DropdownMenu.Icon>
              <MessageCircleQuestion />
            </DropdownMenu.Icon>
            Send feedback
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
