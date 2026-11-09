import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../", import.meta.url).pathname;
const projects = JSON.parse(readFileSync(new URL("../content/projects.json", import.meta.url)));
const spotlight = projects.find(project => project.spotlight);
const e = (text) => String(text).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const hostedImages = new Set(["l1-nose-drawing.webp", "l1-openrocket.webp", "l1-rocket-cover.webp", "l1-rocket.webp", "l2-layout.webp", "nozzle-boundary-conditions.webp", "nozzle-mach.webp", "nozzle-mesh.webp", "nozzle-sweep.webp", "tensile-curves.webp", "tensile-fractures.webp", "tensile-hardness-notes.webp", "tensile-specimens.webp", "workshop-coupons.webp", "workshop-foundry.webp", "workshop-mill.webp"]);
const asset = (name) => /^https:\/\//.test(name) ? e(name) : (hostedImages.has(name) ? "https://ethan-osuna-engineering.cappednashi.chatgpt.site/assets/" : "/assets/") + e(name);
const projectPath = (p) => "/projects/" + p.slug + "/";
const num = (i) => String(i + 1).padStart(2, "0");
const email = "esuna1705@gmail.com";
const linkedIn = "https://www.linkedin.com/in/osunaethan/";
const diag = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 18 18 6M6 6h12v12"/></svg>';
const arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h17m-7-7 7 7-7 7"/></svg>';
const back = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12H4m7-7-7 7 7 7"/></svg>';
const expand = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 4H4v4m12-4h4v4m-4 12h4v-4M8 20H4v-4"/></svg>';
const cross = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m6 6 12 12M18 6 6 18"/></svg>';
const layout = (title, description, body) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${e(description)}">
  <meta name="theme-color" content="#0c1321">
  <title>${e(title)}</title>
  <link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/site.css">
  <script defer src="/assets/site.js"></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="/" aria-label="Ethan Osuna, home"><img src="/assets/mark.svg" alt="" width="33" height="33"><span>Ethan Osuna</span></a>
      <nav aria-label="Main navigation"><a href="/#work">Work</a><a href="/#about">About</a></nav>
      <a class="contact" href="mailto:${email}">Contact ${diag}</a>
    </div>
  </header>
  ${body}
  <footer class="site-footer">
    <div class="wrap footer-inner"><span>Ethan Osuna <span class="footer-divider">/</span> Engineering Portfolio</span><a href="#main">Back to top ↑</a></div>
  </footer>
</body>
</html>`;

const tags = (p) => `<ul class="tags" aria-label="Tools and topics">${p.tags.map(tag => `<li>${e(tag)}</li>`).join("")}</ul>`;
const status = (p) => `<span class="status${p.status === "In progress" ? " ongoing" : ""}"><i></i>${e(p.status)}</span>`;
const card = (p,i) => `<article class="project-card${i < 2 ? " featured" : ""}" data-categories="${e(p.categories.join("|"))}">
    <a class="project-link" href="${projectPath(p)}">
      <div class="card-media ${p.coverMode || ""}">
        <img src="${asset(p.cover)}" alt="${e(p.coverAlt)}" loading="lazy" style="object-position:${e(p.coverPosition || "center")}">
        <span class="figure-index">${num(i)}</span>
${p.film ? '<span class="clip-flag">▶ &nbsp; Launch footage</span>' : ""}
      </div>
      <div class="card-text">
        <div class="card-meta"><span class="micro">${e(p.eyebrow)}</span>${status(p)}</div>
        <div class="card-title"><h3>${e(p.title)}</h3><span class="card-arrow">${diag}</span></div>
        <p>${e(p.summary)}</p>
        ${tags(p)}
      </div>
    </a>
  </article>`;

const home = `<main id="main">
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="hero wrap">
    <div class="hero-copy">
      <p class="micro hero-kicker"><span class="signal"></span>Aerospace Engineering <b>/</b> UC Irvine</p>
      <h1 id="hero-title">Bringing ideas<br><em>to life.</em></h1>
      <p class="hero-intro">I’m Ethan Osuna, an aerospace engineering student at UC Irvine who enjoys figuring out how things work and building things of my own. This portfolio shares my projects, the engineering decisions behind them, and what I’ve learned through designing, building, and testing, including what works, what falls short, and how to improve it.</p>
      <a class="primary-button" href="#work">Explore my projects ${arrow}</a>
      <p class="micro hero-location">Irvine, California <b>/</b> Open to relocation</p>
    </div>
    <figure class="hero-figure">
      <div class="hero-plate">
        <span class="plate-label micro">Featured project <b>/</b> 01</span>
        <img src="${asset(spotlight.cover)}" alt="${e(spotlight.coverAlt)}" width="535" height="401" fetchpriority="high">
        <span class="plate-corner c1"></span><span class="plate-corner c2"></span>
        <span class="plate-corner c3"></span><span class="plate-corner c4"></span>
      </div>
      <figcaption>
        <div class="feature-caption"><strong>${e(spotlight.title)}</strong><span><b>${e(spotlight.spotlight.value)}</b> <span class="caption-divider">/</span> ${e(spotlight.spotlight.label)}</span></div>
        <a href="${projectPath(spotlight)}" aria-label="View the ${e(spotlight.title)} project">View project ${diag}</a>
      </figcaption>
    </figure>
    </div>
  </section>

  <section class="work" id="work" aria-labelledby="work-title">
    <div class="wrap">
      <div class="section-index micro"><b>01</b><span></span> Project index</div>
      <div class="work-head">
        <h2 id="work-title">Selected work</h2>
        <p>Rocketry, spacecraft propulsion, sensor integration, and hands-on manufacturing.</p>
      </div>
      <div class="filter-row" aria-label="Filter projects" hidden>
        ${["All work","Aerospace","Electronics","Manufacturing"].map((label,i) => `<button type="button" data-filter="${e(label)}" aria-pressed="${i===0}">${e(label)}</button>`).join("")}
        <span class="project-count micro" aria-live="polite">${num(projects.length-1)} projects</span>
      </div>
      <div class="project-grid">${projects.map(card).join("")}</div>
    </div>
  </section>

  <section class="about" id="about" aria-labelledby="about-title">
    <div class="wrap">
      <div class="section-index micro"><b>02</b><span></span> About</div>
      <div class="about-grid">
        <div>
          <h2 id="about-title">Hi, I’m Ethan.</h2>
          <p class="about-lede">I’m Ethan Osuna, a third-year aerospace engineering transfer student at UC Irvine. As a makerspace staff member, I help students develop their projects, think through engineering decisions, and troubleshoot fabrication and electronics. I enjoy helping others understand why a design choice makes sense and giving them the confidence to keep building.</p>
          <p class="about-lede">Propulsion is the field I want to focus on within aerospace. I love seeing how thermodynamics, fluid mechanics, and hardware design come together to make a propulsion system work. My cold gas propulsion work and rocketry projects have strengthened that interest, and I’m looking for opportunities to gain more experience in propulsion design, analysis, and testing.</p>
        </div>
        <div class="about-contact">
          <p class="micro">Get in touch</p>
          <a href="mailto:${email}">${email} ${diag}</a>
          <a href="${linkedIn}">LinkedIn ${diag}</a>
          <p class="about-note">Based in Irvine, CA · Open to relocation</p>
        </div>
      </div>
    </div>
  </section>
</main>`;
writeFileSync(join(dist,"index.html"), layout("Ethan Osuna | Engineering Portfolio","Aerospace, hardware, and manufacturing projects by Ethan Osuna, a UC Irvine aerospace engineering student.",home));

projects.forEach((p,i) => {
  const next = projects[(i + 1) % projects.length];
  const film = p.film ? `<section class="film-section" aria-labelledby="film-title">
     <div class="wrap film-grid"><div><div class="section-index micro"><b>↗</b><span></span> Field footage</div>
     <h2 id="film-title">Launch video</h2><p>${e(p.film.caption)}</p><a href="${asset(p.film.src)}" download>Download MP4 ${diag}</a></div>
     <video width="480" height="854" aria-label="L1 rocket launch video" controls playsinline preload="metadata" poster="${asset(p.film.poster)}"><source src="${asset(p.film.src)}" type="video/mp4"></video></div></section>` : "";
  const body = `<main id="main">
    <section class="project-hero wrap" aria-labelledby="project-title">
      <a class="back-link" href="/#work">${back} All projects</a>
      <div class="project-intro">
        <div><div class="micro project-kicker"><b>${num(i)}</b> / ${e(p.eyebrow)}</div>
          <h1 id="project-title">${e(p.title)}</h1><p class="project-lede">${e(p.lede)}</p>${tags(p)}</div>
        <aside class="project-specs" aria-label="Project facts">
          <div class="spec-heading">${status(p)}<span class="micro">${e(p.date)}</span></div>
          <dl>${p.facts.map(([key,value])=>`<div><dt class="micro">${e(key)}</dt><dd>${e(value)}</dd></div>`).join("")}</dl>
        </aside>
      </div>
    </section>
    <section class="story wrap" aria-label="Project approach">${p.sections.map(([name,body],j)=>`<article><p class="micro story-num">0${j+1} /</p><h2>${e(name)}</h2><p>${e(body)}</p></article>`).join("")}</section>
    ${film}
    <section class="gallery" aria-labelledby="gallery-title">
      <div class="wrap">
        <div class="section-index micro"><b>${num(i)}</b><span></span> Project images</div>
        <h2 id="gallery-title">Documentation</h2>
        <div class="gallery-grid${p.gallery.length === 1 ? " single" : ""}">
        ${p.gallery.map(([file,cap],j)=>`<figure class="gallery-item"><a class="zoom-link" href="${asset(file)}" aria-label="Enlarge figure ${j+1}: ${e(cap)}"><img loading="lazy" src="${asset(file)}" alt="${e(cap)}"><span class="expand-icon">${expand}</span></a>
           <figcaption><b class="micro">FIG. ${num(j)}</b><span>${e(cap)}</span></figcaption></figure>`).join("")}
        </div>
      </div>
    </section>
    <div class="wrap next-project"><a href="${projectPath(next)}"><span class="micro">Next project</span><strong>${e(next.title)}</strong>${arrow}</a></div>
    <dialog class="lightbox" aria-label="Enlarged project image"><div class="lightbox-inner"><button type="button" class="lightbox-close" aria-label="Close image">${cross}</button><img alt=""><p></p></div></dialog>
  </main>`;
  const dir = join(dist, "projects",p.slug);
  mkdirSync(dir,{recursive:true});
  writeFileSync(join(dir,"index.html"),layout(p.title + " | Ethan Osuna",p.summary,body));
});
