let bill = JSON.parse(localStorage.getItem("bill")) || [];



let body = `<tr>
                <td >1</td>
                <td class="center">Burger A</td>
                <td class="right">  d  </td>
            </tr>`;



async function showBillItems() {
    let body = "";
    for (let i = 0; i < bill.length; i += 3) {
        body += `<tr>
                    <td>${bill[i]}</td>
                    <td class="center">${bill[i + 1]}</td>
                    <td class="right">${bill[i + 2]}</td>
                </tr>`;
    }
    document.getElementById('table-body').innerHTML = body;
}
showBillItems();