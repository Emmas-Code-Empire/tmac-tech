"use server";

import { google } from "googleapis";
import { ServerActionReturn } from "@/types/serverAction.type";
import Zod from "@/lib/zod/zod.schemas";
import createServerActionReturn from "@/utils/createServerActionReturn";

type ScrapedProfile = {
  CompanyName: string;
  name: string;
  position: string;
  formattedEmail: string;
  linkedInProfileLink: string;
};

export type SaveLinkedInContactsReturn = null;

// This forces the key into the exact format OpenSSL requires
const formatPrivateKey = (key: string | undefined) => {
  if (!key) return undefined;
  return key
    .replace(/^"|"$/g, "") // Removes wrapping double quotes if they exist
    .replace(/^'|'$/g, "") // Removes wrapping single quotes if they exist
    .replace(/\\n/g, "\n"); // Converts literal \n to actual line breaks
};

export const SaveLinkedInContacts = async (
  scrapedProfiles: ScrapedProfile[],
  sheetId: string,
  pageName: string
): Promise<ServerActionReturn<SaveLinkedInContactsReturn | null>> => {
  try {
    const validatedScrapedProfiles =
      Zod.scrapedProfileArray.parse(scrapedProfiles);
    const validatedSheetId = Zod.string.parse(sheetId);
    const validatedPageName = Zod.string.parse(pageName);

    if (validatedScrapedProfiles.length === 0) {
      return createServerActionReturn(null, "SUCCESS", "No profiles to save.");
    }

    const rows = validatedScrapedProfiles.map((profile) => [
      profile.CompanyName,
      profile.name,
      profile.position,
      profile.formattedEmail,
      profile.linkedInProfileLink,
    ]);

    // Apply the bulletproof formatter
    const privateKey = formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY);

    if (!privateKey) {
      throw new Error(
        "Google Private Key is missing from environment variables."
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: validatedSheetId,
      range: validatedPageName,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: rows,
      },
    });

    return createServerActionReturn(
      null,
      "SUCCESS",
      "Contacts saved successfully!"
    );
  } catch (e: any) {
    console.error("Google Sheets Append Error:", e);
    return createServerActionReturn(
      null,
      "ERROR",
      e.message || "Error writing to Google Sheets."
    );
  }
};
