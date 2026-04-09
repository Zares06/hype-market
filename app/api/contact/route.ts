import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Log the contact request (in production, use Resend or nodemailer)
    console.log("Contact form submission:", { name, email, subject, message });

    // TODO: Integrate Resend or nodemailer to send real emails
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@hypemarket.fr',
    //   to: 'contact@hypemarket.fr',
    //   subject: `[Contact] ${subject || 'Nouveau message'} de ${name}`,
    //   html: `<p>De: ${name} (${email})</p><p>${message}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
