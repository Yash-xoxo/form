const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

app.post("/submit", async (req,res)=>{
  const {name,email} = req.body

  const {data,error} = await supabase
    .from("users")
    .insert([{name,email}])

  if(error) return res.status(500).json(error)

  res.json({message:"stored"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("Server running on port", PORT)
})
