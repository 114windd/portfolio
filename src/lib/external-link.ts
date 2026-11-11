/** Web links open in a new tab; mailto links stay put so the mail app opens without a blank tab. */
export function externalLinkProps(href: string): { target?: "_blank"; rel?: string } {
  return /^https?:\/\//.test(href) ? { target: "_blank", rel: "noreferrer" } : {};
}
