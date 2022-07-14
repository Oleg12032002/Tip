

document.addEventListener("DOMContentLoaded", () => {

    let bill = document.querySelector('.bill');
    let person = document.querySelector('.person');

    let tipInput = document.querySelector('input.tip');
    let tipAll = document.querySelectorAll('div.tip');

    let errorPerson = document.querySelector('.title.error');

    let buttonReset = document.querySelector('.button-reset');


    let total = document.querySelector('.total');
    let tipAmount = document.querySelector('.tip-amount');

    let valueTip = 5;
    let valueBill;
    let valuePerson;


    buttonReset.addEventListener('click', function(e) {
        e.preventDefault();
        for(tip of tipAll) {
            tip.classList.remove("active");
        }

        valueBill = null;
        valuePerson = null;
        valueTip = null;

        tipInput.value = "";
        person.value = "";
        bill.value = "";
        errorPerson.style.display = "none";
        person.classList.remove("error");

        
        tipAmount.innerHTML = "0.00";
        total.innerHTML = "0.00";


        checkValues();
    })



    tipInput.addEventListener('change', function(e) {
        e.preventDefault();
        for(tip of tipAll) {
            tip.classList.remove("active");
        }
        
        valueTip = parseFloat(e.target.value);
        checkValues();
    })



    bill.addEventListener('change', function(e) {
        e.preventDefault();

        valueBill = parseFloat(e.target.value);
        checkValues();
    })


    person.addEventListener('change', function(e) {
        e.preventDefault();

        valuePerson = parseInt(e.target.value);
        checkValues();
    })

    for (var i = 0; i < tipAll.length; i++) {
        (function(index) {
             tipAll[index].addEventListener("click", function(e) {
                e.preventDefault();
                for(tip of tipAll) {
                    tip.classList.remove("active");
                }
                
                tipInput.value = "";
                e.target.classList.add("active");
                valueTip = parseInt(e.target.innerHTML);
                checkValues();
            })
        })(i);
    }

    function checkValues() {
        if(isNaN(valueBill)) {
            valueBill = 0;
        } 

        if(isNaN(valuePerson)) {
            valuePerson = 1;
        }

        if(isNaN(valueTip)) {
            valueTip = 0;
        } 

        if(valuePerson == 0) {
            person.classList.add("error");
            errorPerson.style.display = "block";

        } else {
            person.classList.remove("error");
            errorPerson.style.display = "none";
        
            if(typeof valueBill == "number" && typeof valuePerson == "number" && typeof valueTip == "number") {
                fullTip = valueBill * valueTip / 100.0;
                tipsFromPerson = fullTip / valuePerson;

                if(tipsFromPerson.toFixed(2) * valuePerson < fullTip) {
                    tipsFromPerson += 0.01; 
                }
    
                tipAmount.innerHTML = tipsFromPerson.toFixed(2);
                total.innerHTML = (tipsFromPerson + valueBill / valuePerson).toFixed(2);
            }
        }
    }

});