interface UserFormProps {
  initialData?: {
    name?: string;
    cnic?: string;
    image?: string;
    role?: "admin" | "user";
    house?: "Tolerance" | "Unity" | "Faith" | "Discipline";
  };
}

interface UserCreationActionPaload {
  name: string;
  cnic: string;
  image: string;
  role: "admin" | "user";
  house: "Tolerance" | "Unity" | "Faith" | "Discipline";
}
