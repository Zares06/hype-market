const ITEMS = [
  "Snacks du monde entier",
  "Saveurs authentiques",
  "Dubai Chocolate",
  "Takis & Snacks USA",
  "Boissons asiatiques",
  "Ouvert 7j/7 • 15h–23h",
  "22 Rue Bottero, Nice",
  "Épicerie internationale",
  "Nouveautés chaque semaine",
  "Livraison disponible",
];

function MascotInline() {
  return (
    <span className="inline-flex items-center mx-2 align-middle">
      <span className="w-7 h-7 rounded-full overflow-hidden inline-block border border-hype-sand/40 shadow-sm align-middle">
        <img
          src="/images/logo.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "top" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </span>
    </span>
  );
}

export function MarqueeBanner() {
  const repeatedItems = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-hype-brown text-hype-cream overflow-hidden py-3.5 select-none border-y border-hype-dark/20">
      <div className="flex animate-marquee group hover:[animation-play-state:paused] whitespace-nowrap items-center">
        {repeatedItems.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display font-bold uppercase tracking-widest text-sm px-3">
              {item}
            </span>
            {i % 5 === 0 ? <MascotInline /> : <span className="text-hype-sand text-xs">•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
