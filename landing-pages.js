const collectionPages = [
  { slug: "paintings", label: "Paintings & canvas art", category: "paintings", art: "canvas", intro: "Give a wall a point of view.", copy: "Original paintings and canvas art belong to a space in a way few things do. Explore the studio's approach or tell us what you imagine for your own walls.", title: "Original colour.\nA space transformed.", next: "Calligraphy & Islamic art", nextHref: "calligraphy.html" },
  { slug: "calligraphy", label: "Calligraphy & Islamic art", category: "calligraphy", art: "script", intro: "Words with room to breathe.", copy: "Calligraphic art brings language, rhythm and form together. Speak with the studio about a piece or a custom direction that feels personal to you.", title: "A word becomes\na work of art.", next: "Handmade crafts", nextHref: "handmade-crafts.html" },
  { slug: "crafts", label: "Handmade crafts", category: "crafts", art: "craft", intro: "Made by hand. Made to matter.", copy: "Explore thoughtful handmade objects and bring the studio an idea for a considered gift, a small detail or something entirely your own.", title: "A human touch\nin every detail.", next: "Personalized gifts", nextHref: "personalized-gifts.html" },
  { slug: "sculpture", label: "3D art & sculptures", category: "sculpture", art: "form", intro: "Art that steps into the room.", copy: "Dimensional work adds a new relationship between light, material and space. Discuss a sculptural idea with the studio and explore what may be possible.", title: "Form with\na little feeling.", next: "Home & interior art", nextHref: "interior-art.html" },
  { slug: "gifts", label: "Personalized gifts", category: "gifts", art: "gift", intro: "Make the gesture personal.", copy: "For a milestone, a thank-you or simply because. Share the person, moment or idea behind your gift and discuss a made-for-them direction.", title: "Thoughtful things\nfeel different.", next: "Handmade crafts", nextHref: "handmade-crafts.html" },
  { slug: "interior", label: "Home & interior art", category: "interior", art: "interior", intro: "A space, with its own story.", copy: "Art can bring a room together or begin a new conversation with it. Tell us about the space, mood and scale you have in mind.", title: "Make a space\nfeel like yours.", next: "Paintings & canvas art", nextHref: "paintings.html" }
];

const pages = {
  shop: { eyebrow: "THE STUDIO EDIT", title: "Art for a life\nwell imagined.", intro: "Discover the creative worlds of KALAM ARTS STUDIO: original art, calligraphy, handmade craft, dimensional pieces and thoughtful gifts.", art: "shop", kind: "shop", cta: "Explore collections", ctaHref: "#page-content" },
  custom: { eyebrow: "CUSTOM ARTWORK · ABU DHABI", title: "Your idea,\nin living colour.", intro: "Bring us the thought, the space or the feeling. We will talk through the details and explore a creative direction together.", art: "custom", kind: "custom", cta: "Start your enquiry", ctaHref: "#project-enquiry" },
  portfolio: { eyebrow: "SELECTED WORK · STUDIO JOURNAL", title: "An imagination\nmade visible.", intro: "A growing window into the studio's creative disciplines. These panels are image slots, not claimed client projects or completed work.", art: "portfolio", kind: "portfolio", cta: "Discuss a project", ctaHref: "custom-art.html" },
  about: { eyebrow: "ABOUT THE STUDIO", title: "Many ways\nto make meaning.", intro: "KALAM ARTS STUDIO is a creative studio in Abu Dhabi exploring art, design and branding through original ideas and thoughtful making.", art: "about", kind: "about", cta: "Meet us through a project", ctaHref: "contact.html" },
  workshops: { eyebrow: "WORKSHOPS & CREATIVE PROJECTS", title: "Make space\nfor possibility.", intro: "Have an idea for a creative session, collaboration or a project with a group? Tell us a little about it and we can discuss the direction.", art: "workshop", kind: "workshops", cta: "Discuss a creative project", ctaHref: "#project-enquiry" },
  contact: { eyebrow: "SAY HELLO", title: "Every good idea\nstarts somewhere.", intro: "Ask about artwork, share a custom brief or simply start a conversation with the studio in Abu Dhabi.", art: "contact", kind: "contact", cta: "Write to the studio", ctaHref: "mailto:info@kalamartsstudio.com" }
};

function getPageData(key) {
  return collectionPages.find((item) => item.slug === key) || pages[key] || pages.shop;
}

function collectionLinks() {
  return collectionPages.map((item) => `<a href="${item.slug === "paintings" ? "paintings.html" : item.slug === "calligraphy" ? "calligraphy.html" : item.slug === "crafts" ? "handmade-crafts.html" : item.slug === "sculpture" ? "3d-art.html" : item.slug === "gifts" ? "personalized-gifts.html" : "interior-art.html"}">${item.label}<span aria-hidden="true">↗</span></a>`).join("");
}

function headerMarkup() {
  return `
    <div class="scroll-progress" aria-hidden="true"><span id="landing-progress-fill"></span></div>
    <div class="announcement"><span>WE CREATE. YOU EXPERIENCE.</span><a href="custom-art.html">Bring an idea to life <span aria-hidden="true">↗</span></a></div>
    <header class="site-header landing-header" id="top">
      <button class="menu-toggle icon-button" type="button" aria-expanded="false" aria-controls="landing-nav" aria-label="Open navigation"><span></span><span></span></button>
      <a class="brand-logo" href="index.html" aria-label="KALAM ARTS STUDIO home"><img src="assets/kalam-arts-studio-logo.png" width="441" height="566" alt="KALAM ARTS STUDIO · Art · Design · Branding"></a>
      <nav id="landing-nav" class="primary-nav" aria-label="Main navigation">
        <a href="shop.html">Shop</a>
        <details class="landing-collections"><summary>Collections <span aria-hidden="true">⌄</span></summary><div class="nav-dropdown">${collectionLinks()}</div></details>
        <a href="custom-art.html">Custom artwork</a><a href="portfolio.html">Our work</a><a href="about.html">About</a><a href="contact.html">Contact</a>
      </nav>
      <div class="header-tools"><a class="landing-bag" href="shop.html" aria-label="Browse the studio catalogue">Explore <span aria-hidden="true">↗</span></a></div>
    </header>`;
}

function footerMarkup() {
  return `
    <footer class="landing-footer">
      <div class="landing-footer-cta"><p class="eyebrow">THE NEXT IDEA COULD BE YOURS</p><h2>Let's make<br><em>something meaningful.</em></h2><a class="button button-dark" href="custom-art.html">Start a conversation <span aria-hidden="true">↗</span></a></div>
      <div class="landing-footer-columns"><a class="wordmark" href="index.html"><span>KALAM <i>ARTS</i></span><small><b>ART</b><i></i><b>DESIGN</b><i></i><b>BRANDING</b></small></a><div><b>EXPLORE</b><a href="shop.html">Shop all</a><a href="portfolio.html">Our work</a><a href="about.html">About</a><a href="workshops.html">Workshops & projects</a></div><div><b>COLLECTIONS</b><a href="paintings.html">Paintings</a><a href="calligraphy.html">Calligraphy</a><a href="handmade-crafts.html">Handmade crafts</a><a href="interior-art.html">Interior art</a></div><div><b>CONTACT</b><a href="mailto:info@kalamartsstudio.com">info@kalamartsstudio.com</a><a href="https://wa.me/971564692102" target="_blank" rel="noopener noreferrer">WhatsApp +971 56 469 2102</a><a href="https://www.instagram.com/kalamartsstudio/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><span>Abu Dhabi, UAE</span></div></div>
      <div class="landing-footer-bottom"><span>© ${new Date().getFullYear()} KALAM ARTS STUDIO</span><span>WE CREATE. YOU EXPERIENCE.</span><a href="index.html#faq">Shipping, returns & information</a><a href="index.html">Home ↑</a></div>
    </footer>`;
}

function heroMarkup(data, page) {
  const eyebrow = data.eyebrow || data.label.toUpperCase();
  const cta = data.cta || "Discuss this collection";
  const ctaHref = data.ctaHref || "custom-art.html";
  return `<section class="landing-hero landing-hero-${data.art}">
    <div class="landing-hero-copy"><p class="eyebrow"><span class="eyebrow-line"></span>${eyebrow}</p><h1>${data.title.split("\n").join("<br>")}</h1><p class="landing-lede">${data.intro}</p><div class="landing-hero-actions"><a class="button button-dark" href="${ctaHref}">${cta} <span aria-hidden="true">↗</span></a>${page !== "contact" ? `<a class="text-link" href="contact.html">Talk to the studio <span aria-hidden="true">↗</span></a>` : ""}</div><span class="landing-hero-location">KALAM ARTS STUDIO · ABU DHABI</span></div>
    <div class="landing-art-panel" role="img" aria-label="Illustrative artwork placeholder, replace with a real studio image"><span class="landing-art-shape landing-shape-a"></span><span class="landing-art-shape landing-shape-b"></span><span class="landing-art-shape landing-shape-c"></span><span class="landing-art-caption">ARTWORK IMAGE SLOT <b>Replace with a verified studio photograph</b></span><span class="landing-art-index">KAS / ${page.toUpperCase()}</span></div>
    <a class="landing-scroll" href="#page-content">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
  </section>`;
}

function categoryGrid() {
  return `<div class="landing-category-grid">${collectionPages.map((item, index) => {
    const href = ["paintings.html", "calligraphy.html", "handmade-crafts.html", "3d-art.html", "personalized-gifts.html", "interior-art.html"][index];
    return `<a class="landing-category-card" href="${href}"><span class="landing-category-art landing-category-${item.art}"><i></i><b>IMAGE SLOT</b></span><span class="landing-category-meta">0${index + 1} / COLLECTION</span><strong>${item.label}</strong><span class="landing-category-link">Explore <i aria-hidden="true">↗</i></span></a>`;
  }).join("")}</div>`;
}

function customForm() {
  return `<form class="landing-enquiry-form" id="landing-enquiry-form">
    <div class="landing-form-intro"><span class="landing-form-step">YOUR PROJECT · 1 MINUTE</span><p>Just the essentials. We’ll follow up to discuss the details.</p></div>
    <div class="landing-form-row">
      <label for="enquiry-name">Your name <span class="landing-required">Required</span><input id="enquiry-name" name="name" autocomplete="name" required placeholder="e.g. Anan"></label>
      <label for="enquiry-contact">WhatsApp or email <span class="landing-required">Required</span><input id="enquiry-contact" name="contact" autocomplete="email" required placeholder="Number or email address"></label>
    </div>
    <label for="enquiry-type">What can we create for you? <span class="landing-required">Required</span><select id="enquiry-type" name="type" required><option value="">Choose a project type</option><option>Painting or canvas art</option><option>Calligraphy or Islamic art</option><option>Handmade craft</option><option>3D art or sculpture</option><option>Personalized gift</option><option>Home or interior art</option><option>Mural or wall art</option><option>Workshop or creative project</option><option>Branding or design</option><option>Other / not sure yet</option></select></label>
    <input type="hidden" name="method" value="WhatsApp">
    <label for="enquiry-brief">Tell us your idea <span class="landing-required">Required</span><textarea id="enquiry-brief" name="brief" rows="3" required placeholder="What do you have in mind? A gift, artwork, size, colours or occasion…"></textarea></label>
    <div class="landing-form-row">
      <label for="enquiry-dimensions">Approx. size <span class="landing-optional">Optional</span><input id="enquiry-dimensions" name="dimensions" placeholder="e.g. 60 × 90 cm"></label>
      <label for="enquiry-date">When do you need it? <span class="landing-optional">Optional</span><input id="enquiry-date" name="date" type="date"></label>
    </div>
    <label for="enquiry-budget">Budget range <span class="landing-optional">Optional</span><select id="enquiry-budget" name="budget"><option value="">Prefer to discuss</option><option>Under AED 500</option><option>AED 500–1,500</option><option>AED 1,500–5,000</option><option>AED 5,000+</option></select></label>
    <p class="landing-form-note">We’ll use these details to respond to your enquiry. Your enquiry may be stored in the studio’s Google Sheet so the team can follow up. No marketing subscription.</p>
    <button class="button button-dark landing-submit-button" type="submit">Send my project enquiry <span aria-hidden="true">↗</span></button>
    <p class="landing-form-status" id="landing-form-status" role="status" aria-live="polite"></p>
  </form>`;
}

function shopContent() {
  return `<section class="landing-content-section" id="page-content"><div class="landing-section-heading"><p class="eyebrow">SIX WAYS INTO THE STUDIO</p><h2>Find your kind<br>of <em>art.</em></h2><p>Explore by discipline and start a conversation about a piece or a custom direction.</p></div>${categoryGrid()}<p class="landing-data-note">The product catalogue is being prepared. Product photos, prices, dimensions and availability will be published after studio details are confirmed.</p></section>`;
}

function collectionContent(data) {
  return `<section class="landing-collection-intro" id="page-content"><div><p class="eyebrow">${data.label.toUpperCase()} · KALAM STUDIO</p><h2>${data.intro}</h2></div><p>${data.copy}</p></section><section class="landing-editorial-pair"><div class="landing-editorial-art landing-category-${data.art}" role="img" aria-label="Collection image placeholder"><span>COLLECTION IMAGE SLOT</span></div><div><p class="eyebrow">A CREATIVE STARTING POINT</p><h2>${data.title.replace("\n", "<br>")}</h2><p>Every commission begins with a conversation about your idea, style, intended setting and practical details. Availability, materials, pricing and timing are confirmed directly with the studio.</p><a class="text-link" href="custom-art.html">Discuss a custom piece <span aria-hidden="true">↗</span></a></div></section><section class="landing-next-collection"><p class="eyebrow">KEEP EXPLORING</p><a href="${data.nextHref}">${data.next} <span aria-hidden="true">↗</span></a><a href="shop.html">All collections <span aria-hidden="true">↗</span></a></section>`;
}

function portfolioContent() {
  return `<section class="landing-content-section" id="page-content"><div class="landing-section-heading"><p class="eyebrow">STUDIO JOURNAL · IMAGE SLOTS</p><h2>Ideas in<br><em>different forms.</em></h2><p>These are category placeholders, not completed client case studies. Add real studio images and approved descriptions before launch.</p></div><div class="landing-work-grid"><article><div class="landing-work-art landing-category-canvas"><span>PAINTING IMAGE SLOT</span></div><p>01 / PAINTING & CANVAS</p></article><article><div class="landing-work-art landing-category-script"><span>CALLIGRAPHY IMAGE SLOT</span></div><p>02 / CALLIGRAPHY</p></article><article><div class="landing-work-art landing-category-craft"><span>HANDMADE IMAGE SLOT</span></div><p>03 / HANDMADE OBJECTS</p></article></div><a class="button button-dark" href="custom-art.html">Create a project of your own <span aria-hidden="true">↗</span></a></section>`;
}

function customContent(data, page) {
  if (page === "custom" || page === "workshops" || page === "contact") {
    return `<section class="landing-process" id="page-content"><div><p class="eyebrow">A CLEAR, CONSIDERED PROCESS</p><h2>First the idea.<br><em>Then the making.</em></h2></div><div class="landing-steps"><article><b>01</b><div><h3>Share the thought</h3><p>Tell the studio what you want to create, who it is for or where it will live.</p></div></article><article><b>02</b><div><h3>Explore the details</h3><p>Discuss style, dimensions, materials, budget and an intended date.</p></div></article><article><b>03</b><div><h3>Agree the direction</h3><p>Confirm scope, quotation and timing directly with the studio.</p></div></article><article><b>04</b><div><h3>Bring it to life</h3><p>Creation and fulfilment arrangements are agreed for each project.</p></div></article></div></section><section class="landing-enquiry-section" id="project-enquiry"><div><p class="eyebrow">START A CONVERSATION</p><h2>${page === "contact" ? "Say hello." : page === "workshops" ? "Tell us what you have in mind." : "What are you imagining?"}</h2><p>Share a few useful details. We will discuss the possibilities and prepare a suitable quotation. No instant quote or delivery timing is promised.</p><div class="landing-direct-contact"><a href="mailto:info@kalamartsstudio.com">info@kalamartsstudio.com ↗</a><a href="https://wa.me/971564692102" target="_blank" rel="noopener noreferrer">WhatsApp +971 56 469 2102 ↗</a></div></div>${customForm()}</section>`;
  }
  if (page === "about") {
    return `<section class="landing-about-content" id="page-content"><p class="eyebrow">WE CREATE. YOU EXPERIENCE.</p><h2>Art. Design.<br><em>Branding.</em></h2><p>KALAM ARTS STUDIO brings creative disciplines together in Abu Dhabi. The studio works with artwork, handcrafted products, personalized gifts and creative projects, with a direct conversation at the heart of each brief.</p><div class="landing-about-pillars"><article><span>01</span><h3>Art</h3><p>Original expression across canvas, calligraphy and form.</p></article><article><span>02</span><h3>Design</h3><p>Thoughtful creative direction for personal and project ideas.</p></article><article><span>03</span><h3>Branding</h3><p>Creative work shaped around the story a business wants to tell.</p></article></div><a class="button button-dark" href="contact.html">Talk to the studio <span aria-hidden="true">↗</span></a></section>`;
  }
  return `<section class="landing-content-section" id="page-content"><div class="landing-section-heading"><p class="eyebrow">${data.eyebrow}</p><h2>${data.intro}</h2></div>${categoryGrid()}</section>`;
}

function render() {
  const root = document.querySelector("#page-root");
  const key = root.dataset.page;
  const data = getPageData(key);
  const isCollection = collectionPages.some((item) => item.slug === key);
  let content = "";
  if (key === "shop") content = shopContent();
  else if (isCollection) content = collectionContent(data);
  else if (key === "portfolio") content = portfolioContent();
  else content = customContent(data, key);
  const eyebrow = data.eyebrow || data.label.toUpperCase();
  root.innerHTML = `<a class="skip-link" href="#landing-main">Skip to content</a>${headerMarkup()}<main class="landing-main" id="landing-main"><div class="landing-breadcrumb"><a href="index.html">HOME</a><span>/</span><span>${eyebrow}</span></div>${heroMarkup(data, key)}${content}<section class="landing-bottom-cta"><p>WE CREATE. YOU EXPERIENCE.</p><a href="custom-art.html">Bring us your idea <span aria-hidden="true">↗</span></a></section></main>${footerMarkup()}`;

  const menuButton = root.querySelector(".menu-toggle");
  const nav = root.querySelector("#landing-nav");
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !expanded);
  });

  const progress = root.querySelector("#landing-progress-fill");
  let framePending = false;
  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? Math.min(100, Math.max(0, window.scrollY / maxScroll * 100)) : 0}%`;
    framePending = false;
  };
  window.addEventListener("scroll", () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();

  const form = root.querySelector("#landing-enquiry-form");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    window.KalamIntegrations.submit(form, root.querySelector("#landing-form-status"));
  });

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, activeObserver) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    }), { threshold: 0.12 });
    root.querySelectorAll(".landing-reveal").forEach((item) => observer.observe(item));
  } else root.querySelectorAll(".landing-reveal").forEach((item) => item.classList.add("is-visible"));
}

render();