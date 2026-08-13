import { api } from '../client';
import type { OtpRequestPayload, OtpRequestResponse, OtpVerifyPayload, OtpVerifyResponse } from '../types';

export const authApi = {
  requestOtp: (payload: OtpRequestPayload) =>
    api.post<OtpRequestResponse>('/api/v1/auth/otp/request/', payload, { auth: false }),

  verifyOtp: (payload: OtpVerifyPayload) =>
    api.post<OtpVerifyResponse>('/api/v1/auth/otp/verify/', payload, { auth: false }),

  logout: (refresh: string) => api.post<void>('/api/v1/auth/logout/', { refresh }),
};
