import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch(process.env.API_URL + "/api/tickets");
  const data = await res.json();

  const params = data.map((param) => ({ id: param.id }));
  return params;
}

async function getTicket(id) {
  const res = await fetch(`${process.env.API_URL}/api/tickets/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
