// Minimal data and UI logic for demo
const DATA = {
  hotels: [
    { id:1, name:'Seaside Resort', city:'Goa', price:3500, rating:4.5, img:'https://images.unsplash.com/photo-1501117716987-c8e6f5d2c2b9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1' },
    { id:2, name:'Mountain Retreat', city:'Manali', price:4200, rating:4.7, img:'https://images.unsplash.com/photo-1501117716987-c8e6f5d2c2b9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2' },
    { id:3, name:'Urban Stay', city:'Mumbai', price:2900, rating:4.2, img:'https://images.unsplash.com/photo-1488747279002-c8523379faaa?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3' }
  ],
  cabs: [
    { id:1, type:'local', model:'Toyota Etios', seats:4, price:500, desc:'Per day local taxi' },
    { id:2, type:'outstation', model:'Innova Crysta', seats:6, price:2500, desc:'Outstation per day' },
    { id:3, type:'selfdrive', model:'Swift Dzire', seats:4, price:1800, desc:'Self-drive per day' }
  ],
  guides: [
    { id:1, name:'Aisha Khan', specialty:'Heritage', language:'English, Hindi', price:800 },
    { id:2, name:'Ravi Patel', specialty:'Food', language:'English, Gujarati', price:700 },
    { id:3, name:'Maya Singh', specialty:'Adventure', language:'English, Hindi', price:1200 }
  ],
  promos: [
    { id:1, title:'Summer Sale - Up to 30% off', subtitle:'Selected beach hotels', img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4' },
    { id:2, title:'Weekend Getaway', subtitle:'Cab + Hotel bundles', img:'https://images.unsplash.com/photo-1500674425229-0ad5a3f4e8b3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5' },
    { id:3, title:'Guide Discounts', subtitle:'Book guides and save', img:'https://images.unsplash.com/photo-1549887534-4f64f2a45f1f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6' }
  ]
};

// Utility: create element from html
function createHTML(html) { const tpl = document.createElement('template'); tpl.innerHTML = html.trim(); return tpl.content.firstChild; }

// Navbar mobile toggle
document.addEventListener('click', (e)=>{
  const btn = document.getElementById('mobileToggle');
  if (!btn) return;
  if (e.target === btn) {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
  }
});

// Home: promo preview
function renderPromoPreview(){
  const container = document.getElementById('promoContainer');
  if(!container) return;
  const promo = DATA.promos[0];
  container.innerHTML = `<div class=\"flex items-center gap-4\"><img src=\"${promo.img}\" class=\"w-24 h-16 object-cover rounded\" alt=\"promo\"/><div><div class=\"font-semibold\">${promo.title}</div><div class=\"text-sm text-slate-600\">${promo.subtitle}</div></div></div>`;
}

// Hotels page
function renderHotels(){
  const grid = document.getElementById('hotelsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  DATA.hotels.forEach(h=>{
    const card = createHTML(`
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <img src="${h.img}" alt="${h.name}" class="w-full h-44 object-cover" />
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">${h.name}</h3>
              <div class="text-sm text-slate-600">${h.city}</div>
            </div>
            <div class="text-right">
              <div class="text-lg font-semibold">₹${h.price}</div>
              <div class="text-sm text-yellow-500">★ ${h.rating}</div>
            </div>
          </div>
          <div class="mt-4">
            <button class="book-now bg-blue-600 text-white px-3 py-2 rounded" data-id="${h.id}">Book Now</button>
          </div>
        </div>
      </div>
    `);
    grid.appendChild(card);
  });
}

// Cabs page
function renderCabs(list){
  const container = document.getElementById('cabsList');
  if(!container) return;
  container.innerHTML='';
  list.forEach(c=>{
    const el = createHTML(`
      <div class="bg-white rounded-lg p-4 shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold">${c.model}</h3>
            <div class="text-sm text-slate-600">${c.desc}</div>
            <div class="text-sm text-slate-500">Seats: ${c.seats} • Type: ${c.type}</div>
          </div>
          <div class="text-right">
            <div class="text-lg font-semibold">₹${c.price}</div>
            <button class="mt-3 hire-cab bg-blue-600 text-white px-3 py-2 rounded" data-id="${c.id}">Hire</button>
          </div>
        </div>
      </div>
    `);
    container.appendChild(el);
  });
}

// Guides page
function renderGuides(){
  const container = document.getElementById('guidesList');
  if(!container) return;
  container.innerHTML='';
  DATA.guides.forEach(g=>{
    const el = createHTML(`
      <div class="bg-white rounded-lg p-4 shadow">
        <h3 class="font-semibold">${g.name}</h3>
        <div class="text-sm text-slate-600">${g.specialty} • ${g.language}</div>
        <div class="mt-3 flex justify-between items-center">
          <div class="text-lg font-semibold">₹${g.price}</div>
          <button class="hire-guide bg-blue-600 text-white px-3 py-2 rounded" data-id="${g.id}">Hire</button>
        </div>
      </div>
    `);
    container.appendChild(el);
  });
}

// Promotions carousel
let promoIndex = 0;
function renderPromotions(){
  const el = document.getElementById('promotionsCarousel');
  if(!el) return;
  el.innerHTML = '';
  DATA.promos.forEach((p,i)=>{
    const slide = createHTML(`<div class=\"absolute inset-0 bg-center bg-cover opacity-0 transition-opacity duration-300\" style=\"background-image:url(${p.img})\"></div>
    `);
    if(i===promoIndex) slide.style.opacity = '1';
    el.appendChild(slide);
    const label = createHTML(`<div class=\"absolute bottom-4 left-4 text-white bg-black/40 px-4 py-2 rounded\"><div class=\"font-semibold\">${p.title}</div><div class=\"text-sm\">${p.subtitle}</div></div>`);
    el.appendChild(label);
  });
}
function nextPromo(){ promoIndex = (promoIndex+1)%DATA.promos.length; renderPromotions(); }
function prevPromo(){ promoIndex = (promoIndex-1+DATA.promos.length)%DATA.promos.length; renderPromotions(); }

// Packages wizard
const Wizard = {
  step:1,
  selection: { hotel:null, cab:null, guide:null },
  setStep(n){
    this.step = n;
    document.querySelectorAll('.wizard-step').forEach(s=>{
      s.classList.toggle('hidden', Number(s.dataset.step)!==n);
    });
    // update step indicators
    document.querySelectorAll('.step').forEach((el,idx)=>{
      if(idx+1<=n){ el.classList.add('bg-blue-600'); el.classList.remove('bg-slate-200','text-slate-600'); el.classList.add('text-white'); }
      else { el.classList.remove('bg-blue-600','text-white'); el.classList.add('bg-slate-200'); }
    });
    this.updateTotal();
  },
  updateTotal(){
    const total = (this.selection.hotel?this.selection.hotel.price:0) + (this.selection.cab?this.selection.cab.price:0) + (this.selection.guide?this.selection.guide.price:0);
    const el = document.getElementById('totalPrice'); if(el) el.textContent = '₹'+total;
    const summary = document.getElementById('summary'); if(summary) summary.innerHTML = `<div>Hotel: ${this.selection.hotel?this.selection.hotel.name:'—'}</div><div>Cab: ${this.selection.cab?this.selection.cab.model:'—'}</div><div>Guide: ${this.selection.guide?this.selection.guide.name:'—'}</div>`;
  }
};

// Populate wizard lists
function populateWizard(){
  const wh = document.getElementById('wizardHotels'); if(wh){ wh.innerHTML=''; DATA.hotels.forEach(h=>{ const card = createHTML(`<div class=\"bg-slate-50 p-3 rounded\"><div class=\"font-semibold\">${h.name}</div><div class=\"text-sm text-slate-600\">${h.city} • ₹${h.price}</div><button class=\"select-hotel mt-3 bg-blue-600 text-white px-3 py-1 rounded\" data-id=\"${h.id}\">Select</button></div>`); wh.appendChild(card); }); }
  const wc = document.getElementById('wizardCabs'); if(wc){ wc.innerHTML=''; DATA.cabs.forEach(c=>{ const card = createHTML(`<div class=\"bg-slate-50 p-3 rounded\"><div class=\"font-semibold\">${c.model}</div><div class=\"text-sm text-slate-600\">${c.desc} • ₹${c.price}</div><button class=\"select-cab mt-3 bg-blue-600 text-white px-3 py-1 rounded\" data-id=\"${c.id}\">Select</button></div>`); wc.appendChild(card); }); }
  const wg = document.getElementById('wizardGuides'); if(wg){ wg.innerHTML=''; DATA.guides.forEach(g=>{ const card = createHTML(`<div class=\"bg-slate-50 p-3 rounded\"><div class=\"font-semibold\">${g.name}</div><div class=\"text-sm text-slate-600\">${g.specialty} • ₹${g.price}</div><button class=\"select-guide mt-3 bg-blue-600 text-white px-3 py-1 rounded\" data-id=\"${g.id}\">Select</button></div>`); wg.appendChild(card); }); }
}

// Event delegation
document.addEventListener('click', (e)=>{
  // Hotels book now from listing
  if(e.target.matches('.book-now')){
    const id = Number(e.target.dataset.id);
    alert('Booked hotel id: '+id+' (demo)');
  }
  if(e.target.matches('.hire-cab')){
    const id = Number(e.target.dataset.id); alert('Cab hired: '+id+' (demo)');
  }
  if(e.target.matches('.hire-guide')){
    const id = Number(e.target.dataset.id); alert('Guide hired: '+id+' (demo)');
  }
  // Apply cab filters
  if(e.target.id==='applyCabFilters'){
    const type = document.getElementById('cabType').value;
    const seats = document.getElementById('cabSeats').value;
    const maxPrice = Number(document.getElementById('cabMaxPrice').value || 999999);
    const list = DATA.cabs.filter(c=> (type==='all' || c.type===type) && (seats==='any' || String(c.seats)===seats) && c.price<=maxPrice);
    renderCabs(list);
  }
  // Promotions controls
  if(e.target.id==='nextPromo'){ nextPromo(); }
  if(e.target.id==='prevPromo'){ prevPromo(); }
  // Wizard selection
  if(e.target.matches('.select-hotel')){
    const id = Number(e.target.dataset.id); Wizard.selection.hotel = DATA.hotels.find(h=>h.id===id); Wizard.updateTotal();
  }
  if(e.target.matches('.select-cab')){
    const id = Number(e.target.dataset.id); Wizard.selection.cab = DATA.cabs.find(c=>c.id===id); Wizard.updateTotal();
  }
  if(e.target.matches('.select-guide')){
    const id = Number(e.target.dataset.id); Wizard.selection.guide = DATA.guides.find(g=>g.id===id); Wizard.updateTotal();
  }
  // Wizard navigation
  if(e.target.id==='nextStep'){
    if(Wizard.step<4) Wizard.setStep(Wizard.step+1);
    else { alert('Booking confirmed! Total: '+document.getElementById('totalPrice').textContent); }
  }
  if(e.target.id==='prevStep'){
    if(Wizard.step>1) Wizard.setStep(Wizard.step-1);
  }
});

// Setup on load
window.addEventListener('DOMContentLoaded', ()=>{
  renderPromoPreview();
  renderHotels();
  renderCabs(DATA.cabs);
  renderGuides();
  renderPromotions();
  populateWizard();
  Wizard.setStep(1);

  // Promo auto-rotate
  setInterval(()=>{ nextPromo(); }, 6000);
});
