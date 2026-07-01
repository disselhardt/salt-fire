// =================================================================
// ONLINE ORDERING LINK — paste your Toast Online Ordering URL here.
// This is the ONLY place you set it. Every "Order Online" / "Order Now"
// / "Start Your Order" button across the whole site will then point
// straight to it (one tap — no in-between page).
// Example: var ORDER_URL = "https://www.toasttab.com/salt-and-fire/order";
// =================================================================
var ORDER_URL = "";

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    var setExpanded = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () {
      setExpanded(links.classList.toggle('is-open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('is-open'); setExpanded(false); });
    });
    // Close the mobile menu on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        links.classList.remove('is-open'); setExpanded(false); toggle.focus();
      }
    });
  }

  // Graceful photo fallback: if a food photo file is missing, show the logo instead
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.dataset.fell) return;
      img.dataset.fell = '1';
      img.src = img.getAttribute('data-fallback');
      img.classList.add('is-fallback');
    });
  });

  // Highlight active nav link based on current page
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === path) a.classList.add('is-active');
  });

  // ---------------------------------------------------------------
  // TODAY'S SPECIAL  — edit the week here.
  // One entry per weekday. To hide the board on a given day, leave
  // the name blank ("") or delete that day's line.
  // ---------------------------------------------------------------
  var SPECIALS = {
    sunday:    { name: "Smoked Prime Rib Dip",   desc: "House-smoked prime rib, melted provolone, horseradish cream, au jus on a griddled roll.", price: "$19" },
    monday:    { name: "",                        desc: "",                                                                                          price: "" },
    tuesday:   { name: "Brisket Taco Tuesday",   desc: "Three chopped-brisket tacos, pickled onion, cilantro-lime slaw, chipotle crema.",            price: "$15" },
    wednesday: { name: "",                        desc: "",                                                                                          price: "" },
    thursday:  { name: "Burnt End Mac",          desc: "Creamy smoked-gouda mac topped with candied brisket burnt ends and crispy onions.",          price: "$16" },
    friday:    { name: "Fish Fry Friday",        desc: "Beer-battered cod, tartar, house slaw, hand-cut fries, lemon.",                              price: "$17" },
    saturday:  { name: "Pitmaster's Plate",      desc: "A little of everything off the smoker — ask about today's cuts. While it lasts.",            price: "MKT" }
  };

  var board = document.getElementById('todays-special');
  if (board) {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var today = SPECIALS[days[new Date().getDay()]];
    if (today && today.name) {
      var dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      var set = function (key, val) {
        var el = board.querySelector('[data-special="' + key + '"]');
        if (el) el.textContent = val;
      };
      set('day', dayName);
      set('name', today.name);
      set('desc', today.desc);
      set('price', today.price);
      board.classList.add('is-ready');
      board.hidden = false;
    }
  }

  // ---------------------------------------------------------------
  // EVENTS CALENDAR  — activate the Google Calendar embed only once a
  // real calendar ID has been filled in (events.html). Until then the
  // "not connected" placeholder stays visible.
  // ---------------------------------------------------------------
  document.querySelectorAll('.cal-embed').forEach(function (wrap) {
    var frame = wrap.querySelector('iframe[data-embed-src]');
    if (!frame) return;
    var src = frame.getAttribute('data-embed-src') || '';
    if (src && src.indexOf('YOUR_CALENDAR_ID') === -1) {
      frame.src = src;
      wrap.classList.add('is-connected');
    }
  });

  // ---------------------------------------------------------------
  // ORDER ONLINE — send every order button straight to ORDER_URL
  // (set at the top of this file). One tap, no in-between page.
  // Until ORDER_URL is set, buttons fall back to the menu order section.
  // ---------------------------------------------------------------
  if (ORDER_URL) {
    var orderBtns = document.querySelectorAll(
      'a[data-toast="online-ordering"], a[href="menu.html#order"], a[href="#order"]'
    );
    orderBtns.forEach(function (a) {
      a.href = ORDER_URL;
      a.target = '_blank';
      a.rel = 'noopener';
      a.removeAttribute('data-toast');
      var note = a.nextElementSibling;
      if (note && note.classList.contains('placeholder-note')) note.style.display = 'none';
    });
  }
});
