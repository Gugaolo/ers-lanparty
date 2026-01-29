import { render, screen } from "@testing-library/react";
import SignupPage from "../app/signup/page"; // adjust path if needed

// Mock the Supabase client
jest.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(),
    },
  },
}));

describe("SignupPage", () => {
  it("renders the signup form correctly", () => {
    render(<SignupPage />);

    // check if labels exist
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Geslo/i)).toBeInTheDocument();

    // check if buttons exist
    expect(screen.getByRole("button", { name: /Ustvari profil/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Prijava z Google/i })).toBeInTheDocument();

    // check for heading
    expect(screen.getByRole("heading", { name: /Ustvari profil/i })).toBeInTheDocument();
  });
});
