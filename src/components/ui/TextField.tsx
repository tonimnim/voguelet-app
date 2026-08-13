import { forwardRef } from 'react';
import type { TextInput, TextInputProps } from 'react-native';

import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, hint, ...inputProps },
  ref
) {
  return (
    <Box className="w-full">
      <Text size="xs" className="text-muted-foreground mb-1">
        {label}
      </Text>
      <Input className={`min-h-11 ${error ? 'border-2 border-destructive' : ''}`} isInvalid={!!error}>
        {/* InputField's generated ref type resolves to its props type, not the TextInput
            instance, in this alpha — cast narrowly rather than widen this wrapper's ref type. */}
        <InputField ref={ref as never} accessibilityLabel={label} maxFontSizeMultiplier={1.6} {...inputProps} />
      </Input>
      {error ? (
        <Text size="xs" className="text-destructive mt-1">
          {error}
        </Text>
      ) : hint ? (
        <Text size="xs" className="text-muted-foreground mt-1">
          {hint}
        </Text>
      ) : null}
    </Box>
  );
});
