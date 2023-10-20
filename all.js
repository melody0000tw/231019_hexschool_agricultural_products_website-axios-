
// 6. 蔬菜比價網：串接 API 顯示資料 OK
// 7. 蔬菜比價網：可以篩選『蔬菜』、『水果』、『花卉』三個類別 OK
// 8. 蔬菜比價網：可以搜尋作物名稱，並顯示當前搜尋的字詞和結果 OK
// 9. 蔬菜比價網：可以排序篩選、點擊表頭中的上下 icon 可以跟著排序（參考設計稿第五頁）OK
// 10. 蔬菜比價網：手機版本篩選

// 串接 API 顯示資料 OK

const showList = document.querySelector(".showList"); 
let ary = []; // 所有的資料
let aryCurrent = []; //顯示的資料

axios.get('https://hexschool.github.io/js-filter-data/data.json')
.then(function (response) {
    ary = response.data; 
    let str = "";
    ary.forEach(function(item){
            str+=
            `<tr>
                <td> ${item.作物名稱}</td>
                <td> ${item.市場名稱}</td>
                <td> ${item.上價}</td>
                <td> ${item.中價}</td>
                <td> ${item.下價}</td>
                <td> ${item.平均價}</td>
                <td> ${item.交易量}</td>
            </tr>`
        })
    });
  
function renderData(){
    let str = "";
    aryCurrent.forEach(function(item){
        str+=
        `<tr>
                <td> ${item.作物名稱}</td>
                <td> ${item.市場名稱}</td>
                <td> ${item.上價}</td>
                <td> ${item.中價}</td>
                <td> ${item.下價}</td>
                <td> ${item.平均價}</td>
                <td> ${item.交易量}</td>
            </tr>`;   
        });
    showList.innerHTML = str;
    
};


  // 篩選蔬菜、水果、花卉，三個類別 OK
        //   <div class="button-group d-flex justify-content-center">
        //   <button data-type="N04" type="button" class="vegetablesBtn btn btn-type border-dark border-2">蔬果</button>
        //   <button data-type="N05" type="button" class="fruitsBtn btn btn-type border-dark border-2">水果</button>
        //   <button data-type="N06" type="button" class="flowersBtn btn btn-type border-dark border-2">花卉</button>
        //   </div>

  const vegetablesBtn = document.querySelector(".vegetablesBtn");
  const fruitsBtn = document.querySelector(".fruitsBtn");
  const flowersBtn = document.querySelector(".flowersBtn");

  vegetablesBtn.addEventListener("click",function(e){
    resetBtn()
    vegetablesBtn.classList.add("active");
    aryCurrent = ary.filter(function(item){
        return item.種類代碼==="N04";
    })
    renderData(aryCurrent);
  });

  fruitsBtn.addEventListener("click",function(e){
    resetBtn()
    fruitsBtn.classList.add("active");
    aryCurrent = ary.filter(function(item){
        return item.種類代碼==="N05";
    })
    renderData(aryCurrent);
  });

  flowersBtn.addEventListener("click",function(e){
    resetBtn()
    flowersBtn.classList.add("active");
    aryCurrent = ary.filter(function(item){
        return item.種類代碼==="N06";
    })
    renderData(aryCurrent);
  });
  
  function resetBtn(){
    vegetablesBtn.classList.remove("active");
    fruitsBtn.classList.remove("active");
    flowersBtn.classList.remove("active");
  }


  // 搜尋作物名稱並顯示搜尋結果
        // <input class="rounded-end" type="text" placeholder="請輸入作物名稱" id="crop" name="crop">
        // <button type="button" class="search text-white btn mb-2 ms-2">搜尋</button>

  const searchBtn = document.querySelector(".search");
  const searchInput = document.getElementById("crop");

  searchBtn.addEventListener("click",function(e){
    const crop = searchInput.value;
    if(crop === ""){
        alert("請輸入作物名稱")
        return;
    }
    showList.innerHTML = 
    `<tr><td colspan="7" class="text-center p-3">資料載入中...</td></tr>`

    aryCurrent = ary.filter(function(item){
        return String(item.作物名稱).includes(crop)
    })

    renderData(aryCurrent);

    if(aryCurrent.length === 0){
        showList.innerHTML = 
        `<tr><td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td></tr>`
    } 
    
     // 顯示搜尋的文字
    const showResult = document.querySelector(".show-result");
    showResult.textContent = `查看「${crop}」的比價結果`;


    });


   // 排序篩選 OK

   const sortSelect = document.querySelector(".sort-select")
   function sortList(sortValue){
    if(sortValue === "上價"){
        aryCurrent = aryCurrent.sort(function(a,b){
            return a.上價 - b.上價}
        )
    }else if(sortValue === "中價"){
        aryCurrent = aryCurrent.sort(function(a,b){
            return a.中價 - b.中價}
        )
    }else if(sortValue === "下價"){
        aryCurrent = aryCurrent.sort(function(a,b){
            return a.下價 - b.下價}
        )
    }else if(sortValue === "平均價"){
        aryCurrent = aryCurrent.sort(function(a,b){
            return a.平均價 - b.平均價}
        )
    }else if(sortValue === "交易量"){
        aryCurrent = aryCurrent.sort(function(a,b){
            return a.交易量 - b.交易量}
        )
    }
   }

   sortSelect.addEventListener("change",function(e){
       let sortValue = e.target.value;
       // console.log(sortValue);
       sortList(sortValue);
       renderData(aryCurrent);
       if(aryCurrent.length === 0){
           showList.innerHTML = 
           `<tr><td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td></tr>`
       } 
   })

   // 點擊表頭中的上下 icon 可以跟著排序 OK

   const sortAdvanced = document.querySelector(".js-sort-advanced")
   sortAdvanced.addEventListener("click",function(e){
       const sortValue = e.target.getAttribute("data-price")
       if(e.target.getAttribute("data-sort")==="down"){
           sortList(sortValue);
           aryCurrent.reverse();
           renderData(aryCurrent);
       }else if(e.target.getAttribute("data-sort")==="up"){
            sortList(sortValue);
           renderData(aryCurrent);
       }
   })

   // 手機版排序篩選

   const mobileSelect = document.querySelector(".mobile-select")

   mobileSelect.addEventListener("change",function(e){
       let sortValue = e.target.value;
       // console.log(sortValue);
       sortList(sortValue);
       renderData(aryCurrent);
       if(aryCurrent.length === 0){
           showList.innerHTML = 
           `<tr><td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td></tr>`
       } 
   })