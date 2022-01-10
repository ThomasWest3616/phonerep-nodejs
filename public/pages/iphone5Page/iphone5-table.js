const urls = [
    "http://localhost:8080/getiphone5"
];

async function fetchAll() {
    const results = await Promise.all(urls.map((url) => fetch(url).then((r) => r.json())));

    results.map((test) => console.log(test.map((test2) => test2.title)))

    console.log(JSON.stringify(results, null, 2));

    var table = document.createElement("table"), row, cellA, cellB, cellC, cellD, header
    document.getElementById("demoB").appendChild(table);

    for (let i = 0; i < results.length; i++) {
        // (C2) ROWS & CELLS
        row = document.createElement("tr");
        header = document.createElement("th");
        cellA = document.createElement("td");
        cellB = document.createElement("td");
        cellC = document.createElement("td");

        // (C3) KEY & VALUE
        results[0].map((test) => cellA.innerHTML = test.title)

        // (C4) ATTACH ROW & CELLS
        table.appendChild(row).style.width = "500px"
        row.appendChild(cellA).style.width = "500px"
    }
}

fetchAll();