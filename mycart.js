let buyList = [];
//this below line assinging old selected values form localstorage use carefully
buyList = JSON.parse(localStorage.getItem('choosed'));

class Ecom {
  flag(item) {
  
    this.div = document.getElementById(item);
    if (!buyList) {
      buyList = [];
    }

    const selected = {
      id:item,
      p: this.div.getElementsByTagName("p")[0].textContent,

      span: this.div.getElementsByTagName("span")[0].textContent,

      img: this.div.getElementsByTagName("img")[0].getAttribute("src"),
    };

    buyList.push(selected);
    console.log(buyList);
    localStorage.setItem("choosed", JSON.stringify(buyList));
    localStorage.setItem("changeFlag", "true");
  }

  addToCart() {
    const selectedList = JSON.parse(localStorage.getItem("choosed"));
    const content = document.getElementById("content");
    content.remove();
    if (buyList.length === 0) {

      ifempty();
    }

    for (let i = 0; i < selectedList.length; i++) {
      const ndiv = document.createElement("div");
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      ndiv.appendChild(div1);
      ndiv.appendChild(div2);
      document.getElementById("Mycart").appendChild(ndiv);
      const img = document.createElement("img");
      div1.appendChild(img);
      const np = document.createElement("p");
      np.innerHTML = selectedList[i].p;
     
      div2.appendChild(np);
      const dbtn = document.createElement("button");
      div2.appendChild(dbtn);
      dbtn.innerHTML = "Delete Item"

      img.setAttribute("src", selectedList[i].img);
      ndiv.setAttribute("id",selectedList[i].id);
      ndiv.setAttribute(
        "style",
        "display:flex;flex-direction:row;flex-wrap:nowrap;height:50vh;margin:0%;margin-bottom:5vh ;background-color:white;box-shadow: 10px 10px 20px black;margin-left:10%;margin-right:10%;border-radius:24px"
      );
      div1.setAttribute("style", "width:40%;border-right:2px solid black;padding:3%");
      div2.setAttribute(
        "style",
        "width:60% ; height:100%;display:flex; flex-direction:column;justify-content: center; align-items:center"
      );
      img.setAttribute("style", "border-radius:0%;width:70%;height:100%");

      np.setAttribute("style", "font-size:2vw");
      dbtn.setAttribute("style", "margin-top:17%;padding:1vw;background-color:red;cursor:pointer;border-radius:2vw;color:white;font-size:2vh")
      dbtn.setAttribute("onclick", "deleteitem(this.parentNode.parentNode)");
    }
  }
}

const ecom = new Ecom();

function deleteitem(item) {
  let deleteindex;
  for(let i=0;i<buyList.length;i++)
  { 
    if(buyList[i].id===item.id){
      buyList.splice(i, 1);
    }
  }

  
  item.remove();
  console.log(buyList);
  localStorage.setItem("choosed", JSON.stringify(buyList));
  if (buyList.length === 0) {
    ifempty();
  }

  cart();
  billdiv.totalBill();

}
function ifempty() {
  const content = document.createElement("div");
  content.setAttribute("id", "content");
  document.getElementById("Mycart").append(content)
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  content.appendChild(div1);
  content.appendChild(div2);
  const img = document.createElement("img");
  div1.appendChild(img);
  img.setAttribute("style", "height:100%;width:100%");
  img.setAttribute("id", "image");
  img.setAttribute("src", "image/empty cart image.jpg")
  div1.setAttribute("id", "image");
  div2.setAttribute("id", "button");
  const btn = document.createElement("button");
  div2.appendChild(btn);
  btn.innerHTML = "Add to Cart";
  btn.setAttribute("onclick", "window.location.href='index.html';");
}
function cart() {
  const spanCart = document.getElementById("spanCart");
  if (spanCart) {
    spanCart.innerHTML = buyList.length;
  }
}

/**************NOTE THIS CODE IS CORRECT AND WORKING BUT BELOW IS BETTER APPROACH ************************/
// const billdiv={
// count:0,
// totalBill:function() {
//   let sum = 0;
//   let bill = document.getElementById("bill");
//   let h2 = document.createElement("h2");
//   let h3 = document.createElement("h3");

//   let div = document.createElement("div");
//   if (buyList.length > 0) {
//     if (this.count < 1) {
//       bill.appendChild(div);
//       div.appendChild(h2);
//       div.appendChild(h3);
//       h2.innerHTML = "Your Total bill";
//       h3.setAttribute('id','h3data');
//       this.count++;
//     }

//       for (let i = 0; i < buyList.length; i++) {
//         let x = parseInt(buyList[i].span);
//         sum = x + sum;
//       }
//       document.getElementById('h3data').textContent =sum;
//         console.log("lenght"+sum);

//   }
//   if(buyList.length===0) {
//     div.remove();
//   }
// }
// };
// if (buyList.length > 0) {
//   billdiv.totalBill();
// }
// window.onload=billdiv.totalBill;
/************************************************************************************************'**/


/**********************BETTER APPROACH **************************************************************/
const billdiv = {
  count: 0,
  totalBill: function () {
  
    let sum = 0;
    let bill = document.getElementById("bill");

    // Check if the bill element exists
    if (!bill) {
      console.error("Bill element not found in the DOM");
      return;
    }

    let div = document.getElementById("billDiv");
    let h2 = document.getElementById("billHeader");
    let h3 = document.getElementById("billTotal");
    let buybtn = document.getElementById("billTotal");
    if (!div) {
      // Create the div and elements only if they don't exist
      div = document.createElement("div");
      div.id = "billDiv";
      bill.appendChild(div);
      div.setAttribute('style', 'background-color:lightgreen;padding:5vh;text-align:center;box-shadow: 10px 10px 20px black;margin:10%;border-radius:24px');

      h2 = document.createElement("h2");
      h2.id = "billHeader";
      div.appendChild(h2);
      h2.textContent = "Your Total bill"; // Use textContent for better security
      h2.setAttribute('style', 'font-size:5vh');

      h3 = document.createElement("h3");
      h3.id = "billTotal";
      div.appendChild(h3);
      h3.setAttribute('style', 'font-size:4vh');

      buybtn = document.createElement("button");
      buybtn.id = "buybutton";
      div.appendChild(buybtn);
      buybtn.innerHTML = "Buy Now";
      buybtn.setAttribute('style', 'background-color:black;color:white;border-radius:7vh;padding:2vh;font-size:3vh;')
    }

    if (buyList.length > 0) {
      for (let i = 0; i < buyList.length; i++) {
        let x = parseInt(buyList[i].span);
        sum = x + sum;
      }

      // Update innerHTML or textContent based on your requirement
      // h3.innerHTML = "<p>" + sum + "</p>";
      // Alternatively, use textContent
     

      h3.textContent = "Rs." + sum + "/-";
    } else {
      // Clear the content if buyList is empty
      div.remove();
      h3.remove();
      h2.remove();
    }
  },
};
// Assuming buyList is defined somewhere in your code
// Ensure that this line is executed at the appropriate time


window.onload = function () { //This will Load these function after page loading
  billdiv.totalBill();
  cart();
}
