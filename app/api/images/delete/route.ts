import { del } from "@vercel/blob";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url') as string;
  console.log(urlToDelete)
  await del(urlToDelete);
 
  return new Response();
}