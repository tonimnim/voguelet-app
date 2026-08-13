import { forwardRef } from 'react';
import type { TextInput } from 'react-native';

import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

interface OtpInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  autoFocus?: boolean;
}

export const OtpInput = forwardRef<TextInput, OtpInputProps>(function OtpInput(
  { value, onChangeText, error, autoFocus },
  ref
) {
  return (
    <Box>
      <Input className={`min-h-14 ${error ? 'border-2 border-destructive' : ''}`} isInvalid={!!error}>
        {/* See TextField.tsx — InputField's ref type is off by one in this alpha. */}
        <InputField
          ref={ref as never}
          accessibilityLabel="6-digit verification code"
          value={value}
          onChangeText={(text) => onChangeText(text.replace(/[^0-9]/g, '').slice(0, 6))}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          autoFocus={autoFocus}
          maxLength={6}
          maxFontSizeMultiplier={1.4}
          className="text-center text-3xl font-bold tracking-[12px] pl-3"
        />
      </Input>
      {error ? (
        <Text size="xs" className="text-destructive mt-1">
          {error}
        </Text>
      ) : null}
    </Box>
  );
});
