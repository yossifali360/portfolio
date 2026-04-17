export const buildFormData = (
  formData: FormData,
  data: unknown,
  parentKey: string | null = null
) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    const obj = data as Record<string, unknown>;
    Object.keys(obj).forEach((key) => {
      if (key === "message" && (obj[key] === "" || obj[key] == null)) {
        return;
      }
      buildFormData(
        formData,
        obj[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    if (parentKey) {
      formData.append(
        parentKey,
        value instanceof Blob ? value : String(value)
      );
    }
  }
};
