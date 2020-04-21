import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    // Wait for mock axios data to load
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get the first article tag using testId
    const appointments = getAllByTestId(container, "appointment");
    const firstAppointment = appointments[0];

    // Click the add button
    fireEvent.click(getByAltText(firstAppointment, "Add"));

    // Type in a name and select an interviewer
    fireEvent.change(getByPlaceholderText(firstAppointment, "Enter Student Name"), {
      target: { value: "Test Student" }
    });
    fireEvent.click(getByAltText(firstAppointment, "Sylvia Palmer"));

    // Click "save"
    fireEvent.click(getByText(firstAppointment, "Save"));

    // Should transition to "saving" status then show student name
    expect(getByText(firstAppointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(firstAppointment, "Test Student"));

    // Monday sidebar item should now display "no spots remaining"
    const monday = getAllByTestId(container, "list").find(day => queryByText(day, "Monday"));
    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument();

  });

});