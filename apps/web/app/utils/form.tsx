import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-600 text-xs">
          {field.state.meta.errors[0].message}
        </em>
      ) : null}
    </>
  );
}