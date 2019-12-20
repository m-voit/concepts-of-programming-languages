// @ts-nocheck

import { Or, Value, Not, And } from "../ast/ast";
import { Pair, Nothing, stringToInput } from "../parser/parser";
import {
  makeOr,
  parseVariable,
  parseExpression,
  parseExclamationMarks,
} from "./boolparser";

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

test("parseExpression", () => {
  let parse = text => parseExpression(stringToInput(text));

  let result = parse("!a");
  let expected = new Not(new Value("a"));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("a&b");
  expected = new And(new Value("a"), new Value("b"));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("a|b");
  expected = new Or(new Value("a"), new Value("b"));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse(" a &  b");
  expected = new And(new Value("a"), new Value("b"));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("a   ");
  expected = new Value("a");

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("a&b&c");
  expected = new And(new Value("a"), new And(new Value("b"), new Value("c")));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("a&(b&c)");
  expected = new And(new Value("a"), new And(new Value("b"), new Value("c")));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("(a&b)&c");
  expected = new And(new And(new Value("a"), new Value("b")), new Value("c"));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("a|b|c");
  expected = new Or(new Value("a"), new Or(new Value("b"), new Value("c")));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("a|(b|c)");
  expected = new Or(new Value("a"), new Or(new Value("b"), new Value("c")));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("(a|b)|c");
  expected = new Or(new Or(new Value("a"), new Value("b")), new Value("c"));

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);

  result = parse("!a & b|c&!(d|e)");
  expected = new Or(
    new And(new Not(new Value("a")), new Value("b")),
    new And(new Value("c"), new Not(new Or(new Value("d"), new Value("e")))),
  );

  expect(result.result).toBe(expected);
  expect(result.remainingInput).not.toBe(null);
});
