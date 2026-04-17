"use client";

import { useState, useCallback } from "react";
import type { FormikHelpers } from "formik";
import {
  handleServerDeleteAction,
  handleServerPostAction,
  handleServerPutAction,
} from "@/utils/formHelpers";

interface ServerActionError {
  message: string;
  status?: number;
  data?: unknown;
}

interface UseServerActionOptions<V> {
  method: "POST" | "PUT" | "DELETE";
  route: string;
  hasMedia?: boolean;
  onSuccess?: (data: unknown, helpers?: FormikHelpers<V>, values?: V) => void;
  onError?: (
    errorData: ServerActionError | Error,
    helpers?: FormikHelpers<V>,
  ) => void;
  onFinish?: (helpers?: FormikHelpers<V>) => void;
}

export function useServerAction<V extends Record<string, unknown>>({
  method,
  route,
  hasMedia,
  onSuccess,
  onError,
  onFinish,
}: UseServerActionOptions<V>) {
  const [isPending, setIsPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const submitHandler = useCallback(
    async (values: V, helpers?: FormikHelpers<V>) => {
      setActionError(null);
      setIsPending(true);

      const successCallback = (responseData: unknown) => {
        onSuccess?.(responseData, helpers, values);
      };

      const errorCallback = (errorData: ServerActionError | Error) => {
        if (
          helpers &&
          errorData &&
          typeof errorData === "object" &&
          "data" in errorData &&
          errorData.data &&
          typeof errorData.data === "object" &&
          "errors" in errorData.data &&
          errorData.data.errors &&
          typeof errorData.data.errors === "object"
        ) {
          helpers.setErrors(errorData.data.errors);
        } else if (errorData instanceof Error) {
          setActionError(errorData.message);
        } else if (
          errorData &&
          typeof errorData === "object" &&
          "message" in errorData
        ) {
          setActionError(errorData.message || "Action failed.");
        } else {
          setActionError("An unknown error occurred.");
        }
        onError?.(errorData, helpers);
      };

      const finishCallback = () => {
        onFinish?.(helpers);
      };

      try {
        if (method === "DELETE") {
          await handleServerDeleteAction({
            route,
            onSuccess: successCallback,
            onError: errorCallback,
            onFinish: finishCallback,
          });
        } else if (method === "PUT") {
          if (!values) {
            throw new Error("Data values are required for PUT requests.");
          }
          await handleServerPutAction({
            route,
            values,
            hasMedia,
            onSuccess: successCallback,
            onError: errorCallback,
            onFinish: finishCallback,
          });
        } else {
          if (!values) {
            throw new Error("Data values are required for POST requests.");
          }
          await handleServerPostAction({
            route,
            values,
            hasMedia,
            onSuccess: successCallback,
            onError: errorCallback,
            onFinish: finishCallback,
          });
        }
      } catch (err) {
        errorCallback(
          err instanceof Error
            ? err
            : new Error("An unexpected error occurred before submitting."),
        );
        finishCallback();
      } finally {
        setIsPending(false);
      }
    },
    [method, route, hasMedia, onSuccess, onError, onFinish],
  );

  return { isPending, actionError, submitHandler };
}
