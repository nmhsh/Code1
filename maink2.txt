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
  var exita =   className("android.widget.TextView").text("Your Lyft with Mcgarry").findOne(100)
  if(exita) {
    back()
    sleep(500)
    back()
    check = false 
  }
  var nhan = className("android.widget.TextView").text("Reserve").depth(14).findOne(100) 
  if(nhan){
    click(nhan.bounds().centerX(),nhan.bounds().centerY())
  }
  let home = id("side_menu_button").findOne(100)
  if(home) home.click()
  let scheduled= text("Scheduled Pickup").findOne(100)
  if(scheduled) click(scheduled.bounds(). centerX(), scheduled.bounds().centerY())
  let check_schedule= text("Scheduled Rides").findOne(100)
  if(check_schedule){
   if(!check){
    gestures([0, 500, [440,900], [540,1158]],
         [0, 500, [640, 1300], [540, 1158]])
    check = true
   } else {
      let checkXu = id("com.lyft.android.driver:id/design_core_map_components_bubble_text").find()
      let array =[]
      if(checkXu){
      checkXu.forEach(function(i){
        array.push({
          tien: i.text(). replace ("$",""),
          region: i.bounds(),
          point: {
            x:i.bounds().centerX(),
            y:i.bounds().centerY()
          }
        })
      })
      if(array.length >0) {
        array.sort((a,b)=>b.tien-a.tien)
        if(parseInt(array[0].text) >6) click(array[0].region.centerX(),array[0].region.centerY())
      } else {
        back()
        check = false
      }
    }
   }
  }
}

let luong = setInterval(()=>{
  if(chestSTART) Start()
},10)