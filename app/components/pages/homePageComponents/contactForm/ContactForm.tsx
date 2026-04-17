"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Formik, Form, FormikErrors } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/button/Button";
import { useServerAction } from "@/hooks/useFormSubmission";
import { FormField } from "../../../common/formField/FormField";
import { cn } from "@/lib/utils";

interface ContactValues extends Record<string, unknown> {
  name: string;
  email: string;
  message: string;
}

const initialValues: ContactValues = {
  name: "",
  email: "",
  message: "",
};

const THANK_YOU_MS = 12000;

export function ContactForm() {
  const t = useTranslations("form");
  const [thanksMounted, setThanksMounted] = useState(false);
  const [thanksEntered, setThanksEntered] = useState(false);
  const thanksExitPendingRef = useRef(false);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    email: Yup.string()
      .required(t("emailRequired"))
      .email(t("emailInvalid")),
  });

  const { isPending, submitHandler } = useServerAction<ContactValues>({
    method: "POST",
    route: "contact",
    hasMedia: false,
    onSuccess: (_responseData, helpers) => {
      helpers?.resetForm({ values: initialValues });
      thanksExitPendingRef.current = false;
      setThanksEntered(false);
      setThanksMounted(true);
    },
    onError: (errorData, helpers) => {
      if (
        errorData &&
        typeof errorData === "object" &&
        "data" in errorData &&
        errorData.data &&
        typeof errorData.data === "object" &&
        "errors" in errorData.data
      ) {
        const payload = errorData.data as { errors?: FormikErrors<ContactValues> };
        if (payload.errors) {
          helpers?.setErrors(payload.errors);
        }
      }
    },
    onFinish: (helpers) => {
      helpers?.setSubmitting(false);
    },
  });

  const hideThanksBanner = useCallback(() => {
    if (!thanksMounted) return;
    thanksExitPendingRef.current = true;
    setThanksEntered(false);
  }, [thanksMounted]);

  useLayoutEffect(() => {
    if (!thanksMounted || thanksEntered) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setThanksEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [thanksMounted, thanksEntered]);

  useEffect(() => {
    if (!thanksMounted || !thanksEntered) return;
    const id = window.setTimeout(() => hideThanksBanner(), THANK_YOU_MS);
    return () => window.clearTimeout(id);
  }, [thanksMounted, thanksEntered, hideThanksBanner]);

  const onThanksTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!thanksExitPendingRef.current) return;
    if (e.propertyName !== "opacity" && e.propertyName !== "transform") return;
    thanksExitPendingRef.current = false;
    setThanksMounted(false);
    setThanksEntered(false);
  };

  return (
    <Formik<ContactValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, helpers) => {
        thanksExitPendingRef.current = false;
        setThanksMounted(false);
        setThanksEntered(false);
        submitHandler(values, helpers);
      }}
    >
      {({ status }) => (
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 sm:w-[70%]">
          {thanksMounted && (
            <div
              role="status"
              aria-live="polite"
              onTransitionEnd={onThanksTransitionEnd}
              className={cn(
                "origin-top rounded-2xl border border-indigo-400/40 bg-indigo-500/10 px-5 py-4 text-start shadow-sm transition-[opacity,transform] duration-300 ease-out motion-reduce:duration-0 dark:border-indigo-400/30 dark:bg-indigo-500/15",
                thanksEntered
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0",
              )}
            >
              <div className="flex gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg text-white dark:bg-indigo-500"
                  aria-hidden
                >
                  ✓
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-base font-semibold text-indigo-950 dark:text-indigo-100">
                    {t("successTitle")}
                  </p>
                  <p className="text-sm leading-relaxed text-indigo-900/90 dark:text-indigo-100/90">
                    {t("successBody")}
                  </p>
                  <button
                    type="button"
                    onClick={hideThanksBanner}
                    className="mt-2 text-sm font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
                  >
                    {t("successDismiss")}
                  </button>
                </div>
              </div>
            </div>
          )}

          <Form className="flex flex-col gap-6">
            {typeof status === "string" && status !== "success" && (
              <p
                className="text-center text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {status}
              </p>
            )}
            <FormField
              id="contact-name"
              name="name"
              label={t("name")}
              placeholder={t("namePlaceholder")}
              type="text"
            />
            <FormField
              id="contact-email"
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              type="email"
            />
            <FormField
              id="contact-message"
              name="message"
              label={t("message")}
              placeholder={t("messagePlaceholder")}
              as="textarea"
              rows={4}
            />

            <Button
              type="submit"
              isLoading={isPending}
              className="rounded-full bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              {t("submit")}
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
