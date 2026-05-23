export async function onRequestGet(context) {
    try {
        const path = context.params.path.join("/");
        const response = await fetch(`https://www.classcharts.com/apiv2student/${path}`, {
            headers: {
                Authorization: context.request.headers.get("Authorization")
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
