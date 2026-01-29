// ====== ข้อมูลสินค้า (3 หมวด, หมวดละ 5 ชิ้น) ======
const PRODUCTS = [
  // หมวด 1: หูฟัง
  {
    id:"H001", category:"Headphones", name:"HyperX Cloud 3",
    price:2590, model:"Cloud 3", brand:"HyperX", stock:18,
    warranty:"2 ปี", color:"ดำ", desc:"หูฟังเกมมิ่ง", image:"assets/img/H001.jpg"
  },
  {
    id:"H002", category:"Headphones", name:"Razer Kraken Pro v2 ",
    price:2590, model:"Kraken", brand:"Razer", stock:25,
    warranty:"1 ปี", color:"ดำ/เขียว/เทา", desc:"หูฟังเกมมิ่ง", image:"assets/img/H002.jpg"
  },
  {
    id:"H003", category:"Headphones", name:"Logitech G PRO X 2 LIGHTSPEED",
    price:7790, model:"G PRO X 2 LIGHTSPEED", brand:"Logitech", stock:9,
    warranty:"1 ปี", color:"ดำ", desc:"หูฟังเกมมิ่ง", image:"assets/img/H003.jpg"
  },
  {
    id:"H004", category:"Headphones", name:"BGVP Solomon",
    price:50000, model:"Solomon", brand:"BGVP", stock:14,
    warranty:"2 ปี", color:"น้ำเงิน Exclusive", desc:"หูฟัง IEMs เรือธง 9 ไดรเวอร์ 2DD+3BA+2EST+2BC ระดับไฮเอนด์จาก Sonion [แบบสลักชื่อบ่นตัวกล่อง]", image:"assets/img/H004.jpg"
  },
  {
    id:"H005", category:"Headphones", name:"BGVP Wukong",
    price:154990, model:"Wukong", brand:"BGVP", stock:3,
    warranty:"2 ปี", color:"Wukong Exclusive", desc:"IEMs 15 ไดรเวอร์ 7BA+4EST+2BCD+2 Micro Planar BA ระดับเรือธง", image:"assets/img/H005.jpg"
  },

  // หมวด 2: คีย์บอร์ด
  {
    id:"K001", category:"Keyboards", name:"ASUS ROG Azoth Extreme",
    price:15900, model:"ROG Azoth Extreme", brand:"ASUS", stock:12,
    warranty:"1 ปี", color:"ดำ", desc:"Asus ROG NX Snow Switch (Linear)", image:"assets/img/K001.jpg"
  },
  {
    id:"K002", category:"Keyboards", name:"ASUS ROG Falcata",
    price:14900, model:"ROG", brand:"ASUS", stock:10,
    warranty:"1 ปี", color:"ดำ", desc:"ROG HFX V2 Magnetic Switch (Linear)", image:"assets/img/K002.jpg"
  },
  {
    id:"K003", category:"Keyboards", name:"SteelSeries Apex Pro Gen 3",
    price:9119, model:"Apex Pro Gen 3", brand:"SteelSeries", stock:30,
    warranty:"6 เดือน", color:"ดำ", desc:"OmniPoint 3.0 Switch (Linear)", image:"assets/img/K003.jpg"
  },
  {
    id:"K004", category:"Keyboards", name:"Razer Huntsman V3 Pro",
    price:7490, model:"Huntsman V3 Pro", brand:"Razer", stock:8,
    warranty:"1 ปี", color:"ดำ", desc:"Razer Analog Optical Switches Gen-2", image:"assets/img/K004.jpg"
  },
  {
    id:"K005", category:"Keyboards", name:"Corsair K100 AIR / K70 PRO TKL",
    price:9490, model:"K100 AIR / K70 PRO TKL", brand:"Corsair", stock:16,
    warranty:"1 ปี", color:"ดำ", desc:"Mechanical Tenkeyless (TKL)", image:"assets/img/K005.jpg"
  },

  // หมวด 3: เมาส์
  {
    id:"M001", category:"Mouse", name:"Finalmouse UltralightX Sakura (Limited Edition)",
    price:6990, model:"UltralightX", brand:"Finalmouse", stock:40,
    warranty:"1 ปี", color:"Sakura (Limited Edition)", desc:"Huano Blue Shell Transparent Pink Dot (80M)", image:"assets/img/M001.jpg"
  },
  {
    id:"M002", category:"Mouse", name:"Finalmouse UltralightX Prophecy (Limited Edition)",
    price:6990, model:"UltralightX", brand:"Finalmouse", stock:22,
    warranty:"1 ปี", color:"แดง", desc:"Huano Blue Shell Transparent Red Dot (80M)", image:"assets/img/M002.jpg"
  },
  {
    id:"M003", category:"Mouse", name:"Glorious Model O/D 2 PRO Series (4K/8KHz)",
    price:5490, model:"Model O/D 2 PRO Series", brand:"GGlorious", stock:11,
    warranty:"1 ปี", color:"ขาว", desc:"Glorious Optical Switches", image:"assets/img/M003.jpg"
  },
  {
    id:"M004", category:"Mouse", name:"ASUS ROG Harpe Ace Aim Lab Edition",
    price:4290, model:"Harpe Ace Aim Lab Edition", brand:"ASUS", stock:15,
    warranty:"1 ปี", color:"ดำ", desc:"wireless gaming mouse with a pro-tested form factor, 36,000-dpi " , image:"assets/img/M004.jpg"
  },
  {
    id:"M005", category:"Mouse", name:"Logitech G PRO X Superlight 2",
    price:4490, model:"G PRO X Superlight 2", brand:"Logitech", stock:35,
    warranty:"6 เดือน", color:"ดำ", desc:"This lightweight mouse (around 60g) features the HERO 2 optical sensor (up to 44,000 DPI) and is popular among professional gamers.", image:"assets/img/M005.jpg"
  },
];

// ====== Utilities ======
const fmt = (n)=> new Intl.NumberFormat("th-TH").format(n);
const byId = (id)=> document.getElementById(id);

function loadCart(){
  try{ return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch{ return []; }
}
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}
function cartCount(){
  return loadCart().reduce((sum,it)=> sum + it.qty, 0);
}
function updateCartBadge(){
  const el = document.querySelector("[data-cart-count]");
  if(el) el.textContent = cartCount();
}

function addToCart(productId, qty=1){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return alert("ไม่พบสินค้า");

  const cart = loadCart();
  const found = cart.find(x=>x.id===productId);
  if(found){
    found.qty += qty;
  }else{
    cart.push({id: productId, qty});
  }
  saveCart(cart);
  alert("เพิ่มลงตะกร้าแล้ว ✅");
}

function removeFromCart(productId){
  const cart = loadCart().filter(x=>x.id!==productId);
  saveCart(cart);
}

function changeQty(productId, qty){
  qty = Number(qty);
  const cart = loadCart();
  const found = cart.find(x=>x.id===productId);
  if(!found) return;
  if(qty<=0){
    removeFromCart(productId);
  }else{
    found.qty = qty;
    saveCart(cart);
  }
}

// ====== Render: Product List (products.html / gallery.html) ======
function renderProducts(targetId, category="ALL"){
  const target = byId(targetId);
  if(!target) return;

  const list = (category==="ALL")
    ? PRODUCTS
    : PRODUCTS.filter(p=>p.category===category);

  target.innerHTML = list.map(p=>`
    <div class="card product">
      <div class="thumb">
  <img src="${p.image}" alt="${p.name}">
</div>
      <div class="tag">${p.category}</div>
      <h3 style="margin:10px 0 4px">${p.name}</h3>
      <div class="muted">${p.desc}</div>
      <div class="price">฿${fmt(p.price)}</div>

      <!-- รายละเอียดสินค้าอย่างน้อย 5 รายการ -->
      <div class="kv">
        <div><span>รุ่น</span><b>${p.model}</b></div>
        <div><span>แบรนด์</span><b>${p.brand}</b></div>
        <div><span>สี</span><b>${p.color}</b></div>
        <div><span>รับประกัน</span><b>${p.warranty}</b></div>
        <div><span>สต็อก</span><b>${p.stock}</b></div>
      </div>

      <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
        <button class="btn primary" onclick="addToCart('${p.id}',1)">เพิ่มลงตะกร้า</button>
        <a class="btn" href="cart.html">ไปตะกร้า</a>
      </div>
    </div>
  `).join("");
}

// ====== Render: Cart (cart.html) ======
function renderCart(tableId, summaryId){
  const table = byId(tableId);
  const summary = byId(summaryId);
  if(!table || !summary) return;

  const cart = loadCart();
  if(cart.length===0){
    table.innerHTML = `<div class="notice">ตะกร้ายังว่างอยู่ — ไปเลือกสินค้าที่หน้า <a href="products.html" style="text-decoration:underline">Products</a></div>`;
    summary.innerHTML = "";
    return;
  }

  let subtotal = 0;

  const rows = cart.map(item=>{
    const p = PRODUCTS.find(x=>x.id===item.id);
    const line = p.price * item.qty;
    subtotal += line;

    return `
      <tr>
        <td>${p.id}</td>
        <td>
          <b>${p.name}</b><div class="muted">${p.category} • รุ่น ${p.model}</div>
        </td>
        <td>฿${fmt(p.price)}</td>
        <td style="width:140px">
          <input class="input" type="number" min="0" value="${item.qty}"
            onchange="changeQty('${p.id}', this.value); renderCart('cartTable','cartSummary');">
        </td>
        <td><b>฿${fmt(line)}</b></td>
        <td style="width:120px">
          <button class="btn danger small" onclick="removeFromCart('${p.id}'); renderCart('cartTable','cartSummary');">ลบ</button>
        </td>
      </tr>
    `;
  }).join("");

  table.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>รหัส</th><th>สินค้า</th><th>ราคา</th><th>จำนวน</th><th>รวม</th><th>จัดการ</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  const shipping = subtotal >= 2000 ? 0 : 60;
  const total = subtotal + shipping;

  summary.innerHTML = `
    <div class="card">
      <div class="bd">
        <h3 style="margin:0 0 8px">สรุปยอด</h3>
        <div class="kv">
          <div><span>ยอดสินค้า</span><b>฿${fmt(subtotal)}</b></div>
          <div><span>ค่าส่ง</span><b>${shipping===0 ? "ฟรี" : "฿"+fmt(shipping)}</b></div>
          <div><span>รวมทั้งหมด</span><b>฿${fmt(total)}</b></div>
        </div>
        <hr class="sep">
        <a class="btn primary" style="width:100%" href="checkout.html">ไปชำระเงิน</a>
        <button class="btn" style="width:100%;margin-top:10px" onclick="localStorage.removeItem('cart'); renderCart('cartTable','cartSummary'); updateCartBadge();">
          ล้างตะกร้า
        </button>
      </div>
    </div>
  `;
}

// ====== Page Init ======
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartBadge();

  // products.html
  if(byId("productList")){
    const sel = byId("categoryFilter");
    const apply = ()=> renderProducts("productList", sel.value);
    sel.addEventListener("change", apply);
    apply();
  }

  // gallery.html
  if(byId("galleryList")){
    renderProducts("galleryList", "ALL");
  }

  // cart.html
  if(byId("cartTable") && byId("cartSummary")){
    renderCart("cartTable", "cartSummary");
  }

  // checkout.html - fake submit
  const checkoutForm = byId("checkoutForm");
  if(checkoutForm){
    checkoutForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      alert("สั่งซื้อสำเร็จ! ✅");
      localStorage.removeItem("cart");
      updateCartBadge();
      location.href="index.html";
    });
  }

  // register.html - fake submit
  const regForm = byId("registerForm");
  if(regForm){
    regForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      alert("สมัครสมาชิกสำเร็จ ✅");
      regForm.reset();
    });
  }

  // contact.html - fake submit
  const contactForm = byId("contactForm");
  if(contactForm){
    contactForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      alert("ส่งข้อความแล้ว ✅");
      contactForm.reset();
    });
  }
});
