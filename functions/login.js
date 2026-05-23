export async function onRequestPost(context) {

    try {

        const body =
            await context.request.json();

        const form =
            new URLSearchParams();

        form.append("code", body.code);
        form.append("dob", body.dob);

        form.append(
            "remember",
            "true"
        );

        form.append(
            "recaptcha-token",
            "no-token-available"
        );

        const response = await fetch(
            "https://www.classcharts.com/apiv2student/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body: form
            }
        );

        const data =
            await response.json();

        return Response.json(data);

    } catch(err){

        return Response.json(
            {
                error: err.message
            },
            {
                status: 500
            }
        );

    }

}
