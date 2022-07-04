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