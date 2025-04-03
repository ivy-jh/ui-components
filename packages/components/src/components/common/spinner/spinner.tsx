import { cn } from '@/utils/class-name';
import { spinner, type SpinnerVariants } from './spinner.css';

type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & SpinnerVariants;

/* from https://cssloaders.github.io/, licensed under MIT */
const Spinner = ({ size, className, ...props }: SpinnerProps) => <span className={cn(spinner({ size }), className)} {...props} />;
Spinner.displayName = 'Spinner';

export { Spinner };
