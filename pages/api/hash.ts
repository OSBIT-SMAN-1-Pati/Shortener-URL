import type { NextApiRequest, NextApiResponse } from 'next'
 import crypto from 'crypto'
type ResponseData = {
  message: string
  status?: number | string 
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = JSON.parse(req.body)
  console.log(data)
  const salt = crypto.randomBytes(20).toString('hex')
  if(req.method !== "POST"){
    res.status(405).json({ message: 'Invalid' ,status:res.statusCode})
  } else
  
  res.status(200).json({ message:`From ${data.long} to ${data.short || crypto.createHash('sha256').update(salt).digest('hex').slice(0,10)}`})
}