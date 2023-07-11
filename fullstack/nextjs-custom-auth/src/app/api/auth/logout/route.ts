export async function POST(request: Request) {
  return new Response("User registered", {
    status: 201,

    headers: {
      "Set-Cookie": `token=""; path=/; maxAge=-1;`,
    },
  });
}
