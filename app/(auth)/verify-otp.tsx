import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform } from 'react-native';

import { Box } from '@/components/ui/box';
import { KeyboardAvoidingView } from '@/components/ui/keyboard-avoiding-view';
import { Pressable } from '@/components/ui/pressable';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { ApiError } from '@/src/api/client';
import { Button } from '@/src/components/ui/Button';
import { OtpInput } from '@/src/components/ui/OtpInput';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';
import { useRequestOtp, useVerifyOtp } from '@/src/features/auth/hooks';
import { OtpFormValues, otpSchema } from '@/src/features/auth/validation';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    email: string;
    expiresInSeconds?: string;
    devCode?: string;
  }>();
  const email = params.email ?? '';

  const verifyOtp = useVerifyOtp();
  const requestOtp = useRequestOtp();

  const [secondsLeft, setSecondsLeft] = useState(Number(params.expiresInSeconds ?? 0) || 300);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: params.devCode ?? '' },
  });

  const onSubmit = (values: OtpFormValues) => {
    verifyOtp.mutate(
      { email, code: values.code },
      {
        onSuccess: () => {
          router.replace('/(auth)/profile-setup');
        },
      }
    );
  };

  const handleResend = () => {
    if (secondsLeft > 0 || !email) return;
    requestOtp.mutate({ email }, { onSuccess: (data) => setSecondsLeft(data.expires_in_seconds) });
  };

  const serverError = verifyOtp.error instanceof ApiError ? verifyOtp.error.message : null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader title="Verify your email" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 p-6">
        <Text size="xl" bold className="text-foreground">
          Enter the code
        </Text>
        <Text className="text-muted-foreground mt-1">We sent a 6-digit code to {email || 'your email'}.</Text>

        <Box className="mt-5">
          <Controller
            control={control}
            name="code"
            render={({ field: { value, onChange } }) => (
              <OtpInput value={value} onChangeText={onChange} error={errors.code?.message} autoFocus />
            )}
          />
        </Box>

        {serverError ? (
          <Text size="xs" className="text-destructive mt-3">
            {serverError}
          </Text>
        ) : null}

        <Box className="mt-5">
          <Button label="Verify" loading={verifyOtp.isPending} onPress={handleSubmit(onSubmit)} />
        </Box>

        <Pressable
          accessibilityRole="button"
          disabled={secondsLeft > 0 || requestOtp.isPending}
          onPress={handleResend}
          hitSlop={8}
          className="mt-5 min-h-11 justify-center">
          <Text className={`underline ${secondsLeft > 0 ? 'text-muted-foreground' : 'text-foreground'}`}>
            {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : 'Resend code'}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
