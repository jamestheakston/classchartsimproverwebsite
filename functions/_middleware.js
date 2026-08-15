/*
functions/_middleware.js

Cloudflare Pages Function to serve a "Development Ended" HTML notice stating the extension and site are no longer usable from July 31, 2026.

This file is written for Cloudflare Pages Functions (deployed from the `functions/` directory).
*/

const HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ClassCharts Improver — Development Ended</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f7f7f9;color:#111}
    .card{max-width:760px;padding:28px;border-radius:10px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,0.06);border:1px solid #e6e6ea}
    h1{margin:0 0 8px;font-size:20px}
    p{margin:8px 0;color:#333}
    .muted{color:#666;font-size:14px}
    a{color:#0366d6;text-decoration:none}
  </style>
</head>
<body>
  <div class="card">
    <h1>ClassCharts Improver — Development Ended</h1>
    <p class="muted">This project officially ended development and is no longer available for use starting from <strong>July 31, 2026</strong>.</p>
    <p>The extension and this site are open source and were made by <a href="https://jamestheakston.pages.dev" target="_blank" rel="noopener">James Theakston</a>. The source code is available on GitHub at <a href="https://github.com/jamestheakston/classchartsimprover" target="_blank" rel="noopener">jamestheakston/classchartsimprover</a> and <a href="https://github.com/jamestheakston/classchartsimproverwebsite" target="_blank" rel="noopener">jamestheakston/classchartsimproverwebsite</a>.</p>
    <p>No further updates will be released and the extension cannot be used from the date above.</p>
  </div>
</body>
</html>`;

// Cloudflare Pages Functions entrypoint
// Export a default function that returns the HTML response.
export default async function (request, env) {
  return new Response(HTML, {
    headers: {
      'content-type': 'text/html; charset=utf-8'
    }
  });
}

// If you also need a handler for other environments (uncomment as needed):
// For Netlify / AWS Lambda (Node.js) functions:
// exports.handler = async function(event, context) {
//   return {
//     statusCode: 200,
//     headers: { 'Content-Type': 'text/html; charset=utf-8' },
//     body: HTML
//   };
// };

// For Express-style middleware usage (e.g., an Express server):
// module.exports = function (req, res, next) {
//   res.setHeader('Content-Type', 'text/html; charset=utf-8');
//   res.status(200).send(HTML);
// };
