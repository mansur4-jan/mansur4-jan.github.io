const metrics = [
  { value: "150+", label: "школ и центров", scope: "В сети по методике Васильевой Л. Л." },
  { value: "89", label: "городов", scope: "В сети по методике Васильевой Л. Л." },
  { value: "5", label: "стран", scope: "В сети по методике Васильевой Л. Л." },
  { value: "2–6", label: "детей в группе", scope: "В школе Интеллект в Братске" },
];

export function HomeSkills() {
  return <section className="home-method-trust" id="everyday-skills" aria-labelledby="method-trust-title">
    <div className="method-trust-intro">
      <h2 id="method-trust-title">Методика, которой доверяют</h2>
      <p>Сеть по методике<br />Васильевой Л. Л.</p>
    </div>
    {metrics.map(metric => <div className="method-trust-metric" key={metric.label} aria-label={`${metric.scope}: ${metric.value} ${metric.label}`}>
      <strong>{metric.value}</strong>
      <span>{metric.label}</span>
    </div>)}
  </section>;
}
