const { request, response } = require('express');
const express = require('express');
const app=express()

// para usar body-parser para que escoja el body de una respuesta 
app.use(express.json())


let notes=[
    {
        id:1,
        nombre:"Lalo",
        apellido:'Landa'
    },
    {
        id:2,
        nombre:"Lalito",
        apellido:'Ochoa'
    },
    {
        id:3,
        nombre:"Marco",
        apellido:'Goicochea'
    }
]



app.get('/', (request,response)=>{
    response.send('<h1> La vita he fuggue </h1>')
})

app.get('/api/notes', (request,response)=>{
    response.json(notes);
})


//segmento dinamico de una url
app.get('/api/notes/:id' , (req , res)=>{

   const id= Number(req.params.id);
   //buscar por id
   const nota=notes.find(n=> n.id===id)

   //si encuentra el recurso svs si no encuentra
   if(nota){
     res.json(nota)
   }
    else{
        res.status(404).end()
    }
       

})

app.delete('/api/notes/:id' , (req , res)=>{

    const id= Number(req.params.id);
    //filtra la id busca las notas exepto la nota de id
    const notas=notes.filter(n=> n.id !== id)
 
    res.status(204).json({
        message:"correcto"
    })
        
 
 })




 ///crear un recurso 
app.post('/api/notes' , (req , res)=>{

  const note=req.body;

  //console.log(note);
    //devuelve la maxima id obtenida
  const id= notes.map((n)=>n.id)
    const maxId=Math.max(...id)
    console.log(maxId);
  
  
    const newNote={
      id:maxId+1,
      //pasamos el contenido que en este caso es nombre y apelidop
      nombre:note.nombre,
      apellido: note.apellido
    }

// anadimos la newNota a nuesta "bd" notes
// no uso spread por que no es iterable y tendria que hacerlo obj  
notes=notes.concat(newNote)


  //devolvemos lo que anadimos nada mas
  res.json(newNote)

})

const PORT=3001

//el puerto es asincrono
app.listen(PORT,()=>{

console.log('servidor corriendo en {PORT}');
})