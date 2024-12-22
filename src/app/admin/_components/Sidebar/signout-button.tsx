import { signOutAction } from "@/actions/user/signin.action";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        className="px-3 p-2 rounded-md border w-full hover:scale-110 hover:text-green-600 transition"
        type="submit"
      >
        SignOut
      </button>
    </form>
  );
}
