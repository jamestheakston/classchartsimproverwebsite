/*
functions/_middleware.js

Cloudflare Pages Function middleware that replaces every request
with a "Development Ended" notice.
*/

const HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ClassCharts Improver — Development Ended</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      background: #f7f7f9;
      color: #111;
    }

    .card {
      max-width: 760px;
      padding: 28px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
      border: 1px solid #e6e6ea;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 20px;
    }

    p {
      margin: 8px 0;
      color: #333;
    }

    .muted {
      color: #666;
      font-size: 14px;
    }

    a {
      color: #0366d6;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>ClassCharts Improver — Development Ended</h1>

    <p class="muted">
      This project officially ended development and is no longer available
      for use starting from <strong>July 31, 2026</strong>.
    </p>

    <p>
      The extension and this site are open source and were made by
      <a
        href="https://jamestheakston.pages.dev"
        target="_blank"
        rel="noopener noreferrer"
      >James Theakston</a>.
      The source code is available on GitHub at
      <a
        href="https://github.com/jamestheakston/classchartsimprover"
        target="_blank"
        rel="noopener noreferrer"
      >jamestheakston/classchartsimprover</a>
      and
      <a
        href="https://github.com/jamestheakston/classchartsimproverwebsite"
        target="_blank"
        rel="noopener noreferrer"
      >jamestheakston/classchartsimproverwebsite</a>.
    </p>

    <p>
      No further updates will be released and the extension cannot be used
      from the date above.
    </p>
  </div>
</body>
</html>`;

export async function onRequest() {
  return new Response(HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });
}
