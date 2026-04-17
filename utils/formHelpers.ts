"use client";

import type { AxiosRequestConfig } from "axios";
import {
  serverDeleteAction,
  serverPostAction,
  serverPutAction,
  type ServerActionError,
} from "@/app/serverActions/ServerActions";
import { buildFormData } from "./BuildFormData";
function getClientLocale(): string {
  if (typeof window === "undefined") return "en";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  if (first === "en" || first === "ar") return first;
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : "en";
}

function getUtmFromSearch(): Partial<
  Record<"utm_source" | "utm_campaign" | "utm_medium", string>
> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Partial<
    Record<"utm_source" | "utm_campaign" | "utm_medium", string>
  > = {};
  for (const key of ["utm_source", "utm_campaign", "utm_medium"] as const) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

/** Merged into payloads so the API can log locale / UTM when needed. */
function getFormMetadata(): {
  language: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
} {
  return {
    language: getClientLocale(),
    ...getUtmFromSearch(),
  };
}

export interface HandleServerPostActionOptions {
  route: string;
  values: Record<string, unknown>;
  hasMedia?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: ServerActionError | Error) => void;
  onFinish?: () => void;
}

export async function handleServerPostAction({
  route,
  hasMedia,
  onSuccess,
  onError,
  onFinish,
  values,
}: HandleServerPostActionOptions): Promise<void> {
  try {
    const formMetadata = getFormMetadata();
    const enrichedValues: Record<string, unknown> = {
      ...values,
      ...formMetadata,
    };

    let payload: FormData | Record<string, unknown> = enrichedValues;
    if (hasMedia) {
      const formData = new FormData();
      buildFormData(formData, enrichedValues, null);
      payload = formData;
    }
    const axiosConfig: AxiosRequestConfig | undefined = hasMedia
      ? {}
      : {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
    const result = await serverPostAction(route, payload, axiosConfig);

    if (result.error) {
      onError?.(result.error);
    } else {
      onSuccess?.(result.data);
    }
  } catch (err) {
    console.error("Unexpected error during POST request handling:", err);
    onError?.(
      err instanceof Error
        ? err
        : new Error("An unexpected client-side error occurred.")
    );
  } finally {
    onFinish?.();
  }
}

export interface HandleServerPutActionOptions {
  route: string;
  values: Record<string, unknown>;
  hasMedia?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: ServerActionError | Error) => void;
  onFinish?: () => void;
}

export async function handleServerPutAction({
  route,
  values,
  hasMedia,
  onSuccess,
  onError,
  onFinish,
}: HandleServerPutActionOptions): Promise<void> {
  try {
    const formMetadata = getFormMetadata();
    const enrichedValues: Record<string, unknown> = {
      ...values,
      ...formMetadata,
    };

    let payload: FormData | Record<string, unknown> = enrichedValues;
    if (hasMedia) {
      const formData = new FormData();
      buildFormData(formData, enrichedValues, null);
      payload = formData;
    }

    const result = await serverPutAction(route, payload);

    if (result.error) {
      onError?.(result.error);
    } else {
      onSuccess?.(result.data);
    }
  } catch (err) {
    console.error("Unexpected error during PUT request handling:", err);
    onError?.(
      err instanceof Error
        ? err
        : new Error("An unexpected client-side error occurred.")
    );
  } finally {
    onFinish?.();
  }
}

export interface HandleServerDeleteActionOptions {
  route: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: ServerActionError | Error) => void;
  onFinish?: () => void;
}

export async function handleServerDeleteAction({
  route,
  onSuccess,
  onError,
  onFinish,
}: HandleServerDeleteActionOptions): Promise<void> {
  try {
    const result = await serverDeleteAction(route);
    if (result.error) {
      onError?.(result.error);
    } else {
      onSuccess?.(result.data);
    }
  } catch (err) {
    console.error("Unexpected error during DELETE request handling:", err);
    onError?.(
      err instanceof Error
        ? err
        : new Error("An unexpected client-side error occurred.")
    );
  } finally {
    onFinish?.();
  }
}
