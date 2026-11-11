import { socialIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";

const sizes = {
  lg: "size-13 [&_svg]:size-[18px]",
  md: "size-11 [&_svg]:size-4",
  sm: "size-10 [&_svg]:size-[15px]",
};

/** LinkedIn, X and email as round bubbles that bounce on hover. */
export function SocialLinks({ size = "md", className }: { size?: keyof typeof sizes; className?: string }) {
  return (
    <ul className={cn("flex gap-2.5", className)} aria-label="Social links">
      {profile.socials.map((social, i) => {
        const Icon = socialIcon(social.label);
        return (
          <li key={social.href}>
            <a
              href={social.href}
              {...externalLinkProps(social.href)}
              aria-label={social.ariaLabel}
              className={cn(
                "springy grid place-items-center rounded-full bg-story-2 text-cream ring-1 ring-cream/15 hover:-translate-y-1 hover:bg-lavender-deep hover:ring-lavender/50",
                i % 2 ? "hover:rotate-8" : "hover:-rotate-8",
                sizes[size],
              )}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
