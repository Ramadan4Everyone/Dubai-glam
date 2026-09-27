const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const menu=$('.menu'),navlinks=$('#navlinks');menu?.addEventListener('click',()=>{navlinks.classList.toggle('open');menu.innerHTML=navlinks.classList.contains('open')?'<i class="ri-close-line"></i>':'<i class="ri-menu-3-line"></i>'});$$('.navlinks a').forEach(a=>a.addEventListener('click',()=>navlinks.classList.remove('open')));
const portfolio=[
['wilian-de-oliveira-ZGVlmiM3jkc-unsplash.jpg','BRIDAL ARTISTRY','The modern bride.','A luminous, timeless look that celebrates natural features with refined skin and softly sculpted detail.',['Soft Glam','Glowing Skin','Luxury Bridal']],
['romoni-services-ooERmS3RIHY-unsplash.jpg','SOFT GLAM','Golden hour.','Warm tones and radiant skin come together for a polished look that still feels effortless.',['Warm Tones','Radiant','Soft Glam']],
['aarom-ore-koUJFCAa9B4-unsplash.jpg','EVENT BEAUTY','Midnight elegance.','A sophisticated statement with seamless blending and confident definition for your special night.',['Event Glam','Elegant','Long Wear']],
['alireza-skndari-w9GupV7aB1E-unsplash.jpg','EDITORIAL','Beauty in motion.','Creative artistry designed for campaigns, shoots and unforgettable visual moments.',['Editorial','Creative','Fashion']],
['shamblen-studios-xwM61TPMlYk-unsplash (1).jpg','SIGNATURE LOOK','The radiant muse.','Modern beauty focused on luminous skin and intentional details that photograph beautifully.',['Glow','Modern','Luxury']]
];let current=0;const img=$('#showcaseImg'),cat=$('#showcaseCat'),title=$('#showcaseTitle'),text=$('#showcaseText'),tags=$('#showcaseTags'),count=$('#slideCount'),thumbs=$('#thumbs');
function renderThumbs(){thumbs.innerHTML=portfolio.map((p,i)=>`<button class="${i===current?'active':''}" data-i="${i}"><img src="${p[0]}" alt="${p[2]}"></button>`).join('');$$('#thumbs button').forEach(b=>b.onclick=()=>setSlide(+b.dataset.i))}
function setSlide(i){current=(i+portfolio.length)%portfolio.length;const p=portfolio[current];img.style.opacity=0;setTimeout(()=>{img.src=p[0];cat.textContent=p[1];title.textContent=p[2];text.textContent=p[3];tags.innerHTML=p[4].map(t=>`<span>${t}</span>`).join('');count.textContent=`${String(current+1).padStart(2,'0')} / ${String(portfolio.length).padStart(2,'0')}`;img.style.opacity=1;renderThumbs()},180)}renderThumbs();$('#nextSlide').onclick=()=>setSlide(current+1);$('#prevSlide').onclick=()=>setSlide(current-1);
$$('.acc button').forEach(btn=>btn.onclick=()=>{const parent=btn.parentElement;$$('.acc').forEach(a=>a!==parent&&a.classList.remove('active'));parent.classList.toggle('active')});
const track=$('#reviewTrack'),dots=$('#reviewDots'),reviews=$$('#reviewTrack article');let review=0;reviews.forEach((_,i)=>{const b=document.createElement('button');if(!i)b.classList.add('active');b.onclick=()=>showReview(i);dots.appendChild(b)});function showReview(i){review=(i+reviews.length)%reviews.length;track.style.transform=`translateX(-${review*100}%)`;$$('#reviewDots button').forEach((b,n)=>b.classList.toggle('active',n===review))}let reviewTimer=setInterval(()=>showReview(review+1),5000);$('.review-slider').addEventListener('mouseenter',()=>clearInterval(reviewTimer));$('.review-slider').addEventListener('mouseleave',()=>reviewTimer=setInterval(()=>showReview(review+1),5000));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');observer.unobserve(e.target)}}),{threshold:0.08,rootMargin:'0px 0px 180px 0px'});$$('.reveal').forEach(e=>observer.observe(e));
$('#bookingForm').addEventListener('submit',e=>{e.preventDefault();$('#formMessage').textContent='Thank you! Your appointment request has been received. We’ll get back to you shortly.';e.target.reset()});

// Faster, controlled smooth scrolling (works consistently across devices)
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(!target)return;e.preventDefault();const start=window.scrollY,end=target.getBoundingClientRect().top+window.scrollY-78,duration=Math.min(700,Math.max(350,Math.abs(end-start)*.32));const t0=performance.now();const ease=t=>1-Math.pow(1-t,4);function step(now){const t=Math.min(1,(now-t0)/duration);window.scrollTo(0,start+(end-start)*ease(t));if(t<1)requestAnimationFrame(step)}requestAnimationFrame(step)}));
// Product interactions
const pills=$$('.shop-pill'),products=$$('.product-card');pills.forEach(p=>p.onclick=()=>{pills.forEach(x=>x.classList.remove('active'));p.classList.add('active');products.forEach(card=>card.classList.toggle('hidden',p.dataset.category!=='all'&&card.dataset.category!==p.dataset.category))});$$('.product-heart').forEach(b=>b.onclick=()=>{b.classList.toggle('saved');b.innerHTML=b.classList.contains('saved')?'<i class="ri-heart-3-fill"></i>':'<i class="ri-heart-3-line"></i>'});$$('.add-cart').forEach(b=>b.onclick=()=>{const old=b.innerHTML;b.innerHTML='<i class="ri-check-line"></i>';b.style.background='var(--rose)';b.style.color='#fff';setTimeout(()=>{b.innerHTML=old;b.style.background='';b.style.color=''},1200)});

/* WhatsApp direct-chat setup */
const WHATSAPP_NUMBER = '234XXXXXXXXXX'; // Replace with the business WhatsApp number, e.g. 2348012345678
const WHATSAPP_MESSAGE = encodeURIComponent("Hello Ramé Beauty Studio Dubai, I'd like to enquire about an appointment.");

document.querySelectorAll('[data-whatsapp-action="open"]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (WHATSAPP_NUMBER.includes('X')) {
      alert('Please add the Dubai business WhatsApp number in script.js.');
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank', 'noopener,noreferrer');
  });
});
