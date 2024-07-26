import { error, json } from "@sveltejs/kit";
import shell from "shelljs";

export async function POST(req) {
  const res = await req.request.formData();
  const data = Object.fromEntries(res) as { command: string };

  try {
    if (!data.command) throw new Error("command is missing");
    const output = shell.exec(data.command);
    if (output.code !== 0) throw new Error("something went wrong");
    return json({ output });
  } catch (e) {
    if (e instanceof Error) return error(500, { message: e.message });
  }
}
