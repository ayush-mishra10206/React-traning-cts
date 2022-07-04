function save(event) {
    const payload = {
        item: "laptop"
    }
    console.log(event);
    fetch("http://localhost:3000/orders", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    });
}

(async function () {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
    console.log("response : ", response);
    const list = document.getElementById('orderList');
    orders.forEach(order => {
        const row = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener("click",function () {
            fetch(`http://localhost:3000/orders/${order.id}`, {
                method: 'DELETE',
            });
        })
        deleteBtn.textContent = 'delete';
        row.textContent = order.item + ',' + order.price + " ";
        row.appendChild(deleteBtn);
        list.appendChild(row)
    })
})();

(async function () {
    const responseCategory = await fetch("http://localhost:3000/category");
    const categories = await responseCategory.json();
    const dropDown = document.getElementById('dropDown');
    categories.forEach(category => {
        const optionTag = document.createElement('option');

        optionTag.value = category;
        optionTag.text = category;
        dropDown.appendChild(optionTag);

    })
    dropDown.addEventListener('change',function(event){
        console.log('clicked', dropDown.value);

        const payLoad = {
            item:dropDown.value
        }
        fetch("http://localhost:3000/orders", {
        method: 'POST',
        body: JSON.stringify(payLoad),
        headers: {
            'Content-type': 'application/json'
        }
    });
    })
  
})();