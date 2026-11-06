import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateWage,
  buildShareUrl,
  clearShareUrl,
  EMPTY_STATE,
  formatMoney,
  parseAmount,
  restoreState,
  readSharedState,
  readSharedResult,
} from "../src/app/[lang]/should-i-buy-it/calculator.ts";

const wage = (overrides = {}) =>
  calculateWage({
    ...EMPTY_STATE,
    pay: "1200",
    paidHours: "40",
    extraHours: "10",
    workCosts: "200",
    ...overrides,
  });

test("equivalent weekly, monthly, and yearly salaries produce the same wages", () => {
  for (const [payPeriod, pay] of [
    ["weekly", "1200"],
    ["monthly", "5200"],
    ["yearly", "62400"],
  ]) {
    const result = wage({ payPeriod, pay });
    assert.equal(result.weeklyPay, 1200);
    assert.equal(result.weeklyHours, 50);
    assert.equal(result.nominalWage, 30);
    assert.equal(result.realWage, 20);
    assert.deepEqual(result.errors, {});
  }
});

test("monthly income uses 12/52, not four weeks, and preserves fractional amounts", () => {
  const result = wage({ pay: "4333.33", payPeriod: "monthly" });
  assert.ok(Math.abs(result.weeklyPay - 999.9992307692308) < 1e-10);
  assert.ok(Math.abs(result.realWage - 15.999984615384616) < 1e-10);
});

test("changing the selected period reinterprets the entered amount", () => {
  const pay = "5200";
  assert.equal(wage({ pay, payPeriod: "weekly" }).weeklyPay, 5200);
  assert.equal(wage({ pay, payPeriod: "monthly" }).weeklyPay, 1200);
  assert.equal(wage({ pay, payPeriod: "yearly" }).weeklyPay, 100);
});

test("blank optional costs and unpaid hours mean zero, fractional hours are valid", () => {
  const result = wage({
    pay: "1012.50",
    paidHours: "37.5",
    extraHours: "",
    workCosts: "",
  });
  assert.equal(result.weeklyHours, 37.5);
  assert.equal(result.realWage, 27);
  assert.deepEqual(result.errors, {});
});

test("missing pay and missing paid hours do not fabricate a wage", () => {
  for (const overrides of [{ pay: "" }, { paidHours: "" }]) {
    const result = wage(overrides);
    assert.equal(result.realWage, null);
    assert.equal(result.nominalWage, null);
    assert.deepEqual(result.errors, {});
  }
});

test("zero pay or zero paid hours require correction even with unpaid hours", () => {
  assert.equal(wage({ pay: "0" }).errors.pay, "positivePay");
  assert.equal(
    wage({ paidHours: "0", extraHours: "10" }).errors.paidHours,
    "positiveHours",
  );
  assert.equal(wage({ paidHours: "0", extraHours: "10" }).realWage, null);
});

test("negative, malformed, and non-finite values are rejected for every wage field", () => {
  for (const field of ["pay", "paidHours", "extraHours", "workCosts"]) {
    for (const value of [
      "-1",
      "NaN",
      "Infinity",
      "1e309",
      "12oops",
      "1,2",
      "0x10",
    ]) {
      const result = wage({ [field]: value });
      assert.equal(result.errors[field], "invalidNumber", `${field}: ${value}`);
      assert.equal(result.realWage, null);
    }
  }
});

test("work costs are compared against normalized weekly income", () => {
  for (const workCosts of ["1200", "1200.01", "5200"]) {
    const result = wage({ pay: "5200", payPeriod: "monthly", workCosts });
    assert.equal(result.errors.workCosts, "netPay");
    assert.equal(result.realWage, null);
    assert.equal(result.nominalWage, 30);
  }
  assert.ok(wage({ workCosts: "1199.99" }).realWage > 0);
});

test("weekly paid plus unpaid hours cannot exceed the hours in a week", () => {
  assert.equal(wage({ paidHours: "168", extraHours: "0" }).weeklyHours, 168);
  assert.equal(wage({ paidHours: "169" }).errors.paidHours, "totalHours");
  assert.equal(
    wage({ paidHours: "160", extraHours: "9" }).errors.extraHours,
    "totalHours",
  );
  assert.equal(wage({ paidHours: "160", extraHours: "9" }).realWage, null);
});

test("overflow and underflow never produce an infinite or zero real wage", () => {
  for (const overrides of [
    { pay: "1e308", paidHours: "0.001", extraHours: "0", workCosts: "0" },
    { pay: "1e-323", payPeriod: "yearly", workCosts: "0" },
  ]) {
    const result = wage(overrides);
    assert.equal(result.errors.pay, "range");
    assert.equal(result.realWage, null);
  }
});

test("legacy saved amounts remain weekly and all new periods round-trip", () => {
  const legacy = restoreState({ pay: "1200", paidHours: "40" });
  assert.equal(legacy.payPeriod, "weekly");
  assert.equal(wage(legacy).realWage, 30);
  for (const payPeriod of ["weekly", "monthly", "yearly"]) {
    const state = { ...EMPTY_STATE, pay: "5200", payPeriod };
    assert.deepEqual(restoreState(JSON.parse(JSON.stringify(state))), state);
  }
});

test("corrupt saves cannot crash parsing or reinterpret unknown salary periods", () => {
  for (const value of [null, false, 123, "bad", [], ["5200"]]) {
    assert.deepEqual(restoreState(value), EMPTY_STATE);
  }
  const restored = restoreState({
    pay: 5200,
    paidHours: null,
    workCosts: {},
    item: "Camera",
  });
  assert.equal(restored.pay, "");
  assert.equal(restored.paidHours, "40");
  assert.equal(restored.workCosts, "");
  assert.equal(restored.item, "Camera");
  assert.equal(restoreState({ pay: "5200", payPeriod: "fortnightly" }).pay, "");
});

test("reset defaults include weekly pay and decimal parsing is strict", () => {
  assert.equal(EMPTY_STATE.payPeriod, "weekly");
  assert.equal(EMPTY_STATE.pay, "");
  assert.equal(parseAmount("1,234.50"), 1234.5);
  assert.equal(parseAmount(".5"), 0.5);
  assert.equal(parseAmount("1e3"), 1000);
  assert.equal(parseAmount("123abc"), null);
});

test("result sharing round-trips only public outputs, including Unicode and decimals", () => {
  const snapshot = {
    item: "小布 & Dyson? 50% + #1 / café",
    currency: "¥ CNY",
    score: 75,
    costPerUse: 4.1345192307692304,
    lifeHours: 119.94,
  };
  const url = new URL(
    buildShareUrl(
      "https://example.com/zh/should-i-buy-it?utm_source=old#result",
      snapshot,
    ),
  );
  assert.equal(url.pathname, "/zh/should-i-buy-it");
  assert.equal(url.hash, "");
  assert.equal(url.searchParams.get("result"), "1");
  assert.equal(url.searchParams.has("utm_source"), false);
  assert.deepEqual(
    [...url.searchParams.keys()],
    ["result", "item", "currency", "score", "costPerUse", "lifeHours"],
  );
  assert.deepEqual(readSharedResult(url.search), snapshot);
  assert.deepEqual(
    readSharedResult(
      new URL(
        buildShareUrl(url.href, { ...snapshot, currency: "", lifeHours: null }),
      ).search,
    ),
    { ...snapshot, currency: "", lifeHours: null },
  );
});

test("sharing cannot leak private fields even if passed an object with extra properties", () => {
  const result = {
    ...EMPTY_STATE,
    item: "Phone",
    currency: "USD",
    score: 80,
    costPerUse: 5,
    lifeHours: 100,
    pay: "98765.43",
    realWage: 92,
    weeklyHours: 45,
    workingWeeks: 2.67,
    rows: [{ label: "Money source", points: 0 }],
  };
  const url = new URL(
    buildShareUrl(
      "https://example.com/en/should-i-buy-it?share=1&pay=98765.43&paidHours=40&money=debt",
      result,
    ),
  );
  for (const field of [
    "pay",
    "payPeriod",
    "price",
    "uses",
    "paidHours",
    "extraHours",
    "workCosts",
    "realWage",
    "weeklyHours",
    "workingWeeks",
    "duplicate",
    "money",
    "waited",
    "storage",
    "rows",
    "share",
  ]) {
    assert.equal(url.searchParams.has(field), false, field);
  }
  assert.equal(url.href.includes("98765.43"), false);
  assert.equal(readSharedResult(url.search).score, 80);
});

test("malformed or non-finite shared results do not render misleading results", () => {
  for (const search of [
    "",
    "?result=2",
    "?result=1",
    "?result=1&score=101&costPerUse=5",
    "?result=1&score=-1&costPerUse=5",
    "?result=1&score=50.5&costPerUse=5",
    "?result=1&score=50&costPerUse=0",
    "?result=1&score=50&costPerUse=Infinity",
    "?result=1&score=50&costPerUse=5&lifeHours=NaN",
  ]) {
    assert.equal(readSharedResult(search), null, search);
  }
});

test("shared score breakdown round-trips all six dimensions without private inputs", () => {
  const result = {
    item: "Phone",
    currency: "USD",
    score: 59,
    costPerUse: 3,
    lifeHours: 119.94,
    breakdown: [20, 0, 15, 8, 11, 5],
    pay: "98765.43",
  };
  const url = new URL(
    buildShareUrl("https://example.com/en/should-i-buy-it", result),
  );
  assert.deepEqual(
    readSharedResult(url.search).breakdown,
    [20, 0, 15, 8, 11, 5],
  );
  assert.equal(url.searchParams.has("pay"), false);
  assert.equal(url.href.includes("98765.43"), false);
  const partial = { ...result, breakdown: [20, null, null, 0, null, 5] };
  assert.deepEqual(
    readSharedResult(new URL(buildShareUrl(url.href, partial)).search)
      .breakdown,
    partial.breakdown,
  );
  assert.equal(
    new URL(clearShareUrl(url.href)).searchParams.has("breakdown"),
    false,
  );
});

test("invalid shared score breakdowns cannot render extra or out-of-range rows", () => {
  for (const breakdown of [
    "invalid",
    "{}",
    "[20,0]",
    "[26,0,15,8,11,5]",
    "[20,-1,15,8,11,5]",
    "[20,0,15,8,11,11]",
    '[20,0,15,8,11,"5"]',
    "[20,0,15,8,11,0.5]",
  ]) {
    const params = new URLSearchParams({
      result: "1",
      score: "59",
      costPerUse: "3",
      breakdown,
    });
    assert.equal(readSharedResult(params.toString()), null, breakdown);
  }
});

test("legacy links parse without inheriting missing salary", () => {
  const result = readSharedState("?share=1&item=Vacuum&price=400&currency=EUR");
  assert.equal(result.pay, "");
  assert.equal(result.workCosts, "");
  assert.equal(result.currency, "EUR");
  assert.equal(result.payPeriod, "weekly");
  assert.equal(result.paidHours, "40");
});

test("only explicitly shared URLs load and invalid periods do not misinterpret pay", () => {
  for (const search of [
    "",
    "?pay=99999",
    "?utm_source=mail",
    "?share=2&pay=99999",
  ]) {
    assert.equal(readSharedState(search), null);
  }
  assert.equal(readSharedState("?share=1&pay=5000&payPeriod=unknown").pay, "");
  assert.equal(readSharedState("?share=1&pay=1200").payPeriod, "weekly");
});

test("shared values are bounded and unknown keys do not enter state", () => {
  const params = new URLSearchParams({
    share: "1",
    item: "x".repeat(1000),
    currency: "y".repeat(100),
    secret: "unknown",
  });
  const restored = readSharedState(params.toString());
  assert.equal(restored.item.length, 200);
  assert.equal(restored.currency.length, 24);
  assert.equal("secret" in restored, false);
});

test("reset removes calculator query fields without deleting unrelated parameters", () => {
  const url = new URL(
    buildShareUrl("https://example.com/en/should-i-buy-it", {
      item: "Phone",
      currency: "",
      score: 60,
      costPerUse: 5,
      lifeHours: null,
    }),
  );
  url.searchParams.set("utm_source", "mail");
  const cleared = new URL(clearShareUrl(url.href));
  assert.equal(cleared.search, "?utm_source=mail");
  assert.equal(
    new URL(
      clearShareUrl(
        "https://example.com/en/should-i-buy-it?share=1&pay=99999&payPeriod=yearly",
      ),
    ).search,
    "",
  );
  assert.equal(
    clearShareUrl("https://example.com/en/should-i-buy-it?item=unrelated"),
    "https://example.com/en/should-i-buy-it?item=unrelated",
  );
});

test("optional free-text currencies label money without changing the amount", () => {
  assert.equal(formatMoney(1234.5, "", "en"), "1,234.5");
  assert.equal(formatMoney(1234.5, "  USD  ", "en"), "1,234.5 USD");
  assert.equal(formatMoney(20, "€", "en"), "20 €");
  assert.equal(formatMoney(20, "人民币", "zh"), "20 人民币");
  assert.equal(formatMoney(20, "arbitrary label", "en"), "20 arbitrary label");
  assert.equal(restoreState({ pay: "1200" }).currency, "");
});
