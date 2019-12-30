// @ts-nocheck

import {
  isIdentifierStartChar,
  isDigit,
  isIdentifierChar,
  isSpaceChar,
} from "./parser";

describe("Test parser.js", () => {
  test("isIdentifierStartChar", () => {
    let result = isIdentifierStartChar("a");
    let expected = true;

    expect(result).toStrictEqual(expected);

    result = isIdentifierStartChar("ä");
    expected = false;

    expect(result).toStrictEqual(expected);
  });

  test("isDigit", () => {
    let result = isDigit("0");
    let expected = true;

    expect(result).toStrictEqual(expected);

    result = isIdentifierStartChar("ä");
    expected = false;

    expect(result).toStrictEqual(expected);
  });

  test("isIdentifierChar", () => {
    let result = isIdentifierChar("a");
    let expected = true;

    expect(result).toStrictEqual(expected);

    result = isIdentifierStartChar("ä");
    expected = false;

    expect(result).toStrictEqual(expected);
  });

  test("isSpaceChar", () => {
    let result = isSpaceChar(" ");
    let expected = true;

    expect(result).toStrictEqual(expected);

    result = isIdentifierStartChar("ä");
    expected = false;

    expect(result).toStrictEqual(expected);
  });
});
