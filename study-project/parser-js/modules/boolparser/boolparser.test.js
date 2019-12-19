// @ts-nocheck

import { Or, Value, Not } from "../ast/ast";
import { Pair, Nothing } from "../parser/parser";
import { makeOr, parseVariable, parseExpression } from "./boolparser";

test("makeOr", () => {
  let result = makeOr(new Pair(new Value("a"), new Value("b")));
  let expected = new Or(new Value("a"), new Value("b"));

  expect(result).toBe(expected);

  result = makeOr(new Pair(new Value("a"), new Nothing()));
  expected = new Value("a");

  expect(result).toBe(expected);
});

test("makeAnd", () => {
  let result = makeAnd(new Pair(new Value("a"), new Value("b")));
  let expect = new And(new Value("a"), new Value("b"));

  expect(result).toBe(expected);

  result = makeAnd(new Pair(new Value("a"), new Nothing()));
  expected = new Value("a");

  expect(result).toBe(expected);
});

test("makeNot", () => {
  let result = makeNot(0, new Value("a"));
  let expected = new Value("a");

  expect(result).toBe(expected);

  result = makeNot(3, new Value("a"));
  expected = new Not(new Not(new Not(new Value("a"))));

  expect(result).toBe(expected);
});

test("parseVariable", () => {
  const text = "xyz";
  const expected = new Value("xyz");
  const result = parseVariable(stringToInput(text));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);
});

test("parseExclamationMarks", () => {
  const text = "!!!x";
  const expected = 3;
  const result = parseExclamationMarks(stringToInput(text));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);
});

test("expression", (text, expected) => {
  const result = parseExpression(stringToInput(text));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);
});

test("parseExpression", () => {
  expect(true).toBe(true);
});
