import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
  status?: number | string 
}
function randomUrl(lenght:number){
  let shortUrl = ''
  const allowedChar = 'abcdefghijklmnopkrstufwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  for (let i=0;i<lenght;i++){
    const randomChar = Math.floor(Math.random()* allowedChar.length)
    shortUrl += allowedChar[randomChar]
  }
  return shortUrl
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = JSON.parse(req.body)
  if(req.method !== "POST"){
    res.status(405).json({ message: 'Invalid' ,status:res.statusCode})
  } else
  
  res.status(200).json({ message:`From ${data.long} to ${data.short || randomUrl(9)} `})
}