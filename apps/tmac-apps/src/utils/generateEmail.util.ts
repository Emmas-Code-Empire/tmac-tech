function generateEmail(
  firstName: string,
  lastName: string,
  domain: string,
  format: string
): string {
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

export default generateEmail;
