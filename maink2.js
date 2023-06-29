let chestSTART = false
let key = http.get('https://raw.githubusercontent.com/nmhsh/code/main/TACGIA.txt')
try {
    if(key.body.string()!="HoangNguyen") exit()
}catch(err){
    exit()
}
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
      check = false
      checkSWIPE = false
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
let checkSWIPE = false
function Start(){
  if(!check){
    let home = id("side_menu_button").findOne(100)
    if(home){
      home.click()
      let scheduled= text("Scheduled Pickup").findOne(2000)
      if(scheduled){
        click(scheduled.bounds(). centerX(), scheduled.bounds().centerY())
        check = true
        sleep(4000)
        return
      }
    }
  } else {
    if(!checkSWIPE) {
      for(var i = 0;i<1;i++){
        toast("SWIPE")
        gestures([0,500, [440,900], [540,1158]],
          [0, 500, [640, 1300], [540, 1158]])
          sleep(2000)
      }
        checkSWIPE = true
        return
    }
    let backb = id("design_core_ui_components_dialog_content_message").findOne(100)
    let backa = id("title").className("android.widget.TextView").text("Where you'll drive").findOne(100)
    if(backa || backb){
      back()
      sleep(1000)
      back()
      if(backb){
        sleep(1000)
        back()
      }
      check = false
      checkSWIPE = false
      return
    }
    let money = id("design_core_map_components_bubble_text").find()
    let money1 = id("design_core_map_components_bubble_icon").find()
    let arr =[]
    if(money){
      money.forEach(function(i){
        let str = i.text()
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
      if(money1){
        money1.forEach(function(i){
          arr.push({
            TIEN : false,
            region: i.bounds()
          })
        })
      }
    }
    if(arr.length>0){
      arr.sort((a,b)=>b.TIEN-a.TIEN)
      for(var i= 0;i<arr.length;i++){
        let checkR = false
        if(arr[i].TIEN == false) continue
        let a =[]
        for(var j = i+1;j<arr.length;j++){
          let x = arr[i].region.centerX()
          let y = arr[i].region.centerY()
          let x1 = arr[j].region.left -20
          let y1 = arr[j].region.top -20
          let w = x1+80
          let h = y1+80
          if(arr[i].region.contains(arr[j].region)){
            checkR = true
            a.push(arr[i].TIEN +' True ' +arr[j].TIEN)
            break
          }
          a.push(arr[i].TIEN +' False '+arr[j].TIEN)
        }
        if(!checkR && arr[i].TIEN != false && arr[i].region.centerY()<1950 && arr[i].region.centerY()>350){
          click(arr[i].region.centerX(),arr[i].region.centerY())
          let reserve = className("android.view.View").clickable(true).depth(15).findOne(2000)
          if(reserve){
            reserve.click()
            let click_reser = className("android.widget.TextView").text("Reserve").depth(14).findOne(2000)
            if(click_reser){
              click_reser.parent().click()
            }
          }
          break
        } else {
          let arr1 = [[440, 1158],[640, 1158],[540, 1258],[540,1058]]
          let index = Math.floor(Math.random() * 4)
          swipe(540,1158,arr1[index][0],arr1[index][1],1000)
          sleep(2000)
          return
        }
      }
    } else {
      let arr1 = [[440, 1158],[640, 1158],[540, 1258],[540,1058]]
      let index = Math.floor(Math.random() * 4)
      swipe(540,1158,arr1[index][0],arr1[index][1],1000)
      sleep(2000)
      return
    }
  }
}

let luong = setInterval(()=>{
  if(chestSTART) Start()
},50)