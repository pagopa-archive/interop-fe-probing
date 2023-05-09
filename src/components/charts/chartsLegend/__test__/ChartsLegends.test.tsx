import { describe, expect, test, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { ChartsLegend } from "../ChartsLegend";

const legendElements = [
  { label: "E-service online", color: "#17324D" },
  { label: "Monitoraggio sospeso", color: "#A2ADB8" },
  { label: "E-service offline", color: "#FE6666" },
];

describe("ChartsLegend", () => {
  test("render component", () => {
    const { container } = render(
      <ChartsLegend legendElements={legendElements} />
    );
    expect(container).toMatchSnapshot();
  });
});
