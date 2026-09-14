type Event = {
  _id: string;
  title: string;
  date: string;
  venue?: string;
  city?: string;
  ticketUrl?: string;
  soldOut?: boolean;
};

export default function EventCard({ event }: { event: Event }) {
  const date = new Date(event.date);

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="flex w-16 flex-col items-center rounded bg-brand-red/10 py-2 text-brand-red">
          <span className="text-xs font-semibold uppercase">
            {date.toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="font-display text-2xl">{date.getDate()}</span>
        </div>
        <div>
          <h3 className="font-semibold text-white">{event.title}</h3>
          <p className="text-sm text-white/60">
            {[event.venue, event.city].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>

      {event.soldOut ? (
        <span className="rounded-full border border-white/20 px-5 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white/40">
          Sold Out
        </span>
      ) : event.ticketUrl ? (
        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full bg-brand-red px-5 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-red-dark"
        >
          Get Tickets
        </a>
      ) : null}
    </div>
  );
}
