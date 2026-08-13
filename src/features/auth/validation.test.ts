import { emailSchema, otpSchema } from './validation';

describe('emailSchema', () => {
  it('accepts a valid email', () => {
    expect(emailSchema.safeParse({ email: 'shopper@example.com' }).success).toBe(true);
  });

  it('rejects an empty email', () => {
    const result = emailSchema.safeParse({ email: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a malformed email', () => {
    const result = emailSchema.safeParse({ email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('trims whitespace before validating', () => {
    const result = emailSchema.safeParse({ email: '  shopper@example.com  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('shopper@example.com');
    }
  });
});

describe('otpSchema', () => {
  it('accepts a 6-digit numeric code', () => {
    expect(otpSchema.safeParse({ code: '123456' }).success).toBe(true);
  });

  it('rejects a code that is too short', () => {
    expect(otpSchema.safeParse({ code: '123' }).success).toBe(false);
  });

  it('rejects a non-numeric code', () => {
    expect(otpSchema.safeParse({ code: 'abcdef' }).success).toBe(false);
  });
});
