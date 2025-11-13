/* eslint-disable import/first */
jest.mock("axios", () => ({
  get: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterCard } from "../components/card/CharacterCard";

const mockCharacter = {
  id: 1,
  name: "Test Character",
  height: "180",
  mass: "80",
  hair_color: "brown",
  skin_color: "light",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: {
    name: "Tatooine",
    terrain: "desert",
    climate: "arid",
    population: "200000",
  },
  films: ["A New Hope", "The Empire Strikes Back"],
  species: "Human",
  vehicles: [],
  starships: [],
  created: "Jan 1, 2020",
};

test("opens modal with correct character details", async () => {
  render(<CharacterCard character={mockCharacter as any} />);

  const nameHeading = screen.getByText(/Test Character/i);
  userEvent.click(nameHeading);

  const headings = await screen.findAllByText(/Test Character/i);
  expect(headings.length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
  expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
});
