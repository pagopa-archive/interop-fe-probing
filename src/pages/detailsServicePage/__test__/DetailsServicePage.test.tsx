import { describe, expect, test, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DetailsServicePage } from "../DetailsServicePage";

const logSpy = vi.spyOn(console, "log");

describe("DettaglioServicePage", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(<DetailsServicePage />).container;
  });

  afterEach(cleanup);

  test("render component", () => {
    expect(container).toMatchSnapshot();
  });

  test("contains titles", async () => {
    const title = screen.getByText(/Probing test 3/i);
    const subtitle = screen.getByText(
      /In questa pagina puoi verificare lo stato di un e-service in tempo reale ed esplorare lo storico delle performance/i
    );
    expect(title).toBeDefined();
    expect(subtitle).toBeDefined();
  });

  test("contains charts", async () => {
    const charts = screen.getAllByRole("img");
    expect(charts).toHaveLength(2);
  });

  test("click Ricarica button", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Ricarica" });
    await user.click(button);
    expect(logSpy).toHaveBeenCalledWith("reload info block");
  });

  test("click Visualizza sul catalogo button", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: "Visualizza sul catalogo",
    });
    await user.click(button);
    expect(logSpy).toHaveBeenCalledWith("view in catalogue");
  });

  test("click Torna alla lista degli e-service button", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: "Torna alla lista degli e-service",
    });
    await user.click(button);
    expect(logSpy).toHaveBeenCalledWith("go back");
  });
});
