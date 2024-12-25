import SignInForm from "./_components/Form";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 md:mb-0 md:mr-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to EVTSYSTEM
        </h1>
        <p className="text-lg text-gray-600">
          Secure, efficient, and transparent elections at your fingertips.
        </p>
      </div>
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}

