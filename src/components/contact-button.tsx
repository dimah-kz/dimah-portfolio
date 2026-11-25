import { buttonVariants } from "@/components/ui/button";
import { isExternal, type Profile } from "@/lib/links";
import { cn } from "cn";
import { useTranslations } from "next-intl";

/** The main call to action for a profile, such as "Message on Telegram". */
export function ContactButton({
  profile,
  showHandle = false,
  className,
}: {
  profile: Profile;
  /** Adds `@name` after the label, for profiles addressed by a username. */
  showHandle?: boolean;
  className?: string;
}) {
  const t = useTranslations("contact.cta");
  const { icon: Icon } = profile;

  return (
    <a
      href={profile.href}
      {...(isExternal(profile.href)
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
      className={cn(
        buttonVariants({ size: "lg" }),
        "h-10 gap-2 px-4 text-sm",
        className,
      )}
    >
      <Icon data-icon="inline-start" />
      {t(profile.id)}
      {showHandle && profile.handle ? (
        <span dir="ltr" className="text-xs opacity-60">
          @{profile.handle}
        </span>
      ) : null}
    </a>
  );
}
