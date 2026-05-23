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
                "Referer": "https://www.classcharts.com/student/classes",
                "Origin": "https://www.classcharts.com",
                "Cookie": `session=${token}`
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
