let rows = createRows(readFile());

fillPayments(rows);
fillAverage(rows, "DEPARTMENT", "departmentTable");
fillAverage(rows, "MONTH", "monthTable");
fillAverage(rows, "EMPLOYEE", "employeeTable");

//создает из CSV файла массив с объектами
function createRows(file) {

  let records = file.split("\n");

  let splitRecords = records.map(function(record) {
    return record.split(",");
  });

  let rows = [];
  for (let i = 1; i < splitRecords.length; i++) {
    rows[i-1] = {};
    for (let j = 0; j < splitRecords[0].length; j++) {
      rows[i-1][splitRecords[0][j]] = splitRecords[i][j];
    }
  }

  return rows;
}

//получает общую сумму по ведомости
function getTotal(data) {

  let total = 0;

  data.forEach(row => {
    total += +(row["AMOUNT"]);
  });

  return total.toFixed(2);
}

//получает среднюю выплату ЗП по столбцу param
function getAverage(data, param) {
  const keys = Object.keys(data[0]);

  let average = {};
  
  data.forEach(row => {
    if(!average.hasOwnProperty(row[param])) average[row[param]] = [];
    average[row[param]].push(row["AMOUNT"]);
  });
  for (const department in average) {
    average[department] = (average[department].reduce((a, b) => a + +b, 0) / average[department].length).toFixed(2);
  }
  return average;
}

//получает общую среднюю выплату ЗП по объекту из getAverage
function getAverageTotal(averageObj) {
  let averageTotal = 0;
  for (const key in averageObj) {
    averageTotal += +averageObj[key];
  }
  averageTotal /= Object.keys(averageObj).length;
  return averageTotal.toFixed(2);
}

//заполняет таблицу с выплатами и общей суммой по ведомости
function fillPayments(data) {
  const keys = Object.keys(data[0]);

  let table = document.getElementById("paymentsTable");

  keys.forEach(key => {
    let td = document.createElement("td");
    td.innerHTML = key;
    table.children[0].children[0].appendChild(td);
  });

  data.forEach(row => {
    let tr = document.createElement("tr");

    for (const key in row) {
      let td = document.createElement("td");
      td.innerHTML = row[key];
      tr.appendChild(td);
    }
    table.children[1].appendChild(tr);
  });

  let td = document.createElement("td");
  td.innerHTML = getTotal(data);
  table.children[2].children[0].appendChild(td);
}

//заполняет таблицу со средними выплатами по департаментам/месяцам и т.д.
function fillAverage(data, averageParam, tableName) {
  let averageObj = getAverage(data, averageParam);
  let total = getAverageTotal(averageObj);
  let table = document.getElementById(tableName);

  for (const key in averageObj) {
    let tr = document.createElement("tr");

    let tdKey = document.createElement("td");
    tdKey.innerHTML = key;
    tr.appendChild(tdKey);

    let tdValue = document.createElement("td");
    tdValue.innerHTML = averageObj[key];
    tr.appendChild(tdValue);

    table.children[1].appendChild(tr);
  }

  let td = document.createElement("td");
  td.innerHTML = total;
  table.children[2].children[0].appendChild(td);
}

function readFile() {
  return (
`MONTH,DEPARTMENT,EMPLOYEE,AMOUNT
2018-01,Legals,Smith A.,14289.66
2018-01,Legals,Jonson B.,7408.05
2018-01,Legals,Lee C.,10102.98
2018-01,Legals,Janaro R.,8127.94
2018-01,Legals,Conor J.,10341.33
2018-01,Legals,Conor S.,7010.52
2018-02,Legals,Smith A.,9927.47
2018-02,Legals,Jonson B.,7053.96
2018-02,Legals,Lee C.,7057.36
2018-02,Legals,Janaro R.,13043.93
2018-02,Legals,Conor J.,12613.82
2018-02,Legals,Conor S.,10310.33
2018-02,Legals,Travolta J.,10857.58
2018-03,Legals,Smith A.,11043.21
2018-03,Legals,Jonson B.,5144.06
2018-03,Legals,Conor J.,11022.75
2018-03,Legals,Conor S.,11651.08
2018-03,Legals,Clark A.,7889.03
2018-03,Legals,Doyle C.,6490.54
2018-01,Compliance,Smith A.,14980.55
2018-01,Compliance,Johnson B.,8132.88
2018-01,Compliance,Williams C.,5635.36
2018-01,Compliance,Jones D.,12454.79
2018-01,Compliance,Brown F.,5787.25
2018-01,Compliance,Davis G.,8618.50
2018-02,Compliance,Smith A.,5093.56
2018-02,Compliance,Johnson B.,11625.41
2018-02,Compliance,Williams C.,11875.55
2018-02,Compliance,Jones D.,10008.70
2018-02,Compliance,Brown F.,6291.20
2018-02,Compliance,Davis G.,12524.68
2018-02,Compliance,Miller H.,11630.42
2018-03,Compliance,Johnson B.,5681.83
2018-03,Compliance,Williams C.,10941.43
2018-03,Compliance,Jones D.,8859.54
2018-03,Compliance,Brown F.,6663.98
2018-03,Compliance,Davis G.,6988.17
2018-03,Compliance,Miller H.,14138.79
2018-01,Marketing & Sales,Wilson A.,13200.80
2018-01,Marketing & Sales,Moore B.,6145.94
2018-01,Marketing & Sales,Taylor C.,8459.98
2018-01,Marketing & Sales,Anderson D.,8639.86
2018-01,Marketing & Sales,Thomas E.,9384.85
2018-01,Marketing & Sales,Jackson F.,7018.11
2018-02,Marketing & Sales,White G.,13853.19
2018-02,Marketing & Sales,Moore B.,5292.43
2018-02,Marketing & Sales,Taylor C.,10465.98
2018-02,Marketing & Sales,Anderson D.,5907.43
2018-02,Marketing & Sales,Thomas E.,8700.87
2018-02,Marketing & Sales,Jackson F.,7444.12
2018-02,Marketing & Sales,Miller I.,12142.15
2018-03,Marketing & Sales,Moore B.,8600.83
2018-03,Marketing & Sales,Taylor C.,5185.76
2018-03,Marketing & Sales,Anderson D.,5491.73
2018-03,Marketing & Sales,Thomas E.,11236.40
2018-03,Marketing & Sales,Jackson F.,12056.60
2018-03,Marketing & Sales,Miller I.,6828.36
2018-01,Production,Harris A.,10125.18
2018-01,Production,Martin B.,5035.75
2018-01,Production,Thompson C.,12100.76
2018-01,Production,Garcia D.,13739.30
2018-01,Production,Martinez E.,9274.72
2018-01,Production,Robinson F.,10073.36
2018-02,Production,Clark H.,7193.33
2018-02,Production,Martin B.,13999.01
2018-02,Production,Thompson C.,14287.98
2018-02,Production,Garcia D.,8285.04
2018-02,Production,Martinez E.,14948.03
2018-02,Production,Robinson F.,13104.71
2018-02,Production,Driller R.,5443.28
2018-03,Production,Martin B.,14379.60
2018-03,Production,Thompson C.,13450.47
2018-03,Production,Garcia D.,11364.05
2018-03,Production,Martinez E.,5548.34
2018-03,Production,Robinson F.,10733.07
2018-03,Production,Driller R.,13843.69
2018-01,Service,King A.,8617.04
2018-01,Service,Wright B.,13078.48
2018-01,Service,Lopez C.,5150.28
2018-01,Service,Hill D.,14136.06
2018-01,Service,Scott E.,6731.88
2018-01,Service,Green F.,13076.14
2018-02,Service,Adams G.,12432.64
2018-02,Service,Wright B.,6735.59
2018-02,Service,Lopez C.,12947.72
2018-02,Service,Hill D.,14863.50
2018-02,Service,Scott E.,12849.35
2018-02,Service,Green F.,13825.99
2018-02,Service,Driller R.,11326.42
2018-03,Service,Wright B.,10512.58
2018-03,Service,Lopez C.,9330.24
2018-03,Service,Hill D.,5373.41
2018-03,Service,Scott E.,5327.75
2018-03,Service,Green F.,6972.30
2018-03,Service,Driller R.,10481.02`
  );
}