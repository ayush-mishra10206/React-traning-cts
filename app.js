function save(event){
    const payload = {
        item:"laptop"
    }
    console.log(event);
    fetch("http://localhost:3000/orders", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type':'application/json'
        }
    });
}

(async function(){
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
        console.log("response : ", response);
        const list = document.getElementById('orderList');
            orders.forEach(order =>{
                const row = document.createElement('li');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent='delete';
                row.textContent = order.item + ',' + order.price;
                row.appendChild(deleteBtn);
                list.appendChild(row)
            })
})()