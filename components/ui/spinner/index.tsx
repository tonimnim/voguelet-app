'use client';
import { ActivityIndicator } from 'react-native';
import React from 'react';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { styled } from 'nativewind';


// `nativeStyleToProp` typing lags the pinned nativewind@5 preview release — its
// generic signature rejects a config shape the runtime accepts fine. Untyped at
// this single boundary rather than fighting the generics; Spinner's own props
// (below) stay fully typed regardless.
const styledAny: any = styled;
const StyledActivityIndicator: any = styledAny(ActivityIndicator, {
  className: { target: 'style', nativeStyleToProp: { color: true } },
});
const spinnerStyle = tva({});

const Spinner = React.forwardRef<
  React.ComponentRef<typeof ActivityIndicator>,
  React.ComponentProps<typeof ActivityIndicator>
>(function Spinner(
  {
    className,
    color,
    focusable = false,
    'aria-label': ariaLabel = 'loading',
    ...props
  },
  ref
) {
  return (
    <StyledActivityIndicator
      ref={ref}
      focusable={focusable}
      aria-label={ariaLabel}
      {...props}
      color={color}
      className={spinnerStyle({ class: className })}
    />
  );
});

Spinner.displayName = 'Spinner';

export { Spinner };
