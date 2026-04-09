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

export function MarqueeBanner() {
  const repeatedItems = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-hype-brown text-hype-cream overflow-hidden py-3.5 select-none border-y border-hype-dark/20">
      <div className="flex animate-marquee group hover:[animation-play-state:paused] whitespace-nowrap">
        {repeatedItems.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display font-bold uppercase tracking-widest text-sm px-3">
              {item}
            </span>
            <span className="text-hype-sand text-xs">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
