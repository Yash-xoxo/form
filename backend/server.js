const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

const supabase = createClient(
  "https://yoyfyayzvcwiidvqwzdq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveWZ5YXl6dmN3aWlkdnF3emRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NzU1MzcsImV4cCI6MjA4OTA1MTUzN30.cvfe0p4nFuFzK6MxanGkLcVNeOEy74DH1gyMwcKPftA"
)

app.post("/submit", async (req,res)=>{

  const {name,email} = req.body

  const {data,error} = await supabase
    .from("users")
    .insert([{name,email}])

  if(error) return res.send(error)

  res.send({message:"stored"})
})

app.listen(3000,()=>{
  console.log("server running")
})
