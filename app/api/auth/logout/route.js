export async function POST() {
    return new Response(JSON.stringify({ message: 'Logged out' }), {
      status: 200,
      headers: {
        'Set-Cookie': `token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
      },
    });
  }