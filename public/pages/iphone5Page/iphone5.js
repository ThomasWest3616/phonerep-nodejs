    const pricelistDiv = document.querySelector("div.pricelist")

    let tableHeaders = ["REPARATION", "TID", "PRIS"]

    const createPricelistTable = () => {
        while (pricelistDiv.firstChild) pricelistDiv.removeChild(pricelistDiv.firstChild)

        let pricelistTable = document.createElement('table')
        pricelistTable.className = 'pricelistTable'

        let pricelistTableHead = document.createElement('thread')
        pricelistTableHead.className = 'pricelistTableHead'

        let pricelistTableHeaderRow = document.createElement('tr')
        pricelistTableHeaderRow.className = 'pricelistTableHeaderRow'

        pricelistHeaders.forEach(header => {
            let priceHeader = document.createElement('th')
            priceHeader.innerText = header
            pricelistTableHeaderRow.append(priceHeader)

        }) 

    pricelistTableHead.append(pricelistTableHeaderRow)
    pricelistTable.append(pricelistTableHead)

    let pricelistTableBody = document.createElement('tbody')
    pricelistTableBody.className = "pricelistTable-Body"
    pricelistTable.append(pricelistTableBody)

    pricelistDiv.append(pricelistTable)



    }

    const appendPrices = (singlePrice, singlePriceIndex) => {
        const pricelistTable = document.querySelector('.pricelistTable')

        let pricelistTableBodyRow = document.createElement('tr')
        pricelistTableBodyRow.className = 'pricelistTableBodyRow'

        let titleData = document.createElement('td')
        titleData.innerText = singlePrice.pricelist.title

        let timeData = document.querySelector('td')
        timeData.innerText = singlePrice.pricelist.time

        let priceData = document.querySelector('td')
        priceData.innerText = singlePrice.pricelist.price

        pricelistTableBodyRow.append(titleData, timeData, priceData)

        pricelistTable.append(pricelistTableBodyRow)


    }

const getPrices = () => {
    fetch('http://localhost:8000/getiphone5')
    .then(res => res.json())
    .then(scores => {
        createPricelistTable()

        for (const price of prices) {
            let priceIndex = prices.indexOf(price) + 1
            appendPrices(price, priceIndex)
        }
    })
}







//     pricelists.map(pricelist => {
//         const pricelistDiv = document.createElement("div");
//         pricelistDiv.innerHTML = `
        
//         <div class="flex justify-between text-xl font-bold">
//         <table class="table-auto">
//         <thead>
//           <tr>
//             <th>REPARATION</th>
//             <th>TID</th>
//             <th>PRIS</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>${escapeHTML(pricelist.title)}</td>
//             <td>${escapeHTML(pricelist.time)}</td>
//             <td>${escapeHTML(pricelist.price)}</td>
//           </tr>
//           <tr>
//             <td>Witchy Woman</td>
//             <td>The Eagles</td>
//             <td>1972</td>
//           </tr>
//           <tr>
//             <td>Shining Star</td>
//             <td>Earth, Wind, and Fire</td>
//             <td>1975</td>
//           </tr>
//         </tbody>
//       </table>
//       </div>
           

//         `;

//         pricelistsWrapperDiv.appendChild(pricelistDiv);

//     });


// });



