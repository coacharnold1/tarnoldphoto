export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return Response.json(
        { error: 'Password not configured' },
        { status: 500 }
      );
    }

    const isValid = password === correctPassword;

    return Response.json({ valid: isValid });
  } catch (error) {
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
