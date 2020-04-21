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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Grab the second article tag DOM which has a booked interview
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find(
      appointment => queryByText(appointment, "Archie Cohen")
    );;

    // 4. Click the "Delete" button
    fireEvent.click(getByAltText(bookedAppointment, "Delete"));

    // 5. Expect "confirm" to be displayed
    expect(getByText(bookedAppointment, "Confirm")).toBeInTheDocument();

    // 6. Click confirm
    fireEvent.click(getByText(bookedAppointment, "Confirm"));

    // 7. Check that the element with the text "Deleting" is displayed.
    expect(getByText(bookedAppointment, "Deleting")).toBeInTheDocument();

    // 8. Wait until the element has the "add" button displayed
    await waitForElement(() => getByAltText(bookedAppointment, "Add"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
    const monday = getAllByTestId(container, "list").find(day => queryByText(day, "Monday"));
    expect(getByText(monday, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render the Application and wait for mock data load
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Grab the second article tag DOM which has a booked interview
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // Click edit and expect the form to be displayed
    fireEvent.click(getByAltText(bookedAppointment, "Edit"));
    expect(getByText(bookedAppointment, "Save")).toBeInTheDocument();

    // Type in a new name and click save, expect status
    fireEvent.change(getByPlaceholderText(bookedAppointment, "Enter Student Name"), {
      target: { value: "New Student" }
    });
    fireEvent.click(getByText(bookedAppointment, "Save"));
    expect(getByText(bookedAppointment, "Saving")).toBeInTheDocument();

    // 8. Wait until the element has the "edit" button displayed again
    await waitForElement(() => getByAltText(bookedAppointment, "Edit"));
    expect(getByText(bookedAppointment, "New Student")).toBeInTheDocument();

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining"
    const monday = getAllByTestId(container, "list").find(day => queryByText(day, "Monday"));
    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument();
  });
});