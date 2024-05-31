//Inisiasi Variabel
let theta;                  // sudut awal
let s = 0;
let pTali    = 70;         // panjang tali
let thetaVel = 0;           // kecepatan sudut awal
let thetaAcc = 0;           // percepatan sudut awal
let ballSize = 15;          // Ukuran bola
let gravity  = 0;           // gravitasi
let damping  = 0;           // redaman awal

//Gambar
let sudut;
let itera;
let mtk;
let BG;
let venus;
let bumi;
let merkurius;
let mars;
let jupiter;
let saturnus;
let uranus;
let neptunus;
let bulan;

function preload(){
  sudut = loadImage("sudut.png")
  itera = loadImage("ITERA.png")
  mtk = loadImage("mtk.png")
  BG = loadImage("BG.jpg")
  venus = loadImage("venus.png")
  bumi = loadImage("bumi.png")
  merkurius = loadImage("merkurius.png")
  mars = loadImage("mars.png")
  jupiter = loadImage("jupiter.png")
  saturnus = loadImage("saturnus.png")
  uranus = loadImage("uranus.png")
  neptunus = loadImage("neptunus.png")
  bulan = loadImage("bulan.png")
}

function resetNilai() {
  pTali    = 70; 
  gravity  = 0;
  ballSize = 15;
  theta    = 0;
  damping  = 0;
  s = 0;
}

//Tambah dan Kurangi Panjang Tali
function Ttali(){
  pTali += 10
}

function Ktali(){
  pTali -= 10
  
  if (pTali < 10) {
    pTali = 10;
 }
}

//Tambah dan Kurangi Besar Pendulum
function Tbola(){
  ballSize += 5
}

function Kbola(){
  ballSize -= 5
  
  if (ballSize < 0) {
    ballSize = 0;
 }
}

//Tambah dan Kurangi Gravitasi
function Tgravitasi(){
  gravity += 0.1
}

function Kgravitasi(){
  gravity -= 0.1
  
  if (gravity < 0) {
    gravity = 0;
 } 
}

//Tambah dan Kurangi Redaman
function Tdamping(){
  damping += 0.01
}

function Kdamping(){
  damping -= 0.01
  
  if (damping < 0) {
    damping = 0;
 }
}


function setup() {
  createCanvas( 1200, 550);

  //menambahkan besar sudut awal
  s = createInput(0)
  s.position(22, 120)
  s.changed(sudut)
  sudut();
  
  //tombol Reset
  let tombolReset = createButton("Reset Angka");
  tombolReset.position(1085, 120);
  tombolReset.mousePressed(resetNilai)
  
  //tomboh tambah panjang
  let tTali = createButton("+")
  tTali.position (260,120)
  tTali.mousePressed(Ttali)
  
  //Tombol Kurangi Panjang
  let kTali = createButton("-")
  kTali.position (230,120)
  kTali.mousePressed(Ktali)
  
  //tomboh tambah besar bola
  let tBola = createButton("+")
  tBola.position (460,120)
  tBola.mousePressed(Tbola)
  
  //Tombol Kurangi Besar Bola
  let kBola = createButton("-")
  kBola.position (430,120)
  kBola.mousePressed(Kbola)
  
  //Tombol tambah Gravitasi
  let tGravitasi = createButton("+")
  tGravitasi.position (650,120)
  tGravitasi.mousePressed(Tgravitasi)
  
  //Tombol Kurangi Gravitasi
  let kGravitasi = createButton("-")
  kGravitasi.position (620,120)
  kGravitasi.mousePressed(Kgravitasi)
  
  //Tombol tambah Redaman
  let tDamping = createButton("+")
  tDamping.position (860,120)
  tDamping.mousePressed(Tdamping)
  
  //Tombol Kurangi Redaman
  let kDamping = createButton("-")
  kDamping.position (830,120)
  kDamping.mousePressed(Kdamping)

  //Tombol Planet
  
  let tombolBumi = createButton("Bumi");
  tombolBumi.position(80, 330);
  tombolBumi.mousePressed(() => updateGravity(9.8))

  let tombolVenus = createButton("Venus");
  tombolVenus.position(80, 270);
  tombolVenus.mousePressed(() => updateGravity(8.87))

  let tombolMerkurius = createButton("Merkurius");
  tombolMerkurius.position(80, 210);
  tombolMerkurius.mousePressed(() => updateGravity(3.7))

  let tombolMars = createButton("Mars");
  tombolMars.position(80, 390);
  tombolMars.mousePressed(() => updateGravity(3.71))

  let tombolJupiter = createButton("Jupiter");
  tombolJupiter.position(80, 450);
  tombolJupiter.mousePressed(() => updateGravity(24.79))

  let tombolSaturnus = createButton("Saturnus");
  tombolSaturnus.position(680, 210);
  tombolSaturnus.mousePressed(() => updateGravity(10.44))

  let tombolUranus = createButton("Uranus");
  tombolUranus.position(690, 270);
  tombolUranus.mousePressed(() => updateGravity(8.87))

  let tombolNeptunus = createButton("Neptunus");
  tombolNeptunus.position(680, 330);
  tombolNeptunus.mousePressed(() => updateGravity(11.15))

  let tombolBulan = createButton("Moon");
  tombolBulan.position(700, 388);
  tombolBulan.mousePressed(() => updateGravity(1.62))

  let tombolList = [tombolMerkurius, tombolBumi, tombolVenus, 
  tombolMars, tombolJupiter, tombolSaturnus, tombolUranus, tombolNeptunus, tombolBulan];

  setButtonProperties(tombolList, '#4682b4', 'Comic Sans MS', '11px');

  function setButtonProperties(buttons, textColor, fontFamily, fontSize){
    buttons.forEach(button => {
      button.style('color', textColor)
      button.style('font-family', fontFamily)
      button.style('font-size', fontSize)
    })
  }

function sudut(){
  theta = radians(s.value())
 } 
}

function updateGravity(newGravity){
  gravity = newGravity;
}

function draw() {
  background(BG)
  
  //Header
  fill("white")
  textSize(25)
  textFont('Comic Sans MS');
  text("S I M U L A S I  G E R A K  P E N D U L U M"                 ,340,42)
  textSize(13)
  text("Mata Kuliah Visualisasi Dalam Sains"                ,500,65)
  
  image(mtk,870,15,50,50)
  image(itera,280,15,50,50)
  
  //Content
  fill("white")
  textSize(13)
  textFont('Helvetica')
  text("Pendulum merupakan contoh sistem fisik yang",870,200)
  text("menggambarkan gerakan periodik. Gerakan"    ,870,220)
  text("pendulum dipengaruhi oleh gaya gravitasi"   ,870,240)
  text("yang bekerja pada massa pendulum, serta"    ,870,260)
  text("panjang dan sudut awalnya"                  ,870,280)
  
  text("Persamaan Pendulum Sederhana :",870,320)
  text("ω(t) = ω(t-∆t) + ((-g)/L(sin⁡(θ(t-∆t)))) * ∆t",870,340)
  text("θ(t)  = θ(t-∆t) + ω(t) * ∆t",870,365)
  
  text("Persamaan Pendulum Dengan Faktor Redaman :",870,410)
  text("ω(t) = ω(t-∆t) + ((-g)/L(sin⁡(θ(t-∆t)) - (Q.ω(t-∆t)))) * ∆t",870,430)
  text("θ(t)  = θ(t-∆t) + ω(t) * ∆t",870,455)
  
  
  //Fotter
  fill("white")
  textSize(13)
  textFont('Comic Sans MS')
  text("INFORMASI KELOMPOK 1 :",22,510)
  text("1. Dinda Salsabila (122160001)"    ,230,510)
  text("2. Rizky Ahmad Rifai (122160002)"  ,230,535)
  text("3. Indah Lusiana (122160007)"   ,520,510)
  text("4. Anisa Fitri (122160011)"  ,520,535)
  text("5. Rida Fitriani (122160013)"      ,790,510)
  text("6. Ratu Ajeng Fadila Husen (122160029)"         ,790,535)
  
  
  //Navigation Control
  fill("white")
  textSize(15)
  text("Masukkan Sudut Awal :"     ,22,110)
  
  
  //Menampilkan nilai variabel
  fill("white")
  text("Panjang Tali : "+pTali           ,230,110)
  text("Besar Bola : "+ballSize          ,430,110)
  text("Gaya Gravitasi : "+gravity.toFixed(2)       ,620,110)
  text("Besar Redaman : "+damping.toFixed(2)        ,830,110)
  // text("Kecepatan Sudut :"               ,22,430)
  // text(""+thetaVel                       ,22,450)


  fill("black")
  rect(400,160,40,20)

  image(sudut,295,60,250,300)
  image(venus,20,260,50,50)
  image(bumi,22,320,45,45)
  image(merkurius,22,200,50,50)
  image(mars,22,380,45,45)
  image(jupiter,14,430,60,60)
  image(saturnus,750,200,60,50)
  image(uranus,745,260,70,45)
  image(neptunus,755,320,50,50)
  image(bulan,757,385,45,45)
  
  
  //Koding Simulasi
  translate(width/2-180, 180); // Pusatkan canvas di tengah
  
  // Menghitung percepatan sudut
  thetaAcc = (-gravity / pTali) * sin(theta) -(damping * thetaVel);
  
  // Menghitung kecepatan sudut
  thetaVel += thetaAcc;
  
  // Menghitung sudut
  theta += thetaVel;
  
  // Hitung koordinat ujung tali
  let x = pTali * sin(theta);
  let y = pTali * cos(theta);
  
  // Gambar tali
  stroke(0);
  strokeWeight(2);
  line(0, 0, x, y);
  
  // Gambar bola
  noStroke();
  fill("#FF0022");
  ellipse(x, y, ballSize, ballSize);
  
  
}