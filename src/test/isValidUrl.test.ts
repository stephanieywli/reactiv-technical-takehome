// Tests for the URL inputs used in the carousel and cta editor panels
import { describe, expect, it } from "vitest";
import { isValidUrl, normalizeUrl } from "../lib/isValidUrl";

// isValidUrl
describe("isValidUrl", () => {
  it("accepts a complete URL", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
  });

  it("accepts a URL with no protocol", () => {
    expect(isValidUrl("www.google.com")).toBe(true);
  });

  it("rejects a string no protocol/dot", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidUrl("")).toBe(false);
  });

  it("rejects a url where the domain contains invalid characters", () => {
    expect(isValidUrl("https://www.googl;,com")).toBe(false);
  });

  it("accepts a url with hyphens", () => {
    expect(isValidUrl("https://my-site.co.uk")).toBe(true);
  });

  it("accepts a mailto:", () => {
    expect(isValidUrl("mailto:hi@example.com")).toBe(true);
  });
});

// normalizeUrl
describe("normalizeUrl", () => {
  it("adds https:// to a url", () => {
    expect(normalizeUrl("www.google.com")).toBe("https://www.google.com");
  });

  it("leaves a complete url untouched", () => {
    expect(normalizeUrl("https://example.com")).toBe("https://example.com");
  });

  it("leaves a non-http url untouched", () => {
    expect(normalizeUrl("mailto:hi@example.com")).toBe("mailto:hi@example.com");
  });

  it("leaves a hyphenated string untouched", () => {
    expect(normalizeUrl("not-a-url")).toBe("not-a-url");
  });

  it("leaves an empty string untouched", () => {
    expect(normalizeUrl("")).toBe("");
  });
});
