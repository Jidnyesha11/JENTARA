export type TemplateVariables =
  Record<string, string>;

function escapeHtml(
  value: string,
): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderVariables(
  content: string,
  variables: TemplateVariables,
): string {
  return content.replace(
    /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g,
    (_, key: string) =>
      variables[key] ??
      `{{${key}}}`,
  );
}

export function renderEmailHtml(
  content: string,
  variables: TemplateVariables,
): string {
  const rendered =
    renderVariables(
      content,
      variables,
    );

  const paragraphs =
    rendered
      .split(/\n\s*\n/)
      .map(
        (paragraph) =>
          `<p>${paragraph
            .split("\n")
            .map(
              (line) =>
                escapeHtml(line),
            )
            .join("<br />")}</p>`,
      )
      .join("");

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />
  <title>JENTARA</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f8f5f2;
    color:#451713;
    font-family:Arial,Helvetica,sans-serif;
  "
>
  <div
    style="
      max-width:680px;
      margin:0 auto;
      padding:40px 20px;
    "
  >
    <div
      style="
        background:#451713;
        color:#f5ede4;
        padding:24px 30px;
        text-align:center;
        letter-spacing:0.28em;
        font-size:18px;
        font-weight:700;
      "
    >
      JENTARA
    </div>

    <div
      style="
        background:#ffffff;
        padding:36px 30px;
        line-height:1.7;
        font-size:14px;
      "
    >
      ${paragraphs}
    </div>

    <div
      style="
        padding:24px;
        text-align:center;
        color:#45171399;
        font-size:11px;
      "
    >
      JENTARA Apparel
    </div>
  </div>
</body>
</html>
`;
}