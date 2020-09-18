const Input_Url = 'http://api.currencylayer.com/live?access_key=26473ec4d3715282eba1b5e2ca3b7880';
const Select_Url = 'http://api.currencylayer.com/list?access_key=26473ec4d3715282eba1b5e2ca3b7880';
const select = document.querySelectorAll('select');
const input  = document.querySelectorAll('input');
var html;
  

Promise.all([
    fetch(Input_Url),
    fetch(Select_Url)
]).then((res)=>{
    return Promise.all(res.map((res)=>{
        return res.json()
    }))
}).then((res)=>{
    var html;
    var Names_Data = res[1].currencies;
    var NamesDataKeys = Object.keys(Names_Data);
    NamesDataKeys.map((data)=>{
         html += `<option value = "${Names_Data[data]}">${Names_Data[data]}</option>`;
    });
    for(let i =0; i<select.length ;i++){
        select[i].innerHTML = html;
    }
});

function submit(){
    // console.log("hello")
    Promise.all([
        fetch(Input_Url),
        fetch(Select_Url)
    ]).then((res)=>{
        return Promise.all(res.map((res)=>{
            return res.json()
        }))
    }).then((res)=>{
        
        var Names_Data = res[1].currencies;
        var ValuesData = res[0].quotes;
        var Base = "USD";
        var NamesDataKeys = Object.keys(Names_Data);
        var input_curr = select[0].value;
        var input_curr_value =parseFloat(input[0].value);
        var output_curr = select[1].value;
        function getKeyByValue(object, value) { 
            for (var prop in object) { 
                if (object.hasOwnProperty(prop)) { 
                    if (object[prop] === value) 
                    return prop; 
                } 
            } 
        }
        NamesDataKeys.map((data)=>{
            if(Names_Data[data] == input_curr ){
                var input_curr_key = getKeyByValue(Names_Data,input_curr)
                var num_key1 = Base.concat(input_curr_key);
                var num_key_value1 = ValuesData[num_key1]
                NamesDataKeys.map((data)=>{
                    if(Names_Data[data] == output_curr ){
                        var output_cur_key = getKeyByValue(Names_Data,output_curr);
                        var num_key2 = Base.concat(output_cur_key);
                        var num_key_value2 = ValuesData[num_key2];
                        converted_value = input_curr_value * num_key_value2 / num_key_value1;

                        document.getElementById('con_val').innerHTML = `The value of <b>${input_curr_value} ${input_curr}</b> in <b>${output_curr}</b> is <b>${converted_value}</b>`;

                    }
               });
            }
       });
    });
}

