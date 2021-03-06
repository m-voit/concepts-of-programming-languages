// @ts-nocheck

import { Value } from "../ast/ast";
import {
  andThen,
  expectCodePoint,
  expectCodePoints,
  expectSeveral,
  expectString,
  getFirst,
  getSecond,
  Input,
  isDigit,
  isIdentifierChar,
  isIdentifierStartChar,
  isSpaceChar,
  maybeSpacesBefore,
  Nothing,
  optional,
  orElse,
  Pair,
  repeated,
  Result,
  stringToInput,
} from "./parser";

describe("Test parser.js", () => {
  test("Input.currentCodePoint", () => {
    const input = new Input("a&b", 3);
    const result = input.currentCodePoint();
    const expected = "\x00";

    expect(result).toStrictEqual(expected);
  });

  test("expectCodePoint", () => {
    let input = new Input("a&b", 0);
    let result = expectCodePoint("a")(input);
    let expected = new Result("a", input.remainingInput());

    expect(result).toStrictEqual(expected);

    input = new Input("!a", 0);
    result = expectCodePoint("a")(input);
    expected = new Result(null, input);

    expect(result).toStrictEqual(expected);
  });

  test("expectCodePoints & expectString", () => {
    let input = null;
    let result = expectCodePoints("a&b|c")(input);
    let expected = new Result(null, input);

    expect(result).toStrictEqual(expected);

    input = new Input("!a&b", 0);
    result = expectCodePoints("a&b|c")(input);
    expected = new Result(null, input);

    expect(result).toStrictEqual(expected);

    input = new Input("a&b|c", 0);
    result = expectCodePoints("a&b")(input);
    expected = new Result("a&b", new Input("a&b|c", 3));

    expect(result).toStrictEqual(expected);
  });

  test("repeated", () => {
    const input = null;
    const result = new Result([], input);
    const expected = repeated(null)(input);

    expect(result).toStrictEqual(expected);
  });

  test("orElse", () => {
    let firstParser = expectSeveral(isSpaceChar, isSpaceChar);
    let secondParser = expectSeveral(isIdentifierStartChar, isIdentifierChar);
    let input = new Input(" a&b", 0);

    let result = orElse(firstParser, secondParser)(input);
    let expected = new Result(" ", new Input(" a&b", 1));

    expect(result).toStrictEqual(expected);

    input = new Input("a&b", 0);

    result = orElse(firstParser, secondParser)(input);
    expected = new Result("a", new Input("a&b", 1));

    expect(result).toStrictEqual(expected);
  });

  test("getFirst", () => {
    let pair = new Pair(new Value("a"), new Value("b"));
    let result = getFirst(pair);
    let expected = new Value("a");

    expect(result).toStrictEqual(expected);

    pair = new Value("a");
    result = getFirst(pair);
    expected = new Value("a");

    expect(result).toStrictEqual(expected);
  });

  test("getSecond", () => {
    let pair = new Pair(new Value("a"), new Value("b"));
    let result = getSecond(pair);
    let expected = new Value("b");

    expect(result).toStrictEqual(expected);

    pair = new Value("b");
    result = getSecond(pair);
    expected = new Value("b");

    expect(result).toStrictEqual(expected);
  });

  test("andThen", () => {
    const firstParser = expectSeveral(isSpaceChar, isSpaceChar);
    const secondParser = expectSeveral(isIdentifierStartChar, isIdentifierChar);
    let input = new Input(" a&b", 0);

    let result = andThen(firstParser, secondParser)(input);
    let expected = new Result(new Pair(" ", "a"), new Input(" a&b", 2));

    expect(result).toStrictEqual(expected);

    input = new Input("<>", 0);

    result = andThen(firstParser, secondParser)(input);
    expected = new Result(null, new Input("<>", 0));

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
    let input = new Input("  a&b|c", 0);
    let parser = expectString("a&b");

    let result = maybeSpacesBefore(parser)(input);
    let expected = new Result("a&b", new Input("  a&b|c", 5));

    expect(result).toStrictEqual(expected);
  });
});
