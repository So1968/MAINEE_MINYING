(() => {
  const keepView = (el, classes) => {
    if (!el) return;
    const active = el.classList.contains('active');
    el.className = `view ${classes}${active ? ' active' : ''}`;
  };

  const stitch = (path, viewBox = '0 0 1600 620') => `
    <svg class="stitch-svg" viewBox="${viewBox}" preserveAspectRatio="none" aria-hidden="true">
      <path d="${path}" />
    </svg>`;

  const home = document.querySelector('#accueil');
  if (home) {
    keepView(home, 'mainee-home');
    home.innerHTML = `
      <section class="replica-hero">
        <div class="replica-hero-copy">
          <h1>Maïnée</h1>
          <p class="subtitle">Atelier du Jardin lettré MingYin</p>
          <span class="short-rule" aria-hidden="true"></span>
          <p class="intro">Composer avec le vivant,<br>révéler la beauté discrète<br>des matières offertes.</p>
          <button class="replica-cta" data-go="creation">Découvrir l’atelier</button>
        </div>
        <figure class="replica-hero-visual">
          <img data-b64-src="/images/mainee-hero-hq.b64" alt="Maïnée dans l’atmosphère du Jardin lettré MingYin">
        </figure>
        ${stitch('M0 100 C120 28 200 122 285 48 C344 0 405 44 430 132 M0 520 C100 435 158 555 250 478 C318 421 366 456 428 540','0 0 1600 570')}
      </section>

      <section class="home-band creation-preview">
        <div class="band-copy">
          <p class="band-kicker">Création</p>
          <p>Fragments d’écorces et de peaux végétales préparés, découpés, assemblés et cousus. Chaque œuvre devient un petit jardin de matière, de couleur et de temps.</p>
          <button class="band-link" data-go="creation">Voir les œuvres <span>→</span></button>
        </div>
        <div class="preview-works" aria-label="Œuvres réelles de Maryline Puydebois">
          <figure><img data-b64-src="/images/thesis-work-1.b64" alt="Œuvre végétale de Maryline Puydebois"></figure>
          <figure><img data-b64-src="/images/thesis-work-2.b64" alt="Assemblage de peaux d’agrumes de Maryline Puydebois"></figure>
          <figure><img data-b64-src="/images/thesis-work-3.b64" alt="Peaux végétales assemblées et cousues par Maryline Puydebois"></figure>
        </div>
        ${stitch('M1350 8 C1430 66 1352 118 1450 177 C1517 216 1523 270 1600 300','0 0 1600 330')}
      </section>

      <section class="home-band research-preview">
        <figure><img data-b64-src="/images/mainee-recherche-atelier.b64" alt="Maïnée écrivant dans son atelier"></figure>
        <div class="band-copy">
          <p class="band-kicker">Recherche</p>
          <p>La création et l’écriture avancent ensemble. La matière végétale, le fragment, le temps et la transformation constituent le terrain de sa recherche doctorale.</p>
          <button class="band-link" data-go="recherche">Entrer dans la recherche <span>→</span></button>
        </div>
      </section>

      <section class="home-band photo-preview">
        <div class="band-copy">
          <p class="band-kicker">Photographie</p>
          <p>Images cueillies au fil des saisons : floraisons, lumière, horizon et instants suspendus.</p>
          <button class="band-link" data-go="photographie">Découvrir la galerie <span>→</span></button>
        </div>
        <div class="photo-gallery">
          <figure><img data-b64-src="/images/photo-hibiscus.b64" alt="Photographie florale de Maryline"></figure>
          <figure><img src="/images/hero-mer.jpeg" alt="Photographie de lumière sur la mer par Maryline"></figure>
          <figure><img data-b64-src="/images/mainee-photo-camera.b64" alt="Maïnée au bord de la mer avec son appareil photo"></figure>
        </div>
      </section>

      <section class="home-band about-preview">
        <figure><img data-b64-src="/images/mainee-jardin.b64" alt="Portrait de Maïnée"></figure>
        <div class="band-copy">
          <p class="band-kicker">À propos</p>
          <p class="about-line">Maïnée, alias Maryline Puydebois, artiste, chercheuse et enseignante. Son atelier relie pratique végétale, recherche, photographie et transmission.</p>
          <button class="band-link" data-go="apropos">Me découvrir <span>→</span></button>
        </div>
        ${stitch('M980 326 C1070 248 1124 352 1218 302 C1312 251 1384 344 1492 286 C1545 258 1570 262 1600 280','0 0 1600 360')}
      </section>

      <div class="home-quote">La lumière discrète qui révèle l’invisible.</div>`;
  }

  const creation = document.querySelector('#creation');
  if (creation) {
    keepView(creation, 'mainee-subpage creation-page');
    creation.innerHTML = `
      <section class="subpage-hero creation-hero">
        <figure class="subpage-image"><img data-b64-src="/images/mainee-orange-atelier.b64" alt="Maïnée travaillant avec des peaux d’orange dans l’atelier"></figure>
        <div class="subpage-copy warm-copy">
          <p class="sub-kicker">Création</p>
          <h2>Des fragments comme de petits jardins.</h2>
          <p class="sub-lead">Peaux végétales préparées, séchées, découpées puis assemblées et cousues. La matière garde sa couleur, ses accidents et le passage du temps.</p>
          <span class="sub-rule"></span>
          <p class="sub-note">Peau · fragment · assemblage · couture · altération</p>
        </div>
        ${stitch('M1080 530 C1190 445 1270 578 1360 500 C1438 432 1504 470 1600 414')}
      </section>

      <section class="works-room">
        <header class="room-heading"><p class="sub-kicker">Œuvres</p><h3>La matière végétale, réellement.</h3><p>Trois vues du travail de Maryline Puydebois. Aucun motif n’est recréé pour le site.</p></header>
        <div class="works-row">
          <figure class="work-real work-tall"><img data-b64-src="/images/thesis-work-1.b64" alt="Œuvre de Maryline Puydebois en fragments de peaux végétales"><figcaption>Fragments de peaux végétales assemblés et cousus.</figcaption></figure>
          <figure class="work-real work-tall"><img data-b64-src="/images/thesis-work-2.b64" alt="Œuvre de Maryline Puydebois en peaux d’agrumes"><figcaption>Variation d’agrumes, matière et couleur.</figcaption></figure>
          <figure class="work-real work-wide"><img data-b64-src="/images/thesis-work-3.b64" alt="Œuvre de Maryline Puydebois en peaux d’orange assemblées"><figcaption>Peaux végétales assemblées et cousues.</figcaption></figure>
        </div>
      </section>

      <section class="editorial-flow material-flow">
        <article><span>01</span><h4>Fragment</h4><p>La peau végétale devient fragment, module, reste et échantillon.</p></article>
        <article><span>02</span><h4>Assemblage</h4><p>Les fragments se réunissent en trames, séries, grilles et monochromes végétaux.</p></article>
        <article><span>03</span><h4>Couture</h4><p>Le fil travaille la frontière entre les fragments sans effacer leurs différences.</p></article>
      </section>`;
  }

  const research = document.querySelector('#recherche');
  if (research) {
    keepView(research, 'mainee-subpage research-page');
    research.innerHTML = `
      <section class="subpage-hero research-hero">
        <figure class="subpage-image"><img data-b64-src="/images/mainee-recherche-atelier.b64" alt="Maïnée en situation de recherche et d’écriture"></figure>
        <div class="subpage-copy sage-copy">
          <p class="sub-kicker">Recherche</p>
          <h2>La matière comme terrain de pensée.</h2>
          <p class="sub-lead">La création et l’écriture avancent ensemble : observer, transformer, conserver, laisser le temps agir puis penser ce que la matière révèle.</p>
          <span class="sub-rule"></span>
          <p class="thesis-name">Proto-matériau végétal et utopies spatio-temporelles</p>
          <p class="thesis-small"><em>Œuvres végétales contemporaines et pratiques personnelles.</em><br>Aix-Marseille Université · 2018</p>
        </div>
        ${stitch('M1090 536 C1190 450 1280 579 1370 502 C1445 438 1510 470 1600 420')}
      </section>

      <section class="research-table">
        <div class="research-copy-block">
          <p class="sub-kicker">Dans la thèse</p>
          <h3>Œuvres, fragments, protocoles.</h3>
          <p>Les images restent les images du travail de Maryline. Elles sont montrées ici comme des éléments de pensée et de pratique, pas comme un décor.</p>
        </div>
        <div class="research-plates">
          <figure><img data-b64-src="/images/thesis-work-1.b64" alt="Œuvre végétale de Maryline Puydebois"><figcaption>Fragment · assemblage · matière.</figcaption></figure>
          <figure><img data-b64-src="/images/thesis-work-2.b64" alt="Assemblage d’agrumes de Maryline Puydebois"><figcaption>Couleur · variation · temps.</figcaption></figure>
          <figure><img data-b64-src="/images/thesis-work-3.b64" alt="Peaux végétales cousues de Maryline Puydebois"><figcaption>Couture · trame · transformation.</figcaption></figure>
        </div>
      </section>

      <section class="editorial-flow thesis-flow">
        <article><span>I</span><h4>Poïétique du matériau végétal</h4><p>Enveloppe, fragment, grille, échantillon, assemblage, couture, temporalité et conservation créatrice.</p></article>
        <article><span>II</span><h4>Proto-matériau végétal</h4><p>Matériau originaire, proto-langage artistique, géométrie primitive, mémoire et plasticité du végétal.</p></article>
        <article><span>III</span><h4>Habiter le végétal</h4><p>Architecture et végétal, troisième peau, espaces dépliés, porosité de l’espace et impermanence.</p></article>
      </section>`;
  }

  const teaching = document.querySelector('#pedagogie');
  if (teaching) {
    keepView(teaching, 'mainee-subpage teaching-page');
    teaching.innerHTML = `
      <section class="subpage-hero teaching-hero">
        <figure class="subpage-image"><img data-b64-src="/images/mainee-recherche-atelier.b64" alt="Maïnée écrivant et préparant son travail de transmission"></figure>
        <div class="subpage-copy paper-copy">
          <p class="sub-kicker">Enseignement</p>
          <h2>Transmettre le regard autant que les savoirs.</h2>
          <p class="sub-lead">Une pédagogie qui relie observation, histoire de l’art, philosophie, expérience sensible et processus de création.</p>
          <span class="sub-rule"></span>
          <p class="sub-note">Regarder · relier · expérimenter · transmettre</p>
        </div>
      </section>
      <section class="teaching-statement"><p>La transmission n’est pas séparée de la pratique : elle apprend à voir, à formuler et à mettre les œuvres en relation sans refermer leur sens.</p></section>
      <section class="editorial-flow teaching-flow">
        <article><span>01</span><h4>Regarder</h4><p>Observer une matière, une image, un geste avant de les expliquer.</p></article>
        <article><span>02</span><h4>Relier</h4><p>Faire circuler création, histoire de l’art, philosophie et expérience.</p></article>
        <article><span>03</span><h4>Expérimenter</h4><p>Donner une place au processus, au tâtonnement et à la matière.</p></article>
        <article><span>04</span><h4>Transmettre</h4><p>Partager des outils sans figer les réponses ni fermer les possibles.</p></article>
      </section>`;
  }

  const photo = document.querySelector('#photographie');
  if (photo) {
    keepView(photo, 'mainee-subpage photo-page');
    photo.innerHTML = `
      <section class="subpage-hero photo-hero">
        <div class="subpage-copy paper-copy">
          <p class="sub-kicker">Photographie</p>
          <h2>Lumières, paysages, végétal observé.</h2>
          <p class="sub-lead">La photographie garde les instants où la lumière, la floraison ou l’horizon deviennent presque matière.</p>
          <span class="sub-rule"></span>
          <p class="sub-note">Ici, les fleurs prennent pleinement place dans le site.</p>
        </div>
        <figure class="subpage-image"><img data-b64-src="/images/mainee-photo-camera.b64" alt="Maïnée au bord de la mer avec son appareil photo"></figure>
      </section>

      <section class="photo-room">
        <header class="room-heading"><p class="sub-kicker">Galerie</p><h3>Images cueillies.</h3></header>
        <div class="photo-wall">
          <figure class="photo-tall"><img data-b64-src="/images/photo-hibiscus.b64" alt="Photographie florale de Maryline"></figure>
          <figure class="photo-wide"><img src="/images/hero-mer.jpeg" alt="Photographie de lumière sur la mer par Maryline"></figure>
          <figure class="photo-portrait"><img data-b64-src="/images/mainee-photo-camera.b64" alt="Maïnée au bord de la mer avec son appareil photo"></figure>
        </div>
      </section>`;
  }

  const about = document.querySelector('#apropos');
  if (about) {
    keepView(about, 'mainee-subpage about-page');
    about.innerHTML = `
      <section class="about-full">
        <figure class="about-main-image"><img data-b64-src="/images/mainee-jardin.b64" alt="Portrait de Maïnée"></figure>
        <div class="about-main-copy">
          <p class="sub-kicker">À propos</p>
          <h2>Maryline Puydebois — Maïnée</h2>
          <p class="about-lead">Artiste, chercheuse et enseignante, elle construit une pratique où matière végétale, écriture, photographie et transmission se répondent.</p>
          <p>Son atelier se développe à partir d’un matériau humble : la peau végétale. Préparer, découper, assembler, coudre, observer l’altération et laisser le temps poursuivre l’œuvre.</p>
          <blockquote>« La lumière discrète qui révèle l’invisible. »</blockquote>
        </div>
        ${stitch('M890 610 C990 515 1070 663 1170 558 C1265 460 1365 592 1492 505 C1540 472 1570 470 1600 488','0 0 1600 700')}
      </section>`;
  }

  const contact = document.querySelector('#contact');
  if (contact) {
    keepView(contact, 'mainee-subpage contact-page');
    contact.innerHTML = `
      <section class="contact-editorial">
        <div class="contact-copy-rich">
          <p class="sub-kicker">Contact</p>
          <h2>Entrer dans le jardin.</h2>
          <p>Exposition, collaboration, intervention, projet de recherche ou rencontre : écrire à Maïnée.</p>
          <form onsubmit="event.preventDefault();alert('Prototype local : aucun message n’est envoyé pour le moment.');">
            <label>Nom<input name="nom" autocomplete="name"></label>
            <label>E-mail<input name="email" type="email" autocomplete="email"></label>
            <label>Sujet<input name="sujet"></label>
            <label>Message<textarea name="message" rows="5"></textarea></label>
            <button>Préparer le message</button>
          </form>
        </div>
        <figure class="contact-image"><img data-b64-src="/images/mainee-jardin.b64" alt="Maïnée"></figure>
        ${stitch('M70 595 C185 500 260 648 355 552 C420 487 485 505 570 590','0 0 1600 700')}
      </section>`;
  }

  document.querySelectorAll('[data-go]').forEach((b) => {
    if (!b.dataset.boundReplica) {
      b.dataset.boundReplica = '1';
      b.addEventListener('click', () => {
        if (typeof go === 'function') go(b.dataset.go);
      });
    }
  });

  if (typeof loadB64Images === 'function') loadB64Images();
})();