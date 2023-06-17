let chestSTART = false
let window = floaty.window(
  <frame w='*' h='*'>
    <horizontal>
        <button w ='auto' id="key" text="START" textSize='10sp'/>
        <button w ='auto' id='key1' text='EXIT' textSize='10sp'/>
    </horizontal>
  </frame>
);
window.key.click(()=>{
    if(window.key.getText()=='START'){
      window.key.setText("STOP")
      chestSTART = true 
      toast("Start")
    } else{
      window.key.setText("START")
      chestSTART = false
      toast("Stop")
    }
})
window.key1.click(()=>{
  toast("Exit")
  clearInterval(luong)
  exit()
})

auto()
let check = false
function Start(){
  if(currentPackage() != 'com.lyft.android.driver'){
    app.launch('com.lyft.android.driver')
    sleep(2000)
  }
  let home = id("side_menu_button").findOne(100)
  if(home) home.click()
  let scheduled= text("Scheduled Pickup").findOne(100)
  if(scheduled) click(scheduled.bounds(). centerX(), scheduled.bounds().centerY())
  let mode = className("android.view.View").depth("16").find()
  if(mode){
    for(var i =0;i<mode.length;i++) {
      let rec = mode[i].bounds()
      if(rec.text("Airport drop-off").findOne(100)){
        mode[i].click()
        alert('Đã click')
        exit()
        break
      }
    };
  }

}

let luong = setInterval(()=>{
  if(chestSTART) Start()
},10)


