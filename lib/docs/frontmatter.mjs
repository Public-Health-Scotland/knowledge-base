// Optional document details at the top of a doc, between two "---" lines:
//
//   ---
//   title: How to Access Posit Workbench
//   description: Request an account and sign in for the first time.
//   order: 1
//   author: octocat
//   last_reviewed: 2026-11-01
//   review_interval: 12
//   ---
//
// Every field is optional. Problems are reported, never thrown, so one bad
// value can't stop the site being built.
import { parse } from "yaml";

const FENCE = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;
const GITHUB_LOGIN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const isText = (value) => typeof value === "string" && value.trim() !== "";

function realDate(value) {
  // YAML reads 2026-11-01 as a Date. Keep it as the written text.
  const text =
    value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
  if (!DATE.test(text)) return null;
  const date = new Date(`${text}T00:00:00Z`);
  return date.toISOString().slice(0, 10) === text ? text : null;
}

// Each field: a check that returns the cleaned value, or a problem message.
const FIELDS = {
  title: (v) =>
    isText(v) ? { value: v.trim() } : { problem: "should be text" },
  description: (v) =>
    !isText(v)
      ? { problem: "should be text" }
      : v.length > 300
        ? { problem: "should be 300 characters or fewer" }
        : { value: v.trim() },
  order: (v) =>
    Number.isInteger(v) && v >= 0
      ? { value: v }
      : { problem: "should be a whole number, such as 1" },
  author: (v) =>
    typeof v === "string" && GITHUB_LOGIN.test(v.replace(/^@/, ""))
      ? { value: v.replace(/^@/, "") }
      : { problem: "should be a GitHub username, such as octocat" },
  last_reviewed: (v, today) => {
    const date = realDate(v);
    if (!date) return { problem: "should be a date written as YYYY-MM-DD" };
    if (date > today) return { problem: "can't be in the future" };
    return { value: date };
  },
  review_interval: (v) =>
    Number.isInteger(v) && v >= 1 && v <= 36
      ? { value: v }
      : { problem: "should be a number of months from 1 to 36" },
};

export const FRONT_MATTER_FIELDS = Object.keys(FIELDS);

// Splits a doc into its details and its Markdown body.
//   data     - the valid fields
//   body     - the Markdown after the details
//   offset   - lines before the body, so line numbers match the file
//   problems - [{ field, message }] for anything that couldn't be used
export function readFrontMatter(
  source,
  { today = new Date().toISOString().slice(0, 10) } = {},
) {
  const match = source.match(FENCE);
  if (!match) return { data: {}, body: source, offset: 0, problems: [] };

  const offset =
    match[0].split("\n").length - (match[0].endsWith("\n") ? 1 : 0);
  const body = source.slice(match[0].length);
  let raw;
  try {
    raw = parse(match[1]) ?? {};
  } catch (error) {
    const reason = error.message.split("\n")[0];
    return {
      data: {},
      body,
      offset,
      problems: [{ field: null, message: `can't be read (${reason})` }],
    };
  }
  if (typeof raw !== "object" || Array.isArray(raw)) {
    return {
      data: {},
      body,
      offset,
      problems: [
        { field: null, message: 'should be a list of "name: value" lines' },
      ],
    };
  }

  const data = {};
  const problems = [];
  for (const [field, value] of Object.entries(raw)) {
    const check = FIELDS[field];
    if (!check) {
      problems.push({
        field,
        message: "isn't a recognised field",
        unknown: true,
      });
      continue;
    }
    const result = check(value, today);
    if (result.problem) problems.push({ field, message: result.problem });
    else data[field] = result.value;
  }
  return { data, body, offset, problems };
}
