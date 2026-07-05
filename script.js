document.addEventListener('DOMContentLoaded', function() {

  // --- LUCIDE ICONS ---
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- NAVBAR SCROLL EFFECT ---
  var header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION MENU ---
  var menuBtn = document.getElementById('menu-btn');
  var navLinks = document.getElementById('nav-links');

  menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    var icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      var icon = menuBtn.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });

  // --- ACTIVE LINK ON SCROLL ---
  var sections = document.querySelectorAll('section');
  var navItems = document.querySelectorAll('.nav-link');

  var observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navItems.forEach(function(item) {
          if (item.getAttribute('href') === '#' + id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function(section) { observer.observe(section); });

  // --- DYNAMIC PORTFOLIO DATABASE ---
  var projects = [
    // OTIS Projects
    { name: "Mantri Pinnacle",                  location: "Bangalore",      brand: "otis",          badgeClass: "brand-otis",      count: 14, notes: "45 Stops High-Speed Elevator System",                    isUae: false },
    { name: "World Trade Center",               location: "Chennai",        brand: "otis",          badgeClass: "brand-otis",      count: 18, notes: "30 Stops Premium Commercial Elevator Setup",             isUae: false },
    { name: "Commerzone",                       location: "Chennai",        brand: "otis",          badgeClass: "brand-otis",      count: 15, notes: "13 Stops Passenger Lift Infrastructure",                 isUae: false },
    { name: "Abu Dhabi International Airport",  location: "Abu Dhabi, UAE", brand: "otis",          badgeClass: "brand-otis",      count: 50, notes: "Final Stage Commissioning & Handover",                  isUae: true  },
    // Fujitec Projects
    { name: "Prestige Lakeshore Drive",         location: "Bangalore",      brand: "fujitec",       badgeClass: "brand-fujitec",   count: 50, notes: "High-Rise Residential Towers",                          isUae: false },
    { name: "Sattva Knowledge Point",           location: "Bangalore",      brand: "fujitec",       badgeClass: "brand-fujitec",   count: 10, notes: "High-Rise Commercial Elevators",                        isUae: false },
    // Hitachi Projects
    { name: "Olympia Technology Park",          location: "Chennai",        brand: "hitachi",       badgeClass: "brand-hitachi",   count: 16, notes: "High-Rise Corporate Lifts",                             isUae: false },
    { name: "Manyata Technology Park",          location: "Bangalore",      brand: "hitachi",       badgeClass: "brand-hitachi",   count: 10, notes: "High-Rise Corporate Lifts",                             isUae: false },
    // Johnson Lifts
    { name: "Chennai Metro Rail Corporation",   location: "Chennai",        brand: "johnson",       badgeClass: "brand-johnson",   count: 10, notes: "Mid-Rise Public Infrastructure Transit Lifts",          isUae: false },
    // Schindler Projects
    { name: "Courtyard",                        location: "Madurai",        brand: "schindler",     badgeClass: "brand-schindler", count: 15, notes: "High-Rise Hotel Elevator Install",                isUae: false },
    { name: "Brigade Northridge",               location: "Bangalore",      brand: "schindler",     badgeClass: "brand-schindler", count: 12, notes: "High-Rise Residential Lifts",                          isUae: false },
    { name: "Pranavam Builders",                location: "Bangalore",      brand: "schindler",     badgeClass: "brand-schindler", count: 13, notes: "Mid-Rise Residential Lifts",                           isUae: false },
    // TK Elevator
    { name: "Presidential Tower",              location: "Chennai",        brand: "tke",           badgeClass: "brand-tke",       count: 11, notes: "High-Rise Premium Tower Setup",                         isUae: false },
    { name: "AVRN Hotel",                       location: "Chennai",        brand: "tke",           badgeClass: "brand-tke",       count: 12, notes: "Mid-Rise Hotel Lift System",                     isUae: false },
    { name: "TNHB Project",                     location: "Madurai",        brand: "tke",           badgeClass: "brand-tke",       count: 14, notes: "High-Rise Housing Board Infrastructure",                isUae: false },
    // Sieger Car Parking Systems
    { name: "Saravana Stores",                  location: "Chennai",        brand: "parking",       badgeClass: "brand-parking",   count: 11, notes: "Automatic Car Parking Lift (3 Ton capacity)",          isUae: false },
    { name: "Chennai Silks",                    location: "Chennai",        brand: "parking",       badgeClass: "brand-parking",   count: 12, notes: "Automatic Car Parking Lifts (3 Ton capacity)",         isUae: false },
    { name: "Super Saravana Store",             location: "Madurai",        brand: "parking",       badgeClass: "brand-parking",   count: 17, notes: "Automatic Car Parking Lifts (3 Ton capacity)",         isUae: false },
    // UAE Projects
    { name: "Dubai Arena Stadium",              location: "Dubai, UAE",     brand: "kone",          badgeClass: "brand-kone",      count: 15, notes: "KONE Elevators installation & site execution",          isUae: true  }
  ];

  var tbody       = document.getElementById('portfolio-tbody');
  var searchInput = document.getElementById('project-search');
  var filterChips = document.querySelectorAll('.filter-chip');

  var currentFilter = 'all';
  var currentSearch = '';

  function renderProjects() {
    tbody.innerHTML = '';

    var filteredProjects = projects.filter(function(project) {
      var matchesFilter = false;
      if (currentFilter === 'all') {
        matchesFilter = true;
      } else if (currentFilter === 'uae') {
        matchesFilter = project.isUae === true;
      } else {
        matchesFilter = project.brand === currentFilter;
      }

      var searchLower = currentSearch.toLowerCase();
      var matchesSearch =
        project.name.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.notes.toLowerCase().includes(searchLower) ||
        project.brand.toLowerCase().includes(searchLower);

      return matchesFilter && matchesSearch;
    });

    if (filteredProjects.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="table-empty-state">' +
        '<i data-lucide="info" style="width:24px;height:24px;margin-bottom:0.5rem;color:var(--text-muted);"></i>' +
        '<p>No matching projects found. Try resetting the filter chips or typing a different query.</p>' +
        '</td></tr>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    filteredProjects.forEach(function(project) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td style="font-weight:600;color:var(--text-primary);">' + project.name + '</td>' +
        '<td><i data-lucide="map-pin" style="width:12px;height:12px;display:inline;margin-right:4px;color:var(--accent);"></i>' + project.location + '</td>' +
        '<td><span class="brand-badge ' + project.badgeClass + '">' + project.brand.toUpperCase() + '</span></td>' +
        '<td><div class="project-elevator-count"><i data-lucide="arrow-up-down" style="width:12px;height:12px;color:var(--accent);"></i> ' + project.count + '</div></td>' +
        '<td style="font-size:0.9rem;">' + project.notes + '</td>';
      tbody.appendChild(tr);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      currentSearch = e.target.value;
      renderProjects();
    });
  }

  filterChips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      filterChips.forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderProjects();
    });
  });

  renderProjects();

  // --- ANIMATED COUNTERS ---
  var counters = document.querySelectorAll('.counter');

  function animateCounter(counter) {
    var target   = +counter.getAttribute('data-target');
    var duration = 1500;
    var stepTime = Math.max(Math.floor(duration / target), 15);
    var count    = 0;

    var timer = setInterval(function() {
      count += 1;
      counter.innerText = count + '+';
      if (count >= target) {
        counter.innerText = target + '+';
        clearInterval(timer);
      }
    }, stepTime);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(counter) { counterObserver.observe(counter); });

  // --- CONTACT FORM ---
  var contactForm    = document.getElementById('contact-form');
  var successOverlay = document.getElementById('form-success-overlay');
  var successCloseBtn = document.getElementById('success-close-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('.form-submit-btn');
      var originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin" style="width:16px;margin-right:6px;"></i> Submitting...';
      if (typeof lucide !== 'undefined') lucide.createIcons();

    var data = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(response) {
      submitBtn.innerHTML = originalContent;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      if (response.ok) {
        contactForm.reset();
        successOverlay.classList.add('active');
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(function() {
      submitBtn.innerHTML = originalContent;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      alert('Network error. Please try again.');
    });
  });
}


  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', function() {
      successOverlay.classList.remove('active');
    });
  }

  // --- GALLERY TRIGGERS ---
  var projectGalleries = {
    'abu-dhabi-international-airport': [
      { href: 'assets/projects/Abu-Dhabi-International-Airport/img1.jpg', title: 'Abu Dhabi International Airport — 1' },
      { href: 'assets/projects/Abu-Dhabi-International-Airport/img2.jpg', title: 'Abu Dhabi International Airport — 2' }
    ],
    'avrn-hotel': [
      { href: 'assets/projects/AVRN-Hotel/img1.jpg', title: 'AVRN Hotel — 1' }
    ],
    'brigade-northridge': [
      { href: 'assets/projects/Brigade-Northridge/img1.jpg', title: 'Brigade Northridge — 1' }
    ],
    'chennai-metro-rail-corporation': [
      { href: 'assets/projects/Chennai-Metro-Rail-Corporation/img1.jpg', title: 'Chennai Metro Rail Corporation — 1' },
      { href: 'assets/projects/Chennai-Metro-Rail-Corporation/img2.jpg', title: 'Chennai Metro Rail Corporation — 2' }
    ],
    'chennai-silks': [
      { href: 'assets/projects/Chennai-Silks/img1.jpg', title: 'Chennai Silks — 1' }
    ],
    'commer-zone': [
      { href: 'assets/projects/commer-zone/img1.jpg', title: 'Commer Zone — 1' },
      { href: 'assets/projects/commer-zone/img2.jpg', title: 'Commer Zone — 2' }
    ],
    'courtyard': [
      { href: 'assets/projects/Courtyard/img1.jpg', title: 'Courtyard — 1' }
    ],
    'dubai-arena-stadium': [
      { href: 'assets/projects/Dubai-Arena-Stadium/img1.jpg', title: 'Dubai Arena Stadium — 1' },
      { href: 'assets/projects/Dubai-Arena-Stadium/img2.jpg', title: 'Dubai Arena Stadium — 2' },
      { href: 'assets/projects/Dubai-Arena-Stadium/img3.jpg', title: 'Dubai Arena Stadium — 3' }
    ],
    'mantri-pinnacle': [
      { href: 'assets/projects/mantri-pinnacle/img1.jpg', title: 'Mantri Pinnacle — 1' },
      { href: 'assets/projects/mantri-pinnacle/img2.jpg', title: 'Mantri Pinnacle — 2' },
      { href: 'assets/projects/mantri-pinnacle/img3.jpg', title: 'Mantri Pinnacle — 3' },
      { href: 'assets/projects/mantri-pinnacle/img4.jpg', title: 'Mantri Pinnacle — 4' }
    ],
    'manyata-technology-park': [
      { href: 'assets/projects/Manyata-Technology-Park/img1.jpg', title: 'Manyata Technology Park — 1' }
    ],
    'navin-s-tower': [
      { href: 'assets/projects/Navin_s-Tower/img1.jpg', title: "Navin's Tower — 1" }
    ],
    'olympia-technology-park': [
      { href: 'assets/projects/Olympia-Technology-Park/img1.jpg', title: 'Olympia Technology Park — 1' },
      { href: 'assets/projects/Olympia-Technology-Park/img2.jpg', title: 'Olympia Technology Park — 2' }
    ],
    'pranavam-builders': [
      { href: 'assets/projects/pranavam-builders/img1.jpg', title: 'Pranavam Builders — 1' }
    ],
    'presidential-tower': [
      { href: 'assets/projects/Presidential-Tower/img1.jpg', title: 'Presidential Tower — 1' }
    ],
    'prestige-lakeshore-drive': [
      { href: 'assets/projects/Prestige-Lakeshore-Drive/img1.jpg', title: 'Prestige Lakeshore Drive — 1' }
    ],
    'saravana-stores': [
      { href: 'assets/projects/Saravana-Stores/img1.jpg', title: 'Saravana Stores — 1' }
    ],
    'sattva-knowledge-point': [
      { href: 'assets/projects/Sattva-Knowledge-Point/img1.jpg', title: 'Sattva Knowledge Point — 1' },
      { href: 'assets/projects/Sattva-Knowledge-Point/img2.jpg', title: 'Sattva Knowledge Point — 2' }
    ],
    'super-saravana-store': [
      { href: 'assets/projects/Super-Saravana-Store/img1.jpg', title: 'Super Saravana Store — 1' }
    ],
    'tnhb-project': [
      { href: 'assets/projects/TNHB-Project/img1.jpg', title: 'TNHB Project — 1' }
    ],
    'world-trade-center': [
      { href: 'assets/projects/World-Trade-Center/img1.jpg', title: 'World Trade Center — 1' },
      { href: 'assets/projects/World-Trade-Center/img2.jpg', title: 'World Trade Center — 2' },
      { href: 'assets/projects/World-Trade-Center/img3.jpg', title: 'World Trade Center — 3' }
    ]
  };

  function showGalleryToast(message) {
    var existing = document.querySelector('.sv-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'sv-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() { toast.classList.add('sv-toast--visible'); }, 10);
    setTimeout(function() {
      toast.classList.remove('sv-toast--visible');
      setTimeout(function() { toast.remove(); }, 400);
    }, 3000);
  }

  document.querySelectorAll('.gallery-trigger-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key    = btn.getAttribute('data-project');
      var images = projectGalleries[key];

      if (!images || images.length === 0) {
        showGalleryToast('Gallery coming soon for this project.');
        return;
      }

      if (typeof GLightbox === 'undefined') {
        showGalleryToast('Gallery viewer not loaded. Please check your internet connection.');
        return;
      }

      var gallery = GLightbox({
        elements: images.map(function(img) {
          return {
            href: img.href,
            type: 'image',
            title: img.title,
            description: 'SV Enterprises — Project Gallery'
          };
        }),
        touchNavigation: true,
        loop: true,
        closeButton: true,
        keyboardNavigation: true,
        skin: 'clean'
      });

      gallery.open();
    });
  });

  // --- GALLERY FILTER (homepage) ---
  var galBtns  = document.querySelectorAll('.gal-filter-btn');
  var galCards = document.querySelectorAll('#homeGalleryGrid .gallery-card');
  var galEmpty = document.getElementById('homeGalleryEmpty');

  if (galBtns.length) {
    galBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        galBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter  = btn.getAttribute('data-filter');
        var visible = 0;

        galCards.forEach(function(card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
            visible++;
          } else {
            card.style.display = 'none';
          }
        });

        if (galEmpty) galEmpty.style.display = visible === 0 ? 'flex' : 'none';
      });
    });
  }

});