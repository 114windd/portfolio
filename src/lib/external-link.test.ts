import { describe, expect, it } from "vitest";
import { externalLinkProps } from "./external-link";

describe("externalLinkProps", () => {
  it("opens web links in a new tab without leaking the referrer", () => {
    expect(externalLinkProps("https://x.com/kxrede_")).toEqual({ target: "_blank", rel: "noreferrer" });
  });

  it("leaves mailto links in the current tab", () => {
    expect(externalLinkProps("mailto:koredeodubanjo1@gmail.com")).toEqual({});
  });
});
