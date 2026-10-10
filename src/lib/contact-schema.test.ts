import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/contact-schema";

describe("contactFormSchema", () => {
  it("accepts valid payload", () => {
    const result = contactFormSchema.safeParse({
      name: "Shamesh",
      email: "shameshrasal77@gmail.com",
      subject: "",
      message: "Hello, I would like to connect about a role.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short message", () => {
    const result = contactFormSchema.safeParse({
      name: "Shamesh",
      email: "shameshrasal77@gmail.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });
});
