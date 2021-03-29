const addCustomerBtn=document.querySelector('#addCustomerBtn');
const addCustomerSection=document.querySelector('#addCustomerSection');
const addCustomerForm=document.querySelector('#addCustomerSection form');
const customersTableBody=document.querySelector('#tableBody');
const search=document.querySelector('#search');
const customerHead=['name','balance'];
const addElement =function(parent,element,attributes,classes,text){
    const ele =document.createElement(element);
    parent.appendChild(ele);
    if(classes!="") ele.classList=classes;
    if(text!="") ele.innerText=text;
    attributesTypes=Object.keys(attributes);
    attributesTypes.forEach(attr => {
        ele.setAttribute(attr,attributes[attr])
    })
    return ele;
}

const setCustomers = function(customers)
{
    localStorage.setItem('customers',JSON.stringify(customers));
}

const getCustomers =function(){
    customers=localStorage.getItem("customers")||'[]'
    return JSON.parse(customers);
}

const deleteButton=function(customer){
    customers=getCustomers();
    accNum=customer.accNum
    ind = customers.findIndex(cust=>cust.accNum==accNum)
    customers.splice(ind,1)
    setCustomers(customers)
    document.querySelectorAll('.x')[ind].remove()
    if(customers.length==0) document.querySelector('#noCustomers').classList.remove('d-none')
}
const withdarwButton=function(customer){
    customers=getCustomers();
    accNum=customer.accNum
    //console.log("rgwvw",document.getElementById(accNum));
    var withdraw = prompt("Enter your wanted amount");
    ind = customers.findIndex(cust=>cust.accNum==accNum);
    console.log("index is =",accNum, "and his balance=",customers[ind].balance);

    console.log("withdraw:",Number.parseInt(withdraw));
    if(Number.parseInt( withdraw)){
        console.log('withdraw')
        if(Number.parseInt(customers[ind].balance)>Number.parseInt(withdraw)){
            console.log('greater than')
            customers[ind].balance=Number.parseInt(customers[ind].balance)-Number.parseInt(withdraw);
        }
        else{
            alert("your account balance is can't allow to do this operation");
        }
    }
    setCustomers(customers);
    showCustomers(customers);
}
const addBalance=function(customer){
    customers=getCustomers();
    accNum=customer.accNum
    var addedBalance = prompt("Enter your added amount");
    ind = customers.findIndex(cust=>cust.accNum==accNum)
    console.log("add balance:",Number.parseInt(addedBalance));
    if(Number.parseInt( addedBalance)){
        console.log('add balance')
        customers[ind].balance=Number.parseInt(customers[ind].balance)+Number.parseInt(addedBalance);
    }
    setCustomers(customers);
    showCustomers(customers);
}

const showOneCustomer=function(customer){
    document.querySelector('#noCustomers').classList.add('d-none');
    tr=addElement(customersTableBody,'tr',{id:customer.accNum},'x','');
    td1=addElement(tr,'td','','',customer.accNum);
    td2=addElement(tr,'td','','',customer.name);
    td3=addElement(tr,'td','','',customer.balance);
    td4=addElement(tr,'td','','','');
    withdrawBtn=addElement(td4,'button','','btn btn-primary','withdraw');
    withdrawBtn.addEventListener('click',function(e){withdarwButton(customer)})
    td5=addElement(tr,'td','','','');
    deleteBtn=addElement(td5,'button','','btn btn-warning','add balance');
    deleteBtn.addEventListener('click', function(e){ addBalance(customer) })
    td6=addElement(tr,'td','','','');
    deleteBtn=addElement(td6,'button','','btn btn-danger','delete');
    deleteBtn.addEventListener('click', function(e){ deleteButton(customer) })
}

const showCustomers =function(cust=null){
    var customers=[];
    if(cust){
        customers=cust;
    }
    else{
        customers=getCustomers();
    }
    if(customers.length!=0){
        customersTableBody.innerHTML=''
        customers.forEach((customer,index)=>{
            showOneCustomer(customer,index);
        })
    }
    else{
        customersTableBody.innerHTML=''
    }
}

const filterCustomers=function(key){
    customers=getCustomers()
    filtered=customers.filter( customer=> customer.name.includes(key)===true)
    console.log(filtered);
    showCustomers(filtered);
}

search.addEventListener('input',function(e){
    console.log(e.target.value);
    filterCustomers(e.target.value);
})

addCustomerBtn.addEventListener('click',function(e){
    this.innerText==='show Add Customer'?this.innerText='hide Add Customer':this.innerText='show Add Customer';
    addCustomerSection.classList.toggle('d-none');
})

addCustomerForm.addEventListener('submit',function(e){
    e.preventDefault();
    customer={accNum:new Date().getTime()}
    console.log(this.elements['name'].value,this.elements['balance'].value)
    customerHead.forEach(head=>customer[head]=this.elements[head].value)
    customers=getCustomers();
    customers.push(customer);
    setCustomers(customers);
    this.reset();
    addCustomerBtn.innerText='show Add Customer';
    addCustomerSection.classList.toggle('d-none');
    showOneCustomer(customer);
})

showCustomers();
