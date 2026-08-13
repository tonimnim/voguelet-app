import { forwardRef } from 'react';
import type { PressableProps, View } from 'react-native';

import { Button as GSButton, ButtonSpinner, ButtonText } from '@/components/ui/button';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_MAP: Record<Variant, 'default' | 'outline' | 'ghost' | 'destructive'> = {
  primary: 'default',
  secondary: 'outline',
  ghost: 'ghost',
  destructive: 'destructive',
};

export const Button = forwardRef<View, ButtonProps>(function Button(
  { label, variant = 'primary', loading, disabled, fullWidth = true, className, ...pressableProps },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <GSButton
      // gluestack's withStyleContext HOC gives Button a ref type more specific than
      // plain View — cast narrowly rather than widen this wrapper's public ref type.
      ref={ref as never}
      variant={VARIANT_MAP[variant]}
      disabled={isDisabled}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      className={`min-h-11 ${fullWidth ? 'w-full' : ''} ${className ?? ''}`}
      {...pressableProps}>
      {loading ? <ButtonSpinner /> : <ButtonText numberOfLines={1}>{label}</ButtonText>}
    </GSButton>
  );
});
