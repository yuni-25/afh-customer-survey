fetch(GOOGLE_SCRIPT_URL,{
    method:"POST",
    mode:"no-cors",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(sender.data)
});
