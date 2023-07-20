import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";

export default async function Test() {
    const session = await getServerSession(authOptions);
    console.log(session.user.email,",++++")
}
