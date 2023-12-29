import type { NextApiRequest, NextApiResponse } from 'next'
import getMetaTags from '../../utils/extractMetaTag'
type ResponseData = {
  msg: unknown
  status?: number | string 
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
 const data = await getMetaTags("https://www.facebook.com/")
  res.status(200).json({msg:data})
}