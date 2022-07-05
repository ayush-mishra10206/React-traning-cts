function save(event) {
    const payload = {
        item: document.getElementById('item').value,
        price: document.getElementById('price').value,
        date:document.getElementById('datePicker').value
    }
    console.log('date : ', payload);
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
    console.log("orders : ", orders);
    const list = document.getElementById('orderList');
    let categories = JSON.parse(localStorage.getItem('categories'));
    orders.forEach(order => {
        const row = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener("click",function () {
            fetch(`http://localhost:3000/orders/${order.id}`, {
                method: 'DELETE',
            });
        })
        deleteBtn.textContent = 'delete';
        if(order.category_id){
            console.log('category_id : ', order.category_id)
            categories.filter(category=>category.id === order.category_id);
            console.log('filteredItem : ', categories.filter(category=>category.id === order.category_id));
        }
        else{
            row.textContent = order.item + ',' + order.price + " ";
        }
        row.appendChild(deleteBtn);
        list.appendChild(row)
    })
})();

(async function () {
    let categories  = localStorage.getItem('categories')
    if(categories){
        categories = JSON.parse(categories);
    }
    else{
        const responseCategory = await fetch("http://localhost:3000/category");
        categories = await responseCategory.json();  
        localStorage.setItem('categories', JSON.stringify(categories));
    }
    const dropDown = document.getElementById('dropDown');
    console.log('categories : ', categories)
    categories.forEach(category => {
        const optionTag = document.createElement('option');

        optionTag.value = category.id;
        optionTag.text = category.label;
        dropDown.appendChild(optionTag);

    })
    dropDown.addEventListener('change',function(event){
        console.log('clicked', dropDown.value);

        const payLoad = {
            category_id:dropDown.value
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