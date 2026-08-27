let cartItems=[];
for(let y=new Date().getFullYear()+1;y>=1995;y--)document.querySelector('#year').insertAdjacentHTML('beforeend',`<option>${y}</option>`);
function keyGraphic(buttonCount){let btns='';for(let i=0;i<Number(buttonCount);i++)btns+='<i></i>';return `<div class="keypic"><div class="keybody">${btns}</div><div class="blade"></div></div>`}
function renderProducts(list=PRODUCTS){
 const grid=document.getElementById('productGrid');
 grid.innerHTML=list.map(p=>`<article data-id="${p.id}">${keyGraphic(p.shape)}<label>${p.sku}</label><h3>${p.title}</h3><p>${p.years} • ${p.buttons}</p><div class="specs"><span><b>FCC</b><br>${p.fcc}</span><span><b>FREQ</b><br>${p.freq}</span><span><b>CHIP</b><br>${p.chip}</span><span><b>BLADE</b><br>${p.blade}</span></div><strong class="price">$${p.price.toFixed(2)}</strong><button onclick="addToCart('${p.id}')">ADD TO CART</button></article>`).join('')
}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);cartItems.push(p);renderCart();document.querySelector('#cart').classList.add('open')}
function toggleCart(){document.querySelector('#cart').classList.toggle('open')}
function renderCart(){
 document.querySelector('#count').textContent=cartItems.length;
 document.querySelector('#items').innerHTML=cartItems.length?cartItems.map((x,i)=>`<div class="line"><span>${x.title}<br><small>${x.sku}</small><br><b>$${x.price.toFixed(2)}</b></span><button onclick="cartItems.splice(${i},1);renderCart()">×</button></div>`).join(''):'<p>Your cart is empty.</p>';
 document.querySelector('#total').textContent=cartItems.reduce((a,x)=>a+x.price,0).toFixed(2)
}
function findKey(e){
 e.preventDefault();
 const y=parseInt(document.querySelector('#year').value), make=document.querySelector('#make').value.toLowerCase(), model=document.querySelector('#model').value.trim().toLowerCase();
 let hits=PRODUCTS.filter(p=>y>=p.year_min&&y<=p.year_max&&p.models.some(m=>m.toLowerCase().includes(model)||model.includes(m.toLowerCase())));
 renderProducts(hits.length?hits:PRODUCTS);
 document.querySelector('#found').innerHTML=hits.length?`<p><b>${hits.length} possible match${hits.length>1?'es':''} found.</b> Compare your FCC ID and original key before ordering.</p>`:`<p><b>No exact database match yet.</b> Showing the Ford starter catalog. Contact JR's with the VIN last 8 / FCC ID for verification.</p>`;
 document.querySelector('#shop').scrollIntoView()
}
function checkout(){
 if(!cartItems.length)return;
 const summary=cartItems.map(x=>`${x.sku} - ${x.title}`).join('\n');
 document.querySelector('#orderNotes').value=summary;
 toggleCart();document.querySelector('#order').scrollIntoView()
}
function requestOrder(e){e.preventDefault();document.querySelector('#sent').textContent='Order flow is built. Connect the payment/form backend before accepting paid orders.'}
renderProducts();renderCart();