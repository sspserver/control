import type { AvatarFallbackProps, AvatarRootProps } from '@tailus/themer';
import Avatar from './tailus-ui/Avatar';

const MESCHAC_AVATAR = 'https://mars-images.imgix.net/1704976070160-1704976065843icon.png?auto=compress&fit=max&w=128';
const intents: AvatarFallbackProps['intent'][] = ['primary', 'success', 'warning', 'danger', 'warning', 'info', 'gray', 'accent', 'secondary'];

export const AdminAvatar = ({
  src,
  size = 'xxs',
  initial = 'MI',
}: {
  src?: string;
  size?: AvatarRootProps['size'];
  initial?: string;
}) => {
  // const randomIntent = intents[Math.floor(Math.random() * intents.length)];

  return (
    <Avatar.Root size={size}>
      <Avatar.Image src={src} loading="lazy" alt="User Avatar" width={120} height={120} />
      <Avatar.Fallback children={initial} />
    </Avatar.Root>
  );
};
