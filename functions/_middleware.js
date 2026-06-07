export async function onRequest(context) {
  // Check the environment variable you set in the Cloudflare Dashboard
  const maintenanceMode = context.env.MAINTENANCE_MODE;

  if (maintenanceMode === "true") {
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Under Maintenance</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="text-center p-8 bg-white shadow-xl rounded-lg max-w-md">
        <i class="fa-solid fa-tools text-6xl text-blue-500 mb-6"></i>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">We'll be back soon!</h1>
        <p class="text-gray-600 mb-6">We are currently performing scheduled maintenance. Please check back later.</p>
        <a href="https://ccimprover.instatus.com/" class="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            <i class="fa-solid fa-circle-info mr-2"></i> View Status Page
        </a>
    </div>
</body>
</html>`, {
      status: 503,
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  }

  // If maintenance mode is not 'true', continue to your normal site
  return await context.next();
}
