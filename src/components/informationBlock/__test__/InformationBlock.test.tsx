import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { InformationBlock } from "../InformationBlock";

const serviceData = {
  eService: "Probing test 3",
  regulator: "Comune di Milano",
  version: "7",
  statusMonitoring: "offline",
  statusService: "attivo",
  statusLastDetection: "03/12/2022, ore 13:30",
};

const reloadInfoBlock = (): void => {
  console.log("reload info block");
};

const viewInCatalogue = (): void => {
  console.log("view in catalogue");
};

describe("InformationBlock", () => {
  test("render component", () => {
    const { container } = render(
      <InformationBlock
        data={serviceData}
        reloadInfoBlock={reloadInfoBlock}
        viewInCatalogue={viewInCatalogue}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
