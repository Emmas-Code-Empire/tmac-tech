import { NextResponse } from "next/server";
import { google } from "googleapis";

// Define strict CORS headers to allow LinkedIn to ping your server
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.linkedin.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function generateEmail(
  firstName: string,
  lastName: string,
  domain: string,
  format: string
) {
  if (!firstName || !lastName) return `unknown@${domain}`;

  const f = firstName.toLowerCase().trim();
  const l = lastName.toLowerCase().trim();

  const mapping: Record<string, string> = {
    f: f.charAt(0),
    l: l.charAt(0),
    first: f,
    last: l,
  };

  const namePart = format.replace(
    /(first|last|f|l)/g,
    (matched) => mapping[matched]
  );

  return `${namePart}@${domain}`;
}

async function authSheets() {
  // Replace actual literal newlines if they exist in the env var
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: "datareporting-412823",
      private_key: privateKey,
      client_email:
        "datareporting@datareporting-412823.iam.gserviceaccount.com",
      client_id: "114500551130774637835",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  // FIX: Just pass the 'auth' object directly instead of awaiting getClient()
  return google.sheets({ version: "v4", auth });
}

async function fetchDataAndAppendToSheet(dataList: any[]) {
  if (!dataList || dataList.length === 0) return;

  try {
    const sheets = await authSheets();

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1tQ7dmVOCckmxWmlqMUqIyp5nrL39On18COgXNStQ7a8",
      range: "Contacts",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: dataList,
      },
    });
    console.log(`Success! Appended ${dataList.length} rows to Sheets.`);
  } catch (error) {
    console.error("Error in fetchDataAndAppendToSheet:", error);
    throw error;
  }
}

// ==========================================
// ROUTE HANDLERS
// ==========================================

// Handle the CORS Preflight request from the browser
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handle the actual data payload
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      data: people,
      companyName,
      companyDomain,
      emailFormat,
      date,
      area,
    } = body;

    if (!people || !Array.isArray(people) || people.length === 0) {
      return NextResponse.json(
        { message: "No people data provided." },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log(
      `Received ${people.length} profiles for ${companyName}. Formatting data...`
    );

    let rows = [];

    for (const person of people) {
      const nameParts = person.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

      rows.push([
        companyName || "Unknown Company",
        person.name,
        person.title,
        generateEmail(
          firstName,
          lastName,
          companyDomain || "unknown.com",
          emailFormat || "first.last"
        ),
        person.link,
        date || new Date().toLocaleDateString(),
        area || "Unknown Area",
      ]);
    }

    // Push to Google Sheets
    await fetchDataAndAppendToSheet(rows);

    return NextResponse.json(
      { message: `Success! Added ${rows.length} contacts to Sheets.` },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
