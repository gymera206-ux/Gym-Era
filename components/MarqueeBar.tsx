const beliefs = [
  'Built for Every Rep',
  'Designed for Women Who Show Up',
  'No Compromises',
];

export default function MarqueeBar() {
  const items = [...beliefs, ...beliefs, ...beliefs, ...beliefs];

  return (
    <section id="belief-bar" aria-label="Brand values">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((text, i) => (
            <span key={i}>
              <span className="belief-item">{text}</span>
              <span className="belief-dot" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
