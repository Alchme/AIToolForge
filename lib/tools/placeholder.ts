
export const placeholderHtml = (title: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> body { font-family: 'Inter', sans-serif; background-color: #121212; } </style>
</head>
<body class="text-white flex items-center justify-center h-screen">
    <div class="text-center">
        <h1 class="text-4xl font-bold">${title}</h1>
        <p class="text-gray-400 mt-2">This tool is coming soon!</p>
    </div>
</body>
</html>`;
