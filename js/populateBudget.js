$(document).ready(function(){
    console.log('Ready')
    $.ajax({
        type: "GET",
        url: "http://192.168.8.176:8989/budget/2019/10",
        dataType: "json",
        success: function (data) {
            var totalAllocated = 0;
            var totalSpent = 0;
            $.each(data.expenses,function(d,results){
            var priority =  results.priority;

            var allocated = getAllocated(results.transactions);
            totalAllocated += allocated;
            var spent = getSpent(results.transactions);
            totalSpent += spent;

            var color = "#0000FF"
            if (priority === '1'){
                priority = 'high';
                color = "#800000"
            } else if (priority === '2'){
                priority = 'medium';
                color = "#0000FF"
            } else if (priority === '3'){
                priority = 'low';
                color = "#9932CC"
            }

            $(".container tbody").append(
                "<tr>"
                +"<td>"+results.name.toUpperCase()+"</td>"
                +"<td bgcolor=\"" +color+ "\">"+priority.toUpperCase()+"</td>"
                +"<td>₱"+results.amount_per_month+"</td>"
                +"<td>₱"+allocated+"</td>"
                +"<td>₱"+spent+"</td>"
              +"</tr>" )
           
                })
            $(".container tfoot").append(
                "<tr>"
                +"<th colspan=\"2\">Total</th>"
                +"<td>₱"+data.total+"</td>"
                +"<td>₱"+totalAllocated+"</td>"
                +"<td>₱"+totalSpent+"</td>"
                +"</tr>" )
            } 

        })
});


function getAllocated(transactions){
    console.log(transactions)
    var counter = 0;
    var total = 0;
    transactions.forEach((transaction,index) => {
        var today = new Date();
        var start = new Date(today.getFullYear(),10,1);
        var end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        var transactionDate = new Date(transaction.transaction_date);
        console.log('End Date: ' + end);
        console.log('Transaction Date: ' + transactionDate); 
        console.log('Start: ' + start.getTime());
        console.log('End: ' + end.getTime());
        console.log('TransactionDate: ' + transactionDate.getTime());
        console.log(transactionDate.getTime()  >= start.getTime());
        console.log(transactionDate.getTime() <= end.getTime());
        if(transactionDate.getTime()  >= start.getTime() && transactionDate.getTime() <= end.getTime()){
            console.log(transaction.type);
            if(transaction.type === 'credit'){
                total += transaction.amount;
                console.log('Running Total: ' + total);
            }
        }
        counter++
      
    });

    if(transactions.length >= counter) {
        return total;
    }
}

function getSpent(transactions){
    var counter = 0;
    var total = 0;
    transactions.forEach((transaction,index) => {
        var today = new Date();
        var start = new Date(today.getFullYear(),10,1);
        var end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        var transactionDate = new Date(transaction.transaction_date);
        if(transactionDate.getTime()  >= start.getTime() && transactionDate.getTime() <= end.getTime()){
            if(transaction.type === 'debit'){
                total += transaction.amount;
            }
        }
        counter++
      
    });

    if(transactions.length >= counter) {
        return total;
    }
}