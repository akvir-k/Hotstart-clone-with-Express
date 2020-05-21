const express = require('express');
const fs = require("fs");
const app = express()
app.use(express.json())


app.get('/Hotstar',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('/home/aman/Desktop/hotstar/Movies/English.json'))
    res.send(data) 
});

app.get('/Hotstar/movie',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('/home/aman/Desktop/hotstar/Movies/English.json'))
    data_show=[];
    for (item of data){
        new_dic={
            "Name_of_Movie":item.Name_of_English,
            "Movie_image":item.Images,
            "Genres":item.Type_of_shows
        };
        data_show.push(new_dic);
    } res.send(data_show);
});

app.post('/Hotstar/added_movie', (req,res) => {
    let data=JSON.parse(fs.readFileSync('/home/aman/Desktop/hotstar/Movies/English.json'))
    var dict={
        "Name_of_English":'Cartoon',
        "Images":'value'
    };
    data.push(dict);
    fs.writeFileSync('/home/aman/Desktop/hotstar/Movies/English.json',JSON.stringify(data));
    console.log('new data add....')
    res.send(data)
});

app.put('/Hotstar/update/:Name_of_movie',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('/home/aman/Desktop/hotstar/Movies/English.json'))
    // res.send(req.params.Name_of_English);
    let New_list=[]
    for (let item of data){
        
        if (item["Name_of_English"] == req.params.Name_of_movie ){
            var new_data=item;
            item.Type_of_shows='Action'
            New_list.push(item);
        }
        else {
            New_list.push(item);
        };
    } 
    // 
    fs.writeFileSync('/home/aman/Desktop/hotstar/Movies/English.json',JSON.stringify(New_list));
    res.send(New_list);
});

app.delete('/Hotstar/delete/:Movie',(req, res)=>{
    let data=JSON.parse(fs.readFileSync('/home/aman/Desktop/hotstar/Movies/jj.json'))
    let index=0;
    for (let value of data){
        if (value.TamilMovies==req.params.Movie){
            break
        }else{
            index++;
        };
        
    }; console.log(index);
    data.splice(index,1);
    fs.writeFileSync('/home/aman/Desktop/hotstar/Movies/jj.json',JSON.stringify(data));
    res.send(data)
    
});

app.listen(4000,()=>{
    console.log('app running.....    ')
});