import z from "zod";

namespace Zod {
  // Primitives
  export const string = z.string();

  // Arrays
  export const stringArray = z.string().array();

  // Scrapers
  export const scrapedProfileArray = z
    .object({
      CompanyName: z.string(),
      name: z.string(),
      position: z.string(),
      formattedEmail: z.string(),
      linkedInProfileLink: z.string(),
    })
    .array();
}

export default Zod;
