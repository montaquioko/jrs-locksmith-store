let cartItems=[];
for(let y=new Date().getFullYear()+1;y>=1995;y--)document.querySelector('#year').insertAdjacentHTML('beforeend',`<option>${y}</option>`);
function render(list=PRODUCTS){
 productGrid.innerHTML=list.map(p=>`<article class="product"><div class="photo"><img src="images/${p.id}.svg" alt="${p.title}"></div><div class="body"><span class="sku">${p.sku}</span><h3>${p.title}</h3><p>${p.years} • ${p.freq}</p><div class="spec">${p.chip} • ${p.blade}<br>${p.fcc}</div><div class="price">$${p.price.toFixed(2)}</div><button onclick="add('${p.id}')">ADD TO CART</button><span class="details">Fitment verified before fulfillment →</span></div></article>`).join('')
}
function add(id){const p=PRODUCTS.find(x=>x.id===id);cartItems.push(p);renderCart();cart.classList.add('open')}
function toggleCart(){cart.classList.toggle('open')}
function renderCart(){count.textContent=cartItems.length;items.innerHTML=cartItems.length?cartItems.map((x,i)=>`<div class="line"><span>${x.title}<br><small>${x.sku}</small><br><b>$${x.price.toFixed(2)}</b></span><button onclick="cartItems.splice(${i},1);renderCart()">×</button></div>`).join(''):'<p>Your cart is empty.</p>';total.textContent=cartItems.reduce((a,x)=>a+x.price,0).toFixed(2)}
function norm(s){return String(s||'').toLowerCase()}
function findKey(e){e.preventDefault();const y=+year.value,m=norm(make.value),mo=norm(model.value);let hits=PRODUCTS.filter(p=>y>=p.year_min&&y<=p.year_max&&norm(p.brand).includes(m)&&p.models.some(x=>norm(x).includes(mo)||mo.includes(norm(x))));render(hits.length?hits:PRODUCTS);found.innerHTML=hits.length?`<b>${hits.length} possible match${hits.length>1?'es':''} found.</b> Verify FCC ID before ordering.`:`No exact database match yet. Showing the full catalog — contact JR's for verification.`;shop.scrollIntoView()}
function filterBrand(q){const hits=q?PRODUCTS.filter(p=>norm(p.brand).includes(norm(q))):PRODUCTS;render(hits);setTimeout(()=>shop.scrollIntoView(),10)}
function globalSearch(){const q=norm(globalSearch.value);if(!q){render();return}const hits=PRODUCTS.filter(p=>[p.brand,p.title,p.sku,p.fcc,p.years,...p.models].some(v=>norm(v).includes(q)));render(hits.length?hits:PRODUCTS);shop.scrollIntoView()}
function checkout(){if(!cartItems.length)return;orderNotes.value=cartItems.map(x=>`${x.sku} - ${x.title}`).join('\n');toggleCart();order.scrollIntoView()}
function requestOrder(e){e.preventDefault();sent.textContent='Order flow is ready. Live payment/form processing still needs to be connected before accepting paid orders.'}
render();renderCart();