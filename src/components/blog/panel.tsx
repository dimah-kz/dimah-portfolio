"use client";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "cn";
import { ChevronDownIcon, ListIcon, Share2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TOCScrollArea, useTOCItems } from "@/components/toc";
import { TOCItem, TOCItems } from "@/components/toc/default";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/** The table of contents and share button of a post, floating at the bottom. */
export function BlogPanel() {
  const t = useTranslations("blog");
  const items = useTOCItems();
  const [open, setOpen] = useState(false);

  async function onShare() {
    const data = { title: document.title, url: location.href };
    if (navigator.share && navigator.canShare?.(data)) {
      try {
        await navigator.share(data);
      } catch {
        // dismissed
      }
      return;
    }
    await navigator.clipboard.writeText(location.href);
    toast.add({ title: t("copied"), type: "success" });
  }

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "fixed inset-x-0 bottom-3 z-20 mx-auto rounded-xl border bg-background/85 p-1 text-sm shadow-lg backdrop-blur-md sm:bottom-5",
        items.length > 0 ? "w-[calc(100%-1.5rem)] sm:max-w-sm" : "w-fit",
      )}
    >
      <CollapsibleContent>
        <TOCScrollArea className="max-h-[min(600px,calc(100vh-7.5rem))] px-2">
          <TOCItems>
            {items.map((item) => (
              <TOCItem
                key={item.url}
                item={item}
                onClick={() => setOpen(false)}
              />
            ))}
          </TOCItems>
        </TOCScrollArea>
      </CollapsibleContent>
      <div className="flex flex-row gap-1">
        {items.length > 0 ? (
          <CollapsibleTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "min-w-0",
            )}
          >
            <ListIcon data-icon="inline-start" />
            <span className="truncate">{t("toc")}</span>
            <ChevronDownIcon
              data-icon="inline-end"
              className={cn("transition-transform", open && "rotate-180")}
            />
          </CollapsibleTrigger>
        ) : null}
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "ms-auto text-muted-foreground",
          )}
          onClick={onShare}
        >
          <Share2Icon data-icon="inline-start" />
          {t("share")}
        </button>
      </div>
    </Collapsible>
  );
}
