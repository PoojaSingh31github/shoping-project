// here we are targeting the shop (cart) by its id "shop for checing it i used console log which print all the cart in console"
let shop = document.getElementById("shop");

// suppose we have data in our local stoage and what we we ddont have any data which may give error so for that i used the or condtion here nd we have data it will retrive the data   
let basket = JSON.parse(localStorage.getItem("data")) || [];
// making function of (genrateShop) here i used es6 arrow function. here we use backticks for mking the html code in java script...... here i used return shop.innerhtml that means i wan to put this whole code in my shop classed div and this shopitemdata is difing the separate content which need to put in sperate cart...... here i used map function:- map will target all the data form shopItemData one by one..... At end i used .join which help us to print only the cart without it the comma was coming....... here i used let (id , img ... to not repeat it during puting the value ${name} like this (avoiding the $(x.id) $(x.img))...... at near ending i used id ${id} which help me diung increment and decrment functionality
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img width="220" height="330px" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price} </h2>
            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  })
  .join(""));
};
// invoking the function 
generateShop();

// index file cart
let shop2 = document.getElementById("shop2");
let generateShop2 = () => {
  return (shop2.innerHTML = shopItemsData2
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img width="220" height="330px" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price} </h2>
            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  })
  .join(""));
};
// invoking the function 
generateShop2();
// here is increment function and decrement function... here i made busket to store the selected cart where id and item will push... srech function will sreach(check is the selected cart is exist or not )is the acutyally thing is present or not if it exist only then item no increase.... busket find it is also help us to sreach by its id (help to sreach the selected cart) 
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);

  update(selectedItem.id);
  // it help me to store the data in local storage so that if i refress the page data will not erase from busket..... here i used set data which is use to set the data and the get data is used to get the data from local storage  json.stringify is used to sava the data in local stoage and make it work for increment and decrement tooo i will paste it to drecemnet functoonality too
  localStorage.setItem("data", JSON.stringify(basket));
};
// decrement function:- same copy paste but the only diffrence is instead of + here we use - in else condition and i used return after the if condition and else if condition to stop on 0 (not to make it go to below 0 )
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  //  removing the cart if it has value item quantity 0
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

// update function:- here to i used search and find function, it will hep me to search by its id....... now only for items i used here search.item which will see in html 
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

// it is made to show the amount of selected item at navbar cart-icon which i invoke in update function.... map will target all the itemm one by one as i used x.item,..... reduce function is help me to accumulates the item in a single value... i put 0 at end to make my calcution start from 0
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
