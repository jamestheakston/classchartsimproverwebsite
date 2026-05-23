export async function onRequestGet(context) {
    try {
        const path = context.params.path.join("/");
        const { searchParams } = new URL(context.request.url);
        const url = `https://www.classcharts.com/apiv2student/${path}?${searchParams.toString()}`;

        const token = context.request.headers.get("Authorization") || "";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-Remix-Version": "1.19.3",
                "Referer": "https://www.classcharts.com/student/classes",
                "Origin": "https://www.classcharts.com",
                "Authorization": token,
                "Cookie": `session=${token}`,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            redirect: "manual"
        });

        if (response.status >= 300 && response.status < 400) {
            return Response.json({ error: "Session expired" }, { status: 401 });
        }

        const data = await response.json();
        return Response.json(data);
    } catch(err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
