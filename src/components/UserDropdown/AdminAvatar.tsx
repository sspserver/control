import type { AvatarRootProps } from '@tailus/themer';
import Avatar from '@tailus-ui/Avatar';

export const AdminAvatar = ({
  src,
  size = 'xxs',
  initial = 'MI',
}: {
  src?: string;
  size?: AvatarRootProps['size'];
  initial?: string;
}) => {
  return (
    <Avatar.Root size={size}>
      <Avatar.Image src={src} loading="lazy" alt="User Avatar" width={120} height={120} />
      <Avatar.Fallback children={initial} />
    </Avatar.Root>
  );
};
