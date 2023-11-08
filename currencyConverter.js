

 
// Dummy data to start with
let conversions = [
    {
        date: "12/01/2012",
        time: "09:48:23",
        amountIn: "1.00",
        currencyIn: "GBP",
        amountOut: "1.15",
        currencyOut: "EUR"
    },
    {
        date: "01/04/2015",
        time: "07:12:01",
        amountIn: "1.00",
        currencyIn: "GBP",
        amountOut: "1.23",
        currencyOut: "USD" 
    },
    {
        date: "23/11/2018",
        time: "14:03:45",
        amountIn: "1.00",
        currencyIn: "GBP",
        amountOut: "1.90",
        currencyOut: "AUD" 
    },
    {
        date: "25/11/2018",
        time: "18:56:45",
        amountIn: "2.00",
        currencyIn: "GBP",
        amountOut: "3.80",
        currencyOut: "AUD" 
    },
    {
        date: "26/11/2018",
        time: "14:03:45",
        amountIn: "3.00",
        currencyIn: "GBP",
        amountOut: "5.70",
        currencyOut: "AUD" 
    }
];

// when page loads it pulls data from session storage
function myLoad() {

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("new", JSON.stringify(conversions));
        sessionStorage.setItem("hasCodeRunBefore", true);
        document.querySelector('#defaultMessage').className = ""
        document.querySelector('#conversionData').className = "hidden"
        if (conversions[0] === undefined) {
            
            document.querySelector('#defaultMessage').className = ""
            document.querySelector('#conversionData').className = "hidden"
        }
        else {
            document.querySelector('#defaultMessage').className = "hidden"
            document.querySelector('#conversionData').className = ""
            
        }

    } else {
        conversions = JSON.parse(sessionStorage.getItem("new"));
        document.querySelector('#defaultMessage').className = "hidden"
        document.querySelector('#conversionData').className = ""
        createList(conversions);

        if (conversions[0] === undefined) {
            
            document.querySelector('#defaultMessage').className = ""
            document.querySelector('#conversionData').className = "hidden"
        }
        else {
            document.querySelector('#defaultMessage').className = "hidden"
            document.querySelector('#conversionData').className = ""
            
        }
        
    };
};




// function to create new object for conversion
function Conversion(date, time, amountIn, currencyIn, amountOut, currencyOut) {
    this.date = date
    this.time = time
    this.amountIn = amountIn;
    this.currencyIn = currencyIn;
    this.amountOut = amountOut;
    this.currencyOut = currencyOut;
}


// Function to create the conversion with the inputted data
function convert() {
    let currencyInput = document.getElementById("currencyInput").value;
    let currencyOutput = document.getElementById("currencyOutput").value;
    let currencyValue = document.getElementById("typeInput").value;
    let result = document.getElementById("result");



    let total = "";
    


    //Check to validate the input 
    if (isNaN(currencyValue) || (currencyValue <= 0)) {
        return result.innerHTML = "Invalid Entry";
    }

    else if(currencyInput === "GBP") {
        if (currencyOutput === "GBP") {
            result.innerHTML = parseFloat(currencyValue).toFixed(2)
        }
        else if (currencyOutput === "EUR") {
            total = currencyValue*1.15
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "USD") {
            total = currencyValue*1.23
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "AUD") {
            total = currencyValue*1.90
            result.innerHTML = parseFloat(total).toFixed(2)
        }
    }

    else if(currencyInput === "EUR") {
        if (currencyOutput === "EUR") {
            result.innerHTML = parseFloat(currencyValue).toFixed(2)
        }
        else if (currencyOutput === "GBP") {
            total = currencyValue*0.87
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "USD") {
            total = currencyValue*1.07
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "AUD") {
            total = currencyValue*1.65
            result.innerHTML = parseFloat(total).toFixed(2)
        }
    }

    else if(currencyInput === "USD") {
        if (currencyOutput === "USD") {
            result.innerHTML = parseFloat(currencyValue).toFixed(2)
        }
        else if (currencyOutput === "GBP") {
            total = currencyValue*0.81
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "EUR") {
            total = currencyValue*0.93
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "AUD") {
            total = currencyValue*1.54
            result.innerHTML = parseFloat(total).toFixed(2)
        }
    }

    else if(currencyInput === "AUD") {
        if (currencyOutput === "AUD") {
            result.innerHTML = parseFloat(currencyValue).toFixed(2)
        }
        else if (currencyOutput === "GBP") {
            total = currencyValue*0.53
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "EUR") {
            total = currencyValue*0.61
            result.innerHTML = parseFloat(total).toFixed(2)
        }
        else if (currencyOutput === "USD") {
            total = currencyValue*0.65
            result.innerHTML = parseFloat(total).toFixed(2)
        }
    }

    // Add object of new data to conversions array
    conversions = JSON.parse(sessionStorage.getItem("new"));

    let newConversion = new Conversion(
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString(),
        parseFloat(currencyValue).toFixed(2),
        currencyInput,
        parseFloat(total).toFixed(2),
        currencyOutput
     );

     conversions.push(newConversion)
     sessionStorage.setItem("new", JSON.stringify(conversions));
     
 
}

// Use the array of data to populate the table on the history page
let conversionData = document.querySelector("#historyTable")

function createList(array) {
    
    for (let i=0; i<array.length; i++) {
        let conversion = array[i];
        let newRow = document.createElement("tr");
        newRow.className = "row"
        for (x in conversion) {
            let item = document.createElement("td");
            item.innerHTML = conversion[x];
            newRow.appendChild(item)
        } 
        
        conversionData.appendChild(newRow)
    }
}

// uses the inputted data to filter through the current array and create a new array of data between the dates provided
function filter() {
    // remove old rows from the already populated table
    let oldRows = document.querySelectorAll(".row")
    oldRows.forEach(element => {
        element.remove();
    });
    let filteredConversions = []
    let dateFrom = document.getElementById("dateFrom").value
    let dateTo = document.getElementById("dateTo").value
    if ((new Date(dateFrom) == "Invalid Date") || (new Date(dateTo) == "Invalid Date")) {
        console.log("Invalid Date")
    }
    else {
        for (let i=0; i<conversions.length; i++) {
            let dateInput = conversions[i].date;
            let dateArray = dateInput.split("/");
            let newDate =`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
            if ((new Date(newDate) >= new Date(dateFrom)) && new Date(newDate) <= new Date(dateTo)) {
                filteredConversions.push(conversions[i])
            }
            
    }
    // call function to create the list using the filtered array
    createList(filteredConversions)


   

        
    }
    
}



