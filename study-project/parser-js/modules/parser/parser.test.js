// @ts-nocheck

import {
  Input,
  Result,
  expectSeveral,
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

  test("expectIdentifier && expectSeveral", () => {
    let input = new Input("a&b", 0);
    let result = expectSeveral(isIdentifierStartChar, isIdentifierChar)(input);
    let expected = new Result("a", new Input("a&b", 1));

    expect(result).toStrictEqual(expected);

    input = new Input("aa&b", 0);
    result = expectSeveral(isIdentifierStartChar, isIdentifierChar)(input);
    expected = new Result("aa", new Input("aa&b", 2));

    expect(result).toStrictEqual(expected);

    input = new Input("H&z", 0);
    result = expectSeveral(isIdentifierStartChar, isIdentifierChar)(input);
    expected = new Result("H", new Input("H&z", 1));

    expect(result).toStrictEqual(expected);

    input = new Input("!a", 0);
    result = expectSeveral(isIdentifierStartChar, isIdentifierChar)(input);
    expected = new Result(null, new Input("!a", 0));

    expect(result).toStrictEqual(expected);
  });

  test("expectSpaces && optional", () => {});
});
