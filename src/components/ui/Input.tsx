import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, id, className = "", ...rest }: InputProps) {
  const inputId = id || rest.name;

  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      {label && (
        <label className="text-sm font-semibold text-text-muted" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-3 bg-surface-2 border rounded-[var(--radius-sm)] text-text transition placeholder:text-text-muted focus:border-primary ${
          error ? "border-danger" : "border-border"
        }`}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
}
