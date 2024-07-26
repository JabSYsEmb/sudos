import { error } from "@sveltejs/kit";
import shell from "shelljs";

export async function POST(req) {
  const res = await req.request.formData();
  const data = Object.fromEntries(res) as { command: string };

  if (!data.command) return error(500, { message: "command is missing" });

  const output = shell.exec(data.command);

  return new Response(JSON.stringify({ type: "success", data: { output } }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
