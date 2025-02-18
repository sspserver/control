import { twMerge } from 'tailwind-merge';
import Button from './tailus-ui/Button';

type LinkProps = { link: string; label: string; isActive?: boolean; mainNav?: boolean };

function Link({ link, label, isActive = false, mainNav = true }: LinkProps) {
  return (
    <Button.Root
      variant={isActive && !mainNav ? 'soft' : 'ghost'}
      component="a"
      intent="gray"
      href={link}
      size="sm"
      className={twMerge(isActive && mainNav && 'relative before:absolute before:inset-x-0 before:-bottom-2 before:h-0.5 before:rounded-t-full before:bg-primary-600')}
    >
      <Button.Label>{label}</Button.Label>
    </Button.Root>
  );
};

export default Link;
