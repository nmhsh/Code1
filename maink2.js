auto()
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
      START()
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
function START(){
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
  if(arr.length >0){
    log(arr)
  } else {
    let a = className("android.view.View").depth(16).find()
    log("new")
    log(a)
  }
}
console.show()
let luong = setInterval(()=>{},0)
