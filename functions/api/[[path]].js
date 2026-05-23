export async function onRequestGet(context) {
    try {
        const path = context.params.path.join("/");
        const { searchParams } = new URL(context.request.url);
        const queryString = searchParams.toString();
        const url = `https://www.classcharts.com/apiv2student/${path}${queryString ? '?' + queryString : ''}`;

        const authHeader = context.request.headers.get("Authorization");
        const formattedAuth = authHeader && !authHeader.startsWith("Basic ") ? `Basic ${authHeader}` : authHeader;

        const response = await fetch(url, {
            headers: {
                Authorization: formattedAuth,
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!response.ok) {
            return Response.json(
                { error: `ClassCharts API returned status ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return Response.json(data);
    } catch(err) {
        return Response.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
