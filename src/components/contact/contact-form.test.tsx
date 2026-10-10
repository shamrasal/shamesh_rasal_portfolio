import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact/contact-form";

vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

describe("ContactForm", () => {
  it("shows validation errors for empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument();
  });

  it("submits successfully", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), "Shamesh Rasal");
    await user.type(screen.getByLabelText(/^email$/i), "shameshrasal77@gmail.com");
    await user.type(
      screen.getByLabelText(/message/i),
      "Hello, I am interested in discussing a senior frontend role.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument();
  });
});
