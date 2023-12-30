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
  if (req.method === 'POST') {
    const values = req.body;
    if (values.longURL) {
      const data = await getMetaTags(values.longURL)
      res.status(200).json({msg:data})
    } else {
      res.status(404).json({msg:"URL harus mengandung protokol https"})
    }
  }

}