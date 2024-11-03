import { NextApiRequest, NextApiResponse } from 'next'

export default async function getAccountData(req: NextApiRequest, res: NextApiResponse<any>) {
  const response = await fetch(`https://enka.network/api/uid/${req.query.uid}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json;charset=UTF-8', 'User-Agent': 'Cinnamon-HYV-Calc' },
  })

  if (!response.ok) {
    console.error(response)
    res.status(response.status).json(await response.json())
  }

  const json = (await response.json()) as Record<string, any>
  res.status(200).json(json)
}
