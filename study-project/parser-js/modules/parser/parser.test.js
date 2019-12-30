// @ts-nocheck

import {
  Input,
  Result,
  expectSeveral,
  isIdentifierStartChar,
  isDigit,
  isIdentifierChar,
  isSpaceChar,
  optional,
  Nothing,
  stringToInput,
} from "./parser";

describe("Test parser.js", () => {
  test("expectCodePoint", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("expectCodePoints", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("expectString", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("repeated", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("orElse", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("getFirst", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("getSecond", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("first", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("second", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("andThen", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("convert", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });

  test("optional && expectSpaces", () => {
    let input = new Input("A", 0);
    let expected = new Result(new Nothing(), input);
    let result = optional(expectSeveral(isSpaceChar, isSpaceChar))(input);

    expect(result).toStrictEqual(expected);

    input = new Input(" A", 0);
    expected = new Result(" ", new Input(" A", 1));
    result = optional(expectSeveral(isSpaceChar, isSpaceChar))(input);

    expect(result).toStrictEqual(expected);
  });

  test("stringToInput", () => {
    let result = stringToInput("a");
    let expected = new Input("a", 0);

    expect(result).toStrictEqual(expected);
  });

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

    result = isDigit("ä");
    expected = false;

    expect(result).toStrictEqual(expected);
  });

  test("isIdentifierChar", () => {
    let result = isIdentifierChar("a");
    let expected = true;

    expect(result).toStrictEqual(expected);

    result = isIdentifierChar("ä");
    expected = false;

    expect(result).toStrictEqual(expected);
  });

  test("isSpaceChar", () => {
    let result = isSpaceChar(" ");
    let expected = true;

    expect(result).toStrictEqual(expected);

    result = isSpaceChar("ä");
    expected = false;

    expect(result).toStrictEqual(expected);

    result = isSpaceChar("\r");
    expected = true;

    expect(result).toStrictEqual(expected);
  });

  test("expectSeveral && expectIdentifier", () => {
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

  test("maybeSpacesBefore", () => {
    let result = "";
    let expected = "";

    expect(result).toStrictEqual(expected);
  });
});
