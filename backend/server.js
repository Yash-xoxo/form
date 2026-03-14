const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  )
  process.exit(1)
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "SUPABASE_SERVICE_ROLE_KEY is not set. Falling back to SUPABASE_ANON_KEY; inserts may fail with RLS."
  )
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

app.post("/submit", async (req,res)=>{
  const {name,email} = req.body
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" })
  }

  const {data,error} = await supabase
    .from("users")
    .insert([{name,email}])

  if(error) {
    console.error("Supabase insert error:", error)
    return res.status(500).json({ error: error.message })
  }

  res.json({message:"stored"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("Server running on port", PORT)
})
