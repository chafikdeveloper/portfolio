import { Resend } from "resend";
import type { APIRoute } from "astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();

        const name = data.get("name");
        const email = data.get("email");
        const message = data.get("message");

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ success: false, error: "Missing fields" }),
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "chafikdevelopper@gmail.com",
            subject: `New Message from ${name}`,
            text: `
            Name: ${name}
            Email: ${email},

            ${message}
            `.trim(),
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false, error: "Failed to send email" }),
            { status: 500 }
        );
    }
};