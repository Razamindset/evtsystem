import dbConnect from "@/lib/db/dbConnect";
import Election from "@/lib/db/models/election.model";

async function fetchElectionDetails(electionId: string) {
  await dbConnect();
  const election = await Election.findById(electionId).populate("participants.user");
  return JSON.parse(JSON.stringify(election));
}

export default async function ElectionDetailPage({ params }: { params: { id: string } }) {
  const election = await fetchElectionDetails(params.id);

  if (!election) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1>Election not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-4">{election.name}</h1>
        <img
          src={election.image}
          alt={election.name}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <p>
          <strong>House:</strong> {election.house}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(election.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong> {new Date(election.endDate).toLocaleDateString()}
        </p>
        <h2 className="text-lg font-semibold mt-4">Participants</h2>
        <ul>
          {election.participants.map((participant: any) => (
            <li key={participant.user._id}>
              <p>
                <strong>{participant.user.name}</strong> - {participant.symbol} (
                {participant.voteCount} votes)
              </p>
              <p>{participant.signatureQuote}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
