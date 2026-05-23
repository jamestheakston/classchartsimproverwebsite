export async function onRequestGet(context) {
    try {
        const path = context.params.path.join("/");
        const { searchParams } = new URL(context.request.url);
        const url = `https://www.classcharts.com/apiv2student/${path}?${searchParams.toString()}`;

        const rawToken = context.request.headers.get("Authorization") || "";
        const token = rawToken.startsWith("Basic ") ? rawToken : `Basic ${rawToken}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            },
            redirect: "manual"
        });

        if (response.status >= 300 && response.status < 400) {
            return Response.json({ error: "Session expired" }, { status: 401 });
        }

        const text = await response.text();
        try {
            const data = JSON.parse(text);
            return Response.json(data);
        } catch (e) {
            return Response.json({ error: "Invalid API response", details: text }, { status: 500 });
        }
    } catch(err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
