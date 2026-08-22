import './ComponentDetail.css'

function Fragment({ list }) {
  if (!list || list.length === 0) return null
  return (
    <div className="component-detail__fragment">
      {list.map((item) => (
        <span key={item} className="component-detail__chip">{item}</span>
      ))}
    </div>
  )
}

export function ComponentDetail({ entry, onBack }) {
  if (!entry) {
    return (
      <div className="component-detail">
        <div className="component-detail__topbar">
          <button className="component-detail__back" onClick={onBack}>&larr; Back</button>
        </div>
        <div className="component-detail__body">
          <p className="component-detail__empty" data-testid="not-found">Component not found.</p>
        </div>
      </div>
    )
  }

  const variants = entry.adaptationRules?.variants
  const variantNames = variants ? Object.keys(variants) : []

  return (
    <div className="component-detail">
      <div className="component-detail__topbar">
        <button className="component-detail__back" onClick={onBack}>&larr; Back</button>
        <div className="component-detail__meta">
          <h1 className="component-detail__name">{entry.id}</h1>
          {entry.storyFile ? (
            <a className="component-detail__story-link" href={entry.storyFile}>Open story</a>
          ) : null}
        </div>
      </div>

      <div className="component-detail__body">
        <section className="component-detail__section">
          <h3 className="component-detail__info-title">Visual context</h3>
          <Fragment list={entry.visualContext} />
        </section>

        <section className="component-detail__section">
          <h3 className="component-detail__info-title">Mood</h3>
          <Fragment list={entry.moodTags} />
        </section>

        {variantNames.length > 0 && (
          <section className="component-detail__section">
            <h3 className="component-detail__info-title">Adaptation rules</h3>
            <Fragment list={variantNames} />
          </section>
        )}
      </div>
    </div>
  )
}
