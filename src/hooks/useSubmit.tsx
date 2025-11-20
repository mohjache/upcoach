"use client";

import { useState, useCallback } from "react";

type ServerAction<T extends any[] = any[], R = any> = (
  ...args: T
) => Promise<R>;

interface UseSubmitOptions<T extends any[] = any[], R = any> {
  onSuccess?: (result: R) => void;
  onError?: (error: Error) => void;
}

export function useSubmit<T extends any[] = any[], R = any>(
  action: ServerAction<T, R>,
  options?: UseSubmitOptions<T, R>,
) {
  const [isSaving, setIsSaving] = useState(false);

  const submit = useCallback(
    async (...args: T) => {
      setIsSaving(true);
      try {
        const result = await action(...args);
        options?.onSuccess?.(result);
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        options?.onError?.(err);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [action, options],
  );

  return {
    submit,
    isSaving,
  };
}
