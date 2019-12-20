// @ts-nocheck

import { Or, And, Not, Value } from "../ast/ast";
import { Pair, Nothing, stringToInput } from "../parser/parser";
import {
  makeOr,
  makeAnd,
  makeNot,
  parseVariable,
  parseExpression,
  parseExclamationMarks,
} from "./boolparser";

test("makeOr", () => {
  let result = makeOr(new Value("a"), new Value("b"));
  let expected = new Or(new Value("a"), new Value("b"));

  expect(result).toStrictEqual(expected);

  result = makeOr(new Value("a"), new Nothing());
  expected = new Value("a");

  expect(result).toStrictEqual(expected);
});

test("makeAnd", () => {
  let result = makeAnd(new Value("a"), new Value("b"));
  let expected = new And(new Value("a"), new Value("b"));

  expect(result).toStrictEqual(expected);

  result = makeAnd(new Value("a"), new Nothing());
  expected = new Value("a");

  expect(result).toStrictEqual(expected);
});

test("makeNot", () => {
  let result = makeNot(0, new Value("a"));
  let expected = new Value("a");

  expect(result).toStrictEqual(expected);

  result = makeNot(3, new Value("a"));
  expected = new Not(new Not(new Not(new Value("a"))));

  expect(result).toStrictEqual(expected);
});

test("parseVariable", () => {
  const text = "xyz";
  const expected = new Value("xyz");
  const result = parseVariable(stringToInput(text));

  expect(result.result).toStrictEqual(expected);
  expect(result.remainingInput).not.toStrictEqual(null);
});

test("parseExclamationMarks", () => {
  const text = "!!!x";
  const expected = 3;
  const result = parseExclamationMarks(stringToInput(text));

  expect(result.result).toStrictEqual(expected);
  expect(result.remainingInput).not.toStrictEqual(null);
});

describe("parseExpression", () => {
  test("!a", () => {
    const result = parseExclamationMarks(stringToInput("!a"));
    const expected = new Not(new Value("a"));

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("a&b", () => {
    const result = parseExpression(stringToInput("a&b"));
    const expected = new And(new Value("a"), new Value("b"));

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("a|b", () => {
    const result = parseExclamationMarks(stringToInput("a|b"));
    const expected = new Or(new Value("a"), new Value("b"));

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test(" a &  b", () => {
    const result = parseExclamationMarks(stringToInput(" a &  b"));
    const expected = new And(new Value("a"), new Value("b"));

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("a   ", () => {
    const result = parseExclamationMarks(stringToInput("a   "));
    const expected = new Value("a");

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("a&b&c", () => {
    const result = parseExclamationMarks(stringToInput("a&b&c"));
    const expected = new And(
      new Value("a"),
      new And(new Value("b"), new Value("c")),
    );

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("a&(b&c)", () => {
    const result = parseExclamationMarks(stringToInput("a&(b&c)"));
    const expected = new And(
      new Value("a"),
      new And(new Value("b"), new Value("c")),
    );

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("(a&b)&c", () => {
    const result = parseExclamationMarks(stringToInput("(a&b)&c"));
    const expected = new And(
      new And(new Value("a"), new Value("b")),
      new Value("c"),
    );

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("a|b|c", () => {
    const result = parseExclamationMarks(stringToInput("a|b|c"));
    const expected = new Or(
      new Value("a"),
      new Or(new Value("b"), new Value("c")),
    );

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("a|(b|c)", () => {
    const result = parseExclamationMarks(stringToInput("a|(b|c)"));
    const expected = new Or(
      new Value("a"),
      new Or(new Value("b"), new Value("c")),
    );

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("(a|b)|c", () => {
    const result = parseExclamationMarks(stringToInput("(a|b)|c"));
    const expected = new Or(
      new Or(new Value("a"), new Value("b")),
      new Value("c"),
    );

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });

  test("!a & b|c&!(d|e)", () => {
    const result = parseExclamationMarks(stringToInput("!a & b|c&!(d|e)"));
    const expected = new Or(
      new And(new Not(new Value("a")), new Value("b")),
      new And(new Value("c"), new Not(new Or(new Value("d"), new Value("e")))),
    );

    expect(result.result).toStrictEqual(expected);
    expect(result.remainingInput).not.toStrictEqual(null);
  });
});
