// Text and background pairs used on the site meet WCAG AA contrast (4.5:1).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  new URL("../../app/assets/styles/brand/_tokens.scss", import.meta.url),
  "utf8",
);

// $name: #hex; or $name: $other; -> { name: "#rrggbb" }
const tokens = {};
for (const [, name, value] of source.matchAll(/^\$([\w-]+):\s*([^;]+);/gm)) {
  const resolved = value.startsWith("$") ? tokens[value.slice(1)] : value;
  if (/^#[0-9a-f]{3,6}$/i.test(resolved)) tokens[name] = resolved;
}

function luminance(hex) {
  const full =
    hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join("")}` : hex;
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

describe("brand colours", () => {
  it("reads the tokens", () => {
    expect(tokens["phs-purple"]).toBe("#3f3685");
    expect(tokens["phs-link"]).toBe("#0078d4");
  });

  const text = [
    "phs-text",
    "phs-text-muted",
    "phs-link-hover",
    "phs-note",
    "phs-tip",
    "phs-important",
    "phs-warning",
    "phs-caution",
  ];
  it.each(text)("%s is readable on white and on the surface colour", (name) => {
    expect(contrast(tokens[name], tokens["phs-white"])).toBeGreaterThanOrEqual(
      4.5,
    );
    expect(
      contrast(tokens[name], tokens["phs-surface"]),
    ).toBeGreaterThanOrEqual(4.5);
  });

  // PHS blue is 4.53:1 on white and below 4.5:1 on grey, so links stay on
  // white.
  it("links are readable on white", () => {
    expect(
      contrast(tokens["phs-link"], tokens["phs-white"]),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("the focus outline stands out from white and the surface colour", () => {
    for (const background of ["phs-white", "phs-surface"]) {
      expect(
        contrast(tokens["phs-focus"], tokens[background]),
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it.each(["phs-purple", "phs-blue", "phs-liberty", "phs-teal", "phs-rust"])(
    "white text is readable on %s",
    (name) => {
      expect(
        contrast(tokens["phs-white"], tokens[name]),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );

  it("navigation links are readable on the purple bar", () => {
    // 88% white over PHS purple (_bootstrap-map.scss).
    const mix = (fg, bg, alpha) =>
      `#${[1, 3, 5]
        .map((i) =>
          Math.round(
            parseInt(fg.slice(i, i + 2), 16) * alpha +
              parseInt(bg.slice(i, i + 2), 16) * (1 - alpha),
          )
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")}`;
    const link = mix("#ffffff", tokens["phs-purple"], 0.88);
    expect(contrast(link, tokens["phs-purple"])).toBeGreaterThanOrEqual(4.5);
  });
});
