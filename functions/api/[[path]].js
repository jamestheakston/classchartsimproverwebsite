export async function onRequestGet(context) {
    try {
        const path = context.params.path.join("/");
        const { searchParams } = new URL(context.request.url);
        const url = `https://www.classcharts.com/apiv2student/${path}?${searchParams.toString()}`;

        const rawToken = context.request.headers.get("Authorization") || "";
        const token = rawToken.replace("Basic ", "");

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Basic ${token}`,
                "Cookie": `session=${token}; remember_me=1`,
                "User-Agent": "classcharts-api-js/1.0"
            },
            redirect: "manual"
        });

        if (response.status === 302 || response.status === 303) {
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
