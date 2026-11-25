import type { ReactNode } from "react";

/**
 * A diagonal ribbon across the top end corner of its positioned parent, for
 * one short word such as "Latest". The parent clips it (`overflow-hidden`;
 * a shadcn `Card` already does).
 */
export function Ribbon({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute end-0 top-0 z-10 size-24 overflow-hidden">
      <span className="absolute -end-8 top-5 w-32 rotate-45 bg-brand py-1 text-center text-[0.625rem] font-semibold text-brand-foreground shadow-sm ltr:tracking-wider ltr:uppercase rtl:-rotate-45">
        {children}
      </span>
    </span>
  );
}
