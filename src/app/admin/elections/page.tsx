import dbConnect from "@/lib/db/dbConnect";
import Election, { ElectionTypes } from "@/lib/db/models/election.model";
import ElectionWrapper from "./elections-wrapper";

async function fetchCurrentElections() {
  await dbConnect();
  const elections = await Election.find({});
  return JSON.parse(JSON.stringify(elections));
}

export default async function ElectionsAdminPage() {
  const elections: ElectionTypes[] = await fetchCurrentElections();

  return <ElectionWrapper elections={elections} />;
}
