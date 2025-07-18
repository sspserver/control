import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const indicatorStatuses = tv({
  base: 'block size-3 relative before:absolute before:inset-0 before:rounded-full before:m-auto before:size-2',
  variants: {
    intent: {
      primary: 'before:bg-primary-600',
      secondary: 'before:bg-secondary-600',
      accent: 'before:bg-accent-600',
      gray: 'before:bg-gray-600',
      danger: 'before:bg-danger-600',
      success: 'before:bg-success-600',
      warning: 'before:bg-warning-600',
      info: 'before:bg-info-600',
      neutral: 'before:bg-gray-950 dark:before:bg-white',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

type IndicatorBadgeProps = VariantProps<typeof indicatorStatuses>;

const IndicatorBadge: React.FC<IndicatorBadgeProps> = ({ intent = 'primary' }) => {
  return <span className={indicatorStatuses({ intent })} />;
};

export default IndicatorBadge;
