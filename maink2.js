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
log('Ver: 4')
sleep(4000)
let check = false
let checkSWIPE = false
function Start(){
  if(currentPackage() != 'com.lyft.android.driver'){
    log('Open APP')
    app.launch('com.lyft.android.driver')
    sleep(2000)
  }
  if(!check){
    let home = id("side_menu_button").findOne(100)
    if(home) home.click()
    let scheduled= text("Scheduled Pickup").findOne(100)
    if(scheduled){
      click(scheduled.bounds(). centerX(), scheduled.bounds().centerY())
      check = true
      sleep(4000)
      log('SWIPE')
    }
  } else {
    if(!checkSWIPE) {
      for(var i = 0;i<2;i++){
        gestures([0, 500, [440,900], [540,1158]],
          [0, 500, [640, 1300], [540, 1158]])
          sleep(1000)
      }
        checkSWIPE = true
    }
  }
  let money = id("design_core_map_components_bubble_text").find()
  let arr =[]
  if(money){
    money.forEach(function(i){
      let str = i.text()
      log(str)
      if(!str){
        str = 0
      } else {
        str = str.replace ("$","")
      }
      arr.push({
        TIEN : str,
        region: i.bounds()
      })
    })
  }
  log(arr.length)
  if(arr.length>0){
    arr.sort((a,b)=>b.TIEN-a.TIEN)
    log()
    for(var i= 0;i<arr.length;i++){
      let checkR = false
      for(var j = i+1;j<arr.length;j++){
        if(arr[i].region.contains(arr[j].region)){
          checkR = true
          break
        }
      }
      if(!checkR){
        click(arr[i].region.centerX(),arr[i].region.centerY())
        alert('XONG')
        exit()
      }
    }
  }

}
console.show()
let luong = setInterval(()=>{
  if(chestSTART) Start()
},500)


