import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Platform } from 'react-native';

import { Box } from '@/components/ui/box';
import { KeyboardAvoidingView } from '@/components/ui/keyboard-avoiding-view';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { ApiError } from '@/src/api/client';
import { Button } from '@/src/components/ui/Button';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';
import { TextField } from '@/src/components/ui/TextField';
import { useRequestOtp } from '@/src/features/auth/hooks';
import { EmailFormValues, emailSchema } from '@/src/features/auth/validation';

export default function SignInScreen() {
  const router = useRouter();
  const requestOtp = useRequestOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (values: EmailFormValues) => {
    requestOtp.mutate(values, {
      onSuccess: (data) => {
        router.push({
          pathname: '/(auth)/verify-otp',
          params: {
            email: values.email,
            expiresInSeconds: String(data.expires_in_seconds),
            ...(__DEV__ && data.development_code ? { devCode: data.development_code } : {}),
          },
        });
      },
    });
  };

  const serverError = requestOtp.error instanceof ApiError ? requestOtp.error.message : null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader title="Sign in" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 p-6">
        <Text size="xl" bold className="text-foreground">
          What&rsquo;s your email?
        </Text>
        <Text className="text-muted-foreground mt-1">
          We&rsquo;ll send a 6-digit code to verify it&rsquo;s you. No password needed.
        </Text>

        <Box className="mt-5">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                label="Email address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
        </Box>

        {serverError ? (
          <Text size="xs" className="text-destructive mt-3">
            {serverError}
          </Text>
        ) : null}

        <Box className="mt-5">
          <Button label="Send code" loading={requestOtp.isPending} onPress={handleSubmit(onSubmit)} />
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
